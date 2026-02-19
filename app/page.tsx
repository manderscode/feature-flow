"use client"

import { useState, useEffect } from "react"
import { Layers, KanbanSquare } from "lucide-react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FeatureTable } from "@/components/feature-table"
import { FeatureMatrix } from "@/components/feature-matrix"
import { KanbanBoard } from "@/components/kanban-board"
import { AddFeatureDialog } from "@/components/add-feature-dialog"
import { AddTaskDialog } from "@/components/add-task-dialog"
import type { Id } from "@/convex/_generated/dataModel"
import type { KanbanColumn } from "@/lib/store"

export default function FeatureFlowPage() {
  const features = useQuery(api.features.list) ?? []
  const tasks = useQuery(api.tasks.list) ?? []
  const seedData = useMutation(api.seed.seedData)
  const [showFeatureDialog, setShowFeatureDialog] = useState(false)
  const [showTaskDialog, setShowTaskDialog] = useState(false)

  // Seed data on first load if no features exist
  useEffect(() => {
    if (features.length === 0 && tasks.length === 0) {
      seedData().catch(console.error)
    }
  }, [features.length, tasks.length, seedData])

  function moveTask(taskId: Id<"tasks">, column: KanbanColumn) {
    // This will be handled by the mutation in the component
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-primary flex items-center justify-center">
              <Layers className="size-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground text-lg tracking-tight">FeatureFlow</span>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">
            Lightweight prioritization for small teams
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <Tabs defaultValue="features" className="flex flex-col gap-6">
          <TabsList className="w-fit">
            <TabsTrigger value="features" className="gap-1.5">
              <Layers className="size-4" />
              Features
            </TabsTrigger>
            <TabsTrigger value="board" className="gap-1.5">
              <KanbanSquare className="size-4" />
              Task Board
            </TabsTrigger>
          </TabsList>

          <TabsContent value="features">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
              <FeatureTable features={features} onAdd={() => setShowFeatureDialog(true)} />
              <FeatureMatrix features={features} />
            </div>
          </TabsContent>

          <TabsContent value="board">
            <KanbanBoard
              tasks={tasks}
              features={features}
              onMove={moveTask}
              onAdd={() => setShowTaskDialog(true)}
            />
          </TabsContent>
        </Tabs>
      </main>

      <AddFeatureDialog open={showFeatureDialog} onClose={() => setShowFeatureDialog(false)} />
      <AddTaskDialog open={showTaskDialog} onClose={() => setShowTaskDialog(false)} features={features} />
    </div>
  )
}
