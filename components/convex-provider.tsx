"use client"

import { ConvexProvider, ConvexReactClient } from 'convex/react'

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

if (!convexUrl) {
  throw new Error(
    'Missing NEXT_PUBLIC_CONVEX_URL environment variable. ' +
    'Set it in your Vercel project settings or .env.local file.'
  )
}

const convex = new ConvexReactClient(convexUrl)

export function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>
}
