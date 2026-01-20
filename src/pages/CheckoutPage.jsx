import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useApp } from '../context/AppContext';
import { CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'cash',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const shipping = 500;
  const total = getCartTotal() + shipping;
  const orderNumber = `JJ${Date.now().toString().slice(-8)}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      clearCart();
      navigate(`/order-confirmation/${orderNumber}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container py-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="border p-6 rounded-lg">
                <h2 className="text-xl font-bold text-primary mb-4">Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded mt-4"
                />
              </div>

              {/* Shipping Address */}
              <div className="border p-6 rounded-lg">
                <h2 className="text-xl font-bold text-primary mb-4">Shipping Address</h2>
                <textarea
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="border p-6 rounded-lg">
                <h2 className="text-xl font-bold text-primary mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="font-semibold">Cash on Delivery (COD)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="font-semibold">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="font-semibold">Bank Transfer</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-secondary text-white py-3 rounded font-bold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Review */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-bold text-primary mb-6">Order Review</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 pb-6 border-b max-h-48 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-secondary">Rs. {item.price.toLocaleString()}</span>
                    </div>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-3 pb-6 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Rs. {shipping}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-primary mt-6 mb-6">
                <span>Total Amount</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>

              {/* Order Info */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded text-sm">
                <p className="text-gray-700">
                  <strong>Order Number:</strong> {orderNumber}
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Estimated Delivery:</strong> 5-7 business days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
