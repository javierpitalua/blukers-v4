import { useState, useMemo } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { jobs } from "./_shared/mockData";
import type { Job } from "./_shared/mockData";
import { Search, Plus, MoreVertical, Edit2, Archive, GitBranch, Filter, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const departments = Array.from(new Set(jobs.map((j) => j.department)));

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            job.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || job.status === statusFilter;
      const matchesDept = departmentFilter === "all" || job.department === departmentFilter;
      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [searchQuery, statusFilter, departmentFilter]);

  const handleCreateNew = () => {
    setEditingJob(null);
    setIsModalOpen(true);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  return (
    <AppLayout activePage="jobs">
      <div className="flex flex-col h-full max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Job Postings</h1>
            <p className="text-sm text-slate-500 mt-1">Manage open positions and track applicants.</p>
          </div>
          <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create New Job
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search jobs by title or location..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Job Listings */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Job Title</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Applicants</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                        <Filter className="w-10 h-10 text-slate-300 mb-3" />
                        <p className="text-lg font-medium text-slate-900">No jobs found</p>
                        <p>Try adjusting your search or filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <a href="/__mockup/preview/blukers/JobDetail" className="font-medium text-slate-900 hover:text-blue-600 transition-colors">
                          {job.title}
                        </a>
                        <div className="text-slate-500 text-xs mt-1">{job.type} • {job.salary}</div>
                        <div className="text-slate-400 text-xs mt-0.5">Posted {job.postedDate}</div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant="secondary"
                          className={`
                            ${job.status === 'active' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : ''}
                            ${job.status === 'draft' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' : ''}
                            ${job.status === 'closed' ? 'bg-slate-100 text-slate-700 hover:bg-slate-100' : ''}
                          `}
                        >
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-slate-900">{job.applicants}</span>
                          <span className="text-slate-500">candidates</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{job.location}</td>
                      <td className="px-6 py-4 text-slate-600">{job.department}</td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem asChild className="cursor-pointer">
                              <a href="/__mockup/preview/blukers/JobDetail">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(job)} className="cursor-pointer">
                              <Edit2 className="w-4 h-4 mr-2" />
                              Edit Job
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="cursor-pointer">
                              <a href="/__mockup/preview/blukers/Pipeline">
                                <GitBranch className="w-4 h-4 mr-2" />
                                View Pipeline
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                              <Archive className="w-4 h-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between text-sm text-slate-500">
            <div>
              Showing <span className="font-medium text-slate-900">{filteredJobs.length}</span> of <span className="font-medium text-slate-900">{jobs.length}</span> jobs
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingJob ? "Edit Job Posting" : "Create New Job"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" defaultValue={editingJob?.title} placeholder="e.g. Senior Electrician" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select defaultValue={editingJob?.department || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="Plumbing">Plumbing</SelectItem>
                    <SelectItem value="HVAC">HVAC</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Safety">Safety</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue={editingJob?.location} placeholder="e.g. Austin, TX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Job Type</Label>
                <Select defaultValue={editingJob?.type || "Full-time"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="salary">Salary Range</Label>
                <Input id="salary" defaultValue={editingJob?.salary} placeholder="e.g. $75,000 - $95,000" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea 
                  id="description" 
                  defaultValue={editingJob?.description} 
                  placeholder="Describe the responsibilities and requirements..." 
                  className="h-32"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsModalOpen(false)}>
              {editingJob ? "Save Changes" : "Create Job"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
