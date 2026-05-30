import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface CustomerOrderConfirmationProps {
  customerName: string;
  orderNumber: string;
  items: Array<{
    productName: string;
    quantity: number;
    quantityLabel: string;
    price: number;
  }>;
  totalAmount: number;
  paymentMethod: string;
  needsShipping: boolean;
  deliveryAddress?: string;
  preferredDay: string;
  preferredTime: string;
  businessName: string;
  whatsappNumber: string;
}

export const CustomerOrderConfirmation = ({
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
}: CustomerOrderConfirmationProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your order #{orderNumber} has been received!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank You for Your Order!</Heading>

          <Text style={text}>Hi {customerName},</Text>

          <Text style={text}>
            We've received your order and we're excited to start baking for you! 🎉
          </Text>

          <Section style={orderInfoSection}>
            <Text style={orderInfoLabel}>Order Number:</Text>
            <Text style={orderInfoValue}>{orderNumber}</Text>
          </Section>

          <Hr style={hr} />

          <Heading style={h2}>Order Details</Heading>

          {items.map((item, index) => (
            <Section key={index} style={itemSection}>
              <Text style={itemName}>
                {item.quantity}x {item.productName}
              </Text>
              <Text style={itemDetails}>
                {item.quantityLabel} - ${item.price.toFixed(2)}
              </Text>
            </Section>
          ))}

          <Hr style={hr} />

          <Section style={totalSection}>
            <Text style={totalLabel}>Total:</Text>
            <Text style={totalAmount}>${totalAmount.toFixed(2)}</Text>
          </Section>

          <Hr style={hr} />

          <Heading style={h2}>Payment & Delivery</Heading>

          <Section style={infoSection}>
            <Text style={infoLabel}>Payment Method:</Text>
            <Text style={infoValue}>{paymentMethod === 'zelle' ? 'Zelle' : paymentMethod === 'venmo' ? 'Venmo' : 'Credit Card'}</Text>
          </Section>

          <Section style={infoSection}>
            <Text style={infoLabel}>Delivery:</Text>
            <Text style={infoValue}>
              {needsShipping ? deliveryAddress : 'Pickup at our location'}
            </Text>
          </Section>

          <Section style={infoSection}>
            <Text style={infoLabel}>Preferred Day:</Text>
            <Text style={infoValue}>{preferredDay}</Text>
          </Section>

          <Section style={infoSection}>
            <Text style={infoLabel}>Preferred Time:</Text>
            <Text style={infoValue}>{preferredTime}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            We'll send you updates as we prepare your order. If you have any questions,
            feel free to reach out to us on WhatsApp at {whatsappNumber}.
          </Text>

          <Text style={footer}>
            — {businessName}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default CustomerOrderConfirmation;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const h1 = {
  color: '#333',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 40px',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#333',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '30px 0 15px',
  padding: '0 40px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
  padding: '0 40px',
};

const orderInfoSection = {
  padding: '0 40px',
  textAlign: 'center' as const,
};

const orderInfoLabel = {
  color: '#666',
  fontSize: '14px',
  margin: '0',
};

const orderInfoValue = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '8px 0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 40px',
};

const itemSection = {
  padding: '8px 40px',
};

const itemName = {
  color: '#333',
  fontSize: '16px',
  fontWeight: '500',
  margin: '0 0 4px',
};

const itemDetails = {
  color: '#666',
  fontSize: '14px',
  margin: '0',
};

const totalSection = {
  padding: '0 40px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const totalLabel = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
  display: 'inline-block',
};

const totalAmount = {
  color: '#FF6B6B',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
  display: 'inline-block',
};

const infoSection = {
  padding: '8px 40px',
};

const infoLabel = {
  color: '#666',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0 0 4px',
};

const infoValue = {
  color: '#333',
  fontSize: '16px',
  margin: '0',
};

const footer = {
  color: '#666',
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '24px',
  margin: '30px 0',
  padding: '0 40px',
  textAlign: 'center' as const,
};
