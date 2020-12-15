import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import axios from 'axios'

// @desc:     Login user & get jwt token
// @route:    GET /api/users/login
// @access:   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc:     Register a new user
// @route:    GET /api/users
// @access:   Public
const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password, token } = req.body

  if (!token) {
    res.status(400)
    throw new Error('Please confirm you are not a robot!')
  }

  const secret = process.env.CAPTCHA_SECRET_KEY
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`

  try {

    const response = await axios.post(url)
    const { success } = response.data

    if(success) {
      const userExists = await User.findOne({ email })

      if (userExists) {
        res.status(400)
        throw new Error('User already exists')
      }

      const user = await User.create({
        name,
        email,
        password,
      })

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        })
      } else {
        res.status(400)
        throw new Error('Invalid user data')
      }
    } else {
      res.status(400)
      throw new Error('Human verification failed! Bad token')
    }

  } catch (error) {
    res.status(400)
    throw new Error('reCAPTCHA failed!')
  }
})

// @desc:     Auth user profile
// @route:    GET /api/users/profile
// @access:   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc:     Update user profile
// @route:    PUT /api/users/profile
// @access:   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    // Password is encrypted by the model on change so update it only if there is a new one
    if (req.body.password) {
      user.password = req.body.password
    }

    const updateUser = await user.save()

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { authUser, getUserProfile, registerUser, updateUserProfile }
