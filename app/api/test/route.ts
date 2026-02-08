import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import type { RIASECScores } from '@/types';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { riasec_scores } = body as { riasec_scores: RIASECScores };

    if (!riasec_scores) {
      return NextResponse.json(
        { success: false, error: 'Missing RIASEC scores' },
        { status: 400 }
      );
    }

    // Calculate dominant types
    const sortedTypes = (Object.keys(riasec_scores) as Array<keyof RIASECScores>)
      .sort((a, b) => riasec_scores[b] - riasec_scores[a])
      .slice(0, 3);

    const { data: testResult, error: saveError } = await supabase
      .from('test_results')
      .insert({
        user_id: user.id,
        riasec_scores,
        dominant_types: sortedTypes,
      })      .select()
      .single();

    if (saveError) {
      return NextResponse.json(
        { success: false, error: saveError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, result: testResult });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save test result' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: testResults, error } = await supabase
      .from('test_results')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, result: testResults?.[0] || null });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch test results' },
      { status: 500 }
    );
  }
}