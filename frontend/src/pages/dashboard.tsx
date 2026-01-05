import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_USERS_QUERY } from '@/graphql/auth';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const { data, loading, error } = useQuery(GET_USERS_QUERY);

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="text-xl text-white flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          Loading...
        </div>
      </div>
    );
  }

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
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Dragon Challenge
                  </h1>
                  <p className="text-xs text-gray-500">Dashboard</p>
                </div>
              </div>
              <div className="hidden md:flex gap-4">
                <a href="/dashboard" className="text-purple-600 font-semibold">
                  Dashboard
                </a>
                <a href="/products" className="text-gray-600 hover:text-purple-600 font-semibold transition">
                  Products
                </a>
                <a href="/orders" className="text-gray-600 hover:text-purple-600 font-semibold transition">
                  My Orders
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-700">
                  {user.firstName || user.email.split('@')[0]}
                </p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Welcome back, {user.firstName || 'Dragon Master'}! 👋
              </h2>
              <p className="text-purple-100">
                Manage your dragons and view all registered users
              </p>
            </div>
            <div className="hidden lg:block text-6xl">🐲</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <a
            href="/products"
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition">
                  Browse Products 🛍️
                </h3>
                <p className="text-gray-600">
                  Explore our dragon collection and place orders
                </p>
              </div>
              <div className="text-4xl group-hover:scale-110 transition-transform">→</div>
            </div>
          </a>

          <a
            href="/orders"
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition">
                  My Orders 📦
                </h3>
                <p className="text-gray-600">
                  View your order history and track shipments
                </p>
              </div>
              <div className="text-4xl group-hover:scale-110 transition-transform">→</div>
            </div>
          </a>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold">Total Users</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {data?.users?.length || 0}
                </p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <span className="text-3xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold">Your Role</p>
                <p className="text-3xl font-bold text-gray-800 mt-2 capitalize">
                  {user.role}
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <span className="text-3xl">🎯</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold">Status</p>
                <p className="text-3xl font-bold text-green-600 mt-2">Active</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <span className="text-3xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">👤</span>
            <h3 className="text-2xl font-bold text-gray-800">Your Profile</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm font-semibold mb-1">Email</p>
              <p className="text-gray-800 font-semibold text-lg">{user.email}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm font-semibold mb-1">Role</p>
              <p className="text-gray-800 font-semibold text-lg capitalize">{user.role}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm font-semibold mb-1">First Name</p>
              <p className="text-gray-800 font-semibold text-lg">{user.firstName || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm font-semibold mb-1">Last Name</p>
              <p className="text-gray-800 font-semibold text-lg">{user.lastName || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📋</span>
              <h3 className="text-2xl font-bold text-gray-800">All Users</h3>
            </div>
          </div>
          
          <div className="p-6">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <span>Loading users...</span>
                </div>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚠️</span>
                  <span>Error loading users: {error.message}</span>
                </div>
              </div>
            )}
            
            {data && data.users && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        First Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Last Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.users.map((u: any) => (
                      <tr key={u.id} className="hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">📧</span>
                            <span className="text-sm font-medium text-gray-900">{u.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {u.firstName || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {u.lastName || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 capitalize">
                            {u.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}