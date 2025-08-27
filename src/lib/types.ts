export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  cover: string;
  publishedYear: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}