export type View = 'popup' | 'dashboard' | 'onboarding';

export interface UserProfile {
  name: string;
  email: string;
  resumes: Resume[];
  preferredRole: string;
  skills: string[];
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead';
}

export interface Resume {
  id: string;
  name: string;
  content: string;
  lastUpdated: string;
}

export interface JobPost {
  title: string;
  company: string;
  url: string;
  description: string;
  extractedAt: string;
}

export interface JobAnalysis {
  matchScore: number;
  skillsFound: string[];
  missingKeywords: string[];
  experienceMatch: boolean;
  suggestions: string[];
}

export interface ApplicationTrackerItem {
  id: string;
  company: string;
  role: string;
  status: 'Saved' | 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Follow-up';
  dateApplied?: string;
  followUpDate?: string;
  notes: string;
  matchScore: number;
}

export type PricingPlan = 'free' | 'pro' | 'lifetime';

export interface UsageLimit {
  remainingGenerations: number;
  totalGenerations: number;
  plan: PricingPlan;
}
