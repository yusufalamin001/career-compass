'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Compass, ArrowLeft, ArrowRight } from 'lucide-react';

const TEST_QUESTIONS = [
  { id: 1, question: 'I enjoy working with tools, machinery, or mechanical equipment', type: 'R' },
  { id: 2, question: 'I prefer hands-on work and physical activities over desk work', type: 'R' },
  { id: 3, question: 'I like building, fixing, or repairing things', type: 'R' },
  { id: 4, question: 'I enjoy analyzing data and solving complex problems', type: 'I' },
  { id: 5, question: 'I like conducting research and experiments', type: 'I' },
  { id: 6, question: 'I prefer working independently on intellectual challenges', type: 'I' },
  { id: 7, question: 'I enjoy creative activities like writing, art, or music', type: 'A' },
  { id: 8, question: 'I value expressing my ideas in unique and original ways', type: 'A' },
  { id: 9, question: 'I prefer flexible work environments that allow for creativity', type: 'A' },
  { id: 10, question: 'I enjoy helping others and making a positive impact', type: 'S' },
  { id: 11, question: 'I like teaching, mentoring, or counseling people', type: 'S' },
  { id: 12, question: 'I prefer working in teams and collaborative environments', type: 'S' },
  { id: 13, question: 'I enjoy leading projects and influencing others', type: 'E' },
  { id: 14, question: 'I like taking risks and pursuing ambitious goals', type: 'E' },
  { id: 15, question: 'I prefer competitive environments and business challenges', type: 'E' },
  { id: 16, question: 'I enjoy organizing information and maintaining records', type: 'C' },
  { id: 17, question: 'I prefer structured work with clear rules and procedures', type: 'C' },
  { id: 18, question: 'I like working with numbers, data, and detail-oriented tasks', type: 'C' },
];

export default function TestPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const progress = (Object.keys(answers).length / TEST_QUESTIONS.length) * 100;
  const isComplete = Object.keys(answers).length === TEST_QUESTIONS.length;

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [TEST_QUESTIONS[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < TEST_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScores = () => {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const counts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    TEST_QUESTIONS.forEach((q) => {
      const answer = answers[q.id];
      if (answer) {
        scores[q.type as keyof typeof scores] += answer;
        counts[q.type as keyof typeof counts] += 1;
      }
    });

    // Convert to percentages
    const percentageScores: Record<string, number> = {};
    Object.keys(scores).forEach((type) => {
      const key = type as keyof typeof scores;
      percentageScores[type] = Math.round((scores[key] / (counts[key] * 5)) * 100);
    });

    return percentageScores;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const scores = calculateScores();
      
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ riasec_scores: scores }),
      });

      if (response.ok) {
        router.push('/results');
      } else {
        alert('Failed to submit test. Please try again.');
      }
    } catch (error) {
      alert('Error submitting test. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="border-b bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Compass className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">Career Compass</span>
            </Link>
            <div className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {TEST_QUESTIONS.length}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Holland Code Aptitude Test</h1>
          <p className="text-gray-600">Answer honestly to discover your career personality type.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Progress</span>
            <span className="text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{TEST_QUESTIONS[currentQuestion].question}</h2>
          <p className="text-sm text-gray-600 mb-4">Select the option that best describes you</p>          
          <div className="space-y-3">
            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((label, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index + 1)}
                className={`w-full p-4 rounded-lg border-2 text-left transition ${
                  answers[TEST_QUESTIONS[currentQuestion].id] === index + 1
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-2 border-2 border-gray-300 rounded-md disabled:opacity-50 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>

          {currentQuestion < TEST_QUESTIONS.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!answers[TEST_QUESTIONS[currentQuestion].id]}
              className="px-6 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 flex items-center gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isComplete || submitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Test'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}