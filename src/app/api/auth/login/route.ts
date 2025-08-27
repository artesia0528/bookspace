import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Mock users database
const users = [
  { id: '1', email: 'user@example.com', password: 'password123', name: 'John Doe' },
  { id: '2', email: 'admin@example.com', password: 'admin123', name: 'Admin User' }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
      token
    });
    
  } catch  {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
