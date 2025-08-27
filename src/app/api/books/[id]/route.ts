import { NextRequest, NextResponse } from 'next/server';

const books = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'fiction',
    description: 'A classic American novel set in the Jazz Age.',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    publishedYear: 1925
  },
  {
    id: '2',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    category: 'science',
    description: 'A landmark volume in science writing by one of the great minds of our time.',
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop',
    publishedYear: 1988
  },
  {
    id: '3',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'technology',
    description: 'A handbook of agile software craftsmanship.',
    cover: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=400&fit=crop',
    publishedYear: 2008
  },
  {
    id: '4',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'history',
    description: 'A brief history of humankind.',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    publishedYear: 2011
  },
  {
    id: '5',
    title: '1984',
    author: 'George Orwell',
    category: 'fiction',
    description: 'A dystopian social science fiction novel.',
    cover: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop',
    publishedYear: 1949
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const book = books.find(b => b.id === params.id);
  
  if (!book) {
    return NextResponse.json(
      { error: 'Book not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(book);
}
