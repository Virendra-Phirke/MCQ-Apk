import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  Bell, 
  Shield, 
  Palette,
  Download,
  Share2,
  Edit,
  Save,
  X,
  BarChart3,
  Target,
  Clock,
  Award,
  TrendingUp,
  Activity
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { progress } = useProgress();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    totalQuestions: 0,
    totalTime: 0,
    streakDays: 0,
    languages: [] as string[],
    achievements: [] as string[],
  });

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    setStats({
      totalQuizzes: 15,
      averageScore: 82.5,
      totalQuestions: 320,
      totalTime: 480,
      streakDays: 7,
      languages: ['Python', 'JavaScript', 'Java', 'C++', 'TypeScript'],
      achievements: [
        'First Quiz Completed',
        '10 Questions Answered',
        'Perfect Score',
        '7 Day Streak',
        'Python Master',
      ],
    });
  }, []);

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: 'Excellent', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/20' };
    if (score >= 80) return { level: 'Very Good', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/20' };
    if (score >= 70) return { level: 'Good', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/20' };
    if (score >= 60) return { level: 'Fair', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/20' };
    return { level: 'Needs Improvement', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/20' };
  };

  const performance = getPerformanceLevel(stats.averageScore);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    {user?.name || 'User Profile'}
                  </h1>
                  <p className="text-blue-100">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {isEditing && (
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Statistics Overview */}
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
          {/* Performance Analytics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Performance Analytics
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Overall Performance
                    </span>
                    <span className={`text-sm font-semibold ${performance.color}`}>
                      {performance.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${performance.bg.replace('bg-', 'bg-').replace('/20', '')}`}
                      style={{ width: `${stats.averageScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Current Streak
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {stats.streakDays} days
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-orange-500 h-3 rounded-full"
                      style={{ width: `${Math.min((stats.streakDays / 30) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Languages Mastered
                  </h4>
                  <div className="space-y-2">
                    {stats.languages.map((language) => (
                      <div key={language} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {language}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Mastered
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Achievements
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {stats.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                      <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Account Settings
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Email Notifications
                      </span>
                    </div>
                    <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Palette className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Dark Mode
                      </span>
                    </div>
                    <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Data & Privacy</h3>
                <div className="space-y-3">
                  <button className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Export Data</span>
                  </button>
                  <button className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span>Share Progress</span>
                  </button>
                  <button className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <Shield className="h-4 w-4" />
                    <span>Privacy Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 