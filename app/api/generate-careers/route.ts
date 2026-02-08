import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const CAREER_GENERATION_PROMPT = `Generate 15 diverse careers in JSON format.
For each career provide: title, description, primary_riasec (R/I/A/S/E/C),
secondary_riasec, required_skills (array), education_level, salary_range (min/max),
growth_outlook, work_environment, typical_tasks (array).

Return ONLY valid JSON array, no markdown.`;

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(CAREER_GENERATION_PROMPT);
    const response = await result.response;
    let text = response.text().trim();
    
    // Clean markdown formatting
    if (text.startsWith('```json')) text = text.slice(7);
    if (text.startsWith('```')) text = text.slice(3);
    if (text.endsWith('```')) text = text.slice(0, -3);
    text = text.trim();
    
    const careers = JSON.parse(text);
    
    const processedCareers = careers.map((career: any, index: number) => ({
      ...career,
      id: `career_${index + 1}`,
      created_at: new Date().toISOString(),
    }));
    
    return NextResponse.json({
      success: true,
      careers: processedCareers,
      count: processedCareers.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate careers' },
      { status: 500 }
    );
  }
}