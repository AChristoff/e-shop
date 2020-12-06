import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Products from './models/productModel.js'
import Order from './models/productModel.js'
import connectDB from './config/db.js'
import e from 'express'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    // Seed users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id
    // Add "user" to products
    const sampleProducts = products.map(product => { 
      return {...product, user: adminUser} 
    })
    // Seed products
    await Products.insertMany(sampleProducts);
    console.log('Data Imported!'.green.inverse);
    process.exit()

  } catch (err) {
    console.error(`${err}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // Clear/reset the DB!
    await User.deleteMany()
    await Products.deleteMany()
    await Order.deleteMany()

    console.log('Data Destroyed!'.red.inverse);
    process.exit()

  } catch (err) {
    console.error(`${err}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
