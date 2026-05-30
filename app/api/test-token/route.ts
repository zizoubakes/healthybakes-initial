import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.SANITY_API_TOKEN;

  return NextResponse.json({
    hasToken: !!token,
    tokenLength: token?.length || 0,
    tokenStart: token?.substring(0, 10) || 'none',
    tokenEnd: token?.substring(token.length - 10) || 'none',
  });
}
