import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingCart: React.FC = () => {
  const { cartCount, cartTotal } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on certain pages
  if (['/cart', '/checkout', '/order-confirmation', '/order-tracking'].includes(location.pathname)) {
    return null;
  }

  return (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 left-4 right-4 z-30 max-w-2xl mx-auto"
        >
          <button
            onClick={() => navigate('/cart')}
            className="w-full bg-primary text-white rounded-2xl shadow-lg p-4 flex items-center justify-between active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag size={24} />
                <span className="absolute -top-1 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
                <span className="text-xs text-cafebrown-200">₹{cartTotal}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm font-medium text-accent">
              View Cart <ArrowRight size={16} />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
