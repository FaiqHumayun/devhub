'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navLinks } from '../../contants';
import Image from 'next/image';
import logo from '../../../public/logo.png';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black sticky top-0 z-50 p-5">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="w-full flex justify-between items-center h-16">
          <Link href="/">
            <Image 
              src={logo}
              alt="DevHub Logo"
              className="h-fit w-32 mr-2"
            />
          </Link>

          { session && 
            <div className="hidden md:flex items-center space-x-4">
              {
                navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === link.href
                        ? 'text-primary-pink bg-primary-lightpink'
                        : 'text-white hover:text-primary-pink hover:bg-primary-lightpink'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))
              }
            </div>
          }

          { session ? 
            (
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary-pink hover:bg-primary-green transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div> 
            )
          : 
            (
              <div className="hidden md:flex items-center space-x-4">
                  <Link
                    href="/auth/signin"
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary-pink hover:bg-primary-green transition-colors cursor-pointer"
                  >
                    Sign In
                  </Link>
              </div>
            )
          }

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary-pink hover:bg-primary-lightpink focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black border-t border-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === link.href
                  ? 'text-primary-pink bg-primary-lightpink'
                  : 'text-white hover:text-primary-pink hover:bg-primary-lightpink'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/auth/signin"
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-pink hover:bg-primary-green transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 