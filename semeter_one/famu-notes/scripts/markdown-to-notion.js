#!/usr/bin/env node

/**
 * Markdown to Notion Blocks Converter
 * Converts Markdown to Notion API blocks format
 */

function markdownToNotionBlocks(markdown) {
  const lines = markdown.split('\n');
  const blocks = [];
  let currentBlock = null;
  let codeBlock = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Empty line
    if (line.trim() === '') {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      continue;
    }

    // Code block
    if (line.startsWith('```')) {
      if (codeBlock) {
        // End code block
        blocks.push({
          object: 'block',
          type: 'code',
          code: {
            rich_text: [{ text: { content: codeBlock.content.join('\n') } }],
            language: codeBlock.language || 'javascript',
          },
        });
        codeBlock = null;
      } else {
        // Start code block
        const language = line.replace('```', '').trim();
        codeBlock = { language, content: [] };
      }
      continue;
    }

    if (codeBlock) {
      codeBlock.content.push(line);
      continue;
    }

    // Heading 1
    if (line.startsWith('# ')) {
      blocks.push({
        object: 'block',
        type: 'heading_1',
        heading_1: {
          rich_text: parseRichText(line.substring(2)),
        },
      });
      continue;
    }

    // Heading 2
    if (line.startsWith('## ')) {
      blocks.push({
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: parseRichText(line.substring(3)),
        },
      });
      continue;
    }

    // Heading 3
    if (line.startsWith('### ')) {
      blocks.push({
        object: 'block',
        type: 'heading_3',
        heading_3: {
          rich_text: parseRichText(line.substring(4)),
        },
      });
      continue;
    }

    // Quote
    if (line.startsWith('> ')) {
      blocks.push({
        object: 'block',
        type: 'quote',
        quote: {
          rich_text: parseRichText(line.substring(2)),
        },
      });
      continue;
    }

    // Divider
    if (line.trim() === '---') {
      blocks.push({
        object: 'block',
        type: 'divider',
        divider: {},
      });
      continue;
    }

    // Bullet list
    if (line.startsWith('- ') || line.startsWith('* ')) {
      blocks.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: parseRichText(line.substring(2)),
        },
      });
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const content = line.replace(/^\d+\.\s/, '');
      blocks.push({
        object: 'block',
        type: 'numbered_list_item',
        numbered_list_item: {
          rich_text: parseRichText(content),
        },
      });
      continue;
    }

    // Regular paragraph
    blocks.push({
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: parseRichText(line),
      },
    });
  }

  return blocks;
}

// Parse rich text with bold, italic, code, links
function parseRichText(text) {
  const richText = [];
  let current = '';
  let i = 0;

  while (i < text.length) {
    // Bold **text**
    if (text.substr(i, 2) === '**') {
      if (current) {
        richText.push({ text: { content: current } });
        current = '';
      }
      i += 2;
      let boldText = '';
      while (i < text.length && text.substr(i, 2) !== '**') {
        boldText += text[i];
        i++;
      }
      richText.push({
        text: { content: boldText },
        annotations: { bold: true },
      });
      i += 2;
      continue;
    }

    // Italic *text* or _text_
    if (text[i] === '*' || text[i] === '_') {
      if (current) {
        richText.push({ text: { content: current } });
        current = '';
      }
      const marker = text[i];
      i++;
      let italicText = '';
      while (i < text.length && text[i] !== marker) {
        italicText += text[i];
        i++;
      }
      richText.push({
        text: { content: italicText },
        annotations: { italic: true },
      });
      i++;
      continue;
    }

    // Code `text`
    if (text[i] === '`') {
      if (current) {
        richText.push({ text: { content: current } });
        current = '';
      }
      i++;
      let codeText = '';
      while (i < text.length && text[i] !== '`') {
        codeText += text[i];
        i++;
      }
      richText.push({
        text: { content: codeText },
        annotations: { code: true },
      });
      i++;
      continue;
    }

    // Link [text](url)
    if (text[i] === '[') {
      if (current) {
        richText.push({ text: { content: current } });
        current = '';
      }
      i++;
      let linkText = '';
      while (i < text.length && text[i] !== ']') {
        linkText += text[i];
        i++;
      }
      i += 2; // Skip ](
      let url = '';
      while (i < text.length && text[i] !== ')') {
        url += text[i];
        i++;
      }
      richText.push({
        text: { content: linkText, link: { url } },
      });
      i++;
      continue;
    }

    current += text[i];
    i++;
  }

  if (current) {
    richText.push({ text: { content: current } });
  }

  return richText.length > 0 ? richText : [{ text: { content: text } }];
}

module.exports = { markdownToNotionBlocks };
