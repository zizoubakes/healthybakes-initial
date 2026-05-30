import { Resend } from 'resend';
import { render } from '@react-email/render';
import CustomerOrderConfirmation from './emails/customer-order-confirmation';
import OwnerOrderNotification from './emails/owner-order-notification';
import { OrderItem } from './sanity';

// Initialize Resend only if API key is available
const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
};

interface SendOrderEmailsParams {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'zelle' | 'venmo' | 'credit-card';
  needsShipping: boolean;
  deliveryAddress?: string;
  preferredDay: string;
  preferredTime: string;
  businessName: string;
  businessEmail: string;
  notificationEmails: string[];
  whatsappNumber: string;
  enableEmailNotifications: boolean;
}

export async function sendOrderEmails(params: SendOrderEmailsParams) {
  const {
    customerName,
    customerEmail,
    orderNumber,
    items,
    totalAmount,
    paymentMethod,
    needsShipping,
    deliveryAddress,
    preferredDay,
    preferredTime,
    businessName,
    businessEmail,
    notificationEmails,
    whatsappNumber,
    enableEmailNotifications,
  } = params;

  const results = {
    customerEmail: { success: false, error: '' },
    ownerEmails: { success: false, error: '' },
  };

  // Don't send emails if notifications are disabled
  if (!enableEmailNotifications) {
    console.log('Email notifications are disabled in settings');
    return results;
  }

  // Get Resend client
  const resend = getResendClient();

  // Don't send emails if Resend API key is not configured
  if (!resend) {
    console.log('RESEND_API_KEY is not configured');
    results.customerEmail.error = 'Email service not configured';
    results.ownerEmails.error = 'Email service not configured';
    return results;
  }

  try {
    // Send customer confirmation email
    const customerEmailHtml = await render(
      CustomerOrderConfirmation({
        customerName,
        orderNumber,
        items,
        totalAmount,
        paymentMethod,
        needsShipping,
        deliveryAddress,
        preferredDay,
        preferredTime,
        businessName,
        whatsappNumber,
      })
    );

    await resend.emails.send({
      from: `${businessName} <${businessEmail}>`,
      to: customerEmail,
      subject: `Order Confirmation #${orderNumber} - ${businessName}`,
      html: customerEmailHtml,
    });

    results.customerEmail.success = true;
    console.log(`Customer confirmation email sent to ${customerEmail}`);
  } catch (error) {
    console.error('Error sending customer email:', error);
    results.customerEmail.error = error instanceof Error ? error.message : 'Unknown error';
  }

  // Send owner notification emails
  if (notificationEmails && notificationEmails.length > 0) {
    try {
      const ownerEmailHtml = await render(
        OwnerOrderNotification({
          customerName,
          email: customerEmail,
          orderNumber,
          items,
          totalAmount,
          paymentMethod,
          needsShipping,
          deliveryAddress,
          preferredDay,
          preferredTime,
          studioUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/studio`,
        })
      );

      // Send to all notification emails
      await resend.emails.send({
        from: `${businessName} Orders <${businessEmail}>`,
        to: notificationEmails,
        subject: `🔔 New Order #${orderNumber} from ${customerName}`,
        html: ownerEmailHtml,
      });

      results.ownerEmails.success = true;
      console.log(`Owner notification emails sent to ${notificationEmails.join(', ')}`);
    } catch (error) {
      console.error('Error sending owner notification emails:', error);
      results.ownerEmails.error = error instanceof Error ? error.message : 'Unknown error';
    }
  }

  return results;
}
