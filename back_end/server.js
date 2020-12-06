import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

// Dotenv 
dotenv.config()
// Mongo connection
connectDB()
// Express
const app = express()

app.get('/', (req, res) => {
  res.send('API is running...')
})

// Routes
app.use('/api/products', productRoutes)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT} / ${process.env.NODE_ENV} mode`.yellow.bold.underline))