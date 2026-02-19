"use client"

import { useState } from "react"
import { ArrowUpDown, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { FeatureStatus } from "@/lib/store"
import type { Id } from "@/convex/_generated/dataModel"

type Feature = {
  _id: Id<"features">
  title: string
  description: string
  impact: number
  effort: number
  confidence: number
  alignment: number
  status: FeatureStatus
  score: number
}

const STATUS_LABEL: Record<FeatureStatus, string> = {
  backlog: "Backlog",
  prioritized: "Prioritized",
  "in-progress": "In Progress",
  released: "Released",
}

const STATUS_STYLE: Record<FeatureStatus, string> = {
  backlog: "bg-muted text-muted-foreground border-border",
  prioritized: "bg-chart-2/15 text-chart-2 border-chart-2/30",
  "in-progress": "bg-primary/15 text-primary border-primary/30",
  released: "bg-chart-3/15 text-chart-3 border-chart-3/30",
}

type SortKey = "score" | "impact" | "effort" | "title"

export function FeatureTable({
  features,
  onAdd,
}: {
  features: Feature[]
  onAdd: () => void
}) {
  const [sortKey, setSortKey] = useState<SortKey>("score")
  const [sortAsc, setSortAsc] = useState(false)

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc)
    else {
      setSortKey(key)
      setSortAsc(false)
    }
  }

  const sorted = [...features].sort((a, b) => {
    const dir = sortAsc ? 1 : -1
    if (sortKey === "title") return dir * a.title.localeCompare(b.title)
    return dir * ((a[sortKey] as number) - (b[sortKey] as number))
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Features</h2>
        <Button size="sm" onClick={onAdd} className="gap-1.5">
          <Plus className="size-4" />
          Add Feature
        </Button>
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>
                <button onClick={() => toggleSort("title")} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  Title <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead className="text-center">
                <button onClick={() => toggleSort("impact")} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  Impact <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead className="text-center">
                <button onClick={() => toggleSort("effort")} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  Effort <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead className="text-center">
                <button onClick={() => toggleSort("score")} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  Score <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((f) => (
              <TableRow key={f._id}>
                <TableCell className="font-medium text-foreground max-w-[240px] truncate">{f.title}</TableCell>
                <TableCell className="text-center tabular-nums">{f.impact}</TableCell>
                <TableCell className="text-center tabular-nums">{f.effort}</TableCell>
                <TableCell className="text-center">
                  <span className="font-semibold text-primary tabular-nums">{f.score}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_STYLE[f.status]}>
                    {STATUS_LABEL[f.status]}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No features yet. Add one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
