# 🚀 Deploy AR Store — Step by Step

Make your AR Store accessible to anyone in the world via a public link.

---

## Step 1: Deploy Backend to Render (2 minutes)

1. Go to **https://render.com** → Click **Get Started for Free**
2. Sign up with your GitHub account
3. Click **New +** button → **Web Service**
4. Click **Build and deploy from a Git repository** → **Next**
5. Select repository: **`Sohamdebb/arstore-backend`**
6. Fill in these settings:
   - **Name:** `arstore-api`
   - **Region:** `Oregon` (or closest to you)
   - **Runtime:** `Java`
   - **Build Command:**
     ```
     cd backend && ./mvnw clean compile -DskipTests
     ```
   - **Start Command:**
     ```
     cd backend && ./mvnw spring-boot:run
     ```
7. Click **Create Web Service**
8. Wait 3-5 minutes for it to build and start
9. Once live, you'll see a URL like: `https://arstore-api-xxxx.onrender.com`
10. **Copy this URL** — you'll need it in Step 2

> ✅ Test it: Open `https://arstore-api-xxxx.onrender.com/api/products` in your browser. You should see products JSON.

---

## Step 2: Deploy Frontend to Vercel (1 minute)

1. Go to **https://vercel.com** → Click **Sign Up**
2. Sign up with your **GitHub** account
3. Click **Add New...** → **Project**
4. Find and import **`Sohamdebb/arstore-backend`**
5. Before deploying, configure:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `frontend` (click "Edit" and type `frontend`)
   - **Build Command:** `npm run build` (should be auto-detected)
6. **IMPORTANT:** Click **Environment Variables** and add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://arstore-api-xxxx.onrender.com` *(paste your Render URL from Step 1)*
7. Click **Deploy**
8. Wait 1-2 minutes
9. You'll get a URL like: **`https://arstore-xxxx.vercel.app`**

---

## Step 3: Share Your Link! 🎉

Your AR Store is now live! Share this link with anyone:
```
https://arstore-xxxx.vercel.app
```

They can:
- Browse 12 AR/VR products
- View 3D models
- Search and filter products
- Register and login
- Place orders
- Leave reviews
- (Admin only) Manage products, orders, and users

### Demo Accounts
| Role | Email | Password |
|------|-------|----------|
| 👑 Admin | `admin@arstore.com` | `admin123` |
| 👤 User | `demo@arstore.com` | `demo123` |

---

## Troubleshooting

**Backend won't start?**
- Check Render logs for errors
- Make sure you're using the correct build/start commands

**Frontend shows "Failed to fetch"?**
- Make sure `VITE_API_URL` is set correctly in Vercel
- The URL should NOT have a trailing slash
- Redeploy after changing env vars

**Want to update?**
- Just push to GitHub — Vercel auto-deploys!
- Render auto-deploys too if connected to the repo
