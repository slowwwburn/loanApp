import configJson from '../src/config/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import authService from '../services/AuthService'
import userService from '../services/UserService'
import Util from '../utils/Utils'

const util = new Util()
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const config = configJson[env];
class UserController {
  static async login(req, res) {
    try {
      const data = await authService.authenticateUser(req.body)
      let { message, token, status } = data
      if (status != 200) util.setError(status, message)
      else util.setSuccess(status, message, token)
      return util.send(res);
    } catch (err) {
      throw err
    }
  }

  static async register(req, res) {
    const user = req.body
    try {
      const usernameExists = await userService.getUser(user.username || '')
      if (usernameExists) {
        util.setSuccess(200, 'Registration failed. Username already exists')
        return util.send(res)
      }
      const emailExists = await userService.getUserByEmail(user.email || '')
      if (emailExists) {
        util.setSuccess(200, 'Registration failed. Email already exists')
        return util.send(res)
      }
      const accountExists = await userService.getUserByAccount(user.account, user.bankCode)
      if (accountExists) {
        util.setSuccess(200, 'Registration failed. Bank account already exists')
        return util.send(res)
      }
      const bvnExists = await userService.getUser(user.bvn)
      if (bvnExists) {
        util.setSuccess(200, 'Registration failed. BVN already exists')
        return util.send(res)
      }
      user.password = await util.hashPassword(user.password)
      const createdUser = await userService.addUser(user)
      util.setSuccess(201, 'User created', createdUser)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async getUsers(req, res) {
    try {
      const users = await userService.getUsers()
      if (users.length == 0) util.setSuccess(200, 'No user found')
      else util.setSuccess(200, `${users.length} users found`, users)
      util.send(res)
    } catch (err) { 
      util.setError(400, err.message)
      util.send(res)
     }
  }

  static async getMappedMandates(req, res) {
    try {
      const user = await userService.getUserById(req.params.id)
      const mandates = await userService.getMappedMandates(user)
      util.setSuccess(200, `Found ${mandates.length} mandates mapped to the user`, mandates)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      util.send(res)
    }
  }

  static async updateUser(req, res) {
    const user = await userService.getUser(req.body.username)
    const updateUser = { username: req.body.newUsername }
    if (!user) {
      util.setError(400, 'User does not exist')
      return util.send(res)
    }
    const validPassword = util.comparePassword(req.body.password, user.password)
    if (!validPassword) {
      util.setError(401, 'Password is invalid')
      return util.send(res)
    }
    try {
      const updatedUser = await userService.updateUser(user.id, updateUser)
      console.log(updatedUser)
      util.setSuccess(200, 'User updated', updatedUser)
      return util.send(res)
    } catch (err) {
      util.setError(404, err)
      return util.send(res)
    }
  }

  static async updatePassword(req, res) {
    const user = await userService.getUser(req.body.username)
    if (!user) {
      util.setError(400, 'User does not exist')
      return util.send(res)
    }
    const validPassword = await util.comparePassword(req.body.password, user.password)
    const newPassword = await util.hashPassword(req.body.newPassword)
    if (!validPassword) {
      util.setError(401, 'Password is invalid')
      return util.send(res)
    }
    try {
      await userService.updatePassword(user.id, newPassword)
      util.setSuccess(200, 'Password updated')
      return util.send(res)
    } catch (error) {
      util.setError(404, err)
      return util.send(res)
    }
  }

  static async deleteUser(req, res) {
    const user = await userService.getUser(req.body.username)
    if (!user) {
      util.setError(400, 'User does not exist')
      return util.send(res)
    }
    try {
      const deletedUser = await userService.deleteUser(user.id)
      if (deletedUser) {
        util.setSuccess(200, 'User deleted')
        return util.send(res)
      }
    } catch (err) {
      util.setError(400, err)
      util.send(res)
    }
  }
}

export default UserController
