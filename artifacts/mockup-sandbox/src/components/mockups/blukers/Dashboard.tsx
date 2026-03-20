import { AppLayout } from "./_shared/AppLayout";
import { jobs } from "./_shared/mockData";
import { 
  Briefcase, 
  Users, 
  CalendarClock, 
  FileCheck,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  GitBranch,
  ArrowRight,
  Clock,
  MoreVertical
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Dashboard() {
  const topJobs = [...jobs].sort((a, b) => b.applicants - a.applicants).slice(0, 3);

  const activities = [
    {
      id: 1,
      title: "Carlos Mendez moved to Skills Assessment",
      time: "2 hours ago",
      type: "status",
      color: "bg-purple-500"
    },
    {
      id: 2,
      title: "New application from James Wilson",
      time: "4 hours ago",
      type: "application",
      color: "bg-blue-500"
    },
    {
      id: 3,
      title: "Job posted: Crane Operator",
      time: "1 day ago",
      type: "job",
      color: "bg-emerald-500"
    },
    {
      id: 4,
      title: "Offer accepted by Robert Davis",
      time: "2 days ago",
      type: "success",
      color: "bg-green-500"
    }
  ];

  return (
    <AppLayout activePage="dashboard">
      <div className="space-y-8 max-w-[1600px] mx-auto pb-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-1">Here's what's happening with your hiring process today.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden sm:flex bg-white">
              <CalendarClock className="w-4 h-4 mr-2 text-slate-500" />
              Schedule Interview
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Jobs</p>
                  <p className="text-4xl font-bold text-slate-900">4</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-6 flex items-center text-sm bg-slate-50 p-2 rounded-lg">
                <TrendingUp className="w-4 h-4 text-emerald-500 mr-1.5" />
                <span className="text-emerald-600 font-semibold mr-1.5">+12%</span>
                <span className="text-slate-500">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Candidates</p>
                  <p className="text-4xl font-bold text-slate-900">8</p>
                </div>
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <div className="mt-6 flex items-center text-sm bg-slate-50 p-2 rounded-lg">
                <TrendingUp className="w-4 h-4 text-emerald-500 mr-1.5" />
                <span className="text-emerald-600 font-semibold mr-1.5">+24%</span>
                <span className="text-slate-500">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Pending Interviews</p>
                  <p className="text-4xl font-bold text-slate-900">2</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl">
                  <CalendarClock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="mt-6 flex items-center text-sm bg-slate-50 p-2 rounded-lg">
                <TrendingDown className="w-4 h-4 text-red-500 mr-1.5" />
                <span className="text-red-600 font-semibold mr-1.5">-1</span>
                <span className="text-slate-500">from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Offers Extended</p>
                  <p className="text-4xl font-bold text-slate-900">1</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <FileCheck className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              <div className="mt-6 flex items-center text-sm bg-slate-50 p-2 rounded-lg">
                <TrendingUp className="w-4 h-4 text-emerald-500 mr-1.5" />
                <span className="text-emerald-600 font-semibold mr-1.5">+100%</span>
                <span className="text-slate-500">acceptance rate</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4 px-1">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button variant="outline" className="h-auto p-6 justify-start group hover:border-blue-300 hover:bg-blue-50/50 bg-white border-slate-200 rounded-2xl shadow-sm transition-all">
              <div className="p-3 bg-blue-100 rounded-xl mr-5 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                <Plus className="w-6 h-6 text-blue-700" />
              </div>
              <div className="text-left space-y-1">
                <p className="font-bold text-slate-900 text-base">Post New Job</p>
                <p className="text-sm text-slate-500">Create a new listing for a role</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-6 justify-start group hover:border-indigo-300 hover:bg-indigo-50/50 bg-white border-slate-200 rounded-2xl shadow-sm transition-all">
              <div className="p-3 bg-indigo-100 rounded-xl mr-5 group-hover:bg-indigo-200 group-hover:scale-110 transition-all duration-300">
                <Search className="w-6 h-6 text-indigo-700" />
              </div>
              <div className="text-left space-y-1">
                <p className="font-bold text-slate-900 text-base">Browse Candidates</p>
                <p className="text-sm text-slate-500">Search the talent pool directly</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-6 justify-start group hover:border-purple-300 hover:bg-purple-50/50 bg-white border-slate-200 rounded-2xl shadow-sm transition-all">
              <div className="p-3 bg-purple-100 rounded-xl mr-5 group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
                <GitBranch className="w-6 h-6 text-purple-700" />
              </div>
              <div className="text-left space-y-1">
                <p className="font-bold text-slate-900 text-base">View Pipeline</p>
                <p className="text-sm text-slate-500">Manage hiring stages visually</p>
              </div>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Top Jobs */}
          <Card className="xl:col-span-2 border-slate-200 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-4 bg-slate-50/50 border-b border-slate-100">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Top Jobs</CardTitle>
                <CardDescription>Roles with the highest number of applicants</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 font-medium">
                View All <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {topJobs.map(job => (
                  <div key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-slate-50 transition-colors gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm shrink-0">
                        <Briefcase className="w-6 h-6 text-slate-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{job.title}</h4>
                        <div className="flex flex-wrap items-center text-sm text-slate-500 mt-1.5 gap-2">
                          <span className="font-medium text-slate-700">{job.department}</span>
                          <span className="text-slate-300">•</span>
                          <span>{job.location}</span>
                          <span className="text-slate-300">•</span>
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 mt-2 sm:mt-0">
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none px-3 py-1 font-semibold text-sm">
                        {job.applicants} Applicants
                      </Badge>
                      <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{job.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-slate-200 shadow-sm rounded-2xl">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-slate-900">Recent Activity</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-[1.45rem] before:-translate-x-px before:h-full before:w-[2px] before:bg-slate-100">
                {activities.map((activity) => (
                  <div key={activity.id} className="relative flex items-start gap-5">
                    <div className={`absolute -left-6 w-3 h-3 rounded-full mt-1.5 border-2 border-white ring-4 ring-white ${activity.color} shadow-sm z-10`} />
                    <div className="flex-1">
                      <p className="text-[15px] font-medium text-slate-900 leading-tight">{activity.title}</p>
                      <div className="flex items-center mt-2 text-xs font-medium text-slate-500">
                        <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-8 bg-slate-50 text-slate-600 hover:text-slate-900 border-dashed border-2">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
