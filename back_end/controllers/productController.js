import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc:     Fetch all products
// @route:    GET /api/products
// @access:   Public
const getProducts = asyncHandler(async (req, res) => {
  // Pagination
  const pageSize = Number(req.query.pageSize) || 2
  const page = Number(req.query.pageNumber) || 1

  // Search
  const regExp = { $regex: new RegExp(req.query.keyword, 'i')};
  const keyword = req.query.keyword 
    ? [
        {name: regExp},
        {brand: regExp},
        {category: regExp},
        {description: regExp}
      ] 
    : [{}]

  const count = await Product.countDocuments().or([...keyword])
  const pages = Math.ceil(count / pageSize)
 
  const products = await Product.find()
    .or([...keyword])
    .skip(pageSize * (page - 1))
    .limit(pageSize)

  res.json({products, pages, page})
})

// @desc:     Fetch a single product
// @route:    GET /api/products/:id
// @access:   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc:     Delete product
// @route:    DELETE /api/products/:id
// @access:   Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc:     Create product
// @route:    POST /api/products
// @access:   Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    images: ['/images/sample.jpg'],
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc:     Update product
// @route:    PUT /api/products/:id
// @access:   Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    images,
    brand,
    category,
    countInStock,
    description,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.images = images
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.description = description

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc:     Create new review
// @route:    POST /api/products/:id/reviews
// @access:   Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

    if(alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()

    res.status(201).json({message: 'Review added'})

  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
}
