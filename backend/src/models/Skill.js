const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  icon: { type: String, default: '📚' },
  description: { type: String, required: true },
  color: { type: String, default: 'blue' }, // for card accent color
  resourceCount: { type: Number, default: 0 },
  order: { type: Number, default: 0 }, // for display ordering
}, { timestamps: true });

skillSchema.index({ slug: 1 });

module.exports = mongoose.model('Skill', skillSchema);
