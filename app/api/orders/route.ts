import { NextRequest, NextResponse } from 'next/server';
import { createOrder, type CreateOrderData } from '@/lib/sanity';

export async function POST(request: NextRequest) {
  try {
    const orderData: CreateOrderData = await request.json();

    // Validate required fields
    if (!orderData.customerName || !orderData.email || !orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the order in Sanity
    const result = await createOrder(orderData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        orderId: result.orderId,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Order API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process order',
      },
      { status: 500 }
    );
  }
}
