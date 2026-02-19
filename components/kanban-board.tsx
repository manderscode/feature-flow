"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { GripVertical, Plus, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { KanbanColumn, TaskPriority } from "@/lib/store"
import { TEAM_MEMBERS } from "@/lib/store"
import type { Id } from "../../convex/_generated/dataModel"

type Task = {
  _id: Id<"tasks">
  title: string
  description: string
  assignee: string
  featureId: Id<"features"> | null
  priority: TaskPriority
  dueDate: string | null
  column: KanbanColumn
}

type Feature = {
  _id: Id<"features">
  title: string
}

const COLUMNS: { id: KanbanColumn; label: string }[] = [
  { id: "backlog", label: "Backlog" },
  { id: "todo", label: "To Do" },
  { id: "in-progress", label: "In Progress" },
  { id: "in-review", label: "In Review" },
  { id: "done", label: "Done" },
]

const PRIORITY_STYLE: Record<TaskPriority, string> = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-chart-5/15 text-chart-5 border-chart-5/30",
  low: "bg-muted text-muted-foreground border-border",
}

export function KanbanBoard({
  tasks,
  features,
  onMove,
  onAdd,
}: {
  tasks: Task[]
  features: Feature[]
  onMove: (taskId: Id<"tasks">, column: KanbanColumn) => void
  onAdd: () => void
}) {
  const moveTask = useMutation(api.tasks.move)
  const [filterAssignee, setFilterAssignee] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [dragId, setDragId] = useState<Id<"tasks"> | null>(null)

  const filtered = tasks.filter((t) => {
    if (filterAssignee !== "all" && t.assignee !== filterAssignee) return false
    if (filterPriority !== "all" && t.priority !== filterPriority) return false
    return true
  })

  const featureMap = new Map(features.map((f) => [f._id, f.title]))

  function handleDragStart(id: Id<"tasks">) {
    setDragId(id)
  }

  async function handleDrop(col: KanbanColumn) {
    if (dragId) {
      await moveTask({ id: dragId, column: col })
      onMove(dragId, col)
      setDragId(null)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-semibold text-foreground">Task Board</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={filterAssignee} onValueChange={setFilterAssignee}>
            <SelectTrigger className="w-[130px] h-8 text-xs">
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Members</SelectItem>
              {TEAM_MEMBERS.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-[120px] h-8 text-xs">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" onClick={onAdd} className="gap-1.5 h-8">
            <Plus className="size-4" />
            Add Task
          </Button>
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-4 min-w-max">
          {COLUMNS.map((col) => {
            const colTasks = filtered.filter((t) => t.column === col.id)
            return (
              <div
                key={col.id}
                className="flex flex-col w-[260px] shrink-0"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(col.id)}
              >
                <div className="flex items-center justify-between px-2 pb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {col.label}
                  </span>
                  <span className="text-xs text-muted-foreground tabular-nums">{colTasks.length}</span>
                </div>
                <div className="flex flex-col gap-2 min-h-[120px] rounded-lg bg-secondary/50 p-2">
                  {colTasks.map((task) => (
                    <div
                      key={task._id}
                      draggable
                      onDragStart={() => handleDragStart(task._id)}
                      className="flex flex-col gap-2 rounded-md border bg-card p-3 cursor-grab active:cursor-grabbing hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <GripVertical className="size-4 shrink-0 text-muted-foreground mt-0.5" />
                        <span className="text-sm font-medium text-foreground leading-tight">{task.title}</span>
                      </div>
                      {task.featureId && featureMap.has(task.featureId) && (
                        <span className="text-[11px] text-primary truncate pl-6">
                          {featureMap.get(task.featureId)}
                        </span>
                      )}
                      <div className="flex items-center gap-2 pl-6 flex-wrap">
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${PRIORITY_STYLE[task.priority]}`}>
                          {task.priority}
                        </Badge>
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <User className="size-3" />
                          {task.assignee}
                        </span>
                        {task.dueDate && (
                          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Calendar className="size-3" />
                            {task.dueDate.slice(5)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {colTasks.length === 0 && (
                    <div className="flex items-center justify-center h-[80px] text-xs text-muted-foreground">
                      Drop tasks here
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
