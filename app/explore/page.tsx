'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Search, BookOpen, DollarSign, TrendingUp, Briefcase, MapPin } from 'lucide-react';

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
  work_environment: string;
  typical_tasks: string[];
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRIASEC, setSelectedRIASEC] = useState('');
  const [allCareers, setAllCareers] = useState<Career[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCareer, setExpandedCareer] = useState<string | null>(null);

  const RIASEC_TYPES = [
    { code: 'R', label: 'Realistic' },
    { code: 'I', label: 'Investigative' },
    { code: 'A', label: 'Artistic' },
    { code: 'S', label: 'Social' },
    { code: 'E', label: 'Enterprising' },
    { code: 'C', label: 'Conventional' },
  ];

  // Convert USD to Naira
  const formatSalaryNGN = (min: number, max: number) => {
    const USD_TO_NGN = 1600; // Exchange rate
    const minNGN = min * USD_TO_NGN;
    const maxNGN = max * USD_TO_NGN;
    
    const formatNumber = (num: number) => {
      return new Intl.NumberFormat('en-NG').format(num);
    };
    
    return `₦${formatNumber(minNGN)} - ₦${formatNumber(maxNGN)}`;
  };
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

    if (selectedRIASEC) {
      filtered = filtered.filter(
        (career) =>
          career.primary_riasec === selectedRIASEC ||
          career.secondary_riasec === selectedRIASEC
      );
    }

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
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search careers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

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

        <div className="mb-4 text-gray-600">
          Showing {filteredCareers.length} of {allCareers.length} careers
        </div>

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
                <p className="text-gray-600 mb-4 line-clamp-2">{career.description}</p>                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-gray-400" />
                    <span>{career.education_level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span>{formatSalaryNGN(career.salary_range.min, career.salary_range.max)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <span>Growth: {career.growth_outlook}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{career.work_environment}</span>
                  </div>
                </div>

                {/* Expandable Section for More Info */}
                {expandedCareer === career.id ? (
                  <div className="border-t pt-4 mt-4">
                    <div className="mb-3">
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        Required Skills
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {career.required_skills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Typical Tasks</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {career.typical_tasks.slice(0, 5).map((task, idx) => (
                          <li key={idx}>{task}</li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => setExpandedCareer(null)}
                      className="mt-4 text-blue-600 text-sm hover:underline"
                    >
                      Show Less
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setExpandedCareer(career.id)}
                    className="mt-2 text-blue-600 text-sm hover:underline"
                  >
                    View More Details
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}