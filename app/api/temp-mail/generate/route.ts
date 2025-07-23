import { NextResponse } from 'next/server';

const TEMP_MAIL_API_URL = process.env.TEMP_MAIL_API_URL;
const TEMP_MAIL_API_KEY = process.env.TEMP_MAIL_API_KEY;

export async function POST() {
  try {
    if (!TEMP_MAIL_API_KEY) {
      return NextResponse.json(
        { success: false, message: 'API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(`${TEMP_MAIL_API_URL}/temp-mail/v1/create?apikey=${TEMP_MAIL_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    if (data.code === '0' && data.data?.email_address) {
      return NextResponse.json({
        success: true,
        data: {
          email: data.data.email_address,
          expires_at: data.data.expires_at,
          message: data.data.message || 'Email created successfully'
        }
      });
    } else {
      return NextResponse.json(
        { success: false, message: data.msg || 'Failed to create email' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Temp mail generation error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}