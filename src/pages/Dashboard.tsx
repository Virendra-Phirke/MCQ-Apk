import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Award, 
  Calendar, 
  BarChart3, 
  Play,
  BookOpen,
  Star,
  ArrowRight,
  Trophy,
  Activity
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { progress } = useProgress();
  const [recentQuizzes, setRecentQuizzes] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    totalQuestions: 0,
    totalTime: 0,
    streakDays: 0,
  });

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    setRecentQuizzes([
      {
        id: 1,
        language: 'Python',
        difficulty: 'Intermediate',
        score: 85,
        questions: 20,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        timeSpent: 25,
      },
      {
        id: 2,
        language: 'JavaScript',
        difficulty: 'Beginner',
        score: 92,
        questions: 15,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        timeSpent: 18,
      },
      {
        id: 3,
        language: 'Java',
        difficulty: 'Advanced',
        score: 78,
        questions: 25,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        timeSpent: 35,
      },
    ]);

    setStats({
      totalQuizzes: 15,
      averageScore: 82.5,
      totalQuestions: 320,
      totalTime: 480, // minutes
      streakDays: 7,
    });
  }, []);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getLanguageProgress = (language: string) => {
    const languageQuizzes = recentQuizzes.filter(q => q.language === language);
    if (languageQuizzes.length === 0) return 0;
    return languageQuizzes.reduce((sum, quiz) => sum + quiz.score, 0) / languageQuizzes.length;
  };

  const languages = ['Python', 'JavaScript', 'Java', 'C++', 'TypeScript'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name || 'Coder'}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Ready to continue your coding journey?
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{stats.streakDays}</div>
              <div className="text-blue-100">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/languages"
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-4">
              <Play className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Start New Quiz
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Choose a language and begin practicing
            </p>
          </Link>

          <Link
            to="/profile"
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              View Progress
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Check your detailed learning analytics
            </p>
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Current Rank
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Advanced • Top 15%
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalQuizzes}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Quizzes
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.averageScore}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Average Score
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalQuestions}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Questions Answered
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatTime(stats.totalTime)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Time
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Quizzes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Recent Quizzes
              </h2>
            </div>
            <div className="p-6">
              {recentQuizzes.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    No quizzes taken yet. Start your first quiz!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentQuizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-semibold">
                            {quiz.language.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {quiz.language}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {quiz.difficulty} • {quiz.questions} questions
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {quiz.score}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {formatTime(quiz.timeSpent)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Language Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Language Progress
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {languages.map((language) => {
                  const progress = getLanguageProgress(language);
                  return (
                    <div key={language} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {language}
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {progress.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 