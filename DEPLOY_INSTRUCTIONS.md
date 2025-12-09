# 🚀 Deployment Instructions for GitHub Pages

## Your Site URL
https://messaoudimaher.github.io/Trip-planne-V2/

## ✅ What Was Fixed
- Updated `vite.config.ts` with correct base path: `/Trip-planne-V2/`
- Added GitHub Actions workflow for automatic deployment
- Added proper `.gitignore` file

## 📦 Deploy Your Updated App

### Option 1: Automatic Deployment (Recommended)

1. **Enable GitHub Pages in your repository:**
   - Go to: https://github.com/messaoudimaher/Trip-planne-V2/settings/pages
   - Under "Build and deployment"
   - Source: Select **"GitHub Actions"**
   - Click Save

2. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Fix: Configure Vite base path and add deployment workflow"
   git push origin main
   ```

3. **Wait for deployment:**
   - Go to: https://github.com/messaoudimaher/Trip-planne-V2/actions
   - Watch the "Deploy to GitHub Pages" workflow run
   - Once complete (green checkmark), your site will be live!

4. **Visit your site:**
   - https://messaoudimaher.github.io/Trip-planne-V2/

---

### Option 2: Manual Build & Deploy

If you prefer manual deployment:

1. **Build the project locally:**
   ```bash
   npm run build
   ```

2. **Install gh-pages (if not installed):**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to `package.json`:**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

---

## 🔍 Troubleshooting

### Site shows blank page?
- Clear browser cache (Ctrl + Shift + R)
- Check GitHub Actions workflow completed successfully
- Verify GitHub Pages is enabled and set to "GitHub Actions"

### GitHub Actions failing?
- Check you have Actions enabled in repository settings
- Verify permissions are set correctly (pages: write, id-token: write)

### Still not working?
1. Check the browser console (F12) for errors
2. Verify the build completed: check if `dist` folder was created locally
3. Make sure your branch is `main` or update the workflow to use your default branch

---

## 📝 Important Notes

- **Build time:** GitHub Actions takes 2-5 minutes to build and deploy
- **Cache:** After deployment, hard refresh your browser (Ctrl + F5)
- **Updates:** Any push to `main` branch will automatically trigger redeployment
- **Firebase & API Keys:** Remember to configure your Firebase and Gemini API keys in the app settings

---

## 🎉 Next Steps

Once deployed, your Trip Planner app will be live at:
**https://messaoudimaher.github.io/Trip-planne-V2/**

Features available:
- ✅ 7-day Istanbul itinerary (Dec 17-23, 2025)
- ✅ Paris trip
- ✅ Trabzon trip
- ✅ Create custom trips
- ✅ Budget tracking
- ✅ Interactive maps
- ✅ AI chat assistant (with Gemini API key)
- ✅ Firebase cloud sync (with Firebase config)

Enjoy your trip planning! 🌍✈️

