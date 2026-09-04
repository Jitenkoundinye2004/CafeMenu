import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MenuCategory from './models/MenuCategory.js';
import MenuItem from './models/MenuItem.js';
import { categories, menuItems } from '../src/data/menuData.ts';

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');

    await MenuCategory.deleteMany({});
    await MenuItem.deleteMany({});
    console.log('Cleared existing data');

    await MenuCategory.insertMany(categories);
    await MenuItem.insertMany(menuItems);
    
    console.log('Successfully seeded database');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seed();
