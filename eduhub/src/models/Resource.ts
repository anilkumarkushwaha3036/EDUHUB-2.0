import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IResource extends Document {
  title: string;
  link: string;
  description: string;
  thumbnail: string;
  skillId: mongoose.Types.ObjectId;
  typeId: mongoose.Types.ObjectId;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  isApproved: boolean;
  views: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const resourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    thumbnail: { type: String, default: '' },
    skillId: { type: Schema.Types.ObjectId, ref: 'Skill', required: true },
    typeId: { type: Schema.Types.ObjectId, ref: 'ResourceType', required: true },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    tags: [{ type: String, lowercase: true, trim: true }],
    isApproved: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Full-text search index
resourceSchema.index({ title: 'text', description: 'text', tags: 'text' });
// Compound index for filtering
resourceSchema.index({ skillId: 1, typeId: 1, level: 1 });
resourceSchema.index({ isApproved: 1 });

const Resource: Model<IResource> =
  mongoose.models.Resource || mongoose.model<IResource>('Resource', resourceSchema);
export default Resource;
