import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Navigation items that show when logged in
  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'Surveys', path: '/surveys' },
    { name: 'Referrals', path: '/referrals' },
    { name: 'Wallet', path: '/wallet' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMobileMenu}>
              <img
                className="h-8 w-auto"
                src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=64&height=64"
                alt="Huzaifa Business"
              />
              <span className="ml-2 text-xl font-bold text-indigo-600">Huzaifa Business</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          {user && (
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${
                      isActive(item.path)
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* User dropdown and signout */}
              <div className="ml-4 flex items-center">
                <Link
                  to="/profile"
                  className="rounded-full p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <span className="sr-only">View profile</span>
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                    {user.email ? user.email.charAt(0).toUpperCase() : '?'}
                  </div>
                </Link>
                <button
                  onClick={signOut}
                  className="ml-4 px-3 py-1 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none cursor-pointer"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="pt-2 pb-4 space-y-1">
          {user ? (
            <>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${
                    isActive(item.path)
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/profile"
                className={`${
                  isActive('/profile')
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                onClick={closeMobileMenu}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  signOut();
                  closeMobileMenu();
                }}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 text-base font-medium cursor-pointer"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 text-base font-medium"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}