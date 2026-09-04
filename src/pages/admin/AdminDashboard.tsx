import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../../context/MenuContext';
import { Plus, Trash2, LogOut, AlertCircle, X } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { menuItems, categories, loading } = useMenu();
  const [items, setItems] = useState(menuItems);
  const [itemToDelete, setItemToDelete] = useState<{id: string, name: string} | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      navigate('/admin');
    }
  }, [navigate]);

  useEffect(() => {
    setItems(menuItems);
  }, [menuItems]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/menu/${itemToDelete.id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setItems(prev => prev.filter(item => item.id !== itemToDelete.id));
        setItemToDelete(null);
      } else {
        alert('Failed to delete item');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting item');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center mt-20">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-cafebrown-50 p-4 md:p-8 relative">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-cafebrown-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-primary p-6 flex flex-col md:flex-row md:justify-between md:items-center text-white gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold">Brew & Bean Admin</h1>
            <p className="text-sm opacity-80">Manage Menu Items</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/admin/items/new')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
            >
              <Plus size={18} /> Add Item
            </button>
            <button 
              onClick={handleLogout}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-xl font-medium transition-colors"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cafebrown-50 text-cafebrown-600 text-sm border-b border-cafebrown-100">
                <th className="p-4 font-medium">Image</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => {
                const categoryName = categories.find(c => c.id === item.categoryId)?.name || item.categoryId;
                return (
                  <tr key={item.id} className="border-b border-cafebrown-100 hover:bg-cafebrown-50/50 transition-colors">
                    <td className="p-4">
                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-cafebrown-100 border border-cafebrown-200" />
                    </td>
                    <td className="p-4 font-medium text-primary">{item.name}</td>
                    <td className="p-4 text-cafebrown-600">{categoryName}</td>
                    <td className="p-4 text-cafebrown-600 font-medium">₹{item.price}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => setItemToDelete({ id: item.id, name: item.name })}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-cafebrown-500">
                    No menu items found. Click "Add Item" to start building your menu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl border border-cafebrown-100 w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center relative">
              <button 
                onClick={() => !isDeleting && setItemToDelete(null)}
                className="absolute top-4 right-4 p-1 text-cafebrown-400 hover:text-primary transition-colors rounded-full hover:bg-cafebrown-50"
              >
                <X size={20} />
              </button>
              
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
                <AlertCircle size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary mb-2">Delete Item?</h3>
              <p className="text-cafebrown-500 text-sm mb-6">
                Are you sure you want to delete <span className="font-bold text-primary">"{itemToDelete.name}"</span>? This action cannot be undone.
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setItemToDelete(null)}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 px-4 rounded-xl font-medium text-cafebrown-700 bg-cafebrown-100 hover:bg-cafebrown-200 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 px-4 rounded-xl font-medium text-white bg-red-500 hover:bg-red-600 transition-colors shadow-sm disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
