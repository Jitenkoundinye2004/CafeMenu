require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const MenuCategory = require('./models/MenuCategory');
const MenuItem = require('./models/MenuItem');

const app = express();

// Enable CORS for all domains
app.use(cors());

// Increase JSON payload size limits for Base64 images
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Configure Multer for in-memory buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Serverless-optimized MongoDB connection caching
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
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((m) => m);
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

// Middleware to ensure DB connection before handling request
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
    // Enable Edge / Browser caching (60 seconds fresh, 5 minutes stale revalidate)
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

// Add a menu item with Base64 image upload
app.post('/api/menu', upload.single('image'), async (req, res) => {
  try {
    const data = req.body || {};
    const catId = data.categoryId || 'unknown';
    
    // Auto-generate unique ID
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

// Health check route for Vercel
app.get('/', (req, res) => {
  res.send('Brew & Bean API is running gracefully.');
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
