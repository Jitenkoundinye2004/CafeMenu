import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../../context/MenuContext';
import { ArrowLeft, Upload, Plus, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export const AdminItemForm: React.FC = () => {
  const navigate = useNavigate();
  const { categories } = useMenu();
  const [localCategories, setLocalCategories] = useState(categories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    price: '',
    description: '',
    isVeg: true
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) navigate('/admin');
  }, [navigate]);

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const res = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName.trim() })
      });
      if (res.ok) {
        const addedCat = await res.json();
        setLocalCategories(prev => [...prev, addedCat]);
        setFormData(prev => ({ ...prev, categoryId: addedCat.id }));
        setIsAddingCategory(false);
        setNewCategoryName('');
      } else {
        alert('Failed to add category');
      }
    } catch (err) {
      alert('Error adding category');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name || !formData.categoryId || !formData.price || !imageFile) {
      setError('Please fill in all required fields (Name, Category, Price, Image).');
      setLoading(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('categoryId', formData.categoryId);
      payload.append('price', formData.price);
      payload.append('description', formData.description);
      payload.append('isVeg', String(formData.isVeg));
      payload.append('image', imageFile);

      const res = await fetch('http://localhost:5000/api/menu', {
        method: 'POST',
        body: payload
      });

      if (res.ok) {
        window.location.href = '/admin/dashboard';
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to add item');
      }
    } catch (err) {
      setError('Network error adding item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cafebrown-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-cafebrown-100 overflow-hidden">
        <div className="bg-primary p-6 text-white flex items-center gap-4">
          <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="font-serif text-2xl font-bold">Brew & Bean Admin</h1>
            <p className="text-sm opacity-80">Add New Menu Item</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-cafebrown-700 mb-1">Item Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-surface border border-cafebrown-200 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-primary outline-none transition-colors" required />
            </div>
            
            <div ref={dropdownRef} className="relative">
              <label className="block text-sm font-medium text-cafebrown-700 mb-1">Category *</label>
              {!isAddingCategory ? (
                <>
                  <button 
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={cn(
                      "w-full flex items-center justify-between bg-surface border rounded-xl px-4 py-2.5 outline-none transition-colors text-left",
                      isDropdownOpen ? "border-primary ring-1 ring-primary" : "border-cafebrown-200",
                      !formData.categoryId && "text-cafebrown-400"
                    )}
                  >
                    <span>{formData.categoryId ? localCategories.find(c => c.id === formData.categoryId)?.name : 'Select Category'}</span>
                    <ChevronDown size={18} className={cn("transition-transform text-cafebrown-400", isDropdownOpen && "rotate-180 text-primary")} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-cafebrown-100 rounded-xl shadow-lg py-1 max-h-60 overflow-y-auto">
                      {localCategories.map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, categoryId: cat.id }));
                            setIsDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-4 py-2 text-sm hover:bg-cafebrown-50 transition-colors",
                            formData.categoryId === cat.id ? "bg-cafebrown-50 text-primary font-medium" : "text-cafebrown-700"
                          )}
                        >
                          {cat.name}
                        </button>
                      ))}
                      <div className="h-px bg-cafebrown-100 my-1 mx-2" />
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingCategory(true);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm font-bold text-primary hover:bg-cafebrown-50 transition-colors flex items-center gap-2"
                      >
                        <Plus size={16} /> Create New Category
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex gap-2">
                  <input type="text" placeholder="New Category Name" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} className="flex-1 bg-surface border border-cafebrown-200 rounded-xl px-3 py-2.5 outline-none focus:ring-1 focus:ring-primary" autoFocus />
                  <button type="button" onClick={handleAddCategory} className="bg-primary text-white px-3 rounded-xl hover:bg-cafebrown-800 transition-colors text-sm font-medium">
                    Save
                  </button>
                  <button type="button" onClick={() => setIsAddingCategory(false)} className="bg-cafebrown-100 text-cafebrown-700 px-3 rounded-xl hover:bg-cafebrown-200 transition-colors text-sm font-medium">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-cafebrown-700 mb-1">Price (₹) *</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-surface border border-cafebrown-200 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-primary outline-none transition-colors" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-cafebrown-700 mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full bg-surface border border-cafebrown-200 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-primary outline-none transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-medium text-cafebrown-700 mb-1">Upload Image *</label>
            <div className="flex items-center gap-4">
              <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-cafebrown-300 rounded-xl cursor-pointer hover:bg-cafebrown-50 transition-colors bg-surface">
                <Upload className="text-cafebrown-400 mb-2" size={24} />
                <span className="text-xs text-cafebrown-500 font-medium text-center px-2">Upload from device</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
              {imagePreview && (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-xl border border-cafebrown-200 shadow-sm" />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-cafebrown-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isVeg" checked={formData.isVeg} onChange={handleChange} className="w-4 h-4 text-primary focus:ring-primary border-cafebrown-300 rounded" />
              <span className="text-sm font-medium text-cafebrown-700">Vegetarian (Veg)</span>
            </label>
          </div>

          <div className="pt-2 flex justify-end">
            <button type="submit" disabled={loading} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-cafebrown-800 disabled:opacity-70 transition-colors shadow-sm">
              {loading ? 'Adding...' : 'Save Menu Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
