import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';

const LanguageSelection: React.FC = () => {
  const navigate = useNavigate();
  const { setConfig } = useQuiz();

  const languages = [
    {
      name: 'Python',
      icon: '🐍',
      description: 'Master Python fundamentals and advanced concepts',
      color: 'from-green-400 to-blue-500',
      questionCount: 450,
    },
    {
      name: 'JavaScript',
      icon: '⚡',
      description: 'Learn modern JavaScript and ES6+ features',
      color: 'from-yellow-400 to-orange-500',
      questionCount: 380,
    },
    {
      name: 'Java',
      icon: '☕',
      description: 'Object-oriented programming and Java ecosystem',
      color: 'from-red-400 to-pink-500',
      questionCount: 350,
    },
    {
      name: 'C++',
      icon: '⚡',
      description: 'Systems programming and performance optimization',
      color: 'from-blue-400 to-purple-500',
      questionCount: 320,
    },
    {
      name: 'C#',
      icon: '#️⃣',
      description: '.NET framework and modern C# features',
      color: 'from-purple-400 to-indigo-500',
      questionCount: 280,
    },
    {
      name: 'Go',
      icon: '🚀',
      description: 'Concurrent programming and cloud-native development',
      color: 'from-teal-400 to-blue-500',
      questionCount: 200,
    },
    {
      name: 'Ruby',
      icon: '💎',
      description: 'Elegant programming and web development',
      color: 'from-red-400 to-red-600',
      questionCount: 180,
    },
    {
      name: 'PHP',
      icon: '🐘',
      description: 'Web development and server-side programming',
      color: 'from-indigo-400 to-purple-500',
      questionCount: 220,
    },
    {
      name: 'Swift',
      icon: '🍎',
      description: 'iOS development and modern Swift features',
      color: 'from-orange-400 to-red-500',
      questionCount: 160,
    },
  ];

  const handleLanguageSelect = (language: string) => {
    setConfig({
      language,
      difficulty: 'mixed',
      questionCount: 20,
      timeLimit: 0,
      categories: [],
    });
    navigate('/configure');
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Select Your Programming Language
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the programming language you want to practice with. Each language offers 
            comprehensive questions across different difficulty levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((language) => (
            <div
              key={language.name}
              onClick={() => handleLanguageSelect(language.name)}
              className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className={`h-32 bg-gradient-to-br ${language.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {language.icon}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {language.name}
                  </h3>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {language.questionCount} questions
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {language.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Available</span>
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
                    Start Practice →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              💡 Pro Tip
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Start with a language you're comfortable with to build confidence, 
              then challenge yourself with new languages to expand your skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;