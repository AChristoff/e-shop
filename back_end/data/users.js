import * as dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

dotenv.config({ path: '.env' });

const users = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync(process.env.TEST_USERS_PASS, 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync(process.env.TEST_USERS_PASS, 10),
  },
  { 
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync(process.env.TEST_USERS_PASS, 10),
  },
]

export default users