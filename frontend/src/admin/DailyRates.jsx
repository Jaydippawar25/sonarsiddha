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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Daily Rates</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <Plus size={20} /> Update Rate
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600">Product Name</th>
                <th className="p-4 font-semibold text-gray-600">Rate</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rates.length === 0 ? (
                <tr><td colSpan="4" className="p-4 text-center text-gray-500">No daily rates found.</td></tr>
              ) : (
                rates.sort((a,b) => new Date(b.date) - new Date(a.date)).map(rate => (
                  <tr key={rate.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">{new Date(rate.date).toLocaleDateString()}</td>
                    <td className="p-4">
                      {rate.productNameEn} <br/>
                      <span className="text-sm text-gray-500">{rate.productNameMr}</span>
                    </td>
                    <td className="p-4 font-bold text-green-700">
                      ₹{rate.rate} / {rate.unitEn}
                    </td>
                    <td className="p-4 flex justify-end gap-3">
                      <button onClick={() => handleOpenModal(rate)} className="text-blue-500 hover:bg-blue-50 p-2 rounded">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(rate.id)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl font-bold">{editingId ? 'Edit Rate' : 'Add Daily Rate'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-2 border rounded" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Select Product (From existing products)</label>
                  <select 
                    value={formData.productId} 
                    onChange={handleProductChange}
                    className="w-full p-2 border rounded bg-white"
                  >
                    <option value="">-- Custom Product --</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.nameEn} ({p.nameMr})</option>
                    ))}
                  </select>
                </div>

                {!formData.productId && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Product Name (English)</label>
                      <input type="text" value={formData.productNameEn} onChange={e => setFormData({...formData, productNameEn: e.target.value})} className="w-full p-2 border rounded" placeholder="e.g. Drumstick" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Product Name (Marathi)</label>
                      <input type="text" value={formData.productNameMr} onChange={e => setFormData({...formData, productNameMr: e.target.value})} className="w-full p-2 border rounded" placeholder="e.g. शेवगा" />
                    </div>
                  </>
                )}

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Rate (₹)</label>
                  <input type="number" required value={formData.rate} onChange={e => setFormData({...formData, rate: e.target.value})} className="w-full p-2 border rounded" placeholder="e.g. 150" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Unit (English)</label>
                  <input type="text" required value={formData.unitEn} onChange={e => setFormData({...formData, unitEn: e.target.value})} className="w-full p-2 border rounded" placeholder="e.g. kg or quintal" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Unit (Marathi)</label>
                  <input type="text" required value={formData.unitMr} onChange={e => setFormData({...formData, unitMr: e.target.value})} className="w-full p-2 border rounded" placeholder="e.g. किलो किंवा क्विंटल" />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-3 border-t mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold">Save Rate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyRates;
