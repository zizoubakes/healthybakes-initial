'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { getSiteSettings, urlFor } from '@/lib/sanity';
import CheckoutForm, { CheckoutFormData } from './CheckoutForm';
import PaymentInstructions from './PaymentInstructions';
import OrderConfirmation from './OrderConfirmation';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [whatsappNumber, setWhatsappNumber] = useState('17572771735');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderData, setConfirmedOrderData] = useState<CheckoutFormData | null>(null);
  const [confirmedItems, setConfirmedItems] = useState<typeof items>([]);

  // Fetch WhatsApp number from Sanity
  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getSiteSettings();
      if (settings?.whatsappNumber) {
        setWhatsappNumber(settings.whatsappNumber);
      }
    };
    fetchSettings();
  }, []);

  // Prevent body scroll when modal is open and reset form state
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setShowCheckoutForm(false);
      setShowPaymentInstructions(false);
      setOrderConfirmed(false);
      setConfirmedOrderData(null);
      setConfirmedItems([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleProceedToCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleCheckoutSubmit = (formData: CheckoutFormData) => {
    // Save order data and items for payment screen
    setConfirmedOrderData(formData);
    setConfirmedItems([...items]);

    // Show payment instructions screen
    setShowPaymentInstructions(true);
    setShowCheckoutForm(false);
  };

  const handlePaymentComplete = async () => {
    if (!confirmedOrderData) return;

    // Prepare order data for API
    const orderTotal = confirmedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderData = {
      customerName: confirmedOrderData.name,
      email: confirmedOrderData.email,
      items: confirmedItems.map(item => ({
        productName: item.name,
        productId: item._id,
        quantity: item.quantity,
        quantityLabel: item.quantityLabel,
        price: item.price,
      })),
      totalAmount: orderTotal,
      needsShipping: confirmedOrderData.needsShipping,
      deliveryAddress: confirmedOrderData.address,
      preferredDay: confirmedOrderData.preferredDay,
      preferredTime: confirmedOrderData.preferredTime,
      paymentMethod: confirmedOrderData.paymentMethod,
    };

    try {
      // Save order via API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        // Show confirmation screen
        setOrderConfirmed(true);
        setShowPaymentInstructions(false);

        // Clear cart after order is placed successfully
        clearCart();
      } else {
        // Show error to user
        alert('Failed to place order. Please try again or contact us directly via WhatsApp.');
        console.error('Order creation failed:', result.error);
      }
    } catch (error) {
      alert('Failed to place order. Please try again or contact us directly via WhatsApp.');
      console.error('Order API error:', error);
    }
  };

  const handleBackToCart = () => {
    setShowCheckoutForm(false);
  };

  const handleBackToCheckout = () => {
    setShowPaymentInstructions(false);
    setShowCheckoutForm(true);
  };

  const handleConfirmationClose = () => {
    setOrderConfirmed(false);
    setConfirmedOrderData(null);
    setConfirmedItems([]);
    onClose();
  };

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        {!showCheckoutForm && !showPaymentInstructions && !orderConfirmed && (
          <div className="cart-modal-header">
            <h2>Your Cart</h2>
            <button
              className="cart-close-btn"
              onClick={onClose}
              aria-label="Close cart"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        )}

        <div className="cart-modal-body">
          {orderConfirmed && confirmedOrderData ? (
            <OrderConfirmation
              orderData={confirmedOrderData}
              items={confirmedItems}
              total={confirmedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
              onClose={handleConfirmationClose}
            />
          ) : showPaymentInstructions && confirmedOrderData ? (
            <PaymentInstructions
              paymentMethod={confirmedOrderData.paymentMethod as 'zelle' | 'venmo'}
              total={confirmedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
              phoneNumber={whatsappNumber}
              onComplete={handlePaymentComplete}
              onBack={handleBackToCheckout}
            />
          ) : showCheckoutForm ? (
            <CheckoutForm
              onSubmit={handleCheckoutSubmit}
              onBack={handleBackToCart}
              total={total}
            />
          ) : (
            <>
              {items.length === 0 ? (
                <div className="cart-empty">
                  <div className="cart-empty-icon">🛒</div>
                  <h3>Your cart is empty</h3>
                  <p>Add some delicious bakes to get started!</p>
                  <button className="btn btn-coral" onClick={onClose}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {items.map((item) => (
                      <div key={item._id} className="cart-item">
                        {item.image && (
                          <div className="cart-item-image">
                            <Image
                              src={urlFor(item.image).width(120).height(120).url()}
                              alt={item.name}
                              width={80}
                              height={80}
                              style={{ objectFit: 'cover', borderRadius: '12px' }}
                            />
                          </div>
                        )}
                        <div className="cart-item-details">
                          <h4>{item.name}</h4>
                          <p className="cart-item-quantity-label">{item.quantityLabel}</p>
                          <p className="cart-item-price">${item.price}</p>
                        </div>
                        <div className="cart-item-actions">
                          <div className="cart-quantity-controls">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="cart-remove-btn"
                            onClick={() => removeItem(item._id)}
                            aria-label="Remove item"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cart-modal-footer">
                    <div className="cart-total">
                      <span>Total:</span>
                      <span className="cart-total-amount">${total.toFixed(2)}</span>
                    </div>
                    <button className="btn btn-coral btn-block" onClick={handleProceedToCheckout}>
                      Proceed to Checkout
                    </button>
                    <button className="btn btn-ghost btn-block" onClick={clearCart}>
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
