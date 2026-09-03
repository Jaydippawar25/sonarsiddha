import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Profit = () => {
  const [data, setData] = useState({
    titleEn: '',
    titleMr: '',
    expenses: [],
    totalAmount: 0,
    totalLabelEn: '',
    totalLabelMr: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/profit');
      const json = await res.json();
      if (json.expenses) {
        setData(json);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load profit data');
      setLoading(false);
    }
  };

  const handleExpenseChange = (index, field, value) => {
    const updatedExpenses = [...data.expenses];
    updatedExpenses[index][field] = field === 'amount' ? Number(value) : value;
    
    // Auto-calculate total
    const newTotal = updatedExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    
    setData({
      ...data,
      expenses: updatedExpenses,
      totalAmount: newTotal
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: name === 'totalAmount' ? Number(value) : value
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/profit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        toast.success('Profit data saved successfully!');
      } else {
        toast.error('Failed to save data');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error saving data');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Farmer Profit</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Title (English)</label>
          <input 
            type="text" 
            name="titleEn" 
            value={data.titleEn || ''} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title (Marathi)</label>
          <input 
            type="text" 
            name="titleMr" 
            value={data.titleMr || ''} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4 text-gray-700">Expenses</h3>
      <div className="space-y-4 mb-8">
        {data.expenses && data.expenses.map((expense, index) => (
          <div key={index} className="flex flex-wrap gap-4 p-4 border rounded bg-gray-50 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">Name (English)</label>
              <input 
                type="text" 
                value={expense.nameEn || ''} 
                onChange={(e) => handleExpenseChange(index, 'nameEn', e.target.value)} 
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">Name (Marathi)</label>
              <input 
                type="text" 
                value={expense.nameMr || ''} 
                onChange={(e) => handleExpenseChange(index, 'nameMr', e.target.value)} 
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium mb-1">Amount (₹)</label>
              <input 
                type="number" 
                value={expense.amount || 0} 
                onChange={(e) => handleExpenseChange(index, 'amount', e.target.value)} 
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="w-16">
              <label className="block text-sm font-medium mb-1">Icon</label>
              <input 
                type="text" 
                value={expense.icon || ''} 
                onChange={(e) => handleExpenseChange(index, 'icon', e.target.value)} 
                className="w-full p-2 border rounded text-center"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-green-50 border border-green-200 rounded">
        <div>
          <label className="block text-sm font-medium mb-1">Total Amount (₹)</label>
          <input 
            type="number" 
            name="totalAmount" 
            value={data.totalAmount || 0} 
            onChange={handleChange} 
            className="w-full p-2 border rounded font-bold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Label (English)</label>
          <input 
            type="text" 
            name="totalLabelEn" 
            value={data.totalLabelEn || ''} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Label (Marathi)</label>
          <input 
            type="text" 
            name="totalLabelMr" 
            value={data.totalLabelMr || ''} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <button 
        onClick={handleSave} 
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold shadow-md transition-colors"
      >
        Save Changes
      </button>

    </div>
  );
};

export default Profit;
