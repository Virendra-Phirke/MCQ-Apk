import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code, Moon, Sun, User, Menu, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors duration-200">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                CodeMaster
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/') 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Home
              </Link>
              <Link
                to="/languages"
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/languages') 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Practice
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive('/dashboard') 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    Progress
                  </Link>
                  <Link
                    to="/profile"
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive('/profile') 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    Profile
                  </Link>
                </>
              )}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>

              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user?.name}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-3">
                <Link
                  to="/"
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive('/') 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/languages"
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive('/languages') 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Practice
                </Link>
                {isAuthenticated && (
                  <>
                    <Link
                      to="/dashboard"
                      className={`text-sm font-medium transition-colors duration-200 ${
                        isActive('/dashboard') 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Progress
                    </Link>
                    <Link
                      to="/profile"
                      className={`text-sm font-medium transition-colors duration-200 ${
                        isActive('/profile') 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </>
                )}
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    {theme === 'light' ? (
                      <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    ) : (
                      <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    )}
                  </button>

                  {isAuthenticated ? (
                    <button
                      onClick={logout}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Logout
                    </button>
                  ) : (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleAuthClick('login')}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => handleAuthClick('register')}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </>
  );
};

export default Header;