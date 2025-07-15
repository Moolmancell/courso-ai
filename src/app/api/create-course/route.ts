import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();

    // Simulate basic validation
    if (!topic || topic.trim().length < 5) {
      return NextResponse.json(
        { responseMessage: 'Please enter a more descriptive topic.' },
        { status: 200 }
      );
    }

    // Simulate successful response
    const mockCourseID = Math.random().toString(36).substring(2, 10); // random string
    return NextResponse.json(
      { courseID: mockCourseID },
      { status: 200 }
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
