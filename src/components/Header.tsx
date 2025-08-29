"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/store/useStore";
import { LogOut, Book, Heart, Home } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { useEffect, useState } from "react";

export default function Header() {
  const { user, isAuthenticated, logout } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null;

  // Don't show header on auth pages
  if (pathname?.startsWith("/auth/") || !isAuthenticated) return null;

  return (
    <header className="bg-white shadow-md dark:bg-gray-800">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Book className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              BookSpace
            </span>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/favorites"
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600"
            >
              <Heart className="w-4 h-4" />
              <span>Favorites</span>
            </Link>

            <ModeToggle />

            <div className="flex items-center space-x-2">
              <span className="px-3 py-2 mr-5 text-sm text-gray-600 border rounded-lg dark:text-gray-300">
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
