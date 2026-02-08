import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const riasecFilter = searchParams.get('riasec');
    const educationFilter = searchParams.get('education');
    const search = searchParams.get('search');

    const supabase = await createClient();
    
    let query = supabase
      .from('careers')
      .select('*')
      .order('title', { ascending: true });

    if (riasecFilter) {
      query = query.or(`primary_riasec.eq.${riasecFilter},secondary_riasec.eq.${riasecFilter}`);
    }

    if (educationFilter) {
      query = query.eq('education_level', educationFilter);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data: careers, error } = await query;

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      careers: careers || [],
      count: careers?.length || 0,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch careers' },
      { status: 500 }
    );
  }
}