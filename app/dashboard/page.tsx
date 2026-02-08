'use client';

import Link from 'next/link';
import { Compass, Target, TrendingUp, LogOut } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Compass className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">Career Compass</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/explore">
                <button className="px-4 py-2 text-gray-700 hover:text-gray-900">
                  Explore Careers
                </button>
              </Link>
              <Link href="/">
                <button className="px-4 py-2 text-gray-700 hover:text-gray-900 flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back!</h1>
          <p className="text-xl text-gray-600">Ready to discover your ideal career path?</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Take Assessment Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-600">
            <Target className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Take Assessment</h3>
            <p className="text-gray-600 mb-4">
              Complete the Holland Code aptitude test to discover your career personality type.
            </p>
            <Link href="/test">
              <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Start Test
              </button>
            </Link>
          </div>

          {/* View Results Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <TrendingUp className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">View Results</h3>
            <p className="text-gray-600 mb-4">
              See your personalized career recommendations based on your assessment.
            </p>
            <Link href="/results">              <button className="w-full py-2 border-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                View Results
              </button>
            </Link>
          </div>

          {/* Explore Careers Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Compass className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Explore Careers</h3>
            <p className="text-gray-600 mb-4">
              Browse our comprehensive database of careers and find opportunities that match your interests.
            </p>
            <Link href="/explore">
              <button className="w-full py-2 border-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                Explore Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}