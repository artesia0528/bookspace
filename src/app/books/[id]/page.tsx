"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { Book } from "@/lib/types";
import { Heart, ArrowLeft, Calendar, Tag } from "lucide-react";

export default function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  const { isAuthenticated, favorites, addToFavorites, removeFromFavorites } =
    useStore();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const isFavorite = book ? favorites.some((fav) => fav.id === book.id) : false;

  const fetchBook = useCallback(async () => {
    try {
      const response = await fetch(`/api/books/${id}`);
      if (!response.ok) {
        throw new Error("Book not found");
      }
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error("Error fetching book:", error);
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    fetchBook();
  }, [isAuthenticated, router, fetchBook]);

  const toggleFavorite = () => {
    if (!book) return;

    if (isFavorite) {
      removeFromFavorites(book.id);
    } else {
      addToFavorites(book);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Book Not Found
          </h1>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <Image
              src={book.cover || "/default-book-cover.jpg"}
              alt={book.title || "Book cover"}
              width={400}
              height={600}
              className="w-full h-96 md:h-full object-cover"
              priority
            />
          </div>

          <div className="md:w-2/3 p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                {book?.title}
              </h1>
              <button
                onClick={toggleFavorite}
                className={`p-3 rounded-full transition-colors ${
                  isFavorite
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-100 hover:text-red-500"
                }`}
              >
                <Heart
                  className={`h-6 w-6 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              by {book?.author}
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <Tag className="h-4 w-4" />
                <span className="capitalize">{book?.category}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>{book?.publishedYear}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Description
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {book?.description}
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={toggleFavorite}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  isFavorite
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>

              <button
                onClick={() => router.push("/dashboard")}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Browse More Books
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
