'use client';

import { CheckoutFormData } from './CheckoutForm';

interface PaymentInstructionsProps {
  paymentMethod: 'zelle' | 'venmo';
  total: number;
  phoneNumber: string;
  onComplete: () => void;
  onBack: () => void;
}

export default function PaymentInstructions({
  paymentMethod,
  total,
  phoneNumber,
  onComplete,
  onBack
}: PaymentInstructionsProps) {

  const handleOpenVenmo = () => {
    // Venmo deep link format: venmo://paycharge?txn=pay&recipients=PHONE&amount=AMOUNT&note=NOTE
    const venmoUrl = `venmo://paycharge?txn=pay&recipients=${phoneNumber}&amount=${total.toFixed(2)}&note=Zizou's Healthy Bakes Order`;

    // Try to open Venmo app
    window.location.href = venmoUrl;

    // Fallback: open Venmo web if app doesn't open
    setTimeout(() => {
      const confirmed = confirm('Venmo app not found. Would you like to visit Venmo on the web?');
      if (confirmed) {
        window.open(`https://venmo.com/`, '_blank');
      }
    }, 2000);
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  return (
    <div className="payment-instructions-container">
      <div className="payment-instructions-header">
        <button className="back-button" onClick={onBack} type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back
        </button>
        <h2>Complete Payment</h2>
      </div>

      <div className="payment-instructions-body">
        {paymentMethod === 'zelle' ? (
          <div className="payment-method-card">
            <div className="payment-method-icon zelle">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#6D1ED4" opacity="0.2"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#6D1ED4"/>
                <path d="M16 8H8l5 4-5 4h8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Pay with Zelle</h3>

            <div className="payment-info">
              <div className="info-row">
                <span className="info-label">Amount to Send:</span>
                <span className="info-value amount">${total.toFixed(2)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Send to:</span>
                <span className="info-value phone">{formatPhoneNumber(phoneNumber)}</span>
              </div>
            </div>

            <div className="payment-steps">
              <h4>How to pay:</h4>
              <ol>
                <li>Open your banking app</li>
                <li>Select "Send Money with Zelle"</li>
                <li>Enter the phone number: <strong>{formatPhoneNumber(phoneNumber)}</strong></li>
                <li>Enter amount: <strong>${total.toFixed(2)}</strong></li>
                <li>Add note: "Zizou's Healthy Bakes Order"</li>
                <li>Complete the payment</li>
              </ol>
            </div>

            <div className="payment-note">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <p>After sending payment, click "I've Sent Payment" below to complete your order.</p>
            </div>
          </div>
        ) : (
          <div className="payment-method-card">
            <div className="payment-method-icon venmo">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#008CFF" opacity="0.2"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#008CFF"/>
                <path d="M14.5 7L12 17H9L11.5 7H14.5Z" fill="white"/>
              </svg>
            </div>
            <h3>Pay with Venmo</h3>

            <div className="payment-info">
              <div className="info-row">
                <span className="info-label">Amount to Send:</span>
                <span className="info-value amount">${total.toFixed(2)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Send to:</span>
                <span className="info-value phone">{formatPhoneNumber(phoneNumber)}</span>
              </div>
            </div>

            <button className="btn btn-primary btn-block venmo-open-btn" onClick={handleOpenVenmo}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="white"/>
                <path d="M14.5 7L12 17H9L11.5 7H14.5Z" fill="#008CFF"/>
              </svg>
              Open Venmo App
            </button>

            <div className="payment-steps">
              <h4>Or pay manually:</h4>
              <ol>
                <li>Open the Venmo app</li>
                <li>Tap "Pay or Request"</li>
                <li>Search for phone number: <strong>{formatPhoneNumber(phoneNumber)}</strong></li>
                <li>Enter amount: <strong>${total.toFixed(2)}</strong></li>
                <li>Add note: "Zizou's Healthy Bakes Order"</li>
                <li>Complete the payment</li>
              </ol>
            </div>

            <div className="payment-note">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <p>After sending payment, click "I've Sent Payment" below to complete your order.</p>
            </div>
          </div>
        )}

        <button className="btn btn-coral btn-block" onClick={onComplete}>
          I've Sent Payment
        </button>
      </div>
    </div>
  );
}
