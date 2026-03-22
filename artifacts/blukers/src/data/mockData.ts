export interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  department: string;
  status: "active" | "draft" | "closed";
  applicants: number;
  postedDate: string;
  salary: string;
  description: string;
}

export interface Candidate {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  location: string;
  skills: string[];
  availability: string;
  rating: number;
  avatarColor: string;
  certifications: string[];
  lastActive: string;
}

export interface PipelineCandidate {
  id: string;
  name: string;
  initials: string;
  role: string;
  avatarColor: string;
  appliedDate: string;
  rating: number;
  source: string;
}

export interface PipelineStage {
  id: string;
  title: string;
  color: string;
  candidates: PipelineCandidate[];
}

export const jobs: Job[] = [
  { id: "1", title: "Senior Electrician", location: "Austin, TX", type: "Full-time", department: "Electrical", status: "active", applicants: 12, postedDate: "Mar 5, 2026", salary: "$75,000 - $95,000", description: "Looking for an experienced electrician with commercial building experience." },
  { id: "2", title: "Project Manager", location: "Dallas, TX", type: "Full-time", department: "Management", status: "active", applicants: 24, postedDate: "Mar 10, 2026", salary: "$90,000 - $120,000", description: "Seeking a project manager to oversee large-scale commercial construction." },
  { id: "3", title: "HVAC Technician", location: "Houston, TX", type: "Full-time", department: "HVAC", status: "active", applicants: 8, postedDate: "Mar 12, 2026", salary: "$55,000 - $70,000", description: "HVAC installation and maintenance for commercial properties." },
  { id: "4", title: "Plumber - Commercial", location: "San Antonio, TX", type: "Full-time", department: "Plumbing", status: "draft", applicants: 0, postedDate: "Mar 15, 2026", salary: "$60,000 - $80,000", description: "Experienced plumber for commercial new construction projects." },
  { id: "5", title: "Safety Officer", location: "Austin, TX", type: "Contract", department: "Safety", status: "closed", applicants: 18, postedDate: "Feb 20, 2026", salary: "$65,000 - $85,000", description: "Safety compliance officer for construction job sites." },
  { id: "6", title: "Crane Operator", location: "Dallas, TX", type: "Full-time", department: "Operations", status: "active", applicants: 6, postedDate: "Mar 18, 2026", salary: "$70,000 - $90,000", description: "Licensed crane operator for high-rise construction projects." },
];

