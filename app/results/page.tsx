'use client';

import Link from 'next/link';
import { Compass, BookOpen, DollarSign, TrendingUp } from 'lucide-react';

export default function ResultsPage() {
  // Sample RIASEC scores for demo
  const scores = { R: 75, I: 85, A: 60, S: 70, E: 65, C: 55 };
  const dominantTypes = ['I', 'R', 'S'];
  
  const RIASEC_LABELS = {
    R: 'Realistic', I: 'Investigative', A: 'Artistic',
    S: 'Social', E: 'Enterprising', C: 'Conventional'
  };

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
            <Link href="/dashboard">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900">
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Career Assessment Results</h1>
          <p className="text-xl text-gray-600">Based on the Holland Code (RIASEC) model</p>
        </div>

        {/* RIASEC Scores */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Personality Profile</h2>
          <div className="space-y-4">
            {Object.entries(scores).map(([type, score]) => (
              <div key={type}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">
                    {RIASEC_LABELS[type as keyof typeof RIASEC_LABELS]}
                    {dominantTypes.includes(type) && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Top Match</span>
                    )}
                  </span>
                  <span className="font-semibold">{score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Recommendations */}
        <div className="mb-8">          <h2 className="text-3xl font-bold mb-4">Recommended Careers</h2>
          <p className="text-gray-600 mb-6">
            Based on your top personality types: Investigative, Realistic, Social
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Sample Career Card */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-xl font-semibold mb-2">Software Developer</h3>
              <p className="text-gray-600 mb-4">
                Design, develop, and maintain software applications and systems.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <span>Bachelor's Degree</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span>$70,000 - $130,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                  <span>Growth: Excellent</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link href="/test">
            <button className="px-6 py-2 border-2 border-gray-300 rounded-md hover:bg-gray-50">              Retake Assessment
            </button>
          </Link>
          <Link href="/explore">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Explore All Careers
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}