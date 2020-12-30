import express from 'express'
import rateLimit from 'express-rate-limit'
const router = express.Router()

const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Block IP for 1 hour after 5 requests
  message: {
    status: 429,
    limiter: true,
    type: 'error',
    message: 'To many attempts, try again after 1 hour',
  },
})

import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUsers,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(protect, admin, getUsers)
  .post(formLimiter, registerUser)

router
.route('/login')
.post(formLimiter, authUser)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUsers)

export default router
