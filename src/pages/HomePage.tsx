import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  TrendingUp, 
  Users, 
  Award, 
  Brain, 
  Clock, 
  Target, 
  Smartphone,
  ArrowRight,
  Play
} from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Code,
      title: 'Multiple Programming Languages',
      description: 'Practice with Python, Java, JavaScript, C++, and more with comprehensive question banks.',
    },
    {
      icon: TrendingUp,
      title: 'Adaptive Difficulty Levels',
      description: 'Progress from beginner to advanced with intelligent difficulty adjustment based on performance.',
    },
    {
      icon: Brain,
      title: 'Detailed Performance Analytics',
      description: 'Track your progress with comprehensive analytics and personalized improvement recommendations.',
    },
    {
      icon: Smartphone,
      title: 'Mobile-Friendly Experience',
      description: 'Practice coding anywhere with our fully responsive design optimized for all devices.',
    },
  ];

  const stats = [
    { label: 'Total Questions', value: '2,500+', icon: Target },
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Languages Supported', value: '9', icon: Code },
    { label: 'Avg. Completion Time', value: '25 min', icon: Clock },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Master Coding Skills Through
              <span className="text-blue-600 dark:text-blue-400 block mt-2">
                Interactive Practice
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Enhance your programming expertise with our comprehensive MCQ platform. 
              Practice with real-world scenarios, track your progress, and get personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/languages"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                <Play className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                Start Practice Now
              </Link>
              <a
                href="#features"
                className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all duration-200 group"
              >
                Learn More
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors duration-200">
                  <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose CodeMaster?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform is designed to help you excel in programming interviews and 
              strengthen your coding fundamentals through comprehensive practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group hover:transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors duration-200">
                  <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Level Up Your Coding Skills?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of developers who are already improving their programming skills with CodeMaster.
          </p>
          <Link
            to="/languages"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group"
          >
            <Award className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;