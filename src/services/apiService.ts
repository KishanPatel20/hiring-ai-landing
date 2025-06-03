
import { buildApiUrl } from '@/config/api';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  token?: string;
}

export const apiCall = async (endpoint: string, options: ApiOptions = {}) => {
  const { method = 'GET', headers = {}, body, token } = options;
  
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    defaultHeaders['Authorization'] = `Token ${token}`;
  }
  
  const config: RequestInit = {
    method,
    headers: { ...defaultHeaders, ...headers },
  };
  
  if (body) {
    if (body instanceof FormData) {
      // Remove Content-Type for FormData
      delete defaultHeaders['Content-Type'];
      config.headers = { ...headers };
      if (token) {
        (config.headers as Record<string, string>)['Authorization'] = `Token ${token}`;
      }
      config.body = body;
    } else {
      config.body = JSON.stringify(body);
    }
  }
  
  const response = await fetch(buildApiUrl(endpoint), config);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};
