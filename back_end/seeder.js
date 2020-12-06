import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Products from './models/productModel.js'
import Order from './models/productModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const seedUsers = async () => {
  try {
    // Seed users
    await User.insertMany(users);
  
    console.log('Users Seeded Successfully!'.green.inverse);
    process.exit()

  } catch (err) {
    console.error(`${err}`.red.inverse)
    process.exit(1)
  }
}

const seedProducts = async () => {
  // Set product owner - Admin
  const admin = await User.findOne({isAdmin: true})
      try {
        const newProducts = products.map((product) => {
          return { ...product, user: admin._id }
        })
        // Seed products
        await Products.insertMany(newProducts)

        console.log('Products Seeded Successfully!'.green.inverse)
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

switch (process.argv[2]) {
  case '-d': 
    destroyData()
    break;
  case '-u': 
    seedUsers()
    break;
  case '-p': 
    seedProducts()
    break;
}