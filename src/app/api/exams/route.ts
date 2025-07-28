import { NextResponse } from 'next/server';
import { getExamsForSelection } from '@/features/db/services/serverContentService';

export async function GET() {
  try {
    const exams = await getExamsForSelection();
    
    return NextResponse.json({
      success: true,
      exams
    });

  } catch (error) {
    console.error('Error fetching exams:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exams' }, 
      { status: 500 }
    );
  }
} 