import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Truck, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OrderConfirmationPage() {
  const { orderNumber } = useParams();
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 6);

  const mockOrderDetails = {
    items: [
      { name: 'Premium Lawn Suit', quantity: 1, price: 4500 },
      { name: 'Silk Kurti', quantity: 2, price: 3200 },
    ],
    subtotal: 10900,
    shipping: 500,
    total: 11400,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container py-12">
        {/* Success Message */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 mx-auto text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">Thank You for Your Order!</h1>
          <p className="text-xl text-gray-600 mb-2">
            Your order has been successfully placed
          </p>
          <p className="text-lg font-semibold text-secondary">
            Order Number: {orderNumber || 'JJ12345678'}
          </p>
        </div>

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Order Items */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-primary mb-6">Order Items</h2>
            <div className="space-y-4">
              {mockOrderDetails.items.map((item, idx) => (
                <div key={idx} className="flex justify-between pb-4 border-b">
                  <div>
                    <p className="font-semibold text-primary">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-secondary">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {mockOrderDetails.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Rs. {mockOrderDetails.shipping}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t">
                  <span>Total</span>
                  <span>Rs. {mockOrderDetails.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-primary mb-6">Delivery Information</h2>

            {/* Estimated Delivery */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-6">
              <div className="flex gap-3">
                <Truck className="text-blue-600 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-primary">Estimated Delivery</p>
                  <p className="text-sm text-gray-600">
                    {estimatedDelivery.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Status */}
            <div className="space-y-3">
              <p className="font-semibold text-primary mb-3">Shipping Status</p>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  ✓
                </div>
                <div>
                  <p className="font-semibold">Order Confirmed</p>
                  <p className="text-sm text-gray-600">Jan 20, 2024</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold">Shipped</p>
                  <p className="text-sm text-gray-600">Coming soon</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold">Out for Delivery</p>
                  <p className="text-sm text-gray-600">Coming soon</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold">Delivered</p>
                  <p className="text-sm text-gray-600">Coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex gap-3">
            <AlertCircle className="text-yellow-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-primary mb-2">Important Information</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• You will receive a confirmation email shortly with tracking details</li>
                <li>• Keep your order number safe for future reference</li>
                <li>• You can track your order anytime from your profile</li>
                <li>• Contact our support team if you have any questions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/profile"
            className="px-8 py-3 bg-primary text-white rounded hover:bg-gray-800 font-bold text-center transition"
          >
            View My Orders
          </Link>
          <Link
            to="/category/women"
            className="px-8 py-3 border-2 border-secondary text-secondary rounded hover:bg-secondary hover:text-white font-bold text-center transition"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Contact Support */}
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t text-center">
          <p className="text-gray-600 mb-4">
            Need help? Contact our customer support team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a href="tel:+923001234567" className="text-secondary hover:text-red-700 font-semibold">
              +92 300 1234567
            </a>
            <span className="text-gray-400">•</span>
            <a href="mailto:support@jj.com" className="text-secondary hover:text-red-700 font-semibold">
              support@jj.com
            </a>
            <span className="text-gray-400">•</span>
            <a href="#" className="text-secondary hover:text-red-700 font-semibold">
              Live Chat
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
