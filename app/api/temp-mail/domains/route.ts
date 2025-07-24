import { NextResponse } from 'next/server';

const TEMP_MAIL_API_URL = process.env.TEMP_MAIL_API_URL || 'https://hub.juheapi.com';
const TEMP_MAIL_API_KEY = process.env.TEMP_MAIL_API_KEY;

export async function GET() {
  try {
    if (!TEMP_MAIL_API_KEY) {
      return NextResponse.json(
        { success: false, message: 'API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(`${TEMP_MAIL_API_URL}/temp-mail/v1/list-domains?apikey=${TEMP_MAIL_API_KEY}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    if (data.code === '0') {
      return NextResponse.json({
        success: true,
        data: {
          domains: data.data?.domains || []
        }
      });
    } else {
      return NextResponse.json(
        { success: false, message: data.msg || 'Failed to fetch domains' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Temp mail domains error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}