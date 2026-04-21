import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IResourceType extends Document {
  name: string;
  slug: string;
  icon: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

const resourceTypeSchema = new Schema<IResourceType>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    icon: { type: String, default: '📄' },
    color: { type: String, default: 'blue' },
  },
  { timestamps: true }
);

const ResourceType: Model<IResourceType> =
  mongoose.models.ResourceType || mongoose.model<IResourceType>('ResourceType', resourceTypeSchema);
export default ResourceType;
