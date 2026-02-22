import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query: Get all tasks
export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("tasks").order("desc").collect();
  },
});

// Query: Get tasks by feature ID
export const listByFeature = query({
  args: { featureId: v.id("features") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("featureId"), args.featureId))
      .collect();
  },
});

// Query: Get a single task by ID
export const get = query({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Mutation: Create a new task
export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    assignee: v.string(),
    featureId: v.union(v.string(), v.null()),
    priority: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
    dueDate: v.union(v.string(), v.null()),
    column: v.union(
      v.literal("backlog"),
      v.literal("todo"),
      v.literal("in-progress"),
      v.literal("in-review"),
      v.literal("done")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tasks", args);
  },
});

// Mutation: Update a task
export const update = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    assignee: v.optional(v.string()),
    featureId: v.optional(v.union(v.string(), v.null())),
    priority: v.optional(v.union(v.literal("high"), v.literal("medium"), v.literal("low"))),
    dueDate: v.optional(v.union(v.string(), v.null())),
    column: v.optional(
      v.union(
        v.literal("backlog"),
        v.literal("todo"),
        v.literal("in-progress"),
        v.literal("in-review"),
        v.literal("done")
      )
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

// Mutation: Move a task to a different column
export const move = mutation({
  args: {
    id: v.id("tasks"),
    column: v.union(
      v.literal("backlog"),
      v.literal("todo"),
      v.literal("in-progress"),
      v.literal("in-review"),
      v.literal("done")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { column: args.column });
  },
});

// Mutation: Delete a task
export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
