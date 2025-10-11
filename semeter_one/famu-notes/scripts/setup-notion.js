#!/usr/bin/env node

/**
 * Notion Setup Script
 * Automaticky vytvoří kompletní Notion workspace s:
 * - Všemi předměty
 * - Hodinami a poznámkami
 * - Widgety (kalendář, rozvrh, deadlines)
 */

const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

// Konfigurace
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY || !DATABASE_ID) {
  console.error('❌ Chyba: Nastav environment variables!');
  console.log('\nSpusť:');
  console.log('export NOTION_API_KEY="ntn_YOUR_API_KEY"');
  console.log('export NOTION_DATABASE_ID="your_database_id"');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_API_KEY });

// Import subjects data
const subjectsPath = path.join(__dirname, '../src/data/subjects.js');
const subjectsContent = fs.readFileSync(subjectsPath, 'utf-8');

// Parse subjects (simple extraction)
const subjects = [
  {
    id: 'ddf',
    name: 'Dokumentární film',
    code: 'DDF',
    color: 'blue',
    description: 'Teorie a praxe dokumentárního filmu',
    classes: [
      { number: 1, title: 'Úvod do dokumentárního filmu', date: '2024-10-01' },
      { number: 2, title: 'Goffman a prezentace sebe sama', date: '2024-10-08' },
    ]
  },
  {
    id: 'strih',
    name: 'Střih',
    code: 'STRIH',
    color: 'purple',
    description: 'Základy filmového střihu',
    classes: []
  },
  {
    id: 'kamera',
    name: 'Kamera',
    code: 'KAMERA',
    color: 'green',
    description: 'Kamerová tvorba a kompozice',
    classes: []
  },
  {
    id: 'zvuk',
    name: 'Zvuk',
    code: 'ZVUK',
    color: 'red',
    description: 'Zvuková postprodukce',
    classes: []
  },
  {
    id: 'av',
    name: 'Audiovizuální tvorba',
    code: 'AV',
    color: 'orange',
    description: 'Komplexní audiovizuální projekty',
    classes: [
      { number: 1, title: 'Úvod do AV tvorby', date: '2024-10-02' },
    ]
  },
  {
    id: 'ai',
    name: 'AI ve filmu',
    code: 'AI',
    color: 'blue',
    description: 'Umělá inteligence ve filmové tvorbě',
    classes: [
      { number: 1, title: 'AI nástroje pro filmaře', date: '2024-10-03' },
    ]
  },
];

// Rozvrh data
const timetable = {
  odd: { // Lichý týden
    monday: [
      { time: '9:00-12:00', subject: 'DDF', room: 'A101' },
      { time: '13:00-16:00', subject: 'Střih', room: 'B205' },
    ],
    tuesday: [
      { time: '10:00-13:00', subject: 'Kamera', room: 'Studio 1' },
    ],
    wednesday: [
      { time: '14:00-17:00', subject: 'AV', room: 'C302' },
    ],
    thursday: [
      { time: '9:00-12:00', subject: 'Zvuk', room: 'Sound Lab' },
    ],
    friday: [
      { time: '11:00-14:00', subject: 'AI', room: 'D401' },
    ],
  },
  even: { // Sudý týden
    monday: [
      { time: '9:00-12:00', subject: 'DDF', room: 'A101' },
    ],
    wednesday: [
      { time: '14:00-17:00', subject: 'AV', room: 'C302' },
    ],
    friday: [
      { time: '11:00-14:00', subject: 'AI', room: 'D401' },
    ],
  }
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 1. Vytvoř hlavní dashboard page
async function createDashboard() {
  console.log('📊 Vytváření Dashboard...');
  
  const dashboard = await notion.pages.create({
    parent: { database_id: DATABASE_ID },
    properties: {
      Name: {
        title: [{ text: { content: '🎓 FAMU Dashboard' } }],
      },
    },
    children: [
      {
        object: 'block',
        type: 'heading_1',
        heading_1: {
          rich_text: [{ text: { content: '🎓 FAMU Studium' } }],
        },
      },
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{ text: { content: 'Vítej v tvém studijním workspace! Zde najdeš všechny předměty, rozvrh a deadlines.' } }],
        },
      },
      {
        object: 'block',
        type: 'divider',
        divider: {},
      },
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ text: { content: '📅 Tento týden' } }],
        },
      },
      {
        object: 'block',
        type: 'callout',
        callout: {
          icon: { emoji: '📆' },
          rich_text: [{ text: { content: 'Sudý/Lichý týden widget - připojíš přes Notion integrace' } }],
          color: 'blue_background',
        },
      },
    ],
  });

  console.log('✅ Dashboard vytvořen!');
  return dashboard.id;
}

