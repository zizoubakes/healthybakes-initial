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
  Link,
} from '@react-email/components';
import * as React from 'react';

interface OwnerOrderNotificationProps {
  customerName: string;
  email: string;
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
  studioUrl?: string;
}

export const OwnerOrderNotification = ({
  customerName,
  email,
  orderNumber,
  items,
  totalAmount,
  paymentMethod,
  needsShipping,
  deliveryAddress,
  preferredDay,
  preferredTime,
  studioUrl,
}: OwnerOrderNotificationProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Order #{orderNumber} from {customerName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={alertBanner}>
            <Text style={alertText}>🔔 NEW ORDER RECEIVED</Text>
          </Section>

          <Heading style={h1}>Order #{orderNumber}</Heading>

          <Section style={customerSection}>
            <Text style={label}>Customer:</Text>
            <Text style={value}>{customerName}</Text>
            <Text style={value}>{email}</Text>
          </Section>

          <Hr style={hr} />

          <Heading style={h2}>Order Items</Heading>

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
            <Text style={totalText}>
              <strong>Total:</strong> ${totalAmount.toFixed(2)}
            </Text>
          </Section>

          <Hr style={hr} />

          <Heading style={h2}>Order Details</Heading>

          <Section style={detailsSection}>
            <Text style={detailLabel}>Payment Method:</Text>
            <Text style={detailValue}>
              {paymentMethod === 'zelle' ? 'Zelle' : paymentMethod === 'venmo' ? 'Venmo' : 'Credit Card'}
            </Text>
          </Section>

          <Section style={detailsSection}>
            <Text style={detailLabel}>Delivery:</Text>
            <Text style={detailValue}>
              {needsShipping ? deliveryAddress : 'Pickup'}
            </Text>
          </Section>

          <Section style={detailsSection}>
            <Text style={detailLabel}>Preferred Day:</Text>
            <Text style={detailValue}>{preferredDay}</Text>
          </Section>

          <Section style={detailsSection}>
            <Text style={detailLabel}>Preferred Time:</Text>
            <Text style={detailValue}>{preferredTime}</Text>
          </Section>

          {studioUrl && (
            <>
              <Hr style={hr} />
              <Section style={linkSection}>
                <Link href={studioUrl} style={button}>
                  View Order in Studio
                </Link>
              </Section>
            </>
          )}
        </Container>
      </Body>
    </Html>
  );
};

export default OwnerOrderNotification;

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

const alertBanner = {
  backgroundColor: '#FF6B6B',
  padding: '16px',
  textAlign: 'center' as const,
};

const alertText = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
};

const h1 = {
  color: '#333',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '30px 0 20px',
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

const customerSection = {
  padding: '0 40px',
  textAlign: 'center' as const,
};

const label = {
  color: '#666',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0 0 8px',
};

const value = {
  color: '#333',
  fontSize: '16px',
  margin: '4px 0',
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
  padding: '10px 40px',
  backgroundColor: '#f9fafb',
};

const totalText = {
  color: '#333',
  fontSize: '20px',
  margin: '0',
  textAlign: 'center' as const,
};

const detailsSection = {
  padding: '8px 40px',
};

const detailLabel = {
  color: '#666',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0 0 4px',
};

const detailValue = {
  color: '#333',
  fontSize: '16px',
  margin: '0',
};

const linkSection = {
  padding: '20px 40px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#FF6B6B',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};
