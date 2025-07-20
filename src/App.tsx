import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { QuizProvider } from './contexts/QuizContext';
import { ProgressProvider } from './contexts/ProgressContext';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import LanguageSelection from './pages/LanguageSelection';
import QuizConfiguration from './pages/QuizConfiguration';
import QuizInterface from './pages/QuizInterface';
import QuizResults from './pages/QuizResults';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  console.log('App component rendering...');
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <QuizProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/languages" element={<LanguageSelection />} />
                    <Route path="/configure" element={<QuizConfiguration />} />
                    <Route path="/quiz" element={<QuizInterface />} />
                    <Route path="/results" element={<QuizResults />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </main>
              </div>
            </Router>
          </QuizProvider>
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;