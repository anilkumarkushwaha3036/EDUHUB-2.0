import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  coverImage: string;
  details: string;
  link: string;
  author?: string;
  date?: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    coverImage: { type: String, required: true },
    details: { type: String, required: true, trim: true },
    link: { type: String, required: true },
    author: { type: String, trim: true },
    date: { type: String, trim: true },
  },
  { timestamps: true }
);

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>('Blog', blogSchema);
export default Blog;
