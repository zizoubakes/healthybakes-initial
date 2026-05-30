'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '../components/Navigation';

interface OrderItem {
  productName: string;
  quantity: number;
  quantityLabel: string;
  price: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  items: OrderItem[];
  totalAmount: number;
  needsShipping: boolean;
  deliveryAddress?: string;
  preferredDay: string;
  preferredTime: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

const statusSteps = [
  { value: 'new', label: 'Order Placed', icon: '📝' },
  { value: 'payment-confirmed', label: 'Payment Confirmed', icon: '💳' },
  { value: 'baking', label: 'Baking', icon: '🧁' },
  { value: 'ready', label: 'Ready', icon: '✅' },
  { value: 'delivered', label: 'Delivered', icon: '🎉' },
];

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const response = await fetch('/api/track-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderNumber, email }),
      });

      const data = await response.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        setError(data.error || 'Order not found');
      }
    } catch (err) {
      setError('Failed to retrieve order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStepIndex = (status: string) => {
    const index = statusSteps.findIndex((step) => step.value === status);
    return index === -1 ? 0 : index;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Navigation />
      <div className="track-order-page">
        <div className="track-order-container">
          <h1 className="track-order-title">Track Your Order</h1>
          <p className="track-order-subtitle">
            Enter your order number and email to see your order status
          </p>

          <form onSubmit={handleSubmit} className="track-order-form">
            <div className="form-group">
              <label htmlFor="orderNumber">Order Number</label>
              <input
                type="text"
                id="orderNumber"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="ORD-1234567890"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn btn-coral btn-block" disabled={loading}>
              {loading ? 'Searching...' : 'Track Order'}
            </button>
          </form>

          {order && (
            <div className="order-details">
              <div className="order-header">
                <h2>Order {order.orderNumber}</h2>
                <p className="order-date">Placed on {formatDate(order.createdAt)}</p>
              </div>

              <div className="status-timeline">
                {statusSteps.map((step, index) => {
                  const currentStepIndex = getCurrentStepIndex(order.status);
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div
                      key={step.value}
                      className={`timeline-step ${isCompleted ? 'completed' : ''} ${
                        isCurrent ? 'current' : ''
                      }`}
                    >
                      <div className="timeline-icon">{step.icon}</div>
                      <div className="timeline-label">{step.label}</div>
                      {index < statusSteps.length - 1 && (
                        <div className={`timeline-line ${isCompleted ? 'completed' : ''}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="order-info-section">
                <h3>Order Items</h3>
                {order.items.map((item, index) => (
                  <div key={index} className="order-item-row">
                    <span>
                      {item.quantity}x {item.productName}
                    </span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="order-total-row">
                  <strong>Total:</strong>
                  <strong>${order.totalAmount.toFixed(2)}</strong>
                </div>
              </div>

              <div className="order-info-section">
                <h3>Delivery Information</h3>
                <div className="info-row">
                  <span className="info-label">Delivery:</span>
                  <span>{order.needsShipping ? order.deliveryAddress : 'Pickup'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Preferred Day:</span>
                  <span>{order.preferredDay}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Preferred Time:</span>
                  <span>{order.preferredTime}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Payment Method:</span>
                  <span>
                    {order.paymentMethod === 'zelle'
                      ? 'Zelle'
                      : order.paymentMethod === 'venmo'
                      ? 'Venmo'
                      : 'Credit Card'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .track-order-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #fef6e4 0%, #fff8e8 100%);
          padding: 100px 20px 60px;
        }

        .track-order-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .track-order-title {
          font-family: var(--font-fredoka);
          font-size: 48px;
          color: #2d3142;
          text-align: center;
          margin-bottom: 16px;
        }

        .track-order-subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 40px;
          font-size: 18px;
        }

        .track-order-form {
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          margin-bottom: 40px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #2d3142;
          font-weight: 500;
        }

        .form-group input {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid #e6e8ec;
          border-radius: 12px;
          font-size: 16px;
          transition: border-color 0.3s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #ff6b6b;
        }

        .error-message {
          background: #fee;
          color: #c33;
          padding: 12px 18px;
          border-radius: 12px;
          margin-bottom: 20px;
          text-align: center;
        }

        .order-details {
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .order-header {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 24px;
          border-bottom: 2px solid #f0f0f0;
        }

        .order-header h2 {
          font-family: var(--font-fredoka);
          font-size: 32px;
          color: #2d3142;
          margin-bottom: 8px;
        }

        .order-date {
          color: #666;
          font-size: 16px;
        }

        .status-timeline {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding: 0 20px;
          position: relative;
        }

        .timeline-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          flex: 1;
        }

        .timeline-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 12px;
          transition: all 0.3s;
          z-index: 2;
        }

        .timeline-step.completed .timeline-icon {
          background: #ff6b6b;
          transform: scale(1.1);
        }

        .timeline-step.current .timeline-icon {
          background: #ff6b6b;
          transform: scale(1.2);
          box-shadow: 0 4px 16px rgba(255, 107, 107, 0.3);
        }

        .timeline-label {
          font-size: 14px;
          color: #999;
          text-align: center;
          font-weight: 500;
        }

        .timeline-step.completed .timeline-label,
        .timeline-step.current .timeline-label {
          color: #2d3142;
          font-weight: 600;
        }

        .timeline-line {
          position: absolute;
          top: 30px;
          left: 50%;
          width: 100%;
          height: 4px;
          background: #e0e0e0;
          z-index: 1;
        }

        .timeline-line.completed {
          background: #ff6b6b;
        }

        .order-info-section {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 2px solid #f0f0f0;
        }

        .order-info-section h3 {
          font-family: var(--font-fredoka);
          font-size: 24px;
          color: #2d3142;
          margin-bottom: 20px;
        }

        .order-item-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          color: #666;
        }

        .order-total-row {
          display: flex;
          justify-content: space-between;
          padding: 16px 0;
          margin-top: 16px;
          border-top: 2px solid #f0f0f0;
          font-size: 20px;
          color: #2d3142;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
        }

        .info-label {
          color: #666;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .track-order-title {
            font-size: 36px;
          }

          .track-order-form,
          .order-details {
            padding: 24px;
          }

          .status-timeline {
            flex-direction: column;
            padding: 0;
          }

          .timeline-step {
            width: 100%;
            flex-direction: row;
            justify-content: flex-start;
            margin-bottom: 20px;
          }

          .timeline-icon {
            width: 50px;
            height: 50px;
            font-size: 24px;
            margin-right: 16px;
            margin-bottom: 0;
          }

          .timeline-label {
            text-align: left;
          }

          .timeline-line {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
