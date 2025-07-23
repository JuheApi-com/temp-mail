import { NextRequest, NextResponse } from 'next/server';

const TEMP_MAIL_API_URL = 'https://hub.juheapi.com';
const TEMP_MAIL_API_KEY = process.env.JUHE_TEMP_MAIL_API_KEY;

export async function POST(request: NextRequest) {
  try {
    if (!TEMP_MAIL_API_KEY) {
      return NextResponse.json(
        { success: false, message: 'API key not configured' },
        { status: 500 }
      );
    }

    const { email } = await request.json();
    console.log('Received email parameter:', email);
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email address is required' },
        { status: 400 }
      );
    }

    const requestBody = { mailbox_identifier: email };
    console.log('Sending request body:', JSON.stringify(requestBody));

    const response = await fetch(`${TEMP_MAIL_API_URL}/temp-mail/v1/get-emails?apikey=${TEMP_MAIL_API_KEY}&email_address=${encodeURIComponent(email)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log('Messages API Response:', JSON.stringify(data, null, 2));
    
    if (data.code === '0') {
      // Transform API response to match frontend interface
      const emails = data.data?.emails || [];
      const messages = emails.map((email: any) => ({
        id: email.email_key,
        from: email.from_address,
        subject: email.subject,
        received_at: new Date(email.timestamp * 1000).toISOString(),
        preview: email.content.substring(0, 100) + (email.content.length > 100 ? '...' : ''),
        body_text: email.content,
        body_html: email.content
      }));

      return NextResponse.json({
        success: true,
        data: {
          messages: messages
        }
      });
    } else {
      return NextResponse.json(
        { success: false, message: data.msg || 'Failed to fetch messages' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Temp mail messages error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}