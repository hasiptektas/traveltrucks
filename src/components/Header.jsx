import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <div className="text-2xl font-bold select-none">
          <span className="text-gray-800">Travel</span>
          <span className="text-black font-extrabold">Trucks</span>
        </div>
        <ul className="flex gap-8">
          {navLinks.map(link => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`font-medium pb-1 border-b-2 transition-colors duration-300 px-1
                  ${location.pathname === link.path ? 'text-red-500 border-red-500' : 'text-gray-700 border-transparent hover:text-red-400'}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
} 