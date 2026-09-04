import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const table = searchParams.get('table') || '12';

  useEffect(() => {
    // Automatically transition to menu after 2.5 seconds
    const timer = setTimeout(() => {
      navigate(`/menu?table=${table}`);
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate, table]);

  return (
    <div 
      className="fixed inset-0 bg-primary flex flex-col items-center justify-center text-secondary cursor-pointer z-50"
      onClick={() => navigate(`/menu?table=${table}`)}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="relative mb-6">
          <Coffee size={80} strokeWidth={1} className="text-accent" />
          <motion.div 
            animate={{ y: [-5, -15], opacity: [0, 0.8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-12 bg-gradient-to-t from-transparent via-white/20 to-transparent blur-sm rounded-full"
          />
        </div>
        
        <h1 className="font-serif text-4xl font-bold mb-2">Brew & Bean</h1>
        <p className="text-cafebrown-200 tracking-widest text-sm uppercase mb-8">Good Coffee. Great Moments.</p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm mb-4">
            <span className="font-medium text-white">Your table is Table {table}</span>
          </div>
          <p className="text-cafebrown-300 text-sm font-medium">Freshly brewed. Made for you.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};
