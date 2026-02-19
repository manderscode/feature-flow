import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  features: defineTable({
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
    score: v.number(),
  }),

  tasks: defineTable({
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
  }),
});
