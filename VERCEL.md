# Vercel Deployment Guide

## Prerequisites

1. Deploy your Convex backend:
   ```bash
   npx convex deploy
   ```
   This will give you a deployment URL like `https://your-deployment.convex.cloud`

2. Get your Convex Deploy Key (for production builds):
   - Go to your Convex Dashboard
   - Navigate to Settings → Deploy Keys
   - Generate a Production deploy key
   - Copy it (you'll need it for Vercel)

## Vercel Configuration

### 1. Environment Variables

In your Vercel project settings, add these environment variables:

**For Production:**
- `NEXT_PUBLIC_CONVEX_URL` = `https://your-deployment.convex.cloud` (from step 1)
- `CONVEX_DEPLOY_KEY` = Your production deploy key (from step 2)

**For Preview/Development:**
- `NEXT_PUBLIC_CONVEX_URL` = Your Convex deployment URL
- `CONVEX_DEPLOY_KEY` = Your deploy key (optional for preview builds)

### 2. Build Settings

**Option A: Use Convex Deploy Command (Recommended)**

In Vercel, override the build command to:
```
npx convex deploy --cmd 'npm run build'
```

This ensures Convex deploys and generates types before building.

**Option B: Use Standard Build Command**

The build command in `package.json` is:
```
convex codegen --once && next build
```

This will:
1. Generate Convex types (`convex codegen --once`) - requires `CONVEX_DEPLOY_KEY`
2. Build your Next.js app (`next build`)

**Important:** Make sure `CONVEX_DEPLOY_KEY` is set in Vercel environment variables, otherwise `convex codegen` will fail and the build will fail.

### 3. Alternative: Commit Generated Files (Optional)

If you prefer not to generate types during build, you can:
1. Remove `convex/_generated/` from `.gitignore`
2. Commit the generated files
3. Change build command to just `next build`

However, generating during build is the recommended approach.

## Troubleshooting

### "Cannot find module '@/convex/_generated/api'"

This happens if Convex types aren't generated during build. Make sure:
1. `CONVEX_DEPLOY_KEY` is set in Vercel
2. The build command includes `convex codegen`
3. Your Convex project is properly configured

### "Missing NEXT_PUBLIC_CONVEX_URL"

Make sure you've added `NEXT_PUBLIC_CONVEX_URL` to your Vercel environment variables.

### Build Fails on "convex codegen"

Ensure:
1. `CONVEX_DEPLOY_KEY` is set correctly
2. Your Convex project is linked (run `npx convex dev` locally first)
3. The Convex CLI is available (it's included in `node_modules`)

## Quick Checklist

- [ ] Convex backend deployed (`npx convex deploy`)
- [ ] `NEXT_PUBLIC_CONVEX_URL` set in Vercel
- [ ] `CONVEX_DEPLOY_KEY` set in Vercel (for production)
- [ ] Build command includes `convex codegen`
- [ ] Test deployment
