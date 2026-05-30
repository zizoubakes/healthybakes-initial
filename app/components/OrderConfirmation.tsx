'use client';

import { CheckoutFormData } from './CheckoutForm';
import { CartItem } from '../context/CartContext';

interface OrderConfirmationProps {
  orderData: CheckoutFormData;
  items: CartItem[];
  total: number;
  onClose: () => void;
}

export default function OrderConfirmation({ orderData, items, total, onClose }: OrderConfirmationProps) {
  return (
    <div className="order-confirmation">
      <div className="confirmation-icon">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#5C8A4F" opacity="0.2"/>
          <path d="M9 12l2 2 4-4" stroke="#5C8A4F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="10" stroke="#5C8A4F" strokeWidth="2"/>
        </svg>
      </div>

      <h2>Order Placed Successfully!</h2>
      <p className="confirmation-message">
        Thank you, {orderData.name}! Your order has been received. We'll contact you shortly via WhatsApp to confirm your order and delivery details.
      </p>

      <div className="order-summary-card">
        <h3>Order Summary</h3>

        <div className="summary-section">
          <h4>Contact Information</h4>
          <p>{orderData.name}</p>
          <p>{orderData.email}</p>
        </div>

        <div className="summary-section">
          <h4>Delivery Details</h4>
          {orderData.needsShipping ? (
            <p className="address-text">{orderData.address}</p>
          ) : (
            <p>Pickup</p>
          )}
          <p>
            {orderData.preferredDay.charAt(0).toUpperCase() + orderData.preferredDay.slice(1)} - {' '}
            {orderData.preferredTime.charAt(0).toUpperCase() + orderData.preferredTime.slice(1)}
          </p>
        </div>

        <div className="summary-section">
          <h4>Order Items</h4>
          {items.map((item, index) => (
            <div key={item._id} className="summary-item">
              <span>{item.quantity}x {item.name} ({item.quantityLabel})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="summary-section">
          <h4>Payment Method</h4>
          <p>
            {orderData.paymentMethod === 'zelle' ? 'Zelle' :
             orderData.paymentMethod === 'venmo' ? 'Venmo' :
             'Credit Card'}
          </p>
        </div>

        <div className="summary-total">
          <span>Total:</span>
          <span className="total-price">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="confirmation-note">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
        <p>
          We've received your order! You'll get a WhatsApp message from us shortly to confirm and arrange delivery.
        </p>
      </div>

      <button className="btn btn-coral btn-block" onClick={onClose}>
        Continue Shopping
      </button>
    </div>
  );
}
