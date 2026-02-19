# FeatureFlow MVP

A lightweight feature prioritization tool for small teams, built with Next.js and Convex.

🌐 **Live Demo:** [feature-flow-eight.vercel.app](https://feature-flow-eight.vercel.app)

## Features

- **Feature Prioritization Matrix**: Visualize features by impact vs effort
- **Feature Scoring**: Automatic scoring based on impact, confidence, alignment, and effort
- **Kanban Board**: Track task execution with drag-and-drop functionality
- **Real-time Sync**: Powered by Convex for instant updates across all users

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Backend:** Convex (real-time database & functions)
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Convex account (free tier available)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd feature-flow-mvp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Convex:**
   ```bash
   npx convex dev
   ```
   This will:
   - Create a Convex account (if needed)
   - Generate the Convex types
   - Start the local Convex dev server

4. **Set up environment variables:**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_CONVEX_URL=http://127.0.0.1:3210
   ```

5. **Start the Next.js dev server:**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with ConvexProvider
│   └── page.tsx           # Main page
├── components/             # React components
│   ├── convex-provider.tsx # Convex client provider
│   ├── feature-matrix.tsx # Impact vs Effort visualization
│   ├── feature-table.tsx   # Feature list table
│   ├── kanban-board.tsx   # Task board with drag-and-drop
│   ├── add-feature-dialog.tsx # Add new feature dialog
│   ├── add-task-dialog.tsx   # Add new task dialog
│   └── ui/                # UI component library
├── convex/                # Convex backend
│   ├── schema.ts         # Database schema
│   ├── features.ts       # Feature queries/mutations
│   ├── tasks.ts          # Task queries/mutations
│   └── seed.ts           # Seed data function
└── lib/                   # Utilities
    └── store.ts          # Type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes Convex codegen)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run convex:codegen` - Generate Convex types
- `npm run convex:dev` - Start Convex dev server

## Deployment

### Deploy to Vercel

1. **Deploy Convex backend:**
   ```bash
   npx convex deploy
   ```
   Copy the deployment URL (e.g., `https://your-deployment.convex.cloud`)

2. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Add environment variables:
     - **Name:** `NEXT_PUBLIC_CONVEX_URL`
     - **Value:** Your Convex deployment URL from step 1
     - **Name:** `CONVEX_DEPLOY_KEY` (for production builds)
     - **Value:** Your Convex production deploy key
   - Deploy!

The build process will automatically:
- Generate Convex types (`convex codegen`)
- Build the Next.js application

**Live Site:** [feature-flow-eight.vercel.app](https://feature-flow-eight.vercel.app)

## Environment Variables

### Local Development
```env
NEXT_PUBLIC_CONVEX_URL=http://127.0.0.1:3210
```

### Production (Vercel)
```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOY_KEY=your-production-deploy-key
```

## Features Overview

### Feature Prioritization
- Add features with impact, effort, confidence, and alignment scores
- Automatic priority score calculation: `(impact × confidence × alignment) / effort`
- Visual matrix showing features plotted by impact vs effort
- Status tracking: Backlog, Prioritized, In Progress, Released

### Task Management
- Create tasks linked to features
- Drag-and-drop Kanban board with columns: Backlog, To Do, In Progress, In Review, Done
- Filter by assignee and priority
- Due date tracking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
