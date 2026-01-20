import React, { useState } from "react";
import {
  ShoppingBag,
  Package,
  TrendingUp,
  Users,
  ChevronRight,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import { useTheme } from "../../context/ThemeContext";

/* Mock Data */
const salesData = [
  { name: "0", sales1: 800, sales2: 1200 },
  { name: "1", sales1: 900, sales2: 1300 },
  { name: "2", sales1: 1100, sales2: 1400 },
  { name: "3", sales1: 1000, sales2: 1500 },
  { name: "4", sales1: 1200, sales2: 1600 },
  { name: "5", sales1: 1300, sales2: 1700 },
  { name: "6", sales1: 1400, sales2: 1800 },
  { name: "7", sales1: 1500, sales2: 1900 },
  { name: "8", sales1: 1600, sales2: 2000 },
  { name: "9", sales1: 1700, sales2: 2100 },
  { name: "10", sales1: 1800, sales2: 2200 },
  { name: "11", sales1: 1900, sales2: 2250 },
  { name: "12", sales1: 2000, sales2: 2300 },
  { name: "13", sales1: 2100, sales2: 2350 },
  { name: "14", sales1: 2150, sales2: 2400 },
  { name: "15", sales1: 2200, sales2: 2450 },
  { name: "16", sales1: 2250, sales2: 2500 },
  { name: "17", sales1: 2300, sales2: 2550 },
  { name: "18", sales1: 2350, sales2: 2600 },
  { name: "19", sales1: 2400, sales2: 2650 },
  { name: "20", sales1: 2450, sales2: 2700 },
];

/* Components */
const StatCard = ({ icon: Icon, label, value, change, iconBg, theme }) => (
  <div
    className={`rounded-xl p-6 shadow-sm transition-all hover:shadow-md ${
      theme === "dark" ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-100"
    }`}
  >
    <div className="flex items-start gap-4">
      <div className={`${iconBg} p-3 rounded-xl`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className="flex-1">
        <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
          {label}
        </p>
        <p className={`text-2xl font-bold mt-1 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          {value}
        </p>
        <p className="text-sm font-semibold text-emerald-600 mt-1">{change}</p>
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const variants = {
    Completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Shipped: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${variants[status]}`}>
      {status}
    </span>
  );
};

/* Main Dashboard */
export default function AdminDashboard() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("month");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const stats = [
    {
      label: "Total Orders",
      value: "1,234",
      change: "+12.5%",
      icon: ShoppingBag,
      iconBg: "bg-orange-500",
    },
    {
      label: "Total Products",
      value: "15",
      change: "+7.1%",
      icon: Package,
      iconBg: "bg-purple-500",
    },
    {
      label: "Total Revenue",
      value: "Rs. 4.5M",
      change: "+18.2%",
      icon: TrendingUp,
      iconBg: "bg-emerald-500",
    },
    {
      label: "Total Customers",
      value: "856",
      change: "+22 Today",
      icon: Users,
      iconBg: "bg-orange-400",
    },
  ];

  const orders = [
    { 
      id: "#ORD-001", 
      customer: "Ahmed Ali", 
      email: "ahmed@example.com",
      phone: "+92-300-1234567",
      address: "House 123, Street 5, F-7, Islamabad",
      amount: "Rs. 5,500", 
      status: "Completed", 
      status2: "Completed",
      items: 3,
      date: "2024-01-15"
    },
    { 
      id: "#ORD-002", 
      customer: "Fatima Khan", 
      email: "fatima@example.com",
      phone: "+92-300-2345678",
      address: "Flat 45, Gulberg III, Lahore",
      amount: "Rs. 2,300", 
      status: "Processing", 
      status2: "Pending",
      items: 2,
      date: "2024-01-14"
    },
    { 
      id: "#ORD-003", 
      customer: "Hasan Ahmed", 
      email: "hassan@example.com",
      phone: "+92-300-3456789",
      address: "Villa 78, Defence, Karachi",
      amount: "Rs. 3,600", 
      status: "Processing", 
      status2: "Processing",
      items: 4,
      date: "2024-01-13"
    },
    { 
      id: "#ORD-004", 
      customer: "Muhammad Ali", 
      email: "muhammad@example.com",
      phone: "+92-300-4567890",
      address: "House 90, Satellite Town, Rawalpindi",
      amount: "Rs. 5,100", 
      status: "Processing", 
      status2: "Shipped",
      items: 5,
      date: "2024-01-12"
    },
  ];

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const categories = [
    { name: "Women", value: 45, color: "from-blue-500 to-blue-600", dotColor: "bg-blue-600" },
    { name: "Men", value: 35, color: "from-teal-500 to-teal-600", dotColor: "bg-teal-500" },
    { name: "Accessories", value: 15, color: "from-purple-500 to-purple-600", dotColor: "bg-purple-500" },
    { name: "Kids", value: 5, color: "from-cyan-500 to-cyan-600", dotColor: "bg-cyan-500" },
  ];

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  };

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-slate-50"}`}>
      <AdminSidebar />

      <div className="flex-1 ml-64">
        <AdminHeader />

        <main className="p-8 space-y-6">
          {/* Dashboard Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Dashboard
              </h1>
              <p className={`mt-1 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                Welcome back! Here's your store's performance today.
              </p>
            </div>
            <div className="text-right">
              <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                Last updated: Today at {getCurrentTime()}
              </p>
              <button
                className={`mt-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm hover:shadow ${
                  theme === "dark"
                    ? "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                📊 Export Report
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} theme={theme} />
            ))}
          </div>

          {/* Sales Overview & Top Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Overview */}
            <div
              className={`lg:col-span-2 rounded-xl p-6 shadow-sm ${
                theme === "dark" ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-100"
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Sales Overview
                </h2>
                <div className="flex gap-2">
                  {[
                    { id: "month", label: "This Month" },
                    { id: "3months", label: "Last 3 Months" },
                    { id: "6months", label: "Last 6 Months" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                        activeTab === tab.id
                          ? theme === "dark"
                            ? "bg-slate-700 text-white"
                            : "bg-slate-100 text-slate-900"
                          : theme === "dark"
                          ? "text-slate-400 hover:bg-slate-700/50"
                          : "text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={salesData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorSales1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorSales2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={theme === "dark" ? "#334155" : "#e2e8f0"}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      stroke={theme === "dark" ? "#64748b" : "#94a3b8"}
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke={theme === "dark" ? "#64748b" : "#94a3b8"}
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                        border: `1px solid ${theme === "dark" ? "#334155" : "#e2e8f0"}`,
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                      labelStyle={{ color: theme === "dark" ? "#f1f5f9" : "#0f172a" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="sales2"
                      stroke="#14b8a6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorSales2)"
                    />
                    <Area
                      type="monotone"
                      dataKey="sales1"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorSales1)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Categories */}
            <div
              className={`rounded-xl p-6 shadow-sm ${
                theme === "dark" ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-100"
              }`}
            >
              <h2 className={`text-lg font-bold mb-6 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Top Categories
              </h2>

              {/* Progress Bars */}
              <div className="space-y-5 mb-6">
                {categories.map((cat) => (
                  <div key={cat.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        {cat.name}
                      </span>
                      <span className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        {cat.value}%
                      </span>
                    </div>
                    <div className={`h-2 rounded-full ${theme === "dark" ? "bg-slate-700" : "bg-slate-100"}`}>
                      <div
                        className={`h-full bg-gradient-to-r ${cat.color} rounded-full transition-all duration-700`}
                        style={{ width: `${cat.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Donut Chart */}
              <div className="flex justify-center my-6">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="20"
                      strokeDasharray="113 282"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="20"
                      strokeDasharray="88 282"
                      strokeDashoffset="-113"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="20"
                      strokeDasharray="38 282"
                      strokeDashoffset="-201"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="20"
                      strokeDasharray="13 282"
                      strokeDashoffset="-239"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        100%
                      </p>
                      <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Total</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-2">
                    <span className={`w-3 h-3 ${cat.dotColor} rounded-full`} />
                    <span className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div
            className={`rounded-xl overflow-hidden shadow-sm ${
              theme === "dark" ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-100"
            }`}
          >
            <div className={`px-6 py-5 border-b flex justify-between items-center ${theme === "dark" ? "border-slate-700" : "border-slate-200"}`}>
              <h2 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Recent Orders
              </h2>
              <button className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
                View All Orders
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={theme === "dark" ? "bg-slate-700/30" : "bg-slate-50"}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Order ID
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Customer
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Amount
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Status
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Status
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={`border-t transition ${
                        theme === "dark"
                          ? "border-slate-700 hover:bg-slate-700/30"
                          : "border-slate-100 hover:bg-slate-50"
                      }`}
                    >
                      <td className={`px-6 py-4 text-sm font-semibold ${theme === "dark" ? "text-slate-300" : "text-slate-900"}`}>
                        {order.id}
                      </td>
                      <td className={`px-6 py-4 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                        {order.customer}
                      </td>
                      <td className={`px-6 py-4 text-sm font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        {order.amount}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={order.status2} />
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleViewDetails(order)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Details Modal */}
          {showOrderModal && selectedOrder && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div 
                className={`max-w-2xl w-full rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto ${
                  theme === "dark" ? "bg-slate-800" : "bg-white"
                }`}
              >
                {/* Modal Header */}
                <div className={`sticky top-0 px-6 py-4 border-b flex items-center justify-between ${
                  theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
                }`}>
                  <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    Order Details
                  </h2>
                  <button
                    onClick={() => setShowOrderModal(false)}
                    className={`p-2 rounded-lg transition ${
                      theme === "dark" 
                        ? "hover:bg-slate-700 text-slate-400 hover:text-white" 
                        : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Order Info */}
                  <div className={`p-4 rounded-xl ${
                    theme === "dark" ? "bg-slate-700/50" : "bg-slate-50"
                  }`}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className={`text-sm font-semibold ${
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }`}>
                          Order ID
                        </p>
                        <p className={`text-lg font-bold ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}>
                          {selectedOrder.id}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }`}>
                          Total Amount
                        </p>
                        <p className={`text-lg font-bold ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}>
                          {selectedOrder.amount}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }`}>
                          Order Date
                        </p>
                        <p className={`text-base font-semibold ${
                          theme === "dark" ? "text-slate-300" : "text-slate-700"
                        }`}>
                          {selectedOrder.date}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }`}>
                          Total Items
                        </p>
                        <p className={`text-base font-semibold ${
                          theme === "dark" ? "text-slate-300" : "text-slate-700"
                        }`}>
                          {selectedOrder.items}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div>
                    <h3 className={`text-lg font-bold mb-4 ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}>
                      Customer Information
                    </h3>
                    <div className={`p-4 rounded-xl space-y-4 ${
                      theme === "dark" ? "bg-slate-700/50" : "bg-slate-50"
                    }`}>
                      {/* Name */}
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          theme === "dark" ? "bg-slate-600" : "bg-white"
                        }`}>
                          <Users size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <p className={`text-xs font-semibold ${
                            theme === "dark" ? "text-slate-400" : "text-slate-600"
                          }`}>
                            Customer Name
                          </p>
                          <p className={`text-base font-bold ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}>
                            {selectedOrder.customer}
                          </p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          theme === "dark" ? "bg-slate-600" : "bg-white"
                        }`}>
                          <Mail size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <p className={`text-xs font-semibold ${
                            theme === "dark" ? "text-slate-400" : "text-slate-600"
                          }`}>
                            Email Address
                          </p>
                          <p className={`text-base font-semibold ${
                            theme === "dark" ? "text-slate-300" : "text-slate-700"
                          }`}>
                            {selectedOrder.email}
                          </p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          theme === "dark" ? "bg-slate-600" : "bg-white"
                        }`}>
                          <Phone size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <p className={`text-xs font-semibold ${
                            theme === "dark" ? "text-slate-400" : "text-slate-600"
                          }`}>
                            Phone Number
                          </p>
                          <p className={`text-base font-semibold ${
                            theme === "dark" ? "text-slate-300" : "text-slate-700"
                          }`}>
                            {selectedOrder.phone}
                          </p>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          theme === "dark" ? "bg-slate-600" : "bg-white"
                        }`}>
                          <MapPin size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <p className={`text-xs font-semibold ${
                            theme === "dark" ? "text-slate-400" : "text-slate-600"
                          }`}>
                            Shipping Address
                          </p>
                          <p className={`text-base font-semibold ${
                            theme === "dark" ? "text-slate-300" : "text-slate-700"
                          }`}>
                            {selectedOrder.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Status */}
                  <div>
                    <h3 className={`text-lg font-bold mb-4 ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}>
                      Order Status
                    </h3>
                    <div className="flex gap-3">
                      <StatusBadge status={selectedOrder.status} />
                      <StatusBadge status={selectedOrder.status2} />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={() => setShowOrderModal(false)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition"
                    >
                      Close
                    </button>
                    <button className="flex-1 px-6 py-3 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition">
                      Contact Customer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
