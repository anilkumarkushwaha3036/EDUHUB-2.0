// Shared TypeScript types for EduHub

export interface Skill {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  color: SkillColor;
  resourceCount: number;
  order: number;
  createdAt: string;
}

export type SkillColor = 'blue' | 'purple' | 'green' | 'yellow' | 'red' | 'cyan' | 'pink' | 'orange';

export interface ResourceType {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
}

export type ResourceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Resource {
  _id: string;
  title: string;
  link: string;
  description: string;
  thumbnail?: string;
  skillId: Skill;
  typeId: ResourceType;
  level: ResourceLevel;
  tags: string[];
  isApproved: boolean;
  isFeatured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

// API response wrappers
export interface ApiListResponse<T> {
  success: boolean;
  count: number;
  total: number;
  page?: number;
  pages?: number;
  data: T[];
}

export interface ApiSingleResponse<T> {
  success: boolean;
  data: T;
}

// Filter query params
export interface ResourceFilters {
  skill?: string;
  type?: string;
  level?: string;
  page?: number;
  limit?: number;
  featured?: boolean;
}

// Admin
export interface Admin {
  id: string;
  email: string;
}

export interface AuthState {
  token: string | null;
  admin: Admin | null;
  isAuthenticated: boolean;
}
