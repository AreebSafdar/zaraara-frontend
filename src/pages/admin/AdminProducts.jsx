import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { PRODUCTS } from '../../data/mockData';
import AdminProductsChart from '../../components/admin/AdminProductsChart';

export default function AdminProducts() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products] = useState(PRODUCTS);
  const [imageModal, setImageModal] = useState({ open: false, src: '' });

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  Products
                </h1>
                <p className="text-slate-600 mt-2 font-medium">Manage and organize your fashion collection with ease.</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105 shadow-lg"
              >
                <Plus size={20} />
                Add Product
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by product name, ID, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-white shadow-sm hover:shadow-md font-medium text-slate-700"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition font-semibold text-slate-700 shadow-sm hover:shadow-md">
                <Filter size={20} />
                Filter
              </button>
            </div>

            {/* Products Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* <div className="lg:col-span-1">
                <AdminProductsChart />
              </div> */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50/50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              onClick={() => setImageModal({ open: true, src: product.image })}
                              className="w-12 h-12 rounded-lg object-cover shadow-md cursor-pointer"
                            />
                            <div>
                              <p className="font-bold text-slate-900">{product.name}</p>
                              <p className="text-xs text-slate-500 font-medium">ID: {product.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-700 capitalize">{product.category}</td>
                        <td className="px-6 py-4 font-bold text-primary">Rs. {product.price.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                            45 units
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-bold px-3 py-1.5 rounded-full inline-block border ${
                              product.sale
                                ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-green-200'
                                : 'bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            {product.sale ? '🔥 On Sale' : 'Active'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2.5 hover:bg-blue-100 rounded-lg transition text-blue-600 hover:shadow-md font-bold">
                              <Edit2 size={18} />
                            </button>
                            <button className="p-2.5 hover:bg-red-100 rounded-lg transition text-red-600 hover:shadow-md font-bold">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
              <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200">
                <p className="text-sm text-slate-600 font-medium">
                  Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> of{' '}
                  <span className="font-bold text-slate-900">{products.length}</span> products
                </p>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition font-semibold text-slate-700 shadow-sm">Previous</button>
                <button className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg hover:shadow-xl transition font-semibold">1</button>
                <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition font-semibold text-slate-700 shadow-sm">2</button>
                <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition font-semibold text-slate-700 shadow-sm">Next</button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto shadow-2xl border border-slate-200">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white sticky top-0 z-10">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">➕ Add New Product</h2>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                className="col-span-2 px-4 py-3 border border-slate-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition font-medium"
              />
              <input
                type="number"
                placeholder="Price"
                className="px-4 py-3 border border-slate-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition font-medium"
              />
              <input
                type="number"
                placeholder="Original Price"
                className="px-4 py-3 border border-slate-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition font-medium"
              />
              <select className="col-span-2 px-4 py-3 border border-slate-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition font-medium text-slate-700">
                <option>Select Category</option>
                <option>Women</option>
                <option>Men</option>
                <option>Kids</option>
                <option>Accessories</option>
                <option>Fragrances</option>
              </select>
              <textarea
                placeholder="Product Description"
                className="col-span-2 px-4 py-3 border border-slate-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition font-medium h-20"
              ></textarea>
            </div>
            <div className="p-6 border-t border-slate-200 bg-slate-50/50 flex gap-4 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 border border-slate-300 rounded-lg hover:bg-white hover:border-slate-400 transition font-bold text-slate-700 shadow-sm hover:shadow-md"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-xl transition font-bold shadow-lg">
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
      {imageModal.open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200">
            <img src={imageModal.src} alt="Product" className="w-full h-[520px] object-cover" />
            <div className="p-4 flex justify-end">
              <button
                onClick={() => setImageModal({ open: false, src: '' })}
                className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
