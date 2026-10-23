import userData from './userData.json';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectKeyFeature {
  title: string;
  desc: string;
}

export interface ProjectDeepDive {
  challenge: string;
  approach: string;
  discovery: string;
  impact: string;
  keyFeatures: ProjectKeyFeature[];
}

export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tagline: string;
  description: string;
  role: string;
  timeline: string;
  tools: string[];
  metrics: ProjectMetric[];
  accentColor: string;
  gradient: string;
  mediaType: 'image' | 'video' | 'interactive';
  previewQuote: string;
  links?: ProjectLinks;
  deepDive: ProjectDeepDive;
}

export interface GenAIProject {
  id: string;
  title: string;
  tag: string;
  summary: string;
  storyHeading: string;
  storyBody: string[];
  gradient: string;
  demoType: 'sorter' | 'undo' | 'skate' | 'canditracker' | 'looped' | 'logoplay';
  metrics: string;
  github?: string;
  npm?: string;
  live?: string;
}

export interface Pillar {
  id: string;
  number: string;
  title: string;
  description: string;
  badge: string;
}

export interface Award {
  title: string;
  year: string;
  organization: string;
  badge: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  highlights: string[];
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  name: string;
  copyrightName: string;
  initials: string;
  role: string;
  subtitle: string;
  tagline: string;
  headline: string;
  subheadline: string;
  bio: string;
  aboutParagraphs: string[];
  location: string;
  timeZone: string;
  status: string;
  email: string;
  resumeUrl: string;
  profileImage: string;
  links: {
    website: string;
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
    resume: string;
  };
  stats: { value: string; label: string }[];
}

export interface PortfolioData {
  profile: UserProfile;
  pillars: Pillar[];
  marqueeWords: string[];
  skills: string[];
  selectedWorks: Project[];
  genAIProjects: GenAIProject[];
  workExperience: WorkExperience[];
  education: Education;
  awards: Award[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  profile: {
    firstName: userData.firstName,
    lastName: userData.lastName,
    name: userData.fullName,
    copyrightName: userData.copyrightName,
    initials: userData.initials,
    role: userData.role,
    subtitle: userData.subtitle,
    tagline: userData.tagline,
    headline: userData.headline,
    subheadline: userData.subheadline,
    bio: userData.aboutBio,
    aboutParagraphs: userData.aboutParagraphs,
    location: userData.location,
    timeZone: userData.timeZone,
    status: userData.status,
    email: userData.email,
    resumeUrl: userData.resumeUrl,
    profileImage: userData.profileImage,
    links: userData.links,
    stats: userData.stats
  },
  pillars: userData.pillars,
  marqueeWords: userData.marqueeWords,
  skills: userData.skills,
  selectedWorks: userData.selectedWorks as Project[],
  genAIProjects: userData.projects as GenAIProject[],
  workExperience: userData.workExperience as WorkExperience[],
  education: userData.education,
  awards: userData.awards as Award[]
};

export default PORTFOLIO_DATA;
