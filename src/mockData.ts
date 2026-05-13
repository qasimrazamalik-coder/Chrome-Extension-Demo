import { 
  ApplicationTrackerItem, 
  JobAnalysis, 
  JobPost, 
  Resume, 
  UsageLimit, 
  UserProfile 
} from './types';

export const MOCK_USER: UserProfile = {
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  resumes: [
    {
      id: 'res-1',
      name: 'Software Engineer Resume 2024',
      content: 'Experienced software engineer with 5 years in React, Node.js...',
      lastUpdated: '2024-05-10'
    }
  ],
  preferredRole: 'Senior Frontend Engineer',
  skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'AWS'],
  experienceLevel: 'Senior'
};

export const MOCK_JOB: JobPost = {
  title: 'Senior Frontend Engineer',
  company: 'Linear',
  url: 'https://linear.app/careers',
  description: 'We are looking for a frontend engineer to help build the future of project management...',
  extractedAt: '2024-05-13T10:00:00Z'
};

export const MOCK_ANALYSIS: JobAnalysis = {
  matchScore: 85,
  skillsFound: ['React', 'TypeScript', 'Tailwind CSS'],
  missingKeywords: ['Next.js', 'GraphQL', 'Unit Testing'],
  experienceMatch: true,
  suggestions: [
    'Highlight your experience with design systems.',
    'Add a bullet about performance optimization.',
    'Mention your proficiency with CI/CD pipelines.'
  ]
};

export const MOCK_TRACKER: ApplicationTrackerItem[] = [
  {
    id: '1',
    company: 'Linear',
    role: 'Senior Frontend Engineer',
    status: 'Interview',
    dateApplied: '2024-05-12',
    followUpDate: '2024-05-19',
    notes: 'First interview scheduled for Thursday.',
    matchScore: 85
  },
  {
    id: '2',
    company: 'Vercel',
    role: 'Product Engineer',
    status: 'Applied',
    dateApplied: '2024-05-10',
    notes: 'Applied via referral.',
    matchScore: 92
  },
  {
    id: '3',
    company: 'Stripe',
    role: 'Frontend Architect',
    status: 'Rejected',
    dateApplied: '2024-04-20',
    notes: 'Generic rejection after initial screen.',
    matchScore: 78
  }
];

export const MOCK_USAGE: UsageLimit = {
  remainingGenerations: 2,
  totalGenerations: 5,
  plan: 'free'
};
