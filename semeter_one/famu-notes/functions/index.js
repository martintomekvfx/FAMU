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
