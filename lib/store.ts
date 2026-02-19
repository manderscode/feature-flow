export type FeatureStatus = "backlog" | "prioritized" | "in-progress" | "released"
export type TaskPriority = "high" | "medium" | "low"
export type KanbanColumn = "backlog" | "todo" | "in-progress" | "in-review" | "done"

export interface Feature {
  id: string
  title: string
  description: string
  impact: number
  effort: number
  confidence: number
  alignment: number
  status: FeatureStatus
  score: number
}

export interface Task {
  id: string
  title: string
  description: string
  assignee: string
  featureId: string | null
  priority: TaskPriority
  dueDate: string | null
  column: KanbanColumn
}

export const TEAM_MEMBERS = ["Alex", "Jordan", "Sam", "Taylor", "Casey"]

export function calcScore(f: Pick<Feature, "impact" | "confidence" | "alignment" | "effort">) {
  if (f.effort === 0) return 0
  return Math.round(((f.impact * f.confidence * f.alignment) / f.effort) * 10) / 10
}

const SEED_FEATURES: Feature[] = [
  { id: "f1", title: "AI-powered email composer", description: "Use LLMs to draft replies based on context", impact: 5, effort: 4, confidence: 4, alignment: 5, status: "in-progress", score: 0 },
  { id: "f2", title: "Team inbox sharing", description: "Allow multiple users to manage a shared inbox", impact: 4, effort: 3, confidence: 5, alignment: 4, status: "prioritized", score: 0 },
  { id: "f3", title: "Email scheduling", description: "Schedule emails to be sent at a later time", impact: 3, effort: 2, confidence: 5, alignment: 3, status: "backlog", score: 0 },
  { id: "f4", title: "Analytics dashboard", description: "Track open rates, response times, and team performance", impact: 4, effort: 5, confidence: 3, alignment: 4, status: "backlog", score: 0 },
  { id: "f5", title: "Mobile push notifications", description: "Real-time alerts for priority emails", impact: 3, effort: 3, confidence: 4, alignment: 2, status: "backlog", score: 0 },
  { id: "f6", title: "Template library", description: "Pre-built email templates for common scenarios", impact: 4, effort: 1, confidence: 5, alignment: 3, status: "prioritized", score: 0 },
  { id: "f7", title: "Two-factor authentication", description: "Enhanced security for user accounts", impact: 2, effort: 2, confidence: 5, alignment: 5, status: "released", score: 0 },
]
SEED_FEATURES.forEach((f) => { f.score = calcScore(f) })

const SEED_TASKS: Task[] = [
  { id: "t1", title: "Design prompt engineering flow", description: "", assignee: "Alex", featureId: "f1", priority: "high", dueDate: "2026-03-01", column: "in-progress" },
  { id: "t2", title: "Build LLM API integration", description: "", assignee: "Jordan", featureId: "f1", priority: "high", dueDate: "2026-03-05", column: "todo" },
  { id: "t3", title: "Shared inbox data model", description: "", assignee: "Sam", featureId: "f2", priority: "medium", dueDate: null, column: "in-review" },
  { id: "t4", title: "Inbox permission controls", description: "", assignee: "Taylor", featureId: "f2", priority: "medium", dueDate: "2026-03-10", column: "todo" },
  { id: "t5", title: "Template CRUD endpoints", description: "", assignee: "Casey", featureId: "f6", priority: "low", dueDate: null, column: "backlog" },
  { id: "t6", title: "Email send scheduling worker", description: "", assignee: "Alex", featureId: "f3", priority: "low", dueDate: null, column: "backlog" },
  { id: "t7", title: "Response editor UI polish", description: "", assignee: "Jordan", featureId: "f1", priority: "high", dueDate: "2026-02-28", column: "done" },
]

export function getInitialFeatures(): Feature[] {
  return SEED_FEATURES.map((f) => ({ ...f }))
}

export function getInitialTasks(): Task[] {
  return SEED_TASKS.map((t) => ({ ...t }))
}
