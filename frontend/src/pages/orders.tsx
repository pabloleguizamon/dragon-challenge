import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_MY_ORDERS_QUERY, GET_ALL_ORDERS_QUERY } from '@/graphql/orders';

export default function Orders() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showAllOrders, setShowAllOrders] = useState(false);

  const { data: myOrdersData, loading: myOrdersLoading, error: myOrdersError } = useQuery(GET_MY_ORDERS_QUERY);
  const { data: allOrdersData, loading: allOrdersLoading, error: allOrdersError } = useQuery(GET_ALL_ORDERS_QUERY, {
    skip: !showAllOrders,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      router.push('/login');
      return;
    }
    
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  const currentOrders = showAllOrders ? allOrdersData?.orders : myOrdersData?.myOrders;
  const loading = showAllOrders ? allOrdersLoading : myOrdersLoading;
  const error = showAllOrders ? allOrdersError : myOrdersError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-lg">
                  <span className="text-2xl">🐉</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Dragon Shop
                </h1>
              </div>
              <div className="hidden md:flex gap-4">
                <a href="/dashboard" className="text-gray-600 hover:text-purple-600 font-semibold transition">
                  Dashboard
                </a>
                <a href="/products" className="text-gray-600 hover:text-purple-600 font-semibold transition">
                  Products
                </a>
                <a href="/orders" className="text-purple-600 font-semibold">
                  My Orders
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              {showAllOrders ? 'All Orders' : 'My Orders'}
            </h2>
            <p className="text-gray-600">View and track your order history</p>
          </div>

          {user.role === 'ADMIN' && (
            <button
              onClick={() => setShowAllOrders(!showAllOrders)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95"
            >
              {showAllOrders ? '👤 My Orders' : '👥 All Orders'}
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
            Error loading orders: {error.message}
          </div>
        )}

        {/* Orders List */}
        {!loading && !error && currentOrders && currentOrders.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <span className="text-6xl mb-4 block">📦</span>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
            <a
              href="/products"
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95"
            >
              Browse Products
            </a>
          </div>
        )}

        {!loading && !error && currentOrders && currentOrders.length > 0 && (
          <div className="space-y-6">
            {currentOrders.map((order: any) => (
              <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">Order #{order.id.slice(0, 8)}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        📅 {formatDate(order.createdAt)}
                      </p>
                      {showAllOrders && order.user && (
                        <p className="text-gray-600 text-sm mt-1">
                          👤 Customer: {order.user.email}
                          {order.user.firstName && ` (${order.user.firstName} ${order.user.lastName})`}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-3xl font-bold text-purple-600">${order.total}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-semibold text-gray-700 mb-4">Order Items:</h4>
                  <div className="space-y-3">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            {item.product.imageUrl ? (
                              <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <span className="text-2xl">🐲</span>
                            )}
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-800">{item.product.name}</h5>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity} × ${item.price}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-purple-600">${item.subtotal}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}