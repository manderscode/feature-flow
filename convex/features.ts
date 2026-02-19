import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Helper function to calculate feature score
function calcScore(impact: number, confidence: number, alignment: number, effort: number): number {
  if (effort === 0) return 0;
  return Math.round(((impact * confidence * alignment) / effort) * 10) / 10;
}

// Query: Get all features
export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("features").order("desc").collect();
  },
});

// Query: Get a single feature by ID
export const get = query({
  args: { id: v.id("features") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Mutation: Create a new feature
export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    impact: v.number(),
    effort: v.number(),
    confidence: v.number(),
    alignment: v.number(),
    status: v.union(
      v.literal("backlog"),
      v.literal("prioritized"),
      v.literal("in-progress"),
      v.literal("released")
    ),
  },
  handler: async (ctx, args) => {
    const score = calcScore(args.impact, args.confidence, args.alignment, args.effort);
    return await ctx.db.insert("features", {
      ...args,
      score,
    });
  },
});

// Mutation: Update a feature
export const update = mutation({
  args: {
    id: v.id("features"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    impact: v.optional(v.number()),
    effort: v.optional(v.number()),
    confidence: v.optional(v.number()),
    alignment: v.optional(v.number()),
    status: v.optional(
      v.union(
        v.literal("backlog"),
        v.literal("prioritized"),
        v.literal("in-progress"),
        v.literal("released")
      )
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error("Feature not found");
    }

    // Recalculate score if any scoring fields changed
    const impact = updates.impact ?? existing.impact;
    const effort = updates.effort ?? existing.effort;
    const confidence = updates.confidence ?? existing.confidence;
    const alignment = updates.alignment ?? existing.alignment;
    const score = calcScore(impact, confidence, alignment, effort);

    await ctx.db.patch(id, {
      ...updates,
      score,
    });
  },
});

// Mutation: Delete a feature
export const remove = mutation({
  args: { id: v.id("features") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
