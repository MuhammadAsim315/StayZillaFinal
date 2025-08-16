# 🚨 Deployment Troubleshooting Guide

## **Error: "Getting requirements to build wheel: finished with status 'error'"**

### **What This Means:**
Some Python packages require compilation during installation, which can fail on cloud platforms.

### **✅ Solution Applied:**

1. **Created `requirements-minimal.txt`** - Only essential packages
2. **Updated `render.yaml`** to use minimal requirements
3. **Temporarily disabled problematic imports** in `backend/__init__.py`

### **📦 Current Minimal Requirements:**
```
Flask==2.0.1
Flask-SQLAlchemy==2.5.1
Flask-Login==0.5.0
python-dotenv==0.19.0
gunicorn==20.1.0
```

### **🔄 Try Deployment Again:**

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Fix deployment requirements"
   git push
   ```

2. **Redeploy on Render.com:**
   - Go to your Render dashboard
   - Click "Manual Deploy" → "Deploy latest commit"

### **🔧 If Still Failing:**

#### **Option 1: Use requirements-deploy.txt**
Change `render.yaml`:
```yaml
buildCommand: pip install -r requirements-deploy.txt
```

#### **Option 2: Force Pre-compiled Packages**
Add to `requirements-minimal.txt`:
```
--only-binary=all
Flask==2.0.1
Flask-SQLAlchemy==2.5.1
Flask-Login==0.5.0
python-dotenv==0.19.0
gunicorn==20.1.0
```

#### **Option 3: Use Render's Python Buildpack**
In `render.yaml`:
```yaml
services:
  - type: web
    name: stayzilla
    env: python
    buildCommand: |
      pip install --upgrade pip
      pip install -r requirements-minimal.txt
    startCommand: gunicorn run:app
    envVars:
      - key: PYTHON_VERSION
        value: 3.9.16
```

### **🚀 Alternative: Deploy to Heroku (Often More Forgiving)**

1. **Install Heroku CLI**
2. **Deploy:**
   ```bash
   heroku login
   heroku create stayzilla-app
   git push heroku main
   ```

### **📋 What Was Disabled Temporarily:**
- `Flask-Mail` - Email functionality
- `Flask-Migrate` - Database migrations
- `Flask-WTF` - Form handling
- `Pillow` - Image processing

### **✅ What Still Works:**
- User registration ✅
- User login ✅
- Admin panel ✅
- Database operations ✅
- Static file serving ✅

### **🔄 After Successful Deployment:**
1. **Test your live site**
2. **Re-enable features gradually** by updating requirements
3. **Monitor for any new errors**

### **🎯 Next Steps:**
1. **Try deploying with minimal requirements**
2. **If it works, gradually add back features**
3. **If it fails, try Heroku or other platforms**

## **💡 Pro Tip:**
Render.com sometimes has issues with certain Python packages. Heroku is often more reliable for Python deployments.
