import type { TestQuestion } from '@/types';

export const TEST_QUESTIONS: TestQuestion[] = [
  // Realistic (R) - 3 questions
  { id: 1, question: 'I enjoy working with tools, machinery, or mechanical equipment', type: 'R' },
  { id: 2, question: 'I prefer hands-on work and physical activities over desk work', type: 'R' },
  { id: 3, question: 'I like building, fixing, or repairing things', type: 'R' },
  
  // Investigative (I) - 3 questions
  { id: 4, question: 'I enjoy analyzing data and solving complex problems', type: 'I' },
  { id: 5, question: 'I like conducting research and experiments', type: 'I' },
  { id: 6, question: 'I prefer working independently on intellectual challenges', type: 'I' },
  
  // Artistic (A) - 3 questions
  { id: 7, question: 'I enjoy creative activities like writing, art, or music', type: 'A' },
  { id: 8, question: 'I value expressing my ideas in unique and original ways', type: 'A' },
  { id: 9, question: 'I prefer flexible work environments that allow for creativity', type: 'A' },
  
  // Social (S) - 3 questions
  { id: 10, question: 'I enjoy helping others and making a positive impact', type: 'S' },
  { id: 11, question: 'I like teaching, mentoring, or counseling people', type: 'S' },
  { id: 12, question: 'I prefer working in teams and collaborative environments', type: 'S' },
  
  // Enterprising (E) - 3 questions
  { id: 13, question: 'I enjoy leading projects and influencing others', type: 'E' },
  { id: 14, question: 'I like taking risks and pursuing ambitious goals', type: 'E' },
  { id: 15, question: 'I prefer competitive environments and business challenges', type: 'E' },
  
  // Conventional (C) - 3 questions
  { id: 16, question: 'I enjoy organizing information and maintaining records', type: 'C' },
  { id: 17, question: 'I prefer structured work with clear rules and procedures', type: 'C' },
  { id: 18, question: 'I like working with numbers, data, and detail-oriented tasks', type: 'C' },
];