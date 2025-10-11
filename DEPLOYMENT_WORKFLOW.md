# 🚀 FAMU Notes - Deployment Workflow

## ✅ WORKING DEPLOYMENT METHOD

Your FAMU Notes app is successfully deployed at:
## **https://martintomekvfx.github.io/FAMU/**

---

## 📋 Complete Workflow for Future Updates

### 🔧 One-Time Setup (DONE ✅)

1. **Install gh-pages package:**
   ```bash
   cd semeter_one/famu-notes
   npm install -D gh-pages
   ```

2. **Configure package.json with deploy script:**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Configure vite.config.js:**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/FAMU/',
   })
   ```

4. **Configure App.jsx router:**
   ```javascript
   <Router basename="/FAMU">
   ```

5. **GitHub Pages Settings:**
   - Go to: https://github.com/martintomekvfx/FAMU/settings/pages
   - Source: **"Deploy from a branch"**
   - Branch: **"gh-pages"** and **"/ (root)"**

---

## 🔄 Daily Workflow - Adding New Notes

### Step 1: Add Notes Content
```bash
cd "/Users/martintomek/Library/Mobile Documents/com~apple~CloudDocs/FAMU/FAMU/semeter_one/famu-notes"
```

1. **Add class to subjects.js:**
   ```javascript
   // src/data/subjects.js
   {
     id: 3,
     date: '15. 10.',
     lecturer: 'Teacher Name',
     title: 'Class Topic',
   }
   ```

2. **Create content file:**
   ```javascript
   // src/content/[subject]/class-XX.jsx
   function ClassXXContent() {
     return (
       <>
         <h1>📚 Class XX - Title</h1>
         <h2>Date - Teacher</h2>
         <p>Your notes here...</p>
       </>
     );
   }
   export default ClassXXContent;
   ```

3. **Register in ClassPage.jsx:**
   ```javascript
   import ClassXXContent from '../content/[subject]/class-XX';
   
   const contentMap = {
     '[subject-id]-XX': ClassXXContent,
     // ... existing
   };
   ```

### Step 2: Test Locally
```bash
npm run dev
```
Open: http://localhost:5173

### Step 3: Deploy to Live Site
```bash
npm run deploy
```

**That's it!** Your changes will be live at https://martintomekvfx.github.io/FAMU/ in 30-60 seconds!

---

## 🎯 Quick Commands Reference

| Action | Command |
|--------|---------|
| **Start development** | `npm run dev` |
| **Test build** | `npm run build` |
| **Deploy to live site** | `npm run deploy` |
| **Add new notes** | Edit files → `npm run deploy` |

---

## 📁 Project Structure

```
FAMU/
├── semeter_one/
│   └── famu-notes/              # React app
│       ├── src/
│       │   ├── content/         # Your notes
│       │   │   ├── ddf/        # DDF subject
│       │   │   ├── av/         # AV subject  
│       │   │   ├── ai/         # AI subject
│       │   │   └── general/    # General notes
│       │   ├── data/
│       │   │   └── subjects.js # Subject definitions
│       │   └── pages/          # React pages
│       ├── package.json        # Dependencies
│       └── vite.config.js      # Build config
└── token.md                    # GitHub token (gitignored)
```

---

## 🔑 Authentication Setup

Your GitHub token is stored in `semeter_one/token.md` and automatically used by git.

**Token expires:** Check GitHub settings if deployment stops working.

**Renew token:** https://github.com/settings/tokens

---

## 🎨 Current Subjects

1. 🔵 **DDF** - Documentary Film History (Blue) - 12 classes
2. 🟣 **AV** - Audiovisual Studies (Purple) - 1 class
3. 🟢 **AI** - Artificial Intelligence (Green) - 1 class  
4. 🔴 **General** - Important Info (Red) - 1 class

---

## 🆘 Troubleshooting

### Site not updating?
```bash
# Force deploy
npm run build
npm run deploy
```

### Build errors?
```bash
# Check for errors
npm run build
# Fix errors, then deploy
npm run deploy
```

### Authentication issues?
- Check if token expired: https://github.com/settings/tokens
- Update `semeter_one/token.md` with new token

### 404 errors?
- Wait 1-2 minutes after deployment
- Hard refresh: Cmd+Shift+R

---

## 📱 Usage Tips

### For studying:
- Bookmark: https://martintomekvfx.github.io/FAMU/
- Works on phone, tablet, computer
- Available offline after first load

### For sharing:
- Send link to classmates
- All notes are public and accessible

### For organization:
- Add notes after each class
- Use consistent formatting
- Update important dates in "General" section

---

## 🎓 Success Metrics

✅ **Live site:** https://martintomekvfx.github.io/FAMU/  
✅ **Automatic deployment:** `npm run deploy`  
✅ **Mobile responsive:** Works on all devices  
✅ **Fast loading:** Optimized build  
✅ **Easy maintenance:** Simple workflow  
✅ **Version controlled:** All changes tracked  
✅ **Free hosting:** GitHub Pages  

---

## 🔄 Future Semester

To add new semester:
1. Create new subjects in `subjects.js`
2. Create new content folders
3. Deploy as usual
4. Archive old semester if needed

---

## 🎉 Congratulations!

You now have a **professional, automated workflow** for maintaining your university notes online!

**Next time you want to add notes:**
1. Edit files
2. Run `npm run deploy`  
3. Done! ✨

---

**Live site:** https://martintomekvfx.github.io/FAMU/  
**Last updated:** October 10, 2025  
**Status:** ✅ WORKING PERFECTLY
