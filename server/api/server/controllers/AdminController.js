import configJson from '../src/config/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import authService from '../services/AuthService'
import Util from '../utils/Utils'

const util = new Util()

class AdminController {
  static async login(req, res) {
    try {
      const data = await authService.authenticateAdmin(req.body)
      let { message, token, status } = data
      if (status != 200) util.setError(status, message)
      else util.setSuccess(status, message, token)
      return util.send(res);
    } catch (err) {
      throw err
    }
  }

  static async register(req, res) {
    const admin = req.body
    try {
      const usernameExists = await adminService.getAdmin(admin.username || '')
      if (usernameExists) {
        util.setSuccess(200, 'Registration failed. Username already exists')
        return util.send(res)
      }
      const emailExists = await adminService.getAdminByEmail(admin.email || '')
      if (emailExists) {
        util.setSuccess(200, 'Registration failed. Email already exists')
        return util.send(res)
      }
      admin.password = await util.hashPassword(admin.password)
      const createdAdmin = await adminService.addAdmin(admin)
      util.setSuccess(201, 'Admin user created', createdAdmin)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async updateAdmin(req, res) {
    const admin = await adminService.getAdmin(req.body.username)
    const updateAdmin = { username: req.body.newUsername }
    if (!admin) {
      util.setError(400, 'Admin user does not exist')
      return util.send(res)
    }
    const validPassword = util.comparePassword(req.body.password, admin.password)
    if (!validPassword) {
      util.setError(401, 'Password is invalid')
      return util.send(res)
    }
    try {
      const updatedAdmin = await adminService.updateAdmin(admin.id, updateAdmin)
      console.log(updatedAdmin)
      util.setSuccess(200, 'Admin user updated', updatedAdmin)
      return util.send(res)
    } catch (err) {
      util.setError(404, err)
      return util.send(res)
    }
  }

  static async updatePassword(req, res) {
    const admin = await adminService.getAdmin(req.body.username)
    if (!admin) {
      util.setError(400, 'Admin user does not exist')
      return util.send(res)
    }
    const validPassword = await util.comparePassword(req.body.password, admin.password)
    const newPassword = await util.hashPassword(req.body.newPassword)
    if (!validPassword) {
      util.setError(401, 'Password is invalid')
      return util.send(res)
    }
    try {
      await adminService.updatePassword(admin.id, newPassword)
      util.setSuccess(200, 'Password updated')
      return util.send(res)
    } catch (error) {
      util.setError(404, err)
      return util.send(res)
    }
  }

  static async deleteAdmin(req, res) {
    const admin = await adminService.getAdmin(req.body.username)
    if (!admin) {
      util.setError(400, 'Admin user does not exist')
      return util.send(res)
    }
    try {
      const deletedAdmin = await adminService.deleteAdmin(admin.id)
      if (deletedAdmin) {
        util.setSuccess(200, 'Admin user deleted')
        return util.send(res)
      }
    } catch (err) {
      util.setError(400, err)
      util.send(res)
    }
  }
}

export default AdminController
