import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'

// ✅ Proper __dirname for ES modules (works on Railway and locally)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cors())
await connectDB()

// 🔹 API routes
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

// 🔹 API health check
app.get('/api', (req, res) => res.send('API Working Fine..'))

// 🔹 FRONTEND PATH (correct for Railway: /app/client/dist)
const frontendPath = path.join(__dirname, '..', 'client', 'dist')
console.log('Serving frontend from:', frontendPath)

// Serve static files from React build
app.use(express.static(frontendPath))

// SPA fallback: any non-API route -> index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'))
})

// Listen on 0.0.0.0 so Railway can reach it
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port ' + PORT)
})
