import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
import { API_BASE } from '../config';

const DailyRates = () => {
  const [rates, setRates] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    productId: '', productNameEn: '', productNameMr: '', rate: '', unitEn: '', unitMr: '', date: ''
  });

  const fetchData = async () => {
    try {
      const [resRates, resProducts] = await Promise.all([
        fetch(`${API_BASE}/dailyRates`),
        fetch(`${API_BASE}/products`)
      ]);

      if (resRates.ok && resProducts.ok) {
        setRates(await resRates.json());
        setProducts(await resProducts.json());
      }
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (rate = null) => {
    if (rate) {
      setEditingId(rate.id);
      setFormData({
        productId: rate.productId || '', 
        productNameEn: rate.productNameEn || '', 
        productNameMr: rate.productNameMr || '',
        rate: rate.rate || '', 
        unitEn: rate.unitEn || '', 
        unitMr: rate.unitMr || '',
        date: rate.date || new Date().toISOString().split('T')[0]
      });
    } else {
      setEditingId(null);
      setFormData({ 
        productId: '', productNameEn: '', productNameMr: '', rate: '', unitEn: 'kg', unitMr: 'किलो', date: new Date().toISOString().split('T')[0] 
      });
    }
    setIsModalOpen(true);
  };

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    const product = products.find(p => p.id === selectedProductId);
    if (product) {
      setFormData(prev => ({
        ...prev,
        productId: selectedProductId,
        productNameEn: product.nameEn,
        productNameMr: product.nameMr
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        productId: '',
        productNameEn: '',
        productNameMr: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productId && !formData.productNameEn) {
      toast.error('Please select or enter a product name');
      return;
    }

    try {
      const url = editingId ? `${API_BASE}/dailyRates/${editingId}` : `${API_BASE}/dailyRates`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success(editingId ? 'Rate updated' : 'Rate added');
        setIsModalOpen(false);
        fetchData();
      } else {
        toast.error('Operation failed');
      }
    } catch (error) {
      toast.error('Error saving rate');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this rate entry?')) {
      try {
        const res = await fetch(`${API_BASE}/dailyRates/${id}`, { method: 'DELETE' });
        if (res.ok) {
          toast.success('Rate deleted');
          fetchData();
        }
      } catch (error) {
        toast.error('Error deleting rate');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900">Manage Daily Mandi Rates</h2>
          <p className="text-xs text-slate-500 font-mono mt-0.5">Real-time daily rate entries displayed across public platform & rates dashboard</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-xs text-sm cursor-pointer"
        >
          <Plus size={18} /> Add / Update Rate
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs font-mono text-slate-500 uppercase tracking-wider animate-pulse">
          Loading daily rates table...
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 font-mono text-xs text-slate-600 uppercase">
                <th className="p-4 font-bold">Date Stamp</th>
                <th className="p-4 font-bold">Crop / Product</th>
                <th className="p-4 font-bold">Live Rate (₹)</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-body text-sm">
              {rates.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-500 font-mono text-xs">
                    No daily rates recorded yet. Click "Add / Update Rate" above to create an entry.
                  </td>
                </tr>
              ) : (
                rates.sort((a,b) => new Date(b.date) - new Date(a.date)).map(rate => (
                  <tr key={rate.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-medium text-slate-700">
                      {new Date(rate.date).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <strong className="text-slate-900 font-semibold block">{rate.productNameEn}</strong>
                      <span className="text-xs text-slate-500 font-mono">{rate.productNameMr}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-emerald-700 font-mono font-bold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg text-sm inline-block">
                        ₹{rate.rate} / {rate.unitEn}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(rate)} 
                          className="text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 p-2 rounded-lg transition-colors cursor-pointer"
                          title="Edit Rate"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(rate.id)} 
                          className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-colors cursor-pointer"
                          title="Delete Entry"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Form Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-display font-bold text-lg text-slate-900">
                {editingId ? 'Edit Mandi Rate Entry' : 'Add New Mandi Rate'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="col-span-2">
                  <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider">Date Stamp</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.date} 
                    onChange={e => setFormData({...formData, date: e.target.value})} 
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-body text-sm" 
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider">Select Product</label>
                  <select 
                    value={formData.productId} 
                    onChange={handleProductChange}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-body text-sm"
                  >
                    <option value="">-- Custom Crop / Product --</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.nameEn} ({p.nameMr})</option>
                    ))}
                  </select>
                </div>

                {!formData.productId && (
                  <>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider">Crop Name (EN)</label>
                      <input 
                        type="text" 
                        value={formData.productNameEn} 
                        onChange={e => setFormData({...formData, productNameEn: e.target.value})} 
                        className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-body text-sm" 
                        placeholder="e.g. Drumstick" 
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider">Crop Name (MR)</label>
                      <input 
                        type="text" 
                        value={formData.productNameMr} 
                        onChange={e => setFormData({...formData, productNameMr: e.target.value})} 
                        className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-body text-sm" 
                        placeholder="e.g. शेवगा" 
                      />
                    </div>
                  </>
                )}

                <div className="col-span-2">
                  <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider">Mandi Rate (₹ per unit)</label>
                  <input 
                    type="number" 
                    required 
                    value={formData.rate} 
                    onChange={e => setFormData({...formData, rate: e.target.value})} 
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-body text-sm font-mono font-bold" 
                    placeholder="e.g. 150" 
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider">Unit (EN)</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.unitEn} 
                    onChange={e => setFormData({...formData, unitEn: e.target.value})} 
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-body text-sm" 
                    placeholder="e.g. kg" 
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider">Unit (MR)</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.unitMr} 
                    onChange={e => setFormData({...formData, unitMr: e.target.value})} 
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-body text-sm" 
                    placeholder="e.g. किलो" 
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-100 font-semibold text-xs text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyRates;
