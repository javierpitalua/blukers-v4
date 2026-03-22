import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { pipelineStages, jobs } from "@/data/mockData";
import type { PipelineStage } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Star, GripVertical, Calendar, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Pipeline() {
  const [selectedJob, setSelectedJob] = useState("1");
  const [stages, setStages] = useState<PipelineStage[]>(pipelineStages);
  const [draggedItem, setDraggedItem] = useState<{ stageId: string; candidateId: string } | null>(null);
  const [dragOverStageId, setDragOverStageId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, stageId: string, candidateId: string) => {
    setDraggedItem({ stageId, candidateId });
    e.dataTransfer.setData("text/plain", candidateId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverStageId !== stageId) setDragOverStageId(stageId);
  };

  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setDragOverStageId(null); };

  const handleDrop = (e: React.DragEvent, targetStageId: string) => {
    e.preventDefault();
    setDragOverStageId(null);
    if (!draggedItem || draggedItem.stageId === targetStageId) { setDraggedItem(null); return; }
    setStages((prev) => {
      const newStages = prev.map((s) => ({ ...s, candidates: [...s.candidates] }));
      const si = newStages.findIndex((s) => s.id === draggedItem.stageId);
      const ti = newStages.findIndex((s) => s.id === targetStageId);
      if (si === -1 || ti === -1) return prev;
      const ci = newStages[si].candidates.findIndex((c) => c.id === draggedItem.candidateId);
      if (ci === -1) return prev;
      const [c] = newStages[si].candidates.splice(ci, 1);
      newStages[ti].candidates.push(c);
      return newStages;
    });
    setDraggedItem(null);
  };

  const moveCandidate = (candidateId: string, fromStageId: string, toStageId: string) => {
    setStages((prev) => {
      const newStages = prev.map((s) => ({ ...s, candidates: [...s.candidates] }));
      const si = newStages.findIndex((s) => s.id === fromStageId);
      const ti = newStages.findIndex((s) => s.id === toStageId);
      if (si === -1 || ti === -1) return prev;
      const ci = newStages[si].candidates.findIndex((c) => c.id === candidateId);
      if (ci === -1) return prev;
      const [c] = newStages[si].candidates.splice(ci, 1);
      newStages[ti].candidates.push(c);
      return newStages;
    });
  };

  const renderStars = (rating: number) => Array.from({ length: 5 }).map((_, i) => (
    <Star key={i} className={cn("w-3.5 h-3.5", i < rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200")} />
  ));

  return (
    <AppLayout>
      <div className="flex flex-col h-full space-y-6 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Pipeline</h1>
            <p className="text-sm text-slate-500 mt-1">Manage candidates across hiring stages</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="w-[280px] bg-white"><SelectValue placeholder="Select a job" /></SelectTrigger>
              <SelectContent>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    <div className="flex items-center justify-between w-full pr-4">
                      <span className="font-medium">{job.title}</span>
                      <Badge variant="secondary" className="ml-2 font-normal">{job.status}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700"><UserPlus className="w-4 h-4 mr-2" />Add Candidate</Button>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
          <div className="flex gap-4 h-full min-w-max px-1">
            {stages.map((stage, stageIndex) => (
              <div key={stage.id} className="flex flex-col w-80 shrink-0 h-full rounded-xl bg-slate-100 border border-slate-200/60 overflow-hidden"
                onDragOver={(e) => handleDragOver(e, stage.id)} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, stage.id)}>
                <div className="relative p-4 bg-slate-50 border-b border-slate-200">
                  <div className={cn("absolute top-0 left-0 right-0 h-1", stage.color)} />
                  <div className="flex items-center justify-between mb-1 mt-1">
                    <h3 className="font-semibold text-slate-700">{stage.title}</h3>
                    <Badge variant="secondary" className="bg-white/60 text-slate-600 font-medium">{stage.candidates.length}</Badge>
                  </div>
                </div>
                <div className={cn("flex-1 overflow-y-auto p-3 space-y-3 transition-colors", dragOverStageId === stage.id ? "bg-slate-200/50" : "")}>
                  {stage.candidates.map((candidate) => (
                    <div key={candidate.id} draggable onDragStart={(e) => handleDragStart(e, stage.id, candidate.id)} onDragEnd={() => setDraggedItem(null)}
                      className={cn("group relative bg-white rounded-lg border border-slate-200 shadow-sm p-3.5 hover:shadow-md hover:border-blue-200 transition-all cursor-grab active:cursor-grabbing", draggedItem?.candidateId === candidate.id ? "opacity-50 border-blue-400 border-dashed" : "")}>
                      <div className="absolute top-1/2 -left-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"><GripVertical className="w-4 h-4 text-slate-300" /></div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-9 h-9 border border-white shadow-sm"><AvatarFallback className={cn("text-xs font-semibold", candidate.avatarColor)}>{candidate.initials}</AvatarFallback></Avatar>
                          <div><h4 className="font-medium text-slate-900 text-sm">{candidate.name}</h4><p className="text-xs text-slate-500">{candidate.role}</p></div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 -mr-2 text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            {stageIndex < stages.length - 1 && <DropdownMenuItem onClick={() => moveCandidate(candidate.id, stage.id, stages[stageIndex + 1].id)}>Move to next stage</DropdownMenuItem>}
                            {stageIndex > 0 && <DropdownMenuItem onClick={() => moveCandidate(candidate.id, stage.id, stages[stageIndex - 1].id)}>Move to previous stage</DropdownMenuItem>}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 focus:text-red-600">Reject</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-slate-500"><Calendar className="w-3.5 h-3.5" /><span>{candidate.appliedDate}</span></div>
                        <div className="flex items-center gap-0.5">{renderStars(candidate.rating)}</div>
                      </div>
                      <div className="mt-3 flex">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 font-medium text-slate-600 bg-slate-50">{candidate.source}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-slate-50/50 border-t border-slate-200 mt-auto">
                  <Button variant="ghost" className="w-full text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 h-8"><Plus className="w-4 h-4 mr-1.5" />Add Candidate</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
