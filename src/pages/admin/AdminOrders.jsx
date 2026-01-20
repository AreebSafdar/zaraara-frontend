import React, { useState } from 'react';
import { Eye, Download, Filter, Search } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const orders = [
    { id: '#ORD-001', date: '2024-01-15', customer: 'Ahmed Ali', items: 3, total: 15500, status: 'Delivered' },
    { id: '#ORD-002', date: '2024-01-14', customer: 'Fatima Khan', items: 2, total: 8200, status: 'Processing' },
    { id: '#ORD-003', date: '2024-01-13', customer: 'Hassan Ahmed', items: 4, total: 12300, status: 'Shipped' },
    { id: '#ORD-004', date: '2024-01-12', customer: 'Aisha Malik', items: 1, total: 6500, status: 'Pending' },
    { id: '#ORD-005', date: '2024-01-11', customer: 'Usman Khan', items: 5, total: 22500, status: 'Delivered' },
    { id: '#ORD-006', date: '2024-01-10', customer: 'Sara Ahmed', items: 2, total: 9800, status: 'Processing' },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      'Delivered': 'bg-green-100 text-green-700 border-green-200',
      'Processing': 'bg-blue-100 text-blue-700 border-blue-200',
      'Shipped': 'bg-purple-100 text-purple-700 border-purple-200',
      'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    };
    return colors[status] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        <AdminHeader />

        <main className="flex-1 overflow-auto">
          <div className="p-8 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                Orders
              </h1>
              <p className="text-slate-600 mt-2 font-medium">Track, manage, and fulfill customer orders efficiently.</p>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-64 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by Order ID or Customer name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-white shadow-sm hover:shadow-md font-medium text-slate-700"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-6 py-3 border border-slate-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-white shadow-sm hover:shadow-md font-semibold text-slate-700"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button className="flex items-center gap-2 px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition font-semibold text-slate-700 shadow-sm hover:shadow-md">
                <Download size={20} />
                Export
              </button>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Items</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition">
                        <td className="px-6 py-4 font-bold text-primary">{order.id}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-700">{order.date}</td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900">{order.customer}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-full font-bold text-sm border border-blue-200">
                            {order.items}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">Rs. {order.total.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-full border inline-block ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="flex items-center gap-1 text-primary hover:text-secondary font-bold text-sm hover:bg-blue-50 px-3 py-2 rounded-lg transition hover:shadow-md">
                            <Eye size={16} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredOrders.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-slate-500 font-semibold text-lg">📭 No orders found matching your criteria</p>
                  <p className="text-slate-400 text-sm mt-2">Try adjusting your search or filters</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-600">
                Showing <span className="font-bold text-slate-900">{filteredOrders.length}</span> of{' '}
                <span className="font-bold text-slate-900">{orders.length}</span> orders
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition font-semibold text-slate-700 shadow-sm">Previous</button>
                <button className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg hover:shadow-xl transition font-semibold">1</button>
                <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition font-semibold text-slate-700 shadow-sm">Next</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
