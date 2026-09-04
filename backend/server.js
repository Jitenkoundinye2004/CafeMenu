require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const MenuCategory = require('./models/MenuCategory');
const MenuItem = require('./models/MenuItem');

const app = express();

// Important for Vercel: Enable CORS for all domains or your specific Vercel frontend domain
app.use(cors());
// Increase JSON payload size limits for Base64 images
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Configure Multer to use memory storage (perfect for Vercel Serverless)
const storage = multer.memoryStorage();
const upload = multer({ storage });

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- CATEGORY ROUTES ---
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await MenuCategory.find();
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
    const items = await MenuItem.find();
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
    
    // If a file was uploaded, convert it to Base64
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

// For Vercel, we need to export the app
module.exports = app;

// Only start the server if not running in Vercel serverless environment
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
