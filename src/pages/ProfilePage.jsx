import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, LogOut, MapPin, ClipboardList } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useApp } from '../context/AppContext';

export default function ProfilePage() {
  const { user, setUser, wishlist } = useApp();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container py-20 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Please log in first</h2>
          <Link
            to="/login"
            className="inline-block px-6 py-2 bg-secondary text-white rounded hover:bg-red-700"
          >
            Go to Login
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const mockOrders = [
    { id: 1, number: 'JJ12345678', date: '2024-01-10', status: 'Delivered', total: 8500 },
    { id: 2, number: 'JJ12345679', date: '2024-01-15', status: 'Processing', total: 5200 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center mb-6 pb-6 border-b">
                <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center text-white text-xl font-bold mb-3">
                  {user.name.charAt(0)}
                </div>
                <h2 className="text-lg font-bold text-primary">{user.name}</h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded transition ${
                    activeTab === 'profile'
                      ? 'bg-secondary text-white'
                      : 'text-primary hover:bg-gray-200'
                  }`}
                >
                  My Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2 rounded transition flex items-center gap-2 ${
                    activeTab === 'orders'
                      ? 'bg-secondary text-white'
                      : 'text-primary hover:bg-gray-200'
                  }`}
                >
                  <ClipboardList size={18} />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full text-left px-4 py-2 rounded transition flex items-center gap-2 ${
                    activeTab === 'addresses'
                      ? 'bg-secondary text-white'
                      : 'text-primary hover:bg-gray-200'
                  }`}
                >
                  <MapPin size={18} />
                  Addresses
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full text-left px-4 py-2 rounded transition flex items-center gap-2 ${
                    activeTab === 'wishlist'
                      ? 'bg-secondary text-white'
                      : 'text-primary hover:bg-gray-200'
                  }`}
                >
                  <Heart size={18} />
                  Wishlist ({wishlist.length})
                </button>
                <button
                  onClick={() => {
                    setUser(null);
                    window.location.href = '/';
                  }}
                  className="w-full text-left px-4 py-2 rounded transition text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary mb-6">My Profile</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={user.name}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="+92 300 1234567"
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Date of Birth</label>
                    <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded" />
                  </div>
                </div>
                <button className="mt-6 px-6 py-2 bg-secondary text-white rounded hover:bg-red-700 font-semibold">
                  Save Changes
                </button>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary mb-6">Order History</h2>
                {mockOrders.length > 0 ? (
                  <div className="space-y-4">
                    {mockOrders.map(order => (
                      <div key={order.id} className="bg-white p-4 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="font-bold text-primary">Order #{order.number}</p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-secondary">Rs. {order.total.toLocaleString()}</p>
                          <p className={`text-sm font-semibold ${
                            order.status === 'Delivered' ? 'text-green-600' : 'text-blue-600'
                          }`}>
                            {order.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No orders yet</p>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary">Saved Addresses</h2>
                  <button className="px-4 py-2 bg-secondary text-white rounded hover:bg-red-700 font-semibold">
                    Add Address
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[1, 2].map(i => (
                    <div key={i} className="bg-white p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-primary">Home Address</h3>
                        <button className="text-gray-400 hover:text-secondary">✕</button>
                      </div>
                      <p className="text-sm text-gray-600">123 Street Name</p>
                      <p className="text-sm text-gray-600">Karachi, Pakistan</p>
                      <button className="mt-3 text-secondary hover:text-red-700 text-sm font-semibold">
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary mb-6">My Wishlist ({wishlist.length})</h2>
                {wishlist.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-4">
                    {wishlist.map(item => (
                      <div key={item.id} className="bg-white rounded-lg overflow-hidden border">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-3">
                          <h3 className="font-bold text-primary text-sm">{item.name}</h3>
                          <p className="text-secondary font-bold text-sm mt-2">
                            Rs. {item.price.toLocaleString()}
                          </p>
                          <button className="w-full mt-3 px-3 py-2 bg-secondary text-white rounded text-sm hover:bg-red-700">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Your wishlist is empty</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
