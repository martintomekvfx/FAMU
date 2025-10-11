#!/usr/bin/env node

/**
 * Publish Markdown to Notion
 * Usage: node publish-to-notion.js <subject-id> <class-id>
 * Example: node publish-to-notion.js test 1
 */

const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');
const { markdownToNotionBlocks } = require('./markdown-to-notion');

// Config
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const PARENT_PAGE_ID = process.env.NOTION_PARENT_PAGE_ID; // Optional: parent page to create under

if (!NOTION_API_KEY) {
  console.error('❌ NOTION_API_KEY not set!');
  console.log('\nSet it with:');
  console.log('export NOTION_API_KEY="ntn_YOUR_API_KEY"');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_API_KEY });

async function publishToNotion(subjectId, classId) {
  try {
    console.log(`🚀 Publishing ${subjectId}/class-${classId} to Notion...\\n`);

    // 1. Read Markdown file
    const mdPath = path.join(__dirname, `../src/content/${subjectId}/test-class-${classId.toString().padStart(2, '0')}.md`);
    
    if (!fs.existsSync(mdPath)) {
      console.error(`❌ File not found: ${mdPath}`);
      process.exit(1);
    }

    const markdown = fs.readFileSync(mdPath, 'utf-8');
    console.log(`📖 Read markdown file (${markdown.length} characters)`);

    // 2. Convert to Notion blocks
    const blocks = markdownToNotionBlocks(markdown);
    console.log(`🔄 Converted to ${blocks.length} Notion blocks`);

    // 3. Extract title from first heading
    const title = markdown.split('\\n')[0].replace(/^#\s+/, '') || 'Untitled';
    console.log(`📝 Title: ${title}`);

    // 4. Create Notion page
    const parent = PARENT_PAGE_ID 
      ? { page_id: PARENT_PAGE_ID }
      : { type: 'page_id', page_id: 'YOUR_PARENT_PAGE_ID' }; // Replace with actual parent

    const response = await notion.pages.create({
      parent,
      properties: {
        title: {
          title: [{
            text: { content: title }
          }]
        }
      },
      children: blocks.slice(0, 100), // Notion limit: 100 blocks per request
    });

    console.log(`\\n✅ Published to Notion!`);
    console.log(`📍 Page ID: ${response.id}`);
    console.log(`🔗 URL: ${response.url}`);
    console.log(`\\n📋 Embed URL for iframe:`);
    console.log(`   https://notion.so/${response.id.replace(/-/g, '')}`);

    // 5. Add remaining blocks if > 100
    if (blocks.length > 100) {
      console.log(`\\n📦 Adding remaining ${blocks.length - 100} blocks...`);
      for (let i = 100; i < blocks.length; i += 100) {
        const chunk = blocks.slice(i, i + 100);
        await notion.blocks.children.append({
          block_id: response.id,
          children: chunk,
        });
        console.log(`   Added blocks ${i}-${Math.min(i + 100, blocks.length)}`);
      }
    }

    // 6. Save page ID to subjects.js (optional, manual for now)
    console.log(`\\n💡 Update subjects.js manually:`);
    console.log(`   notionPageId: '${response.id}'`);

    return response;

  } catch (error) {
    console.error('\\n❌ Error publishing to Notion:', error);
    console.error(error.body || error.message);
    process.exit(1);
  }
}

// Parse command line arguments
const [subjectId, classId] = process.argv.slice(2);

if (!subjectId || !classId) {
  console.log('Usage: node publish-to-notion.js <subject-id> <class-id>');
  console.log('Example: node publish-to-notion.js test 1');
  process.exit(1);
}

// Run
publishToNotion(subjectId, classId);
