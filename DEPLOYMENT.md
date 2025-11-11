# 🚀 Vercel Deployment Guide

## Step-by-Step Vercel Deployment

### Method 1: Using Vercel Dashboard (EASIEST - RECOMMENDED)

#### Step 1: Vercel Account Create Karein
1. Go to: https://vercel.com
2. Click "Sign Up"
3. **GitHub se login karein** (recommended)
4. GitHub account connect karein

#### Step 2: New Project Import Karein
1. Vercel Dashboard pe jao: https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. "Import Git Repository" section mein:
   - Click "Import" next to your GitHub repositories
   - Search for "Aegis-Travel"
   - Click "Import"

#### Step 3: Configure Project
```
Project Name: aegis-travel
Framework Preset: Other (ya blank chhod do)
Root Directory: ./
Build Command: (leave empty - static site hai)
Output Directory: ./
```

#### Step 4: Deploy!
1. Click "Deploy"
2. Wait 30-60 seconds ⏱️
3. Done! ✅

#### Step 5: Your Live URL
```
https://aegis-travel.vercel.app
ya
https://aegis-travel-anshika01-agrawal.vercel.app
```

---

### Method 2: Using Vercel CLI (Terminal se)

#### Step 1: Login to Vercel
```bash
vercel login
```
- Enter your email
- Check email for verification
- Click the verification link

#### Step 2: Deploy
```bash
cd /workspaces/Aegis-Travel
vercel
```

**Questions during deployment:**
```
? Set up and deploy "~/Aegis-Travel"? [Y/n] → Y
? Which scope do you want to deploy to? → Select your account
? Link to existing project? [y/N] → N
? What's your project's name? → aegis-travel
? In which directory is your code located? → ./
? Want to modify these settings? [y/N] → N
```

#### Step 3: Production Deployment
```bash
vercel --prod
```

---

### Method 3: GitHub Integration (AUTO DEPLOY)

#### Setup Once:
1. Go to: https://vercel.com/dashboard
2. Import your Aegis-Travel repository (Method 1)

#### Automatic Deployments:
- **Har baar jab tum GitHub pe push karoge**
- **Automatically deploy ho jayega!** 🎉
- No manual work needed

---

## 🎯 Post-Deployment Steps

### 1. Custom Domain (Optional)
```
Vercel Dashboard → Your Project → Settings → Domains
Add: www.aegistravel.com (if you have domain)
```

### 2. Environment Variables
```
Settings → Environment Variables
Add any API keys ya secrets
```

### 3. Analytics Enable
```
Analytics tab → Enable Vercel Analytics
Free visitor tracking
```

---

## ✅ Verify Deployment

### Check These URLs:
```
Main Site: https://aegis-travel.vercel.app
Admin Dashboard: https://aegis-travel.vercel.app/admin-dashboard.html
Admin Login: https://aegis-travel.vercel.app/admin-login.html
Tourist Login: https://aegis-travel.vercel.app/tourist-login.html
```

---

## 🔧 Troubleshooting

### Problem 1: 404 Error
**Solution:** Check vercel.json routing configuration

### Problem 2: CSS Not Loading
**Solution:** Ensure all paths are relative (not absolute)

### Problem 3: Deployment Failed
**Solution:** 
```bash
vercel --debug
```

---

## 📱 Share Your Project

### After deployment, share:
```
🌐 Live Demo: https://aegis-travel.vercel.app
📂 GitHub Repo: https://github.com/anshika01-agrawal/Aegis-Travel
```

---

## 🎨 Custom Domain Setup

### If You Have a Domain:

#### Step 1: Buy Domain (Optional)
- Namecheap.com
- GoDaddy.com
- Domain.com

#### Step 2: Add to Vercel
```
Vercel → Settings → Domains → Add Domain
Enter: yourdomain.com
```

#### Step 3: Configure DNS
```
Add these records in your domain registrar:

Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 🚀 Commands Cheat Sheet

```bash
# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# List deployments
vercel ls

# Open project in browser
vercel open

# Get deployment URL
vercel --prod --yes

# Remove deployment
vercel rm aegis-travel

# Check logs
vercel logs aegis-travel
```

---

## 📊 Deployment Status

### Check Deployment:
```bash
vercel ls
```

### View Logs:
```bash
vercel logs
```

### Inspect Deployment:
```bash
vercel inspect [deployment-url]
```

---

## 🎉 Success Indicators

✅ Build successful
✅ Deployment ready
✅ URL assigned
✅ SSL certificate active (HTTPS)
✅ Auto deployments enabled

---

## 💡 Pro Tips

1. **Always use `vercel --prod` for final deployment**
2. **Test with preview URL first (`vercel` only)**
3. **Enable auto-deploy from GitHub**
4. **Add custom domain for professional look**
5. **Monitor analytics in Vercel dashboard**

---

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs
- Support: https://vercel.com/support

---

**🎊 Ab aapka project live hai! Share karo sabke saath!**