// 2. Vytvoř rozvrh page
async function createTimetable(parentId) {
  console.log('📅 Vytváření rozvrhu...');
  
  const timetablePage = await notion.pages.create({
    parent: { page_id: parentId },
    properties: {
      title: {
        title: [{ text: { content: '📅 Rozvrh' } }],
      },
    },
    children: [
      {
        object: 'block',
        type: 'heading_1',
        heading_1: {
          rich_text: [{ text: { content: '📅 Týdenní rozvrh' } }],
        },
      },
      {
        object: 'block',
        type: 'toggle',
        toggle: {
          rich_text: [{ text: { content: '📘 Lichý týden', bold: true } }],
          color: 'blue_background',
          children: [
            {
              object: 'block',
              type: 'paragraph',
              paragraph: {
                rich_text: [{ text: { content: '🗓️ Pondělí:\n• 9:00-12:00 - DDF (A101)\n• 13:00-16:00 - Střih (B205)' } }],
              },
            },
            {
              object: 'block',
              type: 'paragraph',
              paragraph: {
                rich_text: [{ text: { content: '🗓️ Úterý:\n• 10:00-13:00 - Kamera (Studio 1)' } }],
              },
            },
            {
              object: 'block',
              type: 'paragraph',
              paragraph: {
                rich_text: [{ text: { content: '🗓️ Středa:\n• 14:00-17:00 - AV (C302)' } }],
              },
            },
            {
              object: 'block',
              type: 'paragraph',
              paragraph: {
                rich_text: [{ text: { content: '🗓️ Čtvrtek:\n• 9:00-12:00 - Zvuk (Sound Lab)' } }],
              },
            },
            {
              object: 'block',
              type: 'paragraph',
              paragraph: {
                rich_text: [{ text: { content: '🗓️ Pátek:\n• 11:00-14:00 - AI (D401)' } }],
              },
            },
          ],
        },
      },
      {
        object: 'block',
        type: 'toggle',
        toggle: {
          rich_text: [{ text: { content: '📗 Sudý týden', bold: true } }],
          color: 'green_background',
          children: [
            {
              object: 'block',
              type: 'paragraph',
              paragraph: {
                rich_text: [{ text: { content: '🗓️ Pondělí:\n• 9:00-12:00 - DDF (A101)' } }],
              },
            },
            {
              object: 'block',
              type: 'paragraph',
              paragraph: {
                rich_text: [{ text: { content: '🗓️ Středa:\n• 14:00-17:00 - AV (C302)' } }],
              },
            },
            {
              object: 'block',
              type: 'paragraph',
              paragraph: {
                rich_text: [{ text: { content: '🗓️ Pátek:\n• 11:00-14:00 - AI (D401)' } }],
              },
            },
          ],
        },
      },
    ],
  });

  console.log('✅ Rozvrh vytvořen!');
  return timetablePage.id;
}

// 3. Vytvoř předmět v databázi
async function createSubject(subject) {
  console.log(`📚 Vytváření předmětu: ${subject.name}...`);
  
  try {
    const page = await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: {
        Name: {
          title: [{ text: { content: subject.name } }],
        },
        Code: {
          rich_text: [{ text: { content: subject.code } }],
        },
        Color: {
          select: { name: subject.color },
        },
        SubjectID: {
          rich_text: [{ text: { content: subject.id } }],
        },
      },
      children: [
        {
          object: 'block',
          type: 'heading_1',
          heading_1: {
            rich_text: [{ text: { content: `${subject.name} (${subject.code})` } }],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{ text: { content: subject.description } }],
          },
        },
        {
          object: 'block',
          type: 'divider',
          divider: {},
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{ text: { content: '📝 Hodiny' } }],
          },
        },
      ],
    });

    console.log(`✅ ${subject.name} vytvořen!`);
    await sleep(500); // Rate limiting
    
    return page.id;
  } catch (error) {
    console.error(`❌ Chyba při vytváření ${subject.name}:`, error.message);
    return null;
  }
}

// 4. Vytvoř hodinu jako sub-page
async function createClass(parentPageId, classData, subjectName) {
  console.log(`  📄 Vytváření hodiny: ${classData.title}...`);
  
  try {
    await notion.pages.create({
      parent: { page_id: parentPageId },
      properties: {
        title: {
          title: [{ text: { content: `${classData.number}. ${classData.title}` } }],
        },
      },
      children: [
        {
          object: 'block',
          type: 'heading_1',
          heading_1: {
            rich_text: [{ text: { content: `${classData.number}. hodina - ${classData.title}` } }],
          },
        },
        {
          object: 'block',
          type: 'callout',
          callout: {
            icon: { emoji: '📅' },
            rich_text: [{ text: { content: `Datum: ${classData.date || 'TBD'}` } }],
            color: 'gray_background',
          },
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{ text: { content: '📝 Poznámky' } }],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{ text: { content: 'Zde budou poznámky z hodiny...' } }],
          },
        },
      ],
    });

    console.log(`  ✅ Hodina ${classData.number} vytvořena!`);
    await sleep(500);
  } catch (error) {
    console.error(`  ❌ Chyba při vytváření hodiny:`, error.message);
  }
}

// Main setup function
async function setupNotion() {
  console.log('🚀 Začínám Notion setup...\n');

  try {
    // 1. Vytvoř dashboard
    const dashboardId = await createDashboard();
    await sleep(1000);

    // 2. Vytvoř rozvrh
    await createTimetable(dashboardId);
    await sleep(1000);

    // 3. Vytvoř všechny předměty
    console.log('\n📚 Vytváření předmětů...\n');
    for (const subject of subjects) {
      const pageId = await createSubject(subject);
      
      if (pageId && subject.classes && subject.classes.length > 0) {
        // Vytvoř hodiny pro tento předmět
        for (const classData of subject.classes) {
          await createClass(pageId, classData, subject.name);
        }
      }
      
      await sleep(1000);
    }

    console.log('\n✅ Notion setup dokončen!');
    console.log('\n🎉 Tvůj Notion workspace je připravený!');
    console.log('📍 Otevři Notion a zkontroluj databázi: famu-predmety\n');

  } catch (error) {
    console.error('\n❌ Chyba při setupu:', error.message);
    process.exit(1);
  }
}

// Spusť setup
setupNotion();
