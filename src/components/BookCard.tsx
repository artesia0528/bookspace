'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/lib/types';
import { Heart } from 'lucide-react';
import { useStore } from '@/store/useStore';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { favorites, addToFavorites, removeFromFavorites } = useStore();
  const isFavorite = favorites.some(fav => fav.id === book.id);
  
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(book.id);
    } else {
      addToFavorites(book);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={book.cover}
          alt={book.title}
          width={300}
          height={400}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-600 hover:text-red-500'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
          {book.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
          by {book.author}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">
          {book.category} • {book.publishedYear}
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-1">
          {book.description}
        </p>
        
        <Link
          href={`/books/${book.id}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
