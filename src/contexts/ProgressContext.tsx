import React, { createContext, useContext, useState, useEffect } from 'react';

export interface QuizResult {
  id: string;
  language: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number; // in seconds
  date: string;
  accuracy: number;
  topicBreakdown: Record<string, { correct: number; total: number }>;
}

export interface UserProgress {
  totalQuizzes: number;
  averageScore: number;
  bestScore: number;
  totalTimeSpent: number; // in minutes
  languageStats: Record<string, {
    quizzes: number;
    averageScore: number;
    bestScore: number;
    currentStreak: number;
    longestStreak: number;
  }>;
  achievements: string[];
  currentStreak: number;
  longestStreak: number;
}

interface ProgressContextType {
  progress: UserProgress;
  recentResults: QuizResult[];
  addQuizResult: (result: QuizResult) => void;
  getLanguageProgress: (language: string) => UserProgress['languageStats'][string] | null;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

const initialProgress: UserProgress = {
  totalQuizzes: 0,
  averageScore: 0,
  bestScore: 0,
  totalTimeSpent: 0,
  languageStats: {},
  achievements: [],
  currentStreak: 0,
  longestStreak: 0,
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(initialProgress);
  const [recentResults, setRecentResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    const savedProgress = localStorage.getItem('progress');
    const savedResults = localStorage.getItem('recentResults');
    
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    if (savedResults) {
      setRecentResults(JSON.parse(savedResults));
    }
  }, []);

  const addQuizResult = (result: QuizResult) => {
    setRecentResults(prev => {
      const newResults = [result, ...prev].slice(0, 20); // Keep last 20 results
      localStorage.setItem('recentResults', JSON.stringify(newResults));
      return newResults;
    });

    setProgress(prev => {
      const newProgress = { ...prev };
      
      // Update overall stats
      newProgress.totalQuizzes += 1;
      newProgress.totalTimeSpent += Math.round(result.timeTaken / 60);
      newProgress.averageScore = Math.round(
        (prev.averageScore * prev.totalQuizzes + result.score) / newProgress.totalQuizzes
      );
      newProgress.bestScore = Math.max(prev.bestScore, result.score);

      // Update language-specific stats
      if (!newProgress.languageStats[result.language]) {
        newProgress.languageStats[result.language] = {
          quizzes: 0,
          averageScore: 0,
          bestScore: 0,
          currentStreak: 0,
          longestStreak: 0,
        };
      }

      const langStats = newProgress.languageStats[result.language];
      langStats.quizzes += 1;
      langStats.averageScore = Math.round(
        (langStats.averageScore * (langStats.quizzes - 1) + result.score) / langStats.quizzes
      );
      langStats.bestScore = Math.max(langStats.bestScore, result.score);

      // Update streaks
      if (result.accuracy >= 70) {
        newProgress.currentStreak += 1;
        langStats.currentStreak += 1;
      } else {
        newProgress.currentStreak = 0;
        langStats.currentStreak = 0;
      }

      newProgress.longestStreak = Math.max(newProgress.longestStreak, newProgress.currentStreak);
      langStats.longestStreak = Math.max(langStats.longestStreak, langStats.currentStreak);

      localStorage.setItem('progress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const getLanguageProgress = (language: string) => {
    return progress.languageStats[language] || null;
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      recentResults,
      addQuizResult,
      getLanguageProgress,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};