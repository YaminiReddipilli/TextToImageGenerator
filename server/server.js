import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import path from 'path'

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cors())
await connectDB()

// API routes
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

// API health route
app.get('/api', (req, res) => res.send("API Working Fine.."))

// ---------------- Serve Frontend ----------------
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
// -------------------------------------------------

app.listen(PORT, () => console.log('Server running on port ' + PORT))
