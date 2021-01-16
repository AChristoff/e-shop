import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING_ATLAS, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan)
  } catch (err) {
    console.error(`Error: ${error.message}`.red.bold)
    process.exit(1)
  }
}

export default connectDB