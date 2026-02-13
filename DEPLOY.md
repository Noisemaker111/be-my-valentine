# 🚀 Deployment Guide

## Quick Deploy (Just Click Buttons!)

### Step 1: Push to GitHub ✅

Already done! Your code is committed.

### Step 2: Deploy Backend (Convex)

1. Go to [Convex Dashboard](https://dashboard.convex.dev)
2. If you haven't created a project yet:
   - Click "New Project"
   - Name it "be-my-valentine"
   - Choose a region close to you
3. Click your project name
4. Click **"Deploy"** in the top right
5. Click **"Production"**
6. Done! Copy the URL shown (you'll need it for Vercel)

### Step 3: Get Deploy Key

1. In Convex Dashboard, click **Settings** (left sidebar)
2. Click **Project Settings**
3. Click **"Generate Production Deploy Key"**
4. Copy the key (it starts with `prod:`)

### Step 4: Deploy Frontend (Vercel)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Already set in vercel.json
4. Click **Environment Variables**
5. Add this variable:
   - **Name**: `CONVEX_DEPLOY_KEY`
   - **Value**: Paste your key from Step 3
   - **Environment**: Check only **Production**
6. Click **Deploy**
7. Wait 2-3 minutes...
8. 🎉 **DONE!** Your site is live!

### Step 5: Test It

1. Open the URL Vercel gives you
2. You should see the login page
3. Sign up with any email/password
4. Enjoy your Valentine's surprise! ❤️

---

## Troubleshooting

### Build fails?
- Make sure `CONVEX_DEPLOY_KEY` is set correctly
- Check that you've deployed Convex first (Step 2)

### Photos not showing?
- Make sure photos are in `/public/ourpics/` folder
- Vercel automatically includes the `public` folder

### Can't sign up?
- Check that Convex is deployed (green checkmark in dashboard)
- Check Vercel logs for errors

---

## Making Updates

Just push to GitHub:
```bash
git add .
git commit -m "My update"
git push
```

Vercel will automatically redeploy!

---

## Custom Domain (Optional)

1. In Vercel, go to your project → Settings → Domains
2. Add your domain
3. Follow DNS instructions
4. Update Convex auth config if using custom domain
