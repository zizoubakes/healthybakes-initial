'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface User {
  name?: string | null;
  email?: string | null;
}

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

export default function DashboardContent({ user }: { user: User }) {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/customer/orders');
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      } else {
        setError(data.error || 'Failed to load orders');
      }
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-100 text-blue-800',
      'payment-confirmed': 'bg-green-100 text-green-800',
      baking: 'bg-yellow-100 text-yellow-800',
      ready: 'bg-purple-100 text-purple-800',
      delivered: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      new: 'Order Placed',
      'payment-confirmed': 'Payment Confirmed',
      baking: 'Baking',
      ready: 'Ready for Delivery',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
              <p className="text-gray-600 text-sm mt-1">Welcome back, {user.name}!</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Home
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Account Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium text-gray-900">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Order History</h2>
            <Link
              href="/"
              className="bg-[#FF6B6B] text-white px-4 py-2 rounded-lg hover:bg-[#ff5252] transition-colors text-sm font-semibold"
            >
              Place New Order
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B6B] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading orders...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🧁</div>
              <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
              <Link
                href="/"
                className="inline-block bg-[#FF6B6B] text-white px-6 py-3 rounded-lg hover:bg-[#ff5252] transition-colors font-semibold"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-900">
                          Order #{order.orderNumber}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-xl font-bold text-[#FF6B6B]">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Items:</p>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-900">
                            {item.quantity}x {item.productName}
                          </span>
                          <span className="text-gray-600">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Delivery:</p>
                      <p className="font-medium text-gray-900">
                        {order.needsShipping ? order.deliveryAddress : 'Pickup'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Preferred Time:</p>
                      <p className="font-medium text-gray-900">
                        {order.preferredDay} - {order.preferredTime}
                      </p>
                    </div>
                  </div>

                  {/* Track Order Link */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link
                      href={`/track-order?orderNumber=${order.orderNumber}&email=${order.email}`}
                      className="text-[#FF6B6B] font-medium text-sm hover:underline"
                    >
                      Track Order →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
