import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function POST(request: NextRequest) {
  try {
    const { orderNumber, email } = await request.json();

    // Validate required fields
    if (!orderNumber || !email) {
      return NextResponse.json(
        { success: false, error: 'Order number and email are required' },
        { status: 400 }
      );
    }

    // Fetch order from Sanity
    const query = `*[_type == "order" && orderNumber == $orderNumber && email == $email][0] {
      _id,
      orderNumber,
      customerName,
      email,
      items,
      totalAmount,
      needsShipping,
      deliveryAddress,
      preferredDay,
      preferredTime,
      paymentMethod,
      status,
      createdAt
    }`;

    const order = await client.fetch(query, { orderNumber, email });

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found. Please check your order number and email.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Track order API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve order',
      },
      { status: 500 }
    );
  }
}
