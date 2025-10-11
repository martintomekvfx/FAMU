# 📝 Markdown → Notion → App Workflow

## 🎯 Overview:

**Workflow:**
```
Write Markdown in VSCode
         ↓
Run publish script
         ↓
Creates Notion page via API
         ↓
App displays Notion page
```

## ✨ Features:

- ✅ Write in **Markdown** (familiar, version controlled)
- ✅ Publish to **Notion** (beautiful formatting, rich content)
- ✅ Display in **App** (seamless integration)
- ✅ **Test subject** included (won't touch existing content)

## 🚀 Quick Start:

### **1. Check out TEST subject:**
```
http://localhost:5173/subject/test
```

### **2. Edit Markdown:**
```
src/content/test/test-class-01.md
```

### **3. Publish to Notion:**
```bash
cd scripts
export NOTION_API_KEY="ntn_YOUR_API_KEY"
node publish-to-notion.js test 1
```

### **4. Update Page ID:**
```javascript
// In src/data/subjects.js
{
  id: 'test',
  classes: [
    {
      id: 1,
      notionPageId: 'PASTE_PAGE_ID_HERE', // From script output
    }
  ]
}
```

### **5. View in App:**
```
http://localhost:5173/subject/test/class/1
```

## 📁 File Structure:

```
famu-notes/
├── src/
│   ├── content/
│   │   └── test/
│   │       └── test-class-01.md ← Write here
│   ├── pages/
│   │   └── NotionClassPage.jsx ← Display component
│   └── data/
│       └── subjects.js ← Add notionPageId here
├── scripts/
│   ├── markdown-to-notion.js ← Converter
│   └── publish-to-notion.js ← Publisher
```

## 📝 Markdown Format:

```markdown
# Heading 1

## Heading 2

### Heading 3

**Bold text**
*Italic text*
`inline code`

> Quote block

- Bullet list
- Item 2

1. Numbered list
2. Item 2

\```javascript
// Code block
function example() {
  return "hello";
}
\```

[Link text](https://example.com)

---

Horizontal divider
```

## 🔧 How it Works:

### **1. Markdown to Notion Blocks:**

Script converts Markdown to Notion API blocks:
```javascript
"# Heading" → { type: 'heading_1', heading_1: { rich_text: [...] } }
"**Bold**" → { text: { content: "Bold" }, annotations: { bold: true } }
```

### **2. Publish via API:**

```javascript
await notion.pages.create({
  parent: { page_id: PARENT_PAGE_ID },
  properties: { title: [...] },
  children: blocks, // Converted from Markdown
});
```

### **3. Display in App:**

```jsx
<iframe 
  src={`https://notion.so/${notionPageId}`}
  className="w-full h-full"
/>
```

## 🎨 Supported Markdown:

| Markdown | Notion Block |
|----------|--------------|
| `# H1` | Heading 1 |
| `## H2` | Heading 2 |
| `### H3` | Heading 3 |
| `**bold**` | Bold text |
| `*italic*` | Italic text |
| `` `code` `` | Inline code |
| ` ``` ` | Code block |
| `> quote` | Quote |
| `- list` | Bullet list |
| `1. list` | Numbered list |
| `---` | Divider |
| `[text](url)` | Link |

## 💡 Tips:

### **For New Classes:**

1. Create Markdown file:
```bash
src/content/test/test-class-02.md
```

2. Add to subjects.js:
```javascript
{
  id: 2,
  title: 'Class 2',
  notionPageId: null,
}
```

3. Publish:
```bash
node publish-to-notion.js test 2
```

### **For Existing Subjects:**

To enable for existing subjects (DDF, AV, etc.):

1. Set `notionEnabled: true` in subjects.js
2. Create `.md` files for classes
3. Publish each class
4. Update route in App.jsx

## 🐛 Troubleshooting:

### **"NOTION_API_KEY not set":**
```bash
export NOTION_API_KEY="ntn_YOUR_API_KEY"
```

### **"File not found":**
Check file path:
```
src/content/<subject-id>/test-class-<id>.md
```

### **"parent not found":**
Set PARENT_PAGE_ID:
```bash
export NOTION_PARENT_PAGE_ID="your_parent_page_id"
```

Or edit script to use workspace root.

### **Notion page not showing:**
1. Make sure you copied Page ID correctly
2. Make sure Notion page is "Share to web"
3. Refresh app

## 📊 Example Output:

```bash
$ node publish-to-notion.js test 1

🚀 Publishing test/class-1 to Notion...

📖 Read markdown file (1234 characters)
🔄 Converted to 25 Notion blocks
📝 Title: Test Class 1 - Notion Integration

✅ Published to Notion!
📍 Page ID: abc123-def456-789ghi
🔗 URL: https://notion.so/abc123def456789ghi

📋 Embed URL for iframe:
   https://notion.so/abc123def456789ghi

💡 Update subjects.js manually:
   notionPageId: 'abc123-def456-789ghi'
```

## 🎯 Next Steps:

1. ✅ **Test** with TEST subject
2. ✅ **Refine** Markdown converter (add more features)
3. ✅ **Extend** to other subjects
4. ✅ **Automate** page ID updates
5. ✅ **Add** two-way sync (Notion → Markdown)

## 🚀 Ready to Try?

```bash
# 1. Edit Markdown
code src/content/test/test-class-01.md

# 2. Publish
cd scripts
export NOTION_API_KEY="ntn_YOUR_KEY"
node publish-to-notion.js test 1

# 3. Update subjects.js with Page ID

# 4. Refresh app and enjoy!
```

**Now you have a complete Markdown → Notion → App workflow!** 🎉
