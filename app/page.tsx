import Link from 'next/link';
import { Compass, Target, TrendingUp, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Compass className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold">Career Compass</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth">
                <button className="px-4 py-2 text-gray-700 hover:text-gray-900">
                  Sign In
                </button>
              </Link>
              <Link href="/auth">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">            Discover Your Ideal Career Path
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Navigate your future with confidence. Take our validated Holland Code aptitude test
            and get personalized career recommendations tailored to your unique strengths.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700">
                Start Your Journey
              </button>
            </Link>
            <Link href="/explore">
              <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-md text-lg hover:bg-blue-50">
                Explore Careers
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            How Career Compass Helps You
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Target className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Validated Assessment</h3>
              <p className="text-gray-600">Take the Holland Code aptitude test - a scientifically validated career assessment used worldwide.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />              <h3 className="text-xl font-semibold mb-2">Personalized Recommendations</h3>
              <p className="text-gray-600">Receive 3-5 career matches based on your unique personality profile with detailed information.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Career Explorer</h3>
              <p className="text-gray-600">Browse and filter our comprehensive career database to discover opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Career Compass. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}