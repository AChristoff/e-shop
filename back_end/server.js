import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// Routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


// Dotenv 
dotenv.config()

// Mongo connection
connectDB()

// Express
const app = express()

// Start helmet
app.use(helmet());

// Set limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 1000, // Limit each IP to 100 requests per 15 min
  message: {
    status: 429,
    limiter: true,
    type: "error",
    message: 'To many requests, try again after 15 min'
  }
})
app.use(limiter) // allow each IP to make 100 requests to the API for every 15 min

// Set Body format
app.use(express.json())

// MIDDLEWARE
// Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
// Config 
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))
app.get('/api/config/google', (req, res) => res.send(process.env.GOOGLE_CLIENT_ID))

// Add static/public folders
const __dirname = path.resolve()
app.use('/uploads', express.static(__dirname + '/uploads'))

// Set production folder
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/front_end/build'))
  // if not /api/ route then serve the front end for all other routes
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'front_end', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

// Error handlers
app.use(notFound)
app.use(errorHandler)


// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT} / ${process.env.NODE_ENV} mode`.yellow.bold.underline))