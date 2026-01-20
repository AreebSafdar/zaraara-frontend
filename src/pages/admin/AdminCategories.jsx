import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { CATEGORIES } from '../../data/mockData';

export default function AdminCategories() {
  const [showModal, setShowModal] = useState(false);
  const [categories] = useState(CATEGORIES);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        <AdminHeader />

        <main className="flex-1 overflow-auto">
          <div className="p-8 space-y-8">
            {/* Header with Add Button */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                  Categories
                </h1>
                <p className="text-slate-600 mt-2 font-medium">Organize and manage your product categories.</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105 shadow-lg"
              >
                <Plus size={20} />
                Add Category
              </button>
            </div>

            {/* Categories Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                      <button className="p-3 bg-white rounded-lg hover:bg-slate-100 transition shadow-lg hover:shadow-xl font-bold">
                        <Edit2 size={20} className="text-blue-600" />
                      </button>
                      <button className="p-3 bg-white rounded-lg hover:bg-slate-100 transition shadow-lg hover:shadow-xl font-bold">
                        <Trash2 size={20} className="text-red-600" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{category.name}</h3>
                    <p className="text-sm text-slate-600 mb-4 font-medium">Slug: <span className="font-mono text-primary font-bold">{category.slug}</span></p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-slate-200">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-3 rounded-xl border border-blue-200/50">
                        <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">Products</p>
                        <p className="text-2xl font-bold text-primary mt-1">
                          {Math.floor(Math.random() * 50) + 10}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-3 rounded-xl border border-green-200/50">
                        <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">Status</p>
                        <p className="text-2xl font-bold text-green-600 mt-1">✓</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition font-bold text-sm shadow-md">
                        View
                      </button>
                      <button className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition font-bold text-sm text-slate-700 shadow-sm hover:shadow-md">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add More Space for Scrolling */}
            <div className="h-10"></div>
          </div>
        </main>
      </div>

      {/* Add Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white sticky top-0 z-10">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">📂 Add New Category</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category Name</label>
                <input
                  type="text"
                  placeholder="e.g., Men"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Slug</label>
                <input
                  type="text"
                  placeholder="e.g., men"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Image URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition font-medium"
                />
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 bg-slate-50/50 flex gap-4 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 border border-slate-300 rounded-lg hover:bg-white hover:border-slate-400 transition font-bold text-slate-700 shadow-sm hover:shadow-md"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-xl transition font-bold shadow-lg">
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
