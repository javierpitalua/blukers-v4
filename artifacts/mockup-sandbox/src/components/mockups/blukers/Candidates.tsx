import { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { candidates, jobs } from "./_shared/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MapPin, Briefcase, Clock, Star, Filter, SlidersHorizontal, UserPlus, ChevronLeft, ChevronRight } from "lucide-react";

export function Candidates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<typeof candidates[0] | null>(null);
  
  const handleInviteClick = (candidate: typeof candidates[0]) => {
    setSelectedCandidate(candidate);
    setInviteModalOpen(true);
  };

  return (
    <AppLayout activePage="candidates">
      <div className="flex flex-col h-full space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Candidate Pool</h1>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-2.5 py-0.5 text-sm font-semibold">
              {candidates.length} Total
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name, role, or keyword..."
              className="pl-9 bg-slate-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-3">
            <Select>
              <SelectTrigger className="w-[160px] bg-slate-50">
                <SelectValue placeholder="Skills" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="hvac">HVAC</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[150px] bg-slate-50">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="austin">Austin, TX</SelectItem>
                <SelectItem value="dallas">Dallas, TX</SelectItem>
                <SelectItem value="houston">Houston, TX</SelectItem>
                <SelectItem value="san-antonio">San Antonio, TX</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[160px] bg-slate-50">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="2weeks">2 Weeks Notice</SelectItem>
                <SelectItem value="1month">1 Month Notice</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-[150px] bg-slate-50">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-3">0-3 years</SelectItem>
                <SelectItem value="4-7">4-7 years</SelectItem>
                <SelectItem value="8-12">8-12 years</SelectItem>
                <SelectItem value="13+">13+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
          {candidates.map((candidate) => (
            <div 
              key={candidate.id} 
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col group"
            >
              <div className="p-5 flex-1 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                      <AvatarFallback className={`${candidate.avatarColor} font-bold text-lg`}>
                        {candidate.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {candidate.name}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium">{candidate.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-amber-700">{candidate.rating}.0</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="truncate">{candidate.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span>{candidate.experience}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${candidate.availability === 'Immediate' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      {candidate.availability}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.skills.slice(0, 3).map(skill => (
                      <Badge key={skill} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium">
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills.length > 3 && (
                      <Badge variant="secondary" className="bg-slate-50 text-slate-500">
                        +{candidate.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <p className="text-xs text-slate-400 font-medium hidden sm:block">
                  Active {candidate.lastActive}
                </p>
                <div className="flex gap-2 w-full sm:w-auto">
                  <a href="/__mockup/preview/blukers/CandidateDetail">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto font-semibold">
                      Profile
                    </Button>
                  </a>
                  <Button 
                    size="sm" 
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 font-semibold gap-1.5"
                    onClick={() => handleInviteClick(candidate)}
                  >
                    <UserPlus className="w-4 h-4" />
                    Invite
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between py-4 border-t border-slate-200 mt-auto">
          <p className="text-sm text-slate-500 font-medium">
            Showing <span className="text-slate-900 font-semibold">1</span> to <span className="text-slate-900 font-semibold">{candidates.length}</span> of <span className="text-slate-900 font-semibold">{candidates.length}</span> candidates
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled className="gap-1">
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-blue-50 text-blue-700 border-blue-200 font-semibold">
                1
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-slate-600">
                2
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-slate-600">
                3
              </Button>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Invite Dialog */}
        <Dialog open={inviteModalOpen} onOpenChange={setInviteModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Invite to Job</DialogTitle>
              <DialogDescription>
                Invite {selectedCandidate?.name} to apply for one of your open positions.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="job">Select Job</Label>
                <Select>
                  <SelectTrigger id="job">
                    <SelectValue placeholder="Select a job to invite them to" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobs.filter(j => j.status === 'active').map(job => (
                      <SelectItem key={job.id} value={job.id}>{job.title} - {job.location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Textarea 
                  id="message" 
                  placeholder={`Hi ${selectedCandidate?.name?.split(' ')[0]}, I saw your profile and thought you'd be a great fit for...`}
                  className="h-24 resize-none" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setInviteModalOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={() => setInviteModalOpen(false)} className="bg-blue-600 hover:bg-blue-700">
                Send Invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
