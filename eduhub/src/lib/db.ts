import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

// Use a global cache to survive Next.js hot reloads in development
declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

let cached = global._mongooseCache;

if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log('⚡ [EduHub Database] Connecting to MongoDB Atlas Cloud...');
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((m) => {
      console.log('🟢 [EduHub Database] MongoDB Atlas Cloud Database connected successfully!');
      return m;
    }).catch((err) => {
      console.error('🔴 [EduHub Database] Failed to connect to MongoDB Atlas Cloud:', err.message);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
