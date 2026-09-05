import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';

import MenuCategory from './models/MenuCategory.js';
import MenuItem from './models/MenuItem.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://koundinyejiten_db_user:JGDce36cRa39NiVn@cluster0.8ozrmoz.mongodb.net/';

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    res.status(500).json({ error: 'Database connection failed: ' + err.message });
  }
});

// --- CATEGORY ROUTES ---
app.get('/api/categories', async (req, res) => {
  try {
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    const categories = await MenuCategory.find().lean();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const id = req.body.name.toLowerCase().replace(/\s+/g, '-');
    const newCategory = new MenuCategory({
      id: id,
      name: req.body.name
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- MENU ROUTES ---
app.get('/api/menu', async (req, res) => {
  try {
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    const items = await MenuItem.find().lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/menu', upload.single('image'), async (req, res) => {
  try {
    const data = req.body || {};
    const catId = data.categoryId || 'unknown';
    const uniqueId = catId.charAt(0) + '-' + Math.random().toString(36).substring(2, 8);
    
    let imageUrl = data.imageUrl || '';
    if (req.file) {
      const base64 = req.file.buffer.toString('base64');
      imageUrl = `data:${req.file.mimetype};base64,${base64}`;
    }

    const newItem = new MenuItem({
      id: uniqueId,
      categoryId: data.categoryId,
      name: data.name,
      price: Number(data.price),
      description: data.description,
      isVeg: data.isVeg === 'true',
      imageUrl: imageUrl,
      rating: 4.5
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/menu/:id', async (req, res) => {
  try {
    const result = await MenuItem.findOneAndDelete({ id: req.params.id });
    if (!result) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api', (req, res) => {
  res.send('Brew & Bean API is running on Vercel.');
});

export default app;
