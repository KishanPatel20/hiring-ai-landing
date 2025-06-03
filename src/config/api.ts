
// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.skillsync.dev';

export const API_ENDPOINTS = {
  // Authentication
  HR_REGISTER: '/skillsync/hr/register/',
  HR_LOGIN: '/skillsync/hr/login/',
  HR_LOGOUT: '/skillsync/hr/logout/',
  
  // Candidates
  CANDIDATES: '/skillsync/candidates/',
  CANDIDATE_DETAIL: (id: number) => `/skillsync/candidates/${id}/`,
  CANDIDATE_RESUME: (id: number) => `/skillsync/candidates/${id}/resume/`,
  CANDIDATE_SEARCH: '/skillsync/candidates/search/',
  CANDIDATE_ANALYSIS: (id: number) => `/skillsync/candidates/${id}/analyze/`,
  
  // Resume Upload
  RESUME_UPLOAD: '/skillsync/resume/upload/',
  
  // LinkedIn
  LINKEDIN_SEARCH: '/skillsync/linkedin/search/',
  LINKEDIN_PROFILE: '/skillsync/linkedin/profile/',
  
  // Dashboard
  DASHBOARD: '/skillsync/dashboard/',
  SEARCH_CANDIDATES: '/skillsync/search/candidates/',
};

// Helper function to build full URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};
