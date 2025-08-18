# cPanel Deployment Guide

## Prerequisites
- cPanel hosting with Node.js support
- Access to "Setup Node.js App" in cPanel

## Step 1: Build Locally
```bash
npm run build
```

## Step 2: Prepare Files for Upload
Upload these folders/files to your cPanel:

### Required Files:
```
├── .next/                  ← Build output (most important)
├── public/                 ← Static assets
├── package.json            ← Dependencies
├── next.config.mjs         ← Next.js config
└── package-lock.json       ← Lock file
```

## Step 3: cPanel Node.js Setup

1. **Login to cPanel**
2. **Find "Setup Node.js App"**
3. **Create New Application:**
   - Node.js version: 18+ (or match your local version)
   - Application mode: Production
   - Application root: Your domain or subdomain
   - Application URL: Your domain
   - Application startup file: `node_modules/.bin/next start`
   - Passenger port: Leave default

## Step 4: Install Dependencies

1. **Go to "Terminal" in cPanel**
2. **Navigate to your app directory:**
```bash
cd public_html/your-app-folder
npm install --production
```

## Step 5: Start Application

1. **In "Setup Node.js App"**
2. **Click "Restart" on your app**
3. **Check status shows "Running"**

## Troubleshooting

### If Node.js App option not available:
- Contact your hosting provider
- Ask about Node.js support
- Consider upgrading hosting plan

### If app won't start:
- Check error logs in cPanel
- Verify Node.js version compatibility
- Check file permissions

## Alternative: Static Export (Not Recommended)

If Node.js not available, you'd need to:
1. Remove server components
2. Remove dynamic metadata
3. Convert to client-side only
4. Use `next export` (loses many features)

## Recommended Hosting Alternatives

If cPanel doesn't work:
- **Netlify** (free, easy)
- **Railway** (free tier)
- **Render** (free tier)
- **DigitalOcean** (paid, professional)

## File Structure After Upload

```
public_html/
└── your-app-folder/
    ├── .next/              ← Build files
    ├── public/             ← Static assets
    ├── package.json        ← Dependencies
    ├── next.config.mjs     ← Config
    └── package-lock.json   ← Lock file
```

## Environment Variables

If you need to set environment variables:
1. Go to "Setup Node.js App"
2. Click "Environment Variables"
3. Add your BASE_URL or other variables
