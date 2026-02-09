'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Search, BookOpen, DollarSign, TrendingUp } from 'lucide-react';

interface Career {
  id: string;
  title: string;
  description: string;
  primary_riasec: string;
  secondary_riasec?: string;
  required_skills: string[];
  education_level: string;
  salary_range: { min: number; max: number };
  growth_outlook: string;
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRIASEC, setSelectedRIASEC] = useState('');
  const [allCareers, setAllCareers] = useState<Career[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  const RIASEC_TYPES = [
    { code: 'R', label: 'Realistic' },
    { code: 'I', label: 'Investigative' },
    { code: 'A', label: 'Artistic' },
    { code: 'S', label: 'Social' },
    { code: 'E', label: 'Enterprising' },
    { code: 'C', label: 'Conventional' },
  ];

  // Fetch all careers on mount
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch('/api/careers');
        const data = await response.json();
        
        if (data.success) {
          setAllCareers(data.careers);
          setFilteredCareers(data.careers);
        }
      } catch (error) {
        console.error('Error fetching careers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);
  // Filter careers when search or RIASEC changes
  useEffect(() => {
    let filtered = allCareers;

    // Filter by RIASEC
    if (selectedRIASEC) {
      filtered = filtered.filter(
        (career) =>
          career.primary_riasec === selectedRIASEC ||
          career.secondary_riasec === selectedRIASEC
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (career) =>
          career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          career.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCareers(filtered);
  }, [searchQuery, selectedRIASEC, allCareers]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading careers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            />
          </div>

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

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Showing {filteredCareers.length} of {allCareers.length} careers
        </div>

        {/* Career Grid */}
        {filteredCareers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No careers found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRIASEC('');
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((career) => (
              <div key={career.id} className="bg-white rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-2">{career.title}</h3>
                <p className="text-gray-600 mb-4">{career.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-gray-400" />
                    <span>{career.education_level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span>${career.salary_range.min.toLocaleString()} - ${career.salary_range.max.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <span>Growth: {career.growth_outlook}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}