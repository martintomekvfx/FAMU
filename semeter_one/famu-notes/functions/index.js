const functions = require('firebase-functions');
const { Client } = require('@notionhq/client');
const cors = require('cors')({ origin: true });

// Initialize Notion client
const notion = new Client({
  auth: functions.config().notion.api_key,
});

const DATABASE_ID = functions.config().notion.database_id;

// Main function
exports.notionSync = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    // Only allow POST
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { action, data } = req.body;

      switch (action) {
        case 'createSubjectPage':
          return await createSubjectPage(res, data);
        case 'createClassPage':
          return await createClassPage(res, data);
        case 'syncNotes':
          return await syncNotes(res, data);
        case 'getSubjects':
          return await getSubjects(res);
        case 'saveNotes':
          return await saveNotes(res, data);
        case 'loadNotes':
          return await loadNotes(res, data);
        case 'checkSync':
          return await checkSync(res, data);
        default:
          return res.status(400).json({ error: 'Invalid action' });
      }
    } catch (error) {
      console.error('Notion API Error:', error);
      return res.status(500).json({ error: error.message });
    }
  });
});

// Create a new subject page in Notion
async function createSubjectPage(res, data) {
  const { subjectId, name, code, color } = data;

  const response = await notion.pages.create({
    parent: { database_id: DATABASE_ID },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      Code: {
        rich_text: [
          {
            text: {
              content: code,
            },
          },
        ],
      },
      Color: {
        select: {
          name: color,
        },
      },
      SubjectID: {
        rich_text: [
          {
            text: {
              content: subjectId,
            },
          },
        ],
      },
    },
  });

  return res.status(200).json({ success: true, pageId: response.id });
}

// Create a class page under a subject
async function createClassPage(res, data) {
  const { parentPageId, classNumber, title, content } = data;

  const response = await notion.pages.create({
    parent: { page_id: parentPageId },
    properties: {
      title: {
        title: [
          {
            text: {
              content: `${classNumber}. ${title}`,
            },
          },
        ],
      },
    },
    children: [
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: content || 'Poznámky z hodiny',
              },
            },
          ],
        },
      },
    ],
  });

  return res.status(200).json({ success: true, pageId: response.id });
}

// Sync notes to existing page
async function syncNotes(res, data) {
  const { pageId, content } = data;

  // Get existing blocks
  const existingBlocks = await notion.blocks.children.list({
    block_id: pageId,
  });

  // Delete existing blocks
  for (const block of existingBlocks.results) {
    await notion.blocks.delete({
      block_id: block.id,
    });
  }

  // Add new content
  const blocks = content.split('\n\n').map((paragraph) => ({
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: paragraph,
          },
        },
      ],
    },
  }));

  await notion.blocks.children.append({
    block_id: pageId,
    children: blocks,
  });

  return res.status(200).json({ success: true });
}

// Get all subjects from database
async function getSubjects(res) {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
  });

  const subjects = response.results.map((page) => ({
    id: page.id,
    name: page.properties.Name.title[0]?.text.content || '',
    code: page.properties.Code.rich_text[0]?.text.content || '',
    color: page.properties.Color.select?.name || '',
    subjectId: page.properties.SubjectID?.rich_text[0]?.text.content || '',
  }));

  return res.status(200).json({ subjects });
}

// ========== NOVÉ FUNKCE PRO PLNOU INTEGRACI ==========

// Save notes to Notion page
async function saveNotes(res, data) {
  const { subjectId, classNumber, content, timestamp } = data;
  
  try {
    // Find or create page for this class
    const pageId = await findOrCreateClassPage(subjectId, classNumber);
    
    // Convert content to Notion blocks
    const blocks = contentToNotionBlocks(content);
    
    // Get existing blocks
    const existingBlocks = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });
    
    // Delete old blocks
    for (const block of existingBlocks.results) {
      if (block.type !== 'child_page' && block.type !== 'child_database') {
        try {
          await notion.blocks.delete({ block_id: block.id });
        } catch (e) {
          console.log('Could not delete block:', e.message);
        }
      }
    }
    
    // Add new blocks
    await notion.blocks.children.append({
      block_id: pageId,
      children: blocks,
    });
    
    return res.status(200).json({ 
      success: true, 
      pageId,
      timestamp,
      message: 'Notes saved to Notion'
    });
  } catch (error) {
    console.error('Save notes error:', error);
    return res.status(500).json({ error: error.message });
  }
}

// Load notes from Notion
async function loadNotes(res, data) {
  const { subjectId, classNumber } = data;
  
  try {
    const pageId = await findClassPage(subjectId, classNumber);
    
    if (!pageId) {
      return res.status(404).json({ error: 'Page not found' });
    }
    
    // Get all blocks from page
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });
    
    // Convert blocks to content
    const content = notionBlocksToContent(blocks.results);
    
    return res.status(200).json({ 
      success: true,
      content,
      pageId,
    });
  } catch (error) {
    console.error('Load notes error:', error);
    return res.status(500).json({ error: error.message });
  }
}

// Check sync status
async function checkSync(res, data) {
  const { subjectId, classNumber } = data;
  
  try {
    const pageId = await findClassPage(subjectId, classNumber);
    
    if (!pageId) {
      return res.status(200).json({ synced: false, exists: false });
    }
    
    // Get page metadata
    const page = await notion.pages.retrieve({ page_id: pageId });
    
    return res.status(200).json({ 
      synced: true,
      exists: true,
      lastEdited: page.last_edited_time,
      pageId,
    });
  } catch (error) {
    return res.status(200).json({ synced: false, error: error.message });
  }
}

// Helper: Find or create class page
async function findOrCreateClassPage(subjectId, classNumber) {
  // Try to find existing page
  const existingId = await findClassPage(subjectId, classNumber);
  if (existingId) return existingId;
  
  // Create new page
  const subjectPage = await findSubjectPage(subjectId);
  if (!subjectPage) {
    throw new Error(`Subject ${subjectId} not found`);
  }
  
  const newPage = await notion.pages.create({
    parent: { page_id: subjectPage },
    properties: {
      title: {
        title: [{ text: { content: `${classNumber}. hodina` } }],
      },
    },
  });
  
  return newPage.id;
}

// Helper: Find class page
async function findClassPage(subjectId, classNumber) {
  const subjectPage = await findSubjectPage(subjectId);
  if (!subjectPage) return null;
  
  // Search for class page
  const children = await notion.blocks.children.list({
    block_id: subjectPage,
  });
  
  for (const child of children.results) {
    if (child.type === 'child_page') {
      const title = child.child_page?.title || '';
      if (title.includes(`${classNumber}.`)) {
        return child.id;
      }
    }
  }
  
  return null;
}

// Helper: Find subject page
async function findSubjectPage(subjectId) {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: 'SubjectID',
      rich_text: {
        equals: subjectId,
      },
    },
  });
  
  return response.results[0]?.id || null;
}

// Helper: Convert content to Notion blocks
function contentToNotionBlocks(content) {
  // Simple conversion - split by paragraphs
  const paragraphs = content.split('\n\n').filter(p => p.trim());
  
  return paragraphs.map(text => ({
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [{
        type: 'text',
        text: { content: text.substring(0, 2000) },
      }],
    },
  }));
}

// Helper: Convert Notion blocks to content
function notionBlocksToContent(blocks) {
  return blocks
    .map(block => {
      if (block.type === 'paragraph') {
        return block.paragraph.rich_text.map(t => t.plain_text).join('');
      }
      if (block.type === 'heading_1') {
        return '# ' + block.heading_1.rich_text.map(t => t.plain_text).join('');
      }
      if (block.type === 'heading_2') {
        return '## ' + block.heading_2.rich_text.map(t => t.plain_text).join('');
      }
      return '';
    })
    .filter(t => t)
    .join('\n\n');
}
