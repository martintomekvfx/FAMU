# 🚀 Deployment Instructions for FAMU Repository

Your famu-notes app is configured to deploy from the existing **FAMU** GitHub repository.

## ✅ Configuration Complete

I've updated your app with:
- ✅ Base path set to `/FAMU/`
- ✅ GitHub Actions workflow in `.github/workflows/deploy.yml`
- ✅ Build tested and working

## 📤 Deploy Steps

### Step 1: Commit and Push Your Changes

```bash
cd "/Users/martintomek/Library/Mobile Documents/com~apple~CloudDocs/FAMU/FAMU"

# Check what's changed
git status

# Add all files
git add .

# Commit
git commit -m "Add React notes app with GitHub Pages deployment"

# Push to GitHub
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub: **https://github.com/YOUR-USERNAME/FAMU**
2. Click **Settings** (top navigation)
3. Click **Pages** (left sidebar)
4. Under **Source**, select: **GitHub Actions**
5. Done! ✅

### Step 3: Wait for Deployment

1. Go to **Actions** tab in your GitHub repository
2. You'll see "Deploy to GitHub Pages" workflow running
3. Wait for the green ✓ checkmark (~2-3 minutes)
4. Your site will be live at: **`https://YOUR-USERNAME.github.io/FAMU/`**

## 🔄 Future Updates

Whenever you add new notes or make changes:

```bash
cd "/Users/martintomek/Library/Mobile Documents/com~apple~CloudDocs/FAMU/FAMU"

# Make your changes (edit files, add notes, etc.)

# Commit and push
git add .
git commit -m "Add class X notes"
git push origin main
```

GitHub Actions will automatically:
- Build your app
- Deploy to GitHub Pages
- Update your live site in ~2 minutes

## 📍 Your Site URL

Once deployed, your notes will be available at:
```
https://YOUR-USERNAME.github.io/FAMU/
```

## 🎯 What Happens on Push

The workflow (`.github/workflows/deploy.yml`) will:
1. Check out your code
2. Install Node.js
3. Go to `semeter_one/famu-notes/`
4. Run `npm ci` (install dependencies)
5. Run `npm run build` (create production build)
6. Deploy the `dist` folder to GitHub Pages

## 📁 Repository Structure

```
FAMU/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deployment workflow
├── semeter_one/
│   ├── famu-notes/             # React app
│   │   ├── src/                # Source code
│   │   ├── dist/               # Build output (auto-generated)
│   │   └── package.json
│   ├── html_files/             # Original HTML notes
│   └── markdown_files/         # Markdown notes
└── README.md
```

## 🆘 Troubleshooting

### Site shows 404
- Verify Settings → Pages is set to "GitHub Actions"
- Wait 2-3 minutes after first push
- Check Actions tab for build errors

### Build fails
```bash
# Test build locally first
cd semeter_one/famu-notes
npm run build

# If errors, fix them and try again
```

### CSS not loading
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check that `base: '/FAMU/'` is correct in `vite.config.js`

### Changes not appearing
- Check Actions tab - wait for green ✓
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- May take 2-3 minutes after successful deployment

## 📱 Share Your Notes

Share this link with classmates:
```
https://YOUR-USERNAME.github.io/FAMU/
```

## 🎓 Benefits

✅ **Automatic deployment** - Push and forget  
✅ **Version controlled** - All changes tracked  
✅ **Free hosting** - GitHub Pages is free  
✅ **Always available** - Access from anywhere  
✅ **Easy updates** - Just push to GitHub  

---

**Ready to deploy? Just run the commands in Step 1! 🚀**
