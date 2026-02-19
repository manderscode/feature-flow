import { mutation } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

// Helper function to calculate feature score
function calcScore(impact: number, confidence: number, alignment: number, effort: number): number {
  if (effort === 0) return 0;
  return Math.round(((impact * confidence * alignment) / effort) * 10) / 10;
}

// Mutation: Seed initial data
export const seedData = mutation({
  handler: async (ctx) => {
    // Check if data already exists
    const existingFeatures = await ctx.db.query("features").collect();
    if (existingFeatures.length > 0) {
      return { message: "Data already seeded" };
    }

    // Seed features
    const features = [
      {
        title: "AI-powered email composer",
        description: "Use LLMs to draft replies based on context",
        impact: 5,
        effort: 4,
        confidence: 4,
        alignment: 5,
        status: "in-progress" as const,
        score: calcScore(5, 4, 5, 4),
      },
      {
        title: "Team inbox sharing",
        description: "Allow multiple users to manage a shared inbox",
        impact: 4,
        effort: 3,
        confidence: 5,
        alignment: 4,
        status: "prioritized" as const,
        score: calcScore(4, 5, 4, 3),
      },
      {
        title: "Email scheduling",
        description: "Schedule emails to be sent at a later time",
        impact: 3,
        effort: 2,
        confidence: 5,
        alignment: 3,
        status: "backlog" as const,
        score: calcScore(3, 5, 3, 2),
      },
      {
        title: "Analytics dashboard",
        description: "Track open rates, response times, and team performance",
        impact: 4,
        effort: 5,
        confidence: 3,
        alignment: 4,
        status: "backlog" as const,
        score: calcScore(4, 3, 4, 5),
      },
      {
        title: "Mobile push notifications",
        description: "Real-time alerts for priority emails",
        impact: 3,
        effort: 3,
        confidence: 4,
        alignment: 2,
        status: "backlog" as const,
        score: calcScore(3, 4, 2, 3),
      },
      {
        title: "Template library",
        description: "Pre-built email templates for common scenarios",
        impact: 4,
        effort: 1,
        confidence: 5,
        alignment: 3,
        status: "prioritized" as const,
        score: calcScore(4, 5, 3, 1),
      },
      {
        title: "Two-factor authentication",
        description: "Enhanced security for user accounts",
        impact: 2,
        effort: 2,
        confidence: 5,
        alignment: 5,
        status: "released" as const,
        score: calcScore(2, 5, 5, 2),
      },
    ];

    const featureIds: Id<"features">[] = [];
    for (const feature of features) {
      const id = await ctx.db.insert("features", feature);
      featureIds.push(id);
    }

    // Seed tasks (using the feature IDs we just created)
    const tasks = [
      {
        title: "Design prompt engineering flow",
        description: "",
        assignee: "Alex",
        featureId: featureIds[0], // f1 -> first feature
        priority: "high" as const,
        dueDate: "2026-03-01",
        column: "in-progress" as const,
      },
      {
        title: "Build LLM API integration",
        description: "",
        assignee: "Jordan",
        featureId: featureIds[0], // f1 -> first feature
        priority: "high" as const,
        dueDate: "2026-03-05",
        column: "todo" as const,
      },
      {
        title: "Shared inbox data model",
        description: "",
        assignee: "Sam",
        featureId: featureIds[1], // f2 -> second feature
        priority: "medium" as const,
        dueDate: null,
        column: "in-review" as const,
      },
      {
        title: "Inbox permission controls",
        description: "",
        assignee: "Taylor",
        featureId: featureIds[1], // f2 -> second feature
        priority: "medium" as const,
        dueDate: "2026-03-10",
        column: "todo" as const,
      },
      {
        title: "Template CRUD endpoints",
        description: "",
        assignee: "Casey",
        featureId: featureIds[5], // f6 -> sixth feature
        priority: "low" as const,
        dueDate: null,
        column: "backlog" as const,
      },
      {
        title: "Email send scheduling worker",
        description: "",
        assignee: "Alex",
        featureId: featureIds[2], // f3 -> third feature
        priority: "low" as const,
        dueDate: null,
        column: "backlog" as const,
      },
      {
        title: "Response editor UI polish",
        description: "",
        assignee: "Jordan",
        featureId: featureIds[0], // f1 -> first feature
        priority: "high" as const,
        dueDate: "2026-02-28",
        column: "done" as const,
      },
    ];

    for (const task of tasks) {
      await ctx.db.insert("tasks", task);
    }

    return { message: "Data seeded successfully", featuresCount: features.length, tasksCount: tasks.length };
  },
});
