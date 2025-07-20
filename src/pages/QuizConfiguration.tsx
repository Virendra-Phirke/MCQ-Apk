import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';
import { Clock, Target, Layers, Settings, Play, ArrowLeft } from 'lucide-react';

const QuizConfiguration: React.FC = () => {
  const navigate = useNavigate();
  const { config, setConfig, startQuiz } = useQuiz();
  
  const [localConfig, setLocalConfig] = useState({
    language: config?.language || 'Python',
    difficulty: config?.difficulty || 'mixed',
    questionCount: config?.questionCount || 20,
    timeLimit: config?.timeLimit || 0,
    categories: config?.categories || [],
  });

  const difficulties = [
    { value: 'beginner', label: 'Beginner', description: 'Basic concepts and syntax', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
    { value: 'intermediate', label: 'Intermediate', description: 'Advanced features and patterns', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' },
    { value: 'advanced', label: 'Advanced', description: 'Expert-level concepts', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' },
    { value: 'mixed', label: 'Mixed', description: 'All difficulty levels', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
  ];

  const questionCounts = [5, 10, 15, 20, 25, 30, 50];
  const timeLimits = [
    { value: 0, label: 'No Limit' },
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '60 minutes' },
    { value: 90, label: '90 minutes' },
  ];

  const handleStart = () => {
    setConfig(localConfig);
    startQuiz();
    navigate('/quiz');
  };

  const updateLocalConfig = (key: string, value: any) => {
    setLocalConfig(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/languages')}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Languages
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Configure Your Quiz
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Customize your practice session for the best learning experience
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Selected Language */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {localConfig.language} Quiz Configuration
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Personalize your practice session
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Difficulty Level */}
            <div>
              <div className="flex items-center mb-4">
                <Layers className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Difficulty Level
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty.value}
                    onClick={() => updateLocalConfig('difficulty', difficulty.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      localConfig.difficulty === difficulty.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                    }`}
                  >
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${difficulty.color}`}>
                      {difficulty.label}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {difficulty.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div>
              <div className="flex items-center mb-4">
                <Target className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Number of Questions
                </h3>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                {questionCounts.map((count) => (
                  <button
                    key={count}
                    onClick={() => updateLocalConfig('questionCount', count)}
                    className={`p-3 rounded-lg font-medium transition-all duration-200 ${
                      localConfig.questionCount === count
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Limit */}
            <div>
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Time Limit
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {timeLimits.map((time) => (
                  <button
                    key={time.value}
                    onClick={() => updateLocalConfig('timeLimit', time.value)}
                    className={`p-3 rounded-lg font-medium text-center transition-all duration-200 ${
                      localConfig.timeLimit === time.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    {time.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quiz Summary */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quiz Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Language:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {localConfig.language}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Difficulty:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">
                    {localConfig.difficulty}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Questions:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {localConfig.questionCount}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Time Limit:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {localConfig.timeLimit === 0 ? 'No limit' : `${localConfig.timeLimit} minutes`}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Estimated Time:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {Math.ceil(localConfig.questionCount * 1.5)} minutes
                  </span>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleStart}
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                <Play className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizConfiguration;