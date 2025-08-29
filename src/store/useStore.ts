import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Book, User } from "@/lib/types";

interface UserFavorites {
  [userId: string]: Book[];
}

interface AppState {
  // Auth
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // Books
  books: Book[];
  userFavorites: UserFavorites;
  favorites: Book[];

  // Actions
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setBooks: (books: Book[]) => void;
  addToFavorites: (book: Book) => void;
  removeFromFavorites: (bookId: string) => void;
  getFavorites: () => Book[];
  hasFavorite: (bookId: string) => boolean;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      books: [],
      userFavorites: {},
      favorites: [],

      // Actions
      getFavorites: () => {
        const state = get();
        if (!state.user || !state.isAuthenticated) return [];
        return state.userFavorites[state.user.id] || [];
      },

      hasFavorite: (bookId: string) => {
        const state = get();
        if (!state.user) return false;
        const userFavorites = state.userFavorites[state.user.id] || [];
        return userFavorites.some(book => book.id === bookId);
      },

      setAuth: (user: User, token: string) => 
        set(state => {
          const userFavorites = state.userFavorites[user.id] || [];
          return {
            ...state,
            user,
            token,
            isAuthenticated: true,
            favorites: userFavorites
          };
        }),

      logout: () => 
        set(state => ({
          ...state,
          user: null,
          token: null,
          isAuthenticated: false,
          favorites: []
        })),

      setBooks: (books: Book[]) => 
        set(state => ({
          ...state,
          books
        })),

      addToFavorites: (book: Book) => 
        set(state => {
          if (!state.user) return state;
          
          const userId = state.user.id;
          const currentUserFavorites = state.userFavorites[userId] || [];
          
          // Prevent duplicates
          if (currentUserFavorites.some(b => b.id === book.id)) {
            return state;
          }
          
          const newFavorites = [...currentUserFavorites, book];
          
          return {
            ...state,
            userFavorites: {
              ...state.userFavorites,
              [userId]: newFavorites
            },
            favorites: newFavorites
          };
        }),

      removeFromFavorites: (bookId: string) => 
        set(state => {
          if (!state.user) return state;
          
          const userId = state.user.id;
          const currentUserFavorites = state.userFavorites[userId] || [];
          const newFavorites = currentUserFavorites.filter(book => book.id !== bookId);
          
          return {
            ...state,
            userFavorites: {
              ...state.userFavorites,
              [userId]: newFavorites
            },
            favorites: newFavorites
          };
        })
    }),
    {
      name: "bookspace-storage",
    }
  )
);
