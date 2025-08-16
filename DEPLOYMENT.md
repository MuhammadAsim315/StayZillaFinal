# 🚀 StayZilla Deployment Guide

## Quick Deploy to Render.com

### 1. **Prepare Your Repository**
- Make sure all files are committed to Git
- Push to GitHub/GitLab

### 2. **Deploy to Render.com**
1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `stayzilla`
   - **Environment**: `Python 3.11`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn run:app`
5. Click "Create Web Service"

### 3. **Set Environment Variables**
In Render dashboard, go to Environment → Add:
- `SECRET_KEY`: Generate a strong secret key
- `DATABASE_URL`: Leave empty for SQLite (default)

### 4. **Your Site Will Be Live At:**
`https://your-app-name.onrender.com`

## 🔧 Production Checklist

- [ ] Set `DEBUG = False`
- [ ] Generate strong `SECRET_KEY`
- [ ] Configure database (PostgreSQL recommended for production)
- [ ] Set up domain name (optional)
- [ ] Configure SSL/HTTPS

## 📱 After Deployment

1. **Test your live site**
2. **Register a test user**
3. **Check admin panel**: `your-site.com/admin`
4. **Monitor user registrations**

## 🎯 Next Steps

1. **Deploy to Render.com**
2. **Test everything works**
3. **Share your live URL**
4. **Start collecting real user registrations!**
