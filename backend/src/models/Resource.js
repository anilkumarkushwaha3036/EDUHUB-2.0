const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  link: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  typeId: { type: mongoose.Schema.Types.ObjectId, ref: 'ResourceType', required: true },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  tags: [{ type: String, lowercase: true, trim: true }],
  isApproved: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

// Full-text search index
resourceSchema.index({ title: 'text', description: 'text', tags: 'text' });
// Compound index for filtering
resourceSchema.index({ skillId: 1, typeId: 1, level: 1 });
resourceSchema.index({ isApproved: 1 });

module.exports = mongoose.model('Resource', resourceSchema);
