import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Edit2, Trash2, Plus, X } from 'lucide-react';

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    titleEn: '', titleMr: '',
    nameEn: '', nameMr: '',
    linesEn: '', linesMr: '',
    phones: ''
  });

  const fetchBranches = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/branches');
      if (res.ok) {
        const data = await res.json();
        setBranches(data);
      }
    } catch (error) {
      toast.error('Failed to fetch branches');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleOpenModal = (branch = null) => {
    if (branch) {
      setEditingId(branch.id);
      setFormData({
        titleEn: branch.titleEn || '', titleMr: branch.titleMr || '',
        nameEn: branch.nameEn || '', nameMr: branch.nameMr || '',
        linesEn: branch.linesEn ? branch.linesEn.join('\n') : '', 
        linesMr: branch.linesMr ? branch.linesMr.join('\n') : '',
        phones: branch.phones ? branch.phones.join(', ') : ''
      });
    } else {
      setEditingId(null);
      setFormData({ titleEn: '', titleMr: '', nameEn: '', nameMr: '', linesEn: '', linesMr: '', phones: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      titleEn: formData.titleEn,
      titleMr: formData.titleMr,
      nameEn: formData.nameEn,
      nameMr: formData.nameMr,
      linesEn: formData.linesEn.split('\n').map(l => l.trim()).filter(Boolean),
      linesMr: formData.linesMr.split('\n').map(l => l.trim()).filter(Boolean),
      phones: formData.phones.split(',').map(p => p.trim()).filter(Boolean)
    };

    try {
      const url = editingId ? `http://localhost:5000/api/branches/${editingId}` : 'http://localhost:5000/api/branches';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success(editingId ? 'Branch updated' : 'Branch added');
        setIsModalOpen(false);
        fetchBranches();
      } else {
        toast.error('Operation failed');
      }
    } catch (error) {
      toast.error('Error saving branch');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/branches/${id}`, { method: 'DELETE' });
        if (res.ok) {
          toast.success('Branch deleted');
          fetchBranches();
        }
      } catch (error) {
        toast.error('Error deleting branch');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Branches</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <Plus size={20} /> Add Branch
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Branch Name (EN)</th>
                <th className="p-4 font-semibold text-gray-600">Branch Name (MR)</th>
                <th className="p-4 font-semibold text-gray-600">Phones</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {branches.length === 0 ? (
                <tr><td colSpan="4" className="p-4 text-center text-gray-500">No branches found.</td></tr>
              ) : (
                branches.map(b => (
                  <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4">{b.titleEn}</td>
                    <td className="p-4">{b.titleMr}</td>
                    <td className="p-4">{b.phones?.join(', ')}</td>
                    <td className="p-4 flex justify-end gap-3">
                      <button onClick={() => handleOpenModal(b)} className="text-blue-500 hover:bg-blue-50 p-2 rounded">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(b.id)} className="text-red-500 hover:bg-red-50 p-2 rounded">
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
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl font-bold">{editingId ? 'Edit Branch' : 'Add Branch'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Branch Title (English)</label>
                  <input type="text" required value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} className="w-full p-2 border rounded" placeholder="e.g. Main Office" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Branch Title (Marathi)</label>
                  <input type="text" required value={formData.titleMr} onChange={e => setFormData({...formData, titleMr: e.target.value})} className="w-full p-2 border rounded" placeholder="e.g. मुख्य कार्यालय" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Person Name (English)</label>
                  <input type="text" value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Person Name (Marathi)</label>
                  <input type="text" value={formData.nameMr} onChange={e => setFormData({...formData, nameMr: e.target.value})} className="w-full p-2 border rounded" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Address Lines (English) - 1 line per row</label>
                  <textarea rows="3" required value={formData.linesEn} onChange={e => setFormData({...formData, linesEn: e.target.value})} className="w-full p-2 border rounded" placeholder="Line 1\nLine 2"></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Address Lines (Marathi) - 1 line per row</label>
                  <textarea rows="3" required value={formData.linesMr} onChange={e => setFormData({...formData, linesMr: e.target.value})} className="w-full p-2 border rounded" placeholder="ओळ १\nओळ २"></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Phone Numbers (Comma separated)</label>
                  <input type="text" required value={formData.phones} onChange={e => setFormData({...formData, phones: e.target.value})} className="w-full p-2 border rounded" placeholder="e.g. 9876543210, 8765432109" />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Save Branch</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Branches;
