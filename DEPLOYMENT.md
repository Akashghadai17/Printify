# StudentPrint - Deployment Guide

## Quick Deploy with ngrok (Temporary)

1. Install ngrok: https://ngrok.com/download
2. Run your server: `node server.js`
3. In another terminal: `ngrok http 3000`
4. Share the ngrok URL (e.g., https://abc123.ngrok.io)

**Note**: ngrok links expire when you close the terminal.

---

## Production Deploy (Permanent)

### Step 1: Setup MongoDB Atlas (Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account → Create free cluster
3. Create database user (username/password)
4. Whitelist all IPs: Network Access → Add IP → 0.0.0.0/0
5. Get connection string: Connect → Connect your application
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/studentprint`

### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/studentprint.git
git push -u origin main
```

### Step 3: Deploy to Render
1. Go to https://render.com → Sign up
2. New + → Web Service
3. Connect GitHub repo
4. Settings:
   - **Name**: studentprint
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Environment Variables:
   - `MONGO_URI` = your MongoDB Atlas connection string
6. Click "Create Web Service"
7. Wait 2-3 minutes for deployment
8. Your site: `https://studentprint.onrender.com`

---

## Admin Access
- URL: `https://your-site.com/admin-login`
- Username: `admin`
- Password: `admin@123`

**Change credentials in server.js before deploying!**

---

## Local Development
```bash
npm install
node server.js
```
Visit: http://localhost:3000
