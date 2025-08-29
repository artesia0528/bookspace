"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/store/useStore";
import { LogOut, Book, Heart, Home, Menu, X } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { useEffect, useState } from "react";

export default function Header() {
  const { user, isAuthenticated, logout } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    router.push("/auth/login");
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null;

  // Don't show header on auth pages
  if (pathname?.startsWith("/auth/") || !isAuthenticated) return null;

  const menuItems = [
    {
      href: "/dashboard",
      icon: <Home className="w-4 h-4" />,
      label: "Dashboard"
    },
    {
      href: "/favorites",
      icon: <Heart className="w-4 h-4" />,
      label: "Favorites"
    }
  ];

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}

            <ModeToggle />

            <div className="flex items-center space-x-2">
              <span className="px-3 py-2 text-sm text-gray-600 border rounded-lg dark:text-gray-300">
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

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 py-4 border-t border-gray-200 dark:border-gray-700 md:hidden">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="block px-3 py-2 mb-4 text-sm text-gray-600 border rounded-lg dark:text-gray-300">
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
