import React from 'react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, LineChart } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminAnalytics() {
  const metrics = [
    { label: 'Total Revenue', value: 'Rs. 4,523,400', change: '+23.5%', trend: 'up', icon: TrendingUp },
    { label: 'Average Order Value', value: 'Rs. 3,650', change: '+8.2%', trend: 'up', icon: TrendingUp },
    { label: 'Conversion Rate', value: '3.45%', change: '-2.1%', trend: 'down', icon: TrendingDown },
    { label: 'Return Rate', value: '2.3%', change: '-0.8%', trend: 'down', icon: TrendingDown },
  ];

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
                Analytics
              </h1>
              <p className="text-slate-600 mt-2 font-medium">Deep insights into your store's performance and customer behavior.</p>
            </div>

            {/* Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl transition group relative overflow-hidden"
                  >
                    {/* Gradient Background */}
                    <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${metric.trend === 'up'
                      ? 'from-green-500 to-emerald-500'
                      : 'from-red-500 to-pink-500'
                      } opacity-0 group-hover:opacity-5 transition rounded-full`}></div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-slate-600 text-sm font-semibold mb-1">{metric.label}</p>
                          <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                        </div>
                        <div className={`${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'} group-hover:scale-110 transition`}>
                          <Icon size={28} className="font-bold" />
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full inline-block border ${metric.trend === 'up'
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : 'bg-red-100 text-red-700 border-red-200'
                        }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition">
                <h2 className="text-xl font-bold text-slate-900 mb-6">📈 Revenue Trend</h2>
                <div className="relative h-64 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden p-4">
                  {/* Grid */}
                  <div className="absolute inset-0 grid grid-rows-4 gap-4 opacity-40">
                    <div className="border-t border-slate-200" />
                    <div className="border-t border-slate-200" />
                    <div className="border-t border-slate-200" />
                    <div className="border-t border-slate-200" />
                  </div>

                  {/* Chart */}
                  <svg viewBox="0 0 100 40" className="relative z-10 w-full h-full">
                    <defs>
                      <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Area */}
                    <path
                      d="M0,32 L10,28 L20,30 L30,24 L40,20 L50,22 L60,17 L70,14 L80,10 L90,12 L100,6 L100,40 L0,40 Z"
                      fill="url(#analyticsGrad)"
                    />

                    {/* Line */}
                    <path
                      d="M0,32 L10,28 L20,30 L30,24 L40,20 L50,22 L60,17 L70,14 L80,10 L90,12 L100,6"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                    />
                  </svg>

                  {/* X-axis labels */}
                  <div className="absolute bottom-1 left-4 right-4 flex justify-between text-xs text-slate-500">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>

              </div>

              {/* Category Distribution */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition">
                <h2 className="text-xl font-bold text-slate-900 mb-6">🥧 Sales by Category</h2>
                <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center gap-8 p-6">

                  {/* Donut Chart */}
                  <div
                    className="relative w-40 h-40 rounded-full"
                    style={{
                      background:
                        "conic-gradient(#3b82f6 0% 45%, #22c55e 45% 80%, #8b5cf6 80% 95%, #60a5fa 95% 100%)",
                    }}
                  >
                    {/* Center Hole */}
                    <div className="absolute inset-6 bg-white rounded-full flex flex-col items-center justify-center">
                      <p className="text-xs text-slate-500 font-semibold">Total</p>
                      <p className="text-lg font-bold text-slate-900">100%</p>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="space-y-3 text-sm text-slate-700 font-semibold">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-blue-500" />
                      Women <span className="ml-auto text-slate-500">45%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                      Men <span className="ml-auto text-slate-500">35%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-violet-500" />
                      Accessories <span className="ml-auto text-slate-500">15%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-sky-400" />
                      Kids <span className="ml-auto text-slate-500">5%</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition">
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                <h2 className="text-xl font-bold text-slate-900">🏆 Top Selling Products</h2>
                <p className="text-sm text-slate-600 mt-1 font-medium">Your best performing products this month</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Sales</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Revenue</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {[
                      { name: 'Premium Lawn Suit', sales: 234, revenue: 1053000, trend: '↑ 15%' },
                      { name: 'Classic Kurta', sales: 189, revenue: 661500, trend: '↑ 12%' },
                      { name: 'Luxury Dresses', sales: 156, revenue: 858000, trend: '↑ 8%' },
                      { name: 'Designer Handbag', sales: 98, revenue: 539000, trend: '↓ 2%' },
                    ].map((product, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition">
                        <td className="px-6 py-4 font-bold text-slate-900">{product.name}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-700">{product.sales} units</td>
                        <td className="px-6 py-4 font-bold text-slate-900">Rs. {product.revenue.toLocaleString()}</td>
                        <td className={`px-6 py-4 font-bold text-sm ${product.trend.includes('↑') ? 'text-green-600' : 'text-red-600'}`}>
                          {product.trend}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