export const candidates: Candidate[] = [
  { id: "1", name: "Carlos Mendez", initials: "CM", email: "carlos.m@email.com", phone: "(512) 555-0142", role: "Senior Electrician", experience: "12 years", location: "Austin, TX", skills: ["Commercial Wiring", "Blueprint Reading", "NEC Code", "Panel Installation"], availability: "Immediate", rating: 5, avatarColor: "bg-emerald-100 text-emerald-700", certifications: ["Master Electrician License", "OSHA 30"], lastActive: "2 hours ago" },
  { id: "2", name: "Sarah Johnson", initials: "SJ", email: "sarah.j@email.com", phone: "(214) 555-0198", role: "Project Manager", experience: "8 years", location: "Dallas, TX", skills: ["Scheduling", "Budget Management", "Team Leadership", "Primavera P6"], availability: "2 weeks notice", rating: 4, avatarColor: "bg-blue-100 text-blue-700", certifications: ["PMP", "OSHA 10"], lastActive: "1 day ago" },
  { id: "3", name: "Mike Thompson", initials: "MT", email: "mike.t@email.com", phone: "(713) 555-0267", role: "HVAC Technician", experience: "6 years", location: "Houston, TX", skills: ["Installation", "Maintenance", "Refrigeration", "Ductwork"], availability: "Immediate", rating: 4, avatarColor: "bg-orange-100 text-orange-700", certifications: ["EPA 608", "NATE Certified"], lastActive: "3 hours ago" },
  { id: "4", name: "Lisa Chen", initials: "LC", email: "lisa.c@email.com", phone: "(210) 555-0334", role: "Safety Officer", experience: "10 years", location: "San Antonio, TX", skills: ["OSHA Compliance", "Site Inspections", "Training", "Incident Reports"], availability: "1 month notice", rating: 5, avatarColor: "bg-purple-100 text-purple-700", certifications: ["CSP", "CHST", "OSHA 500"], lastActive: "5 hours ago" },
  { id: "5", name: "Robert Davis", initials: "RD", email: "robert.d@email.com", phone: "(512) 555-0456", role: "Crane Operator", experience: "15 years", location: "Austin, TX", skills: ["Tower Crane", "Mobile Crane", "Rigging", "Load Charts"], availability: "Immediate", rating: 5, avatarColor: "bg-red-100 text-red-700", certifications: ["NCCCO Certified", "OSHA 30"], lastActive: "1 hour ago" },
  { id: "6", name: "Ana Rodriguez", initials: "AR", email: "ana.r@email.com", phone: "(214) 555-0523", role: "Plumber", experience: "7 years", location: "Dallas, TX", skills: ["Commercial Plumbing", "Pipe Fitting", "Backflow Prevention", "Medical Gas"], availability: "2 weeks notice", rating: 4, avatarColor: "bg-cyan-100 text-cyan-700", certifications: ["Journeyman Plumber", "Medical Gas Installer"], lastActive: "2 days ago" },
  { id: "7", name: "James Wilson", initials: "JW", email: "james.w@email.com", phone: "(713) 555-0678", role: "Electrician", experience: "4 years", location: "Houston, TX", skills: ["Residential Wiring", "Conduit Bending", "Troubleshooting", "Fire Alarm"], availability: "Immediate", rating: 3, avatarColor: "bg-yellow-100 text-yellow-700", certifications: ["Journeyman Electrician"], lastActive: "4 days ago" },
  { id: "8", name: "Patricia Nguyen", initials: "PN", email: "patricia.n@email.com", phone: "(210) 555-0789", role: "Project Coordinator", experience: "5 years", location: "San Antonio, TX", skills: ["Documentation", "Scheduling", "Vendor Relations", "AutoCAD"], availability: "Immediate", rating: 4, avatarColor: "bg-pink-100 text-pink-700", certifications: ["CAPM"], lastActive: "6 hours ago" },
];

export const pipelineStages: PipelineStage[] = [
  { id: "applied", title: "Applied", color: "bg-gray-500", candidates: [
    { id: "p1", name: "James Wilson", initials: "JW", role: "Electrician", avatarColor: "bg-yellow-100 text-yellow-700", appliedDate: "Mar 18, 2026", rating: 3, source: "Job Board" },
    { id: "p2", name: "Ana Rodriguez", initials: "AR", role: "Plumber", avatarColor: "bg-cyan-100 text-cyan-700", appliedDate: "Mar 17, 2026", rating: 4, source: "Referral" },
  ]},
  { id: "screening", title: "Screening", color: "bg-blue-500", candidates: [
    { id: "p3", name: "Mike Thompson", initials: "MT", role: "HVAC Tech", avatarColor: "bg-orange-100 text-orange-700", appliedDate: "Mar 14, 2026", rating: 4, source: "LinkedIn" },
  ]},
  { id: "interview", title: "Interview", color: "bg-amber-500", candidates: [
    { id: "p4", name: "Sarah Johnson", initials: "SJ", role: "Project Manager", avatarColor: "bg-blue-100 text-blue-700", appliedDate: "Mar 10, 2026", rating: 4, source: "Website" },
    { id: "p5", name: "Patricia Nguyen", initials: "PN", role: "Project Coord.", avatarColor: "bg-pink-100 text-pink-700", appliedDate: "Mar 12, 2026", rating: 4, source: "Invited" },
  ]},
  { id: "assessment", title: "Skills Assessment", color: "bg-purple-500", candidates: [
    { id: "p6", name: "Carlos Mendez", initials: "CM", role: "Sr. Electrician", avatarColor: "bg-emerald-100 text-emerald-700", appliedDate: "Mar 5, 2026", rating: 5, source: "Invited" },
  ]},
  { id: "offer", title: "Offer", color: "bg-green-500", candidates: [
    { id: "p7", name: "Robert Davis", initials: "RD", role: "Crane Operator", avatarColor: "bg-red-100 text-red-700", appliedDate: "Feb 28, 2026", rating: 5, source: "Referral" },
  ]},
];
