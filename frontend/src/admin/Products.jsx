import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Edit2, Trash2, Plus, X, Upload } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nameEn: '', nameMr: '',
    descriptionEn: '', descriptionMr: '',
    mainImageUrl: '',
    strongPointsEn: '', strongPointsMr: '', // store as \n separated
    videoUrl: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        nameEn: product.nameEn || '', 
        nameMr: product.nameMr || '', 
        descriptionEn: product.descriptionEn || '', 
        descriptionMr: product.descriptionMr || '', 
        mainImageUrl: product.mainImageUrl || '',
        strongPointsEn: product.strongPointsEn ? product.strongPointsEn.join('\n') : '',
        strongPointsMr: product.strongPointsMr ? product.strongPointsMr.join('\n') : '',
        videoUrl: product.videoUrl || ''
      });
    } else {
      setEditingId(null);
      setFormData({ nameEn: '', nameMr: '', descriptionEn: '', descriptionMr: '', mainImageUrl: '', strongPointsEn: '', strongPointsMr: '', videoUrl: '' });
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgData = new FormData();
    imgData.append('file', file);
    imgData.append('folder', 'products');

    setUploadingImage(true);
    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: imgData
      });
      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({ ...prev, mainImageUrl: data.url }));
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
    
    // Parse strong points safely
    const parsedEn = formData.strongPointsEn ? formData.strongPointsEn.split('\n').map(p => p.trim()).filter(Boolean) : [];
    const parsedMr = formData.strongPointsMr ? formData.strongPointsMr.split('\n').map(p => p.trim()).filter(Boolean) : [];

    const payload = {
      ...formData,
      strongPointsEn: parsedEn,
      strongPointsMr: parsedMr
    };

    try {
      const url = editingId ? `http://localhost:5000/api/products/${editingId}` : 'http://localhost:5000/api/products';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success(editingId ? 'Product updated' : 'Product added');
        setIsModalOpen(false);
        fetchProducts();
      } else {
        toast.error('Operation failed');
      }
    } catch (error) {
      toast.error('Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
        if (res.ok) {
          toast.success('Product deleted');
          fetchProducts();
        }
      } catch (error) {
        toast.error('Error deleting product');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Products & Seeds</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="h-48 bg-gray-100 relative">
                {product.mainImageUrl ? (
                  <img src={product.mainImageUrl} alt={product.nameEn} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-xl mb-1">{product.nameEn}</h3>
                <h4 className="text-md text-gray-600 mb-2 font-medium">{product.nameMr}</h4>
                <p className="text-sm text-gray-500 mb-4 line-clamp-3">{product.descriptionEn}</p>
                
                <div className="mt-auto pt-4 flex gap-2 border-t border-gray-100">
                  <button onClick={() => handleOpenModal(product)} className="flex-1 bg-blue-50 text-blue-600 py-2 rounded font-medium hover:bg-blue-100 transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="flex-1 bg-red-50 text-red-600 py-2 rounded font-medium hover:bg-red-100 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {products.length === 0 && (
            <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-100">
              No products found. Add your first product/seed!
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold">{editingId ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div className="flex flex-col items-center mb-6">
                <div className="w-48 h-32 bg-gray-100 rounded-xl mb-3 overflow-hidden border-2 border-dashed border-gray-300 relative group flex items-center justify-center">
                  {formData.mainImageUrl ? (
                    <img src={formData.mainImageUrl} alt="Preview" className="w-full h-full object-cover" />
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
                <span className="text-sm text-gray-500">Click to upload product image</span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name (English)</label>
                  <input type="text" required value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} className="w-full p-2 border rounded" placeholder="e.g. Ocomotopora" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name (Marathi)</label>
                  <input type="text" required value={formData.nameMr} onChange={e => setFormData({...formData, nameMr: e.target.value})} className="w-full p-2 border rounded" placeholder="e.g. ओकोमोटोपोरा" />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Description (English)</label>
                  <textarea rows="3" required value={formData.descriptionEn} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} className="w-full p-2 border rounded"></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Description (Marathi)</label>
                  <textarea rows="3" required value={formData.descriptionMr} onChange={e => setFormData({...formData, descriptionMr: e.target.value})} className="w-full p-2 border rounded"></textarea>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Strong Points (English) - 1 point per line</label>
                  <textarea rows="4" value={formData.strongPointsEn} onChange={e => setFormData({...formData, strongPointsEn: e.target.value})} className="w-full p-2 border rounded" placeholder="Grows in any weather\nYields 50kg per year"></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Strong Points (Marathi) - 1 point per line</label>
                  <textarea rows="4" value={formData.strongPointsMr} onChange={e => setFormData({...formData, strongPointsMr: e.target.value})} className="w-full p-2 border rounded" placeholder="कोणत्याही वातावरणात सेटिंग होते\n50 kg माल वार्षिक उत्पन्न देते"></textarea>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">YouTube Video URL (Optional)</label>
                  <input type="url" value={formData.videoUrl} onChange={e => setFormData({...formData, videoUrl: e.target.value})} className="w-full p-2 border rounded" placeholder="https://youtube.com/..." />
                </div>
              </div>
              
              <div className="pt-6 flex justify-end gap-3 sticky bottom-0 bg-white border-t mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={uploadingImage} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold disabled:opacity-50">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
