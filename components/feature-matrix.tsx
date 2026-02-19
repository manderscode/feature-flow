"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Id } from "@/convex/_generated/dataModel"

type Feature = {
  _id: Id<"features">
  title: string
  impact: number
  effort: number
  score: number
}

const QUADRANT_LABELS = [
  { label: "Money Pit", x: "75%", y: "75%", color: "text-destructive/40" },
  { label: "Strategic Bets", x: "75%", y: "25%", color: "text-chart-2/40" },
  { label: "Low Priority", x: "25%", y: "75%", color: "text-muted-foreground/40" },
  { label: "Quick Wins", x: "25%", y: "25%", color: "text-primary/40" },
]

export function FeatureMatrix({ features }: { features: Feature[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-foreground">Impact vs Effort Matrix</h2>
      <div className="rounded-lg border bg-card p-6">
        <div className="relative aspect-square w-full max-w-[500px] mx-auto">
          {/* Axis labels */}
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
            Effort
          </span>
          <span className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground">
            Impact
          </span>

          {/* Grid */}
          <div className="absolute inset-0 border border-border rounded-md overflow-hidden">
            {/* Crosshair lines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border" />

            {/* Quadrant labels */}
            {QUADRANT_LABELS.map((q) => (
              <span
                key={q.label}
                className={`absolute text-xs font-medium ${q.color} pointer-events-none select-none`}
                style={{ left: q.x, top: q.y, transform: "translate(-50%, -50%)" }}
              >
                {q.label}
              </span>
            ))}

            {/* Dots */}
            <TooltipProvider delayDuration={0}>
              {features.map((f) => {
                const x = ((f.effort - 1) / 4) * 100
                const y = (1 - (f.impact - 1) / 4) * 100
                return (
                  <Tooltip key={f._id}>
                    <TooltipTrigger asChild>
                      <div
                        className="absolute size-3 rounded-full bg-primary ring-2 ring-primary/30 cursor-pointer hover:scale-150 transition-transform"
                        style={{
                          left: `${5 + x * 0.9}%`,
                          top: `${5 + y * 0.9}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">
                      <p className="font-semibold">{f.title}</p>
                      <p className="text-muted-foreground">
                        Impact: {f.impact} / Effort: {f.effort} / Score: {f.score}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </TooltipProvider>
          </div>

          {/* Axis tick labels */}
          <div className="absolute -bottom-1 left-0 right-0 flex justify-between px-[5%] text-[10px] text-muted-foreground">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
          <div className="absolute -left-1 top-0 bottom-0 flex flex-col-reverse justify-between py-[5%] text-[10px] text-muted-foreground">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
