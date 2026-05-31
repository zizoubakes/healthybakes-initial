import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { client } from '@/lib/sanity';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all orders for this customer email
    const query = `*[_type == "order" && email == $email] | order(createdAt desc) {
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
      notes,
      createdAt
    }`;

    const orders = await client.fetch(query, { email: session.user.email });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
