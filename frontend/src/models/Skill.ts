import mongoose, { Schema, Model, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  slug: string;
  icon: string;
  description: string;
  color: string;
  resourceCount: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    icon: { type: String, default: '📚' },
    description: { type: String, required: true },
    color: { type: String, default: 'blue' },
    resourceCount: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

skillSchema.index({ slug: 1 });

const Skill: Model<ISkill> = mongoose.models.Skill || mongoose.model<ISkill>('Skill', skillSchema);
export default Skill;
