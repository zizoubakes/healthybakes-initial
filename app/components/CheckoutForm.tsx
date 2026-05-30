'use client';

import { useState } from 'react';

export interface CheckoutFormData {
  name: string;
  email: string;
  needsShipping: boolean;
  address: string;
  preferredDay: string;
  preferredTime: string;
  paymentMethod: 'zelle' | 'venmo' | 'credit-card' | '';
}

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  onBack: () => void;
  total: number;
}

export default function CheckoutForm({ onSubmit, onBack, total }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    email: '',
    needsShipping: false,
    address: '',
    preferredDay: '',
    preferredTime: '',
    paymentMethod: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof CheckoutFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.needsShipping && !formData.address.trim()) {
      newErrors.address = 'Address is required for shipping';
    }

    if (!formData.preferredDay) {
      newErrors.preferredDay = 'Please select a preferred day';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a preferred time';
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="checkout-form-container">
      <div className="checkout-form-header">
        <button className="back-button" onClick={onBack} type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to Cart
        </button>
        <h2>Checkout</h2>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Contact Information</h3>

          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Jane Doe"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="jane@example.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>

        <div className="form-section">
          <h3>Delivery Options</h3>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="needsShipping"
                checked={formData.needsShipping}
                onChange={handleChange}
              />
              <span>I need shipping/delivery</span>
            </label>
          </div>

          {formData.needsShipping && (
            <div className="form-group">
              <label htmlFor="address">Delivery Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
                placeholder="123 Main St, Ashburn, VA 20147"
                rows={3}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="preferredDay">Preferred Day *</label>
              <select
                id="preferredDay"
                name="preferredDay"
                value={formData.preferredDay}
                onChange={handleChange}
                className={errors.preferredDay ? 'error' : ''}
              >
                <option value="">Select a day</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
              {errors.preferredDay && <span className="error-message">{errors.preferredDay}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="preferredTime">Preferred Time *</label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className={errors.preferredTime ? 'error' : ''}
              >
                <option value="">Select a time</option>
                <option value="morning">Morning (8am - 12pm)</option>
                <option value="afternoon">Afternoon (12pm - 5pm)</option>
                <option value="evening">Evening (5pm - 8pm)</option>
              </select>
              {errors.preferredTime && <span className="error-message">{errors.preferredTime}</span>}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Payment Method</h3>

          <div className="payment-methods">
            <label className={`payment-option ${formData.paymentMethod === 'zelle' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="zelle"
                checked={formData.paymentMethod === 'zelle'}
                onChange={handleChange}
              />
              <div className="payment-content">
                <span className="payment-icon">💰</span>
                <span className="payment-name">Zelle</span>
              </div>
            </label>

            <label className={`payment-option ${formData.paymentMethod === 'venmo' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="venmo"
                checked={formData.paymentMethod === 'venmo'}
                onChange={handleChange}
              />
              <div className="payment-content">
                <span className="payment-icon">💳</span>
                <span className="payment-name">Venmo</span>
              </div>
            </label>

            <label className={`payment-option ${formData.paymentMethod === 'credit-card' ? 'selected' : ''} disabled`}>
              <input
                type="radio"
                name="paymentMethod"
                value="credit-card"
                disabled
                checked={formData.paymentMethod === 'credit-card'}
                onChange={handleChange}
              />
              <div className="payment-content">
                <span className="payment-icon">💳</span>
                <div>
                  <span className="payment-name">Credit Card</span>
                  <span className="payment-badge">Coming Soon</span>
                </div>
              </div>
            </label>
          </div>
          {errors.paymentMethod && <span className="error-message">{errors.paymentMethod}</span>}
        </div>

        <div className="checkout-summary">
          <div className="summary-row">
            <span>Order Total:</span>
            <span className="total-amount">${total.toFixed(2)}</span>
          </div>
        </div>

        <button type="submit" className="btn btn-coral btn-block checkout-submit">
          Place Order
        </button>
      </form>
    </div>
  );
}
