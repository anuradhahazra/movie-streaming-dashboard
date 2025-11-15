'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="Stream Logo" 
            width={80} 
            height={80} 
            className="rounded-full object-cover"
            priority
          />
          <span className="text-2xl font-bold text-white">Dash</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`font-medium transition-colors 
              
                ${pathname === item.path 
                  ? 'text-red-500 border-b-2 border-red-500 pb-1' 
                  : 'text-white hover:text-gray-300'}
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>

      </nav>
    </header>
  );
}
