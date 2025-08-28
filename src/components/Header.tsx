"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { LogOut, Book, Heart, Home} from "lucide-react";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  const { user, isAuthenticated, logout } = useStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  if (!isAuthenticated) return null;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              BookSpace
            </span>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/favorites"
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600"
            >
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
            </Link>

            <ModeToggle />

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-300 mr-5 border px-3 py-2 rounded-lg">
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
