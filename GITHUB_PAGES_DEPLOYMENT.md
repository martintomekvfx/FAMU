# GitHub Pages Deployment Guide

## Overview
This repository uses **GitHub Actions** to automatically build and deploy the React app to GitHub Pages.

---

## Critical Information

### ✅ Correct Branch: `main`
- **Source branch:** `main` (where you commit code changes)
- **Deployment branch:** `gh-pages` (automatically managed by GitHub Actions)
- **DO NOT** manually commit to `gh-pages` branch

### 🌐 Live Site URL
**https://martintomekvfx.github.io/FAMU/**

### 📁 Project Location
The React app is located in: `semeter_one/famu-notes/`

---

## Required Files (Must be committed to git)

### Core Build Files
```
semeter_one/famu-notes/
├── index.html              ✅ REQUIRED - Entry point
├── package.json            ✅ REQUIRED - Dependencies
├── package-lock.json       ✅ REQUIRED - Lock file for npm ci
├── vite.config.js          ✅ REQUIRED - Build configuration
├── tailwind.config.js      ✅ REQUIRED - Tailwind CSS config
├── postcss.config.js       ✅ REQUIRED - PostCSS config
└── .github/
    └── workflows/
        └── deploy.yml      ✅ REQUIRED - GitHub Actions workflow
```

### Source Code (Must be committed)
```
semeter_one/famu-notes/
├── src/                    ✅ REQUIRED - All React components
│   ├── main.jsx           
│   ├── App.jsx            
│   ├── pages/             
│   ├── components/        
│   ├── content/           
│   └── ...
└── public/                 ✅ REQUIRED - Static assets
    ├── projects/          
    ├── documents/         
    └── ...
```

---

## Deployment Workflow

### Automatic Deployment (Recommended)
Every push to `main` branch triggers automatic deployment:

1. **Make changes locally** in `semeter_one/famu-notes/`
2. **Commit and push to main:**
   ```bash
   cd /path/to/FAMU
   git add semeter_one/famu-notes/
   git commit -m "Your commit message"
   git push origin main
   ```
3. **GitHub Actions automatically:**
   - Checks out the code
   - Installs dependencies with `npm ci`
   - Builds the app with `npm run build`
   - Deploys `dist/` folder to `gh-pages` branch
4. **Site updates in 2-3 minutes** at https://martintomekvfx.github.io/FAMU/

### Monitor Deployment Status
Check build status: **https://github.com/martintomekvfx/FAMU/actions**
- ✅ Green checkmark = Successful deployment
- ❌ Red X = Build failed (check logs)

---

## Common Issues & Solutions

### Issue 1: "Could not resolve entry module index.html"
**Problem:** `index.html` is not committed to git

**Solution:**
```bash
cd semeter_one/famu-notes/
git add index.html
git commit -m "Add index.html"
git push
```

### Issue 2: "npm ci can only install with package-lock.json"
**Problem:** `package-lock.json` is not committed to git

**Solution:**
```bash
cd semeter_one/famu-notes/
git add package-lock.json package.json
git commit -m "Add package files"
git push
```

### Issue 3: GitHub Actions not running
**Problem:** Workflow file is not committed or in wrong location

**Solution:**
```bash
cd /path/to/FAMU
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions workflow"
git push
```

### Issue 4: Changes not showing on live site
**Solutions:**
1. Wait 2-3 minutes for deployment to complete
2. Check GitHub Actions: https://github.com/martintomekvfx/FAMU/actions
3. Hard refresh browser: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
4. Clear browser cache

### Issue 5: Git index lock error
**Problem:** `fatal: Unable to create .git/index.lock`

**Solution:**
```bash
rm -f .git/index.lock
```

---

## Manual Deployment (If needed)

If automatic deployment fails, you can manually trigger it:

```bash
cd /path/to/FAMU
git push origin main
