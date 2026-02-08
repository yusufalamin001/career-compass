'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Compass, Search, BookOpen, DollarSign, TrendingUp } from 'lucide-react';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRIASEC, setSelectedRIASEC] = useState('');

  const RIASEC_TYPES = [
    { code: 'R', label: 'Realistic' },
    { code: 'I', label: 'Investigative' },
    { code: 'A', label: 'Artistic' },
    { code: 'S', label: 'Social' },
    { code: 'E', label: 'Enterprising' },
    { code: 'C', label: 'Conventional' },
  ];

  // Sample careers for demo
  const careers = [
    {
      title: 'Software Developer',
      description: 'Design and develop software applications',
      riasec: 'I',
      education: "Bachelor's Degree",
      salary: '$70,000 - $130,000',
      growth: 'Excellent'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white">        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Compass className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">Career Compass</span>
            </Link>
            <Link href="/dashboard">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900">Dashboard</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Career Explorer</h1>
          <p className="text-xl text-gray-600">Discover and explore career opportunities</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter
          </h2>
          
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search careers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />          </div>

          {/* RIASEC Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Filter by Personality Type</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRIASEC('')}
                className={`px-4 py-2 rounded-md ${!selectedRIASEC ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              >
                All
              </button>
              {RIASEC_TYPES.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => setSelectedRIASEC(code)}
                  className={`px-4 py-2 rounded-md ${selectedRIASEC === code ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                >
                  {code} - {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Career Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career, index) => (
            <div key={index} className="bg-white rounded-lg border p-6">
              <h3 className="text-xl font-semibold mb-2">{career.title}</h3>
              <p className="text-gray-600 mb-4">{career.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <span>{career.education}</span>                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span>{career.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                  <span>Growth: {career.growth}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}