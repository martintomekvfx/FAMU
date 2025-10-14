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
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

---

## Verify All Required Files Are Committed

Before deploying, run this check:

```bash
cd semeter_one/famu-notes/

# Check if key files are tracked
git ls-files | grep -E "(index.html|package.json|vite.config)"

# If any are missing, add them:
git add index.html package.json package-lock.json vite.config.js
git add src/ public/ .github/
git commit -m "Add missing files for deployment"
git push
```

---

## GitHub Actions Workflow Explanation

The workflow file: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # ← Triggers on push to main branch

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          cd semeter_one/famu-notes
          npm ci  # ← Requires package-lock.json

      - name: Build
        run: |
          cd semeter_one/famu-notes
          npm run build  # ← Requires index.html, vite.config.js

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./semeter_one/famu-notes/dist
```

---

## Quick Checklist Before Pushing

- [ ] Working directory: `semeter_one/famu-notes/`
- [ ] Branch: `main`
- [ ] Files committed:
  - [ ] `index.html`
  - [ ] `package.json` + `package-lock.json`
  - [ ] `vite.config.js`
  - [ ] All `src/` changes
  - [ ] All `public/` assets
  - [ ] `.github/workflows/deploy.yml`
- [ ] Commit message is descriptive
- [ ] Ready to push to `main` branch

---

## Testing Locally Before Deploy

Always test the build locally first:

```bash
cd semeter_one/famu-notes/

# Install dependencies
npm install

# Test dev server
npm run dev

# Test production build
npm run build
npm run preview

# If build succeeds locally, it should work on GitHub Actions
```

---

## Summary

1. **Branch to use:** `main`
2. **Commit all required files** (index.html, package files, src/, public/, .github/)
3. **Push to main:** `git push origin main`
4. **GitHub Actions automatically deploys** to https://martintomekvfx.github.io/FAMU/
5. **Wait 2-3 minutes** for deployment
6. **Verify:** Check https://github.com/martintomekvfx/FAMU/actions

---

## Repository Settings (Already configured)

**GitHub Pages is enabled with:**
- Source: Deploy from a branch
- Branch: `gh-pages` / root
- Custom domain: (none)

**Don't change these settings unless necessary!**

---

Last updated: October 14, 2025
