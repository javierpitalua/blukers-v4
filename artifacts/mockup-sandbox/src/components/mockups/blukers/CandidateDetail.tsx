import { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { candidates, jobs } from "./_shared/mockData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Star,
  MapPin,
  Mail,
  Phone,
  Copy,
  Download,
  Calendar,
  Send,
  Award,
  Briefcase,
  Clock,
  CheckCircle2,
  MoreHorizontal
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function CandidateDetail() {
  const candidate = candidates[0]; // Carlos Mendez
  const [inviteJob, setInviteJob] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSendInvite = () => {
    // In a real app, this would call an API
    console.log("Inviting to job:", inviteJob, "with message:", inviteMessage);
    setIsInviteDialogOpen(false);
    setInviteJob("");
    setInviteMessage("");
  };

  return (
    <AppLayout activePage="candidates">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Candidates</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{candidate.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="w-24 h-24 border-4 border-white shadow-md">
              <AvatarFallback className={`text-3xl font-bold ${candidate.avatarColor}`}>
                {candidate.initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {candidate.availability}
                </Badge>
              </div>
              <p className="text-lg text-gray-600 font-medium">{candidate.role}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {candidate.location}
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {candidate.experience} exp.
                </div>
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < candidate.rating ? "fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Resume
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Interview
            </Button>
            <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Invite to Apply
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Invite {candidate.name} to Apply</DialogTitle>
                  <DialogDescription>
                    Select a job from your active listings and add a personal message to invite this candidate.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="job">Select Job</Label>
                    <Select value={inviteJob} onValueChange={setInviteJob}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a job..." />
                      </SelectTrigger>
                      <SelectContent>
                        {jobs.filter(j => j.status === 'active').map((job) => (
                          <SelectItem key={job.id} value={job.id}>
                            {job.title} - {job.location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Personal Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Hi Carlos, I think you'd be a great fit for..."
                      value={inviteMessage}
                      onChange={(e) => setInviteMessage(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSendInvite} disabled={!inviteJob}>Send Invite</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Experience Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-gray-500" />
                  Experience Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
                      12
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Total Years of Experience</h4>
                      <p className="text-sm text-gray-500">Commercial & Industrial Electrical Work</p>
                    </div>
                  </div>
                  
                  <div className="relative border-l-2 border-gray-200 ml-6 pl-6 space-y-6">
                    <div className="relative">
                      <span className="absolute -left-[35px] bg-white border-2 border-blue-500 w-4 h-4 rounded-full mt-1.5" />
                      <h4 className="font-medium text-gray-900">Senior Commercial Electrician</h4>
                      <p className="text-sm text-gray-500">Texas Build Co. • 2018 - Present</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Lead electrician on major commercial projects including office buildings and retail centers. Supervises a team of 4 junior electricians.
                      </p>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[35px] bg-white border-2 border-gray-300 w-4 h-4 rounded-full mt-1.5" />
                      <h4 className="font-medium text-gray-900">Journeyman Electrician</h4>
                      <p className="text-sm text-gray-500">Austin Power Services • 2014 - 2018</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* History Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  Application History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Lead Electrician - Project X</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">Interviewing</Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">Mar 15, 2026</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Commercial Installer</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-gray-600">Not Selected</Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">Jan 10, 2026</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                    <span className="text-sm font-medium truncate">{candidate.email}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                    onClick={() => handleCopy(candidate.email, 'email')}
                  >
                    {copiedField === 'email' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                    <span className="text-sm font-medium truncate">{candidate.phone}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                    onClick={() => handleCopy(candidate.phone, 'phone')}
                  >
                    {copiedField === 'phone' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {candidate.certifications.map((cert) => (
                    <li key={cert} className="flex items-start gap-3">
                      <div className="mt-0.5 bg-yellow-100 p-1.5 rounded-md text-yellow-700">
                        <Award className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recruiter Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Add private notes about this candidate..."
                  className="min-h-[120px] resize-none"
                  defaultValue="Strong background in commercial wiring. Passed initial technical phone screen."
                />
                <div className="flex justify-end mt-3">
                  <Button size="sm" variant="secondary">Save Note</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
