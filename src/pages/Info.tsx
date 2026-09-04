import React from 'react';
import { Header } from '../components/Header';
import { Clock, MapPin, Phone, Wifi, Wind, Dog } from 'lucide-react';

export const Info: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface pb-32">
      <Header showBack title="About Us" />
      
      <div className="relative h-48 w-full mb-6">
        <img 
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80" 
          alt="Brew & Bean Exterior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="font-serif text-3xl font-bold mb-1">Brew & Bean</h1>
          <p className="text-sm opacity-90">Good Coffee. Great Moments.</p>
        </div>
      </div>

      <div className="px-4 space-y-6">
        <p className="text-cafebrown-700 leading-relaxed">
          Your neighborhood café for coffee, food and good conversations. We source the finest beans and prepare our food fresh every day.
        </p>

        <div className="bg-cafebrown-50 rounded-2xl p-4 border border-cafebrown-100">
          <h3 className="font-serif font-bold text-primary mb-3 flex items-center gap-2">
            <Clock size={18} /> Opening Hours
          </h3>
          <div className="flex justify-between text-sm text-cafebrown-700">
            <span>Monday - Sunday</span>
            <span className="font-bold">8:00 AM - 11:00 PM</span>
          </div>
        </div>

        <div>
          <h3 className="font-serif font-bold text-primary mb-3 text-lg">Facilities</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-cafebrown-700 bg-surface border border-cafebrown-200 p-3 rounded-xl">
              <Wifi size={16} className="text-primary" /> Free Wi-Fi
            </div>
            <div className="flex items-center gap-2 text-sm text-cafebrown-700 bg-surface border border-cafebrown-200 p-3 rounded-xl">
              <Wind size={16} className="text-primary" /> AC
            </div>
            <div className="flex items-center gap-2 text-sm text-cafebrown-700 bg-surface border border-cafebrown-200 p-3 rounded-xl">
              <MapPin size={16} className="text-primary" /> Outdoor Seating
            </div>
            <div className="flex items-center gap-2 text-sm text-cafebrown-700 bg-surface border border-cafebrown-200 p-3 rounded-xl">
              <Dog size={16} className="text-primary" /> Pet Friendly
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-serif font-bold text-primary mb-3 text-lg">Contact</h3>
          <div className="space-y-3">
            <a href="tel:+919876543210" className="flex items-center gap-3 text-cafebrown-700 hover:text-primary transition-colors">
              <div className="w-10 h-10 bg-cafebrown-50 rounded-full flex items-center justify-center text-primary">
                <Phone size={18} />
              </div>
              <span className="text-sm font-medium">+91 98765 43210</span>
            </a>
            <div className="flex items-center gap-3 text-cafebrown-700">
              <div className="w-10 h-10 bg-cafebrown-50 rounded-full flex items-center justify-center text-primary">
                <MapPin size={18} />
              </div>
              <span className="text-sm font-medium">123 Coffee Lane, Brewville</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
