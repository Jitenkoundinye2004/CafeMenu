import mongoose from 'mongoose';

const customizationOptionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true, default: 0 }
});

const customizationGroupSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['single', 'multiple'], required: true },
  options: [customizationOptionSchema]
});

const menuItemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  categoryId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  prepTime: { type: String },
  isVeg: { type: Boolean, default: true },
  isBestseller: { type: Boolean, default: false },
  imageUrl: { type: String },
  ingredients: [String],
  customizations: [customizationGroupSchema]
});

const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);
export default MenuItem;
