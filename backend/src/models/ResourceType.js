const mongoose = require('mongoose');

const resourceTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  icon: { type: String, default: '📄' }, // emoji icon
  color: { type: String, default: 'blue' },
}, { timestamps: true });

module.exports = mongoose.model('ResourceType', resourceTypeSchema);
