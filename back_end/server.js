import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// Routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

// Dotenv 
dotenv.config()
// Mongo connection
connectDB()
// Express
const app = express()
// Set Body format
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

// MIDDLEWARE
// Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
// Error handlers
app.use(notFound)
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT} / ${process.env.NODE_ENV} mode`.yellow.bold.underline))