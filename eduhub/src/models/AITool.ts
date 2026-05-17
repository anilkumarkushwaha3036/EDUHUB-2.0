import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IAITool extends Document {
  name: string;
  description: string;
  logo: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

const aiToolSchema = new Schema<IAITool>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    logo: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

const AITool: Model<IAITool> =
  mongoose.models.AITool || mongoose.model<IAITool>('AITool', aiToolSchema);
export default AITool;
