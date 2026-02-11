'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Compass, BookOpen, DollarSign, TrendingUp, Briefcase } from 'lucide-react';

interface RIASECScores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

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

export default function ResultsPage() {
  const [scores, setScores] = useState<RIASECScores | null>(null);
  const [dominantTypes, setDominantTypes] = useState<string[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCareer, setExpandedCareer] = useState<string | null>(null);

  const RIASEC_LABELS: Record<string, string> = {
    R: 'Realistic', I: 'Investigative', A: 'Artistic',
    S: 'Social', E: 'Enterprising', C: 'Conventional'
  };

  // Format salary in Naira (values already in Naira in database)
  const formatSalaryNGN = (min: number, max: number) => {
    // Convert to millions for better readability
    const minM = min / 1000000;
    const maxM = max / 1000000;
    
    const formatNumber = (num: number) => {
      // Show one decimal place if not a whole number
      return num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);
    };
    
    return `₦${formatNumber(minM)}M - ₦${formatNumber(maxM)}M/year`;
  };
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const testRes = await fetch('/api/test');
        const testData = await testRes.json();
        
        if (testData.success && testData.result) {
          setScores(testData.result.riasec_scores);
          setDominantTypes(testData.result.dominant_types);

          const careersRes = await fetch(`/api/careers?riasec=${testData.result.dominant_types[0]}`);
          const careersData = await careersRes.json();
          
          if (careersData.success) {
            setCareers(careersData.careers.slice(0, 5));
          }
        }
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!scores) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Test Results Found</h2>
          <p className="text-gray-600 mb-4">Please take the aptitude test first.</p>
          <Link href="/test">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md">
              Take Test
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Career Assessment Results</h1>
          <p className="text-xl text-gray-600">Based on the Holland Code (RIASEC) model</p>
        </div>

        <div className="bg-white rounded-lg border p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Personality Profile</h2>
          <div className="space-y-4">
            {Object.entries(scores).map(([type, score]) => (
              <div key={type}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">
                    {RIASEC_LABELS[type]}
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

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Recommended Careers</h2>
          <p className="text-gray-600 mb-6">
            Based on your top personality types: {dominantTypes.map(t => RIASEC_LABELS[t]).join(', ')}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {careers.map((career) => (
              <div key={career.id} className="bg-white rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-2">{career.title}</h3>
                <p className="text-gray-600 mb-4">{career.description}</p>                
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
                </div>

                {/* Expandable More Info */}
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
                    
                    <div className="mb-3">
                      <h4 className="font-semibold text-sm mb-2">Work Environment</h4>
                      <p className="text-sm text-gray-600">{career.work_environment}</p>
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
        </div>

        <div className="flex gap-4">
          <Link href="/test">
            <button className="px-6 py-2 border-2 border-gray-300 rounded-md hover:bg-gray-50">
              Retake Assessment
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