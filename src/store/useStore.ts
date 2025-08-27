import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Book, User } from '@/lib/types';

interface AppState {
  // Auth
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // Books
  books: Book[];
  favorites: Book[];
  
  // Theme
  isDarkMode: boolean;
  
  // Actions
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setBooks: (books: Book[]) => void;
  addToFavorites: (book: Book) => void;
  removeFromFavorites: (bookId: string) => void;
  toggleTheme: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      books: [],
      favorites: [],
      isDarkMode: false,
      
      // Actions
      setAuth: (user, token) => set({ 
        user, 
        token, 
        isAuthenticated: true 
      }),
      
      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      }),
      
      setBooks: (books) => set({ books }),
      
      addToFavorites: (book) => set((state) => ({
        favorites: [...state.favorites, book]
      })),
      
      removeFromFavorites: (bookId) => set((state) => ({
        favorites: state.favorites.filter(book => book.id !== bookId)
      })),
      
      toggleTheme: () => set((state) => ({
        isDarkMode: !state.isDarkMode
      })),
    }),
    {
      name: 'bookspace-storage',
    }
  )
);
