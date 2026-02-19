# FeatureFlow MVP

A lightweight feature prioritization tool for small teams, built with Next.js and Convex.

## Features

- **Feature Prioritization Matrix**: Visualize features by impact vs effort
- **Feature Scoring**: Automatic scoring based on impact, confidence, alignment, and effort
- **Kanban Board**: Track task execution with drag-and-drop
- **Real-time Sync**: Powered by Convex for instant updates

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Convex account (free tier available)

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Convex:**
   ```bash
   npx convex dev
   ```
   This will:
   - Create a Convex account (if needed)
   - Generate the Convex types
   - Start the local Convex dev server

3. **Start the Next.js dev server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CONVEX_URL=http://127.0.0.1:3210
```

For production, use your Convex deployment URL:
```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

## Deployment

### Deploy to Vercel

1. **Deploy Convex backend:**
   ```bash
   npx convex deploy
   ```
   Copy the deployment URL (e.g., `https://your-deployment.convex.cloud`)

2. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Add environment variable:
     - **Name:** `NEXT_PUBLIC_CONVEX_URL`
     - **Value:** Your Convex deployment URL from step 1
   - Deploy!

The build process will automatically:
- Generate Convex types (`convex codegen`)
- Build the Next.js application

### Build Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes Convex codegen)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with ConvexProvider
│   └── page.tsx           # Main page
├── components/             # React components
│   ├── convex-provider.tsx # Convex client provider
│   ├── feature-matrix.tsx # Impact vs Effort visualization
│   ├── feature-table.tsx   # Feature list table
│   ├── kanban-board.tsx   # Task board
│   └── ui/                # UI component library
├── convex/                # Convex backend
│   ├── schema.ts         # Database schema
│   ├── features.ts       # Feature queries/mutations
│   ├── tasks.ts          # Task queries/mutations
│   └── seed.ts           # Seed data function
└── lib/                   # Utilities
    └── store.ts          # Type definitions
```

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Backend:** Convex (real-time database & functions)
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI

## License

MIT
