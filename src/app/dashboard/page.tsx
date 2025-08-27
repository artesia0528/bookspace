'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { Book } from '@/lib/types';
import BookCard from '@/components/BookCard';
import SearchFilter from '@/components/SearchFilter';

export default function DashboardPage() {
  const { isAuthenticated } = useStore();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    
    fetchBooks();
  }, [isAuthenticated, router, searchQuery, selectedCategory]);
  
  const fetchBooks = async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      
      const response = await fetch(`/api/books?${params}`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Book Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Discover and explore amazing books
        </p>
      </div>
      
      <SearchFilter
        onSearch={setSearchQuery}
        onFilter={setSelectedCategory}
      />
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.length > 0 ? (
            books.map(book => (
              <BookCard key={book.id} book={book} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No books found matching your criteria.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
