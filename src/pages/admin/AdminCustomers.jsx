import React, { useState } from 'react';
import { Mail, Phone, MapPin, Search } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    { id: 1, name: 'Ahmed Ali', email: 'ahmed@example.com', phone: '+92-300-1234567', city: 'Karachi', orders: 5, spent: 25500, joined: '2024-01-01' },
    { id: 2, name: 'Fatima Khan', email: 'fatima@example.com', phone: '+92-300-2345678', city: 'Lahore', orders: 3, spent: 15800, joined: '2024-01-05' },
    { id: 3, name: 'Hassan Ahmed', email: 'hassan@example.com', phone: '+92-300-3456789', city: 'Islamabad', orders: 8, spent: 45200, joined: '2024-01-10' },
    { id: 4, name: 'Aisha Malik', email: 'aisha@example.com', phone: '+92-300-4567890', city: 'Rawalpindi', orders: 2, spent: 8500, joined: '2024-01-15' },
    { id: 5, name: 'Usman Khan', email: 'usman@example.com', phone: '+92-300-5678901', city: 'Multan', orders: 6, spent: 32000, joined: '2024-01-20' },
    { id: 6, name: 'Sara Ahmed', email: 'sara@example.com', phone: '+92-300-6789012', city: 'Faisalabad', orders: 4, spent: 19800, joined: '2024-01-25' },
  ];

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                Customers
              </h1>
              <p className="text-slate-600 mt-2 font-medium">View and manage all your customer information and insights.</p>
            </div>

            {/* Search */}
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-white shadow-sm hover:shadow-md font-medium text-slate-700"
              />
            </div>

            {/* Customers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Gradient Background */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-5 transition rounded-full"></div>
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-xl transition">
                          {customer.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900">{customer.name}</h3>
                          <p className="text-xs text-slate-500 font-medium">Customer ID: {customer.id}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                        {customer.orders} orders
                      </span>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3 mb-4 pb-4 border-b border-slate-200">
                      <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                        <Mail size={16} className="text-primary flex-shrink-0" />
                        <span className="truncate hover:text-clip">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                        <Phone size={16} className="text-primary flex-shrink-0" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                        <MapPin size={16} className="text-primary flex-shrink-0" />
                        <span>{customer.city}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200/50">
                        <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">Total Spent</p>
                        <p className="font-bold text-slate-900 text-lg mt-1">Rs. {customer.spent.toLocaleString()}</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 rounded-xl border border-purple-200/50">
                        <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">Joined</p>
                        <p className="font-bold text-slate-900 text-sm mt-1">{customer.joined}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition font-bold text-sm shadow-md">
                        View Profile
                      </button>
                      <button className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition font-bold text-sm text-slate-700 shadow-sm hover:shadow-md">
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCustomers.length === 0 && (
              <div className="text-center py-16">
                <p className="text-slate-500 text-lg font-semibold">👥 No customers found</p>
                <p className="text-slate-400 text-sm mt-2">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
