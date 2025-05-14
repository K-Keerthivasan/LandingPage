// src/app/api/verify-captcha/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();
    const token = body.token;
    const secret = process.env.HCAPTCHA_SECRET_KEY;

    const response = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `response=${token}&secret=${secret}`,
    });

    const data = await response.json();
    return NextResponse.json({ success: data.success });
}
