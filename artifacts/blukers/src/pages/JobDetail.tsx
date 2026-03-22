import { useState } from "react";
import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { jobs, candidates } from "@/data/mockData";
import type { Candidate } from "@/data/mockData";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MapPin, Briefcase, DollarSign, Calendar, Users, Clock, Star, Search, MoreHorizontal, Eye, Mail, UserPlus, GitBranch, Edit2, Building2, CheckCircle2 } from "lucide-react";

interface AppliedCandidate extends Candidate {
  appliedDate: string;
  stage: string;
  stageColor: string;
}

const appliedCandidates: AppliedCandidate[] = [
  { ...candidates[0], appliedDate: "Mar 5, 2026", stage: "Skills Assessment", stageColor: "bg-purple-100 text-purple-700" },
  { ...candidates[1], appliedDate: "Mar 10, 2026", stage: "Interview", stageColor: "bg-amber-100 text-amber-700" },
  { ...candidates[2], appliedDate: "Mar 14, 2026", stage: "Screening", stageColor: "bg-blue-100 text-blue-700" },
  { ...candidates[4], appliedDate: "Feb 28, 2026", stage: "Offer", stageColor: "bg-green-100 text-green-700" },
  { ...candidates[6], appliedDate: "Mar 18, 2026", stage: "Applied", stageColor: "bg-gray-100 text-gray-700" },
  { ...candidates[5], appliedDate: "Mar 17, 2026", stage: "Applied", stageColor: "bg-gray-100 text-gray-700" },
];

const stageBreakdown = [
  { label: "Applied", count: 2, color: "bg-gray-400" },
  { label: "Screening", count: 1, color: "bg-blue-500" },
  { label: "Interview", count: 1, color: "bg-amber-500" },
  { label: "Assessment", count: 1, color: "bg-purple-500" },
  { label: "Offer", count: 1, color: "bg-green-500" },
];

export default function JobDetail({ id }: { id?: string }) {
  const job = jobs.find(j => j.id === id) || jobs[0];
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("candidates");

  const filteredCandidates = appliedCandidates.filter(
    (c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalInPipeline = stageBreakdown.reduce((sum, s) => sum + s.count, 0);

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link href="/jobs">Jobs</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{job.title}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row gap-6 items-start justify-between bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700"><CheckCircle2 className="w-3 h-3 mr-1" />Active</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{job.location}</div>
              <div className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" />{job.type}</div>
              <div className="flex items-center gap-1.5"><Building2 className="w-4 h-4" />{job.department}</div>
              <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4" />{job.salary}</div>
              <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />Posted {job.postedDate}</div>
            </div>
            <p className="text-sm text-gray-600 max-w-2xl">{job.description}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" className="gap-2"><Edit2 className="w-4 h-4" />Edit</Button>
            <Link href="/pipeline"><Button variant="outline" className="gap-2"><GitBranch className="w-4 h-4" />Pipeline</Button></Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Applicants", value: appliedCandidates.length, icon: Users, bg: "bg-blue-50", color: "text-blue-600" },
            { label: "In Interview", value: 1, icon: Clock, bg: "bg-amber-50", color: "text-amber-600" },
            { label: "Offers Extended", value: 1, icon: Mail, bg: "bg-green-50", color: "text-green-600" },
            { label: "Avg. Rating", value: "4.2", icon: Star, bg: "bg-yellow-50", color: "text-yellow-600" },
          ].map((m) => (
            <Card key={m.label}>
              <CardContent className="pt-5 pb-4 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{m.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{m.value}</p>
                  </div>
                  <div className={`p-2.5 ${m.bg} rounded-lg`}><m.icon className={`w-5 h-5 ${m.color}`} /></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-semibold text-gray-700">Pipeline Breakdown</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 h-3 rounded-full overflow-hidden bg-gray-100">
              {stageBreakdown.map((s) => (<div key={s.label} className={`h-full ${s.color} transition-all`} style={{ width: `${(s.count / totalInPipeline) * 100}%` }} />))}
            </div>
            <div className="flex flex-wrap gap-4 mt-3">
              {stageBreakdown.map((s) => (<div key={s.label} className="flex items-center gap-2 text-sm"><span className={`w-2.5 h-2.5 rounded-full ${s.color}`} /><span className="text-gray-600">{s.label}</span><span className="font-semibold text-gray-900">{s.count}</span></div>))}
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="candidates">Candidates ({appliedCandidates.length})</TabsTrigger>
              <TabsTrigger value="description">Job Description</TabsTrigger>
            </TabsList>
            {activeTab === "candidates" && (
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search candidates..." className="pl-9 h-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            )}
          </div>
          <TabsContent value="candidates" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left px-5 py-3 font-medium text-gray-500">Candidate</th>
                        <th className="text-left px-5 py-3 font-medium text-gray-500">Stage</th>
                        <th className="text-left px-5 py-3 font-medium text-gray-500">Rating</th>
                        <th className="text-left px-5 py-3 font-medium text-gray-500">Applied</th>
                        <th className="text-left px-5 py-3 font-medium text-gray-500">Location</th>
                        <th className="text-right px-5 py-3 font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCandidates.length === 0 ? (
                        <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-500"><Users className="w-10 h-10 text-gray-300 mx-auto mb-3" /><p className="font-medium text-gray-900">No candidates found</p><p className="text-sm">Try adjusting your search.</p></td></tr>
                      ) : filteredCandidates.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-9 h-9"><AvatarFallback className={`text-xs font-semibold ${c.avatarColor}`}>{c.initials}</AvatarFallback></Avatar>
                              <div>
                                <Link href={`/candidates/${c.id}`} className="font-medium text-gray-900 hover:text-blue-600 transition-colors">{c.name}</Link>
                                <p className="text-xs text-gray-500">{c.role} · {c.experience}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5"><Badge variant="secondary" className={c.stageColor}>{c.stage}</Badge></td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center text-amber-500">
                              {[...Array(5)].map((_, i) => (<Star key={i} className={`w-3.5 h-3.5 ${i < c.rating ? "fill-current" : "text-gray-300"}`} />))}
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-gray-500 text-sm">{c.appliedDate}</td>
                          <td className="px-5 py-3.5 text-gray-500 text-sm">{c.location}</td>
                          <td className="px-5 py-3.5 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-44">
                                <DropdownMenuItem asChild className="cursor-pointer"><Link href={`/candidates/${c.id}`}><Eye className="w-4 h-4 mr-2" />View Profile</Link></DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer"><Mail className="w-4 h-4 mr-2" />Send Message</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer"><Calendar className="w-4 h-4 mr-2" />Schedule Interview</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer"><UserPlus className="w-4 h-4 mr-2" />Move Stage</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-5 py-3 border-t border-slate-200 bg-slate-50/50 text-sm text-gray-500">
                  Showing <span className="font-medium text-gray-900">{filteredCandidates.length}</span> of <span className="font-medium text-gray-900">{appliedCandidates.length}</span> candidates
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="description" className="mt-4">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">About This Role</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{job.description} This role involves working on large-scale commercial construction projects, ensuring all electrical systems meet local and national codes. The ideal candidate will have experience with commercial wiring, panel installation, and team supervision.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {["Master Electrician License or equivalent", "Minimum 8 years of commercial electrical experience", "OSHA 30 certification required", "Proficiency in reading blueprints and electrical schematics", "Team leadership and supervisory experience preferred"].map((r) => (
                      <li key={r} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />{r}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Benefits</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {["Competitive salary with performance bonuses", "Health, dental, and vision insurance", "401(k) with company match", "Paid time off and company vehicle"].map((b) => (
                      <li key={b} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />{b}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
