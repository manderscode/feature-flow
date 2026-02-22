"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { toast } from "sonner"
import { api } from "@/convex/_generated/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import type { FeatureStatus } from "@/lib/store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AddFeatureDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const createFeature = useMutation(api.features.create)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [impact, setImpact] = useState(3)
  const [effort, setEffort] = useState(3)
  const [confidence, setConfidence] = useState(3)
  const [alignment, setAlignment] = useState(3)
  const [status, setStatus] = useState<FeatureStatus>("backlog")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || isSubmitting) return
    
    setIsSubmitting(true)
    try {
      await createFeature({
        title: title.trim(),
        description,
        impact,
        effort,
        confidence,
        alignment,
        status,
      })
      setTitle("")
      setDescription("")
      setImpact(3)
      setEffort(3)
      setConfidence(3)
      setAlignment(3)
      setStatus("backlog")
      onClose()
      toast.success("Feature added")
    } catch (error) {
      console.error("Failed to create feature:", error)
      toast.error("Failed to add feature. Check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const sliders = [
    { label: "Impact", value: impact, onChange: setImpact },
    { label: "Effort", value: effort, onChange: setEffort },
    { label: "Confidence", value: confidence, onChange: setConfidence },
    { label: "Strategic Alignment", value: alignment, onChange: setAlignment },
  ]

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Feature Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="feat-title">Title</Label>
            <Input id="feat-title" placeholder="Feature name" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="feat-desc">Description</Label>
            <Textarea id="feat-desc" placeholder="Optional description" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          {sliders.map((s) => (
            <div key={s.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label>{s.label}</Label>
                <span className="text-sm font-medium text-primary tabular-nums">{s.value}</span>
              </div>
              <Slider min={1} max={5} step={1} value={[s.value]} onValueChange={([v]) => s.onChange(v)} />
            </div>
          ))}
          <div className="flex flex-col gap-1.5">
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as FeatureStatus)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="backlog">Backlog</SelectItem>
                <SelectItem value="prioritized">Prioritized</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="released">Released</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>Add Feature</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
