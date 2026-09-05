import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String }
});

const MenuCategory = mongoose.models.MenuCategory || mongoose.model('MenuCategory', categorySchema);
export default MenuCategory;
