import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Edit2, Trash2, Plus, X, Upload } from 'lucide-react';
import { API_BASE } from '../config';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', designation: '', region: '', phone: '', imageUrl: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API_BASE}/members`);
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
      }
    } catch (error) {
      toast.error('Failed to fetch members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingId(member.id);
      setFormData({
        name: member.name || '', 
        designation: member.designation || '', 
        region: member.region || '', 
        phone: member.phone || '', 
        imageUrl: member.imageUrl || ''
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', designation: '', region: '', phone: '', imageUrl: '' });
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgData = new FormData();
    imgData.append('file', file);
    imgData.append('folder', 'members');

    setUploadingImage(true);
    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: imgData
      });
      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
        toast.success('Image uploaded');
      } else {
        toast.error('Image upload failed');
      }
    } catch (error) {
      toast.error('Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId ? `${API_BASE}/members/${editingId}` : `${API_BASE}/members`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success(editingId ? 'Member updated' : 'Member added');
        setIsModalOpen(false);
        fetchMembers();
      } else {
        toast.error('Operation failed');
      }
    } catch (error) {
      toast.error('Error saving member');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        const res = await fetch(`${API_BASE}/members/${id}`, { method: 'DELETE' });
        if (res.ok) {
          toast.success('Member deleted');
          fetchMembers();
        }
      } catch (error) {
        toast.error('Error deleting member');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Team Members</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <Plus size={20} /> Add Member
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map(member => (
            <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-48 bg-gray-100 relative">
                {member.imageUrl ? (
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600 font-medium">{member.designation} • {member.region}</p>
                <p className="text-sm text-gray-500 mt-2">📞 {member.phone}</p>
                
                <div className="mt-4 flex gap-2 border-t pt-4">
                  <button onClick={() => handleOpenModal(member)} className="flex-1 bg-blue-50 text-blue-600 py-2 rounded font-medium hover:bg-blue-100 transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(member.id)} className="flex-1 bg-red-50 text-red-600 py-2 rounded font-medium hover:bg-red-100 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {members.length === 0 && (
            <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-100">
              No members found. Add one!
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl font-bold">{editingId ? 'Edit Member' : 'Add Member'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 bg-gray-100 rounded-full mb-3 overflow-hidden border-2 border-dashed border-gray-300 relative group flex items-center justify-center">
                  {formData.imageUrl ? (
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="text-gray-400" />
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={uploadingImage}
                  />
                  {uploadingImage && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-bold">Uploading...</div>}
                </div>
                <span className="text-sm text-gray-500">Click to upload photo</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded" placeholder="e.g. Vinod Gayekwad" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Designation</label>
                  <input type="text" required value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} className="w-full p-2 border rounded" placeholder="e.g. Sales Manager" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Region</label>
                  <input type="text" required value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} className="w-full p-2 border rounded" placeholder="e.g. Pune" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input type="text" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2 border rounded" placeholder="e.g. 9876543210" />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={uploadingImage} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
