import axios from 'axios';
import { Resource, ResourceFilters, Skill, ResourceType, ApiListResponse, ApiSingleResponse } from '@/types';

const API_BASE = '/api';

const api = axios.create({ baseURL: API_BASE });

// Attach admin token if exists
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('eduhub_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ═══════════ Skills ═══════════
export const fetchSkills = async (): Promise<Skill[]> => {
  const { data } = await api.get<ApiListResponse<Skill>>('/skills');
  return data.data;
};

export const fetchSkillBySlug = async (slug: string): Promise<Skill> => {
  const { data } = await api.get<ApiSingleResponse<Skill>>(`/skills/${slug}`);
  return data.data;
};

// ═══════════ Resource Types ═══════════
export const fetchResourceTypes = async (): Promise<ResourceType[]> => {
  const { data } = await api.get<ApiListResponse<ResourceType>>('/resource-types');
  return data.data;
};

// ═══════════ Resources ═══════════
export const fetchResources = async (filters: ResourceFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.skill) params.set('skill', filters.skill);
  if (filters.type) params.set('type', filters.type);
  if (filters.level) params.set('level', filters.level);
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters.featured) params.set('featured', 'true');

  const { data } = await api.get(`/resources?${params.toString()}`);
  return data;
};

export const fetchResourceById = async (id: string): Promise<Resource> => {
  const { data } = await api.get<ApiSingleResponse<Resource>>(`/resources/${id}`);
  return data.data;
};

export const searchResources = async (q: string, page = 1) => {
  const { data } = await api.get(`/search?q=${encodeURIComponent(q)}&page=${page}`);
  return data;
};

// ═══════════ Admin Auth ═══════════
export const adminLogin = async (email: string, password: string) => {
  const { data } = await api.post('/admin/login', { email, password });
  return data;
};

export const fetchAdminMe = async () => {
  const { data } = await api.get('/admin/me');
  return data.data;
};

// ═══════════ Admin CRUD ═══════════
export const adminFetchResources = async (page = 1) => {
  const { data } = await api.get(`/admin/resources?page=${page}&limit=20`);
  return data;
};

export const adminCreateResource = async (payload: Partial<Resource>) => {
  const { data } = await api.post('/admin/resources', payload);
  return data.data;
};

export const adminUpdateResource = async (id: string, payload: Partial<Resource>) => {
  const { data } = await api.put(`/admin/resources/${id}`, payload);
  return data.data;
};

export const adminDeleteResource = async (id: string) => {
  const { data } = await api.delete(`/admin/resources/${id}`);
  return data;
};

export const adminCreateSkill = async (payload: Partial<Skill>) => {
  const { data } = await api.post('/admin/skills', payload);
  return data.data;
};

export const adminUpdateSkill = async (id: string, payload: Partial<Skill>) => {
  const { data } = await api.put(`/admin/skills/${id}`, payload);
  return data.data;
};

export const adminDeleteSkill = async (id: string) => {
  const { data } = await api.delete(`/admin/skills/${id}`);
  return data;
};
