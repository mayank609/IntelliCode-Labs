# Vercel Deployment Guide

## Pre-deployment Checklist

- ✅ Build succeeds locally: `npm run build`
- ✅ No TypeScript errors: `npm run type-check`
- ✅ Environment variables configured (if needed)
- ✅ .gitignore created
- ✅ vercel.json configured
- ✅ Node version specified in .nvmrc

## Deployment Steps

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from project directory
vercel

# For production deployment
vercel --prod
```

### Option 2: Using GitHub Integration (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select "Import Git Repository"
5. Choose your GitHub repository
6. Framework: Auto-detect (Vite)
7. Build Command: `npm run build` (auto-filled)
8. Output Directory: `dist` (auto-filled)
9. Click "Deploy"

### Option 3: Using Vercel Dashboard

1. Visit [vercel.com/new](https://vercel.com/new)
2. Create a new project
3. Connect GitHub/GitLab/Bitbucket account
4. Select the repository
5. Configure and deploy

## Post-deployment

- Verify build in Vercel Dashboard
- Check production URL
- Test all routes work correctly (SPA routing is configured)
- Monitor performance in Vercel Analytics

## Environment Variables

If you need environment variables:

1. Go to Project Settings → Environment Variables
2. Add variables for different environments (Production, Preview, Development)
3. Redeploy for changes to take effect

## Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records according to Vercel's instructions

## Performance Optimization

Your build is configured with:
- ✅ Asset caching (31536000 seconds = 1 year)
- ✅ Code splitting (vendor bundles)
- ✅ Minification with Terser
- ✅ SPA routing rewrites
- ✅ No source maps in production

## Troubleshooting

### Build Fails
- Check `npm run build` locally
- Verify all TypeScript types are correct
- Check for missing dependencies

### Routes Not Working
- vercel.json has rewrites configured for SPA routing
- All routes will serve index.html

### Performance Issues
- Check bundle size: `npm run build` shows sizes
- Monitor in Vercel Analytics dashboard
