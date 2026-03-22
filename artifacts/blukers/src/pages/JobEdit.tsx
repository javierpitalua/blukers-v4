import { useState } from "react";
import { Link, useLocation } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { jobs } from "@/data/mockData";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function JobEdit({ id }: { id?: string }) {
  const job = jobs.find(j => j.id === id) || jobs[0];
  const [, setLocation] = useLocation();

  const [title, setTitle] = useState(job.title);
  const [department, setDepartment] = useState(job.department);
  const [location, setLocationVal] = useState(job.location);
  const [type, setType] = useState(job.type);
  const [salary, setSalary] = useState(job.salary);
  const [description, setDescription] = useState(job.description);

  const handleSave = () => {
    const jobIndex = jobs.findIndex(j => j.id === id);
    if (jobIndex !== -1) {
      jobs[jobIndex] = {
        ...jobs[jobIndex],
        title,
        department,
        location,
        type,
        salary,
        description,
      };
    }
    setLocation(`/jobs/${id}`);
  };

  const handleCancel = () => {
    setLocation(`/jobs/${id}`);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link href="/jobs">Jobs</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link href={`/jobs/${id}`}>{job.title}</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Edit</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Job Posting</h1>
          <p className="text-sm text-gray-500 mt-1">Update the details for this job posting.</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Electrician"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
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
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocationVal(e.target.value)}
                  placeholder="e.g. Austin, TX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Job Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="salary">Salary Range</Label>
                <Input
                  id="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="e.g. $75,000 - $95,000"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the responsibilities and requirements..."
                  className="h-40"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSave}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
