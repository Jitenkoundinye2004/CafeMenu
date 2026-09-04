require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const MenuCategory = require('./models/MenuCategory');
const MenuItem = require('./models/MenuItem');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp for uniqueness
  }
});
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
    // Auto-generate ID if not provided (e.g. "new-category")
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

// Add a menu item with image upload
app.post('/api/menu', upload.single('image'), async (req, res) => {
  try {
    const data = req.body || {};
    const catId = data.categoryId || 'x';
    
    // Auto-generate unique ID
    const uniqueId = catId.charAt(0) + '-' + Math.random().toString(36).substring(2, 8);
    
    let imageUrl = data.imageUrl || '';
    if (req.file) {
      // If deployed, this should be a full URL. For local, relative is fine but absolute is better for React.
      // We'll return the relative path and let the frontend prefix it, or just return absolute localhost.
      imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const newItem = new MenuItem({
      id: uniqueId,
      categoryId: data.categoryId,
      name: data.name,
      price: Number(data.price),
      description: data.description,
      isVeg: data.isVeg === 'true', // FormData sends booleans as strings
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
