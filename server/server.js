import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();

// ✅ Configure CORS to allow only your frontend domain
const allowedOrigins = ['https://text-to-image-generator-hazel.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Not Allowed'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// ✅ Ensure preflight requests are handled
app.options('*', cors());

// ✅ Connect to MongoDB
await connectDB();

// ✅ Set up routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get('/', (req, res) => res.send("API Working Fine.."));

// ✅ Start server
app.listen(PORT, () => console.log('Server running on port ' + PORT));
