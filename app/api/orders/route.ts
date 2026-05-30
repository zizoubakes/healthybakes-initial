import { NextRequest, NextResponse } from 'next/server';
import { createOrder, type CreateOrderData, getSiteSettings } from '@/lib/sanity';
import { sendOrderEmails } from '@/lib/email';

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
      // Send order confirmation emails
      try {
        const settings = await getSiteSettings();

        if (settings) {
          await sendOrderEmails({
            customerName: orderData.customerName,
            customerEmail: orderData.email,
            orderNumber: result.orderNumber || '',
            items: orderData.items,
            totalAmount: orderData.totalAmount,
            paymentMethod: orderData.paymentMethod,
            needsShipping: orderData.needsShipping,
            deliveryAddress: orderData.deliveryAddress,
            preferredDay: orderData.preferredDay,
            preferredTime: orderData.preferredTime,
            businessName: settings.businessName || "Zizou's Healthy Bakes",
            businessEmail: settings.businessEmail || 'orders@zizoubakes.com',
            notificationEmails: settings.notificationEmails || [],
            whatsappNumber: settings.whatsappNumber || '+17572771735',
            enableEmailNotifications: settings.enableEmailNotifications !== false,
          });
        }
      } catch (emailError) {
        // Log email error but don't fail the order
        console.error('Error sending order emails:', emailError);
      }

      return NextResponse.json({
        success: true,
        orderId: result.orderId,
        orderNumber: result.orderNumber,
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
