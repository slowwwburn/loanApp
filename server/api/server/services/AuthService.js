const mongoose = require('mongoose')
const db = require('../src/models')
import Util from '../utils/Utils'

const util = new Util()

class AuthService {
  static async authenticateUser(params) {
    try {
      console.log("Data gotten")
      const user = await db.Users.findOne({ username: params.username })
      if (!user) {
        util.setError(400, 'Authentication failed. User not found.')
        return util.send(res)
      }
      const password = util.comparePassword(params.password, user.password)
      if (!password) {
        util.setError(400, 'Authentication failed. Wrong password.')
        return util.send(res)
      }
      const payload = {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        account: user.account,
        bankCode: user.bankCode,
        company: user.companyName,
        bvn: user.bvn,
        time: new Date()
      }
      const token = util.generateToken(payload)
      util.setSuccess(200, "Authentication Successful", { token, user: payload })
      return util.send(res)
      // { token: { token, user: payload }, message: "Authentication Successful", status: 200 }
    } catch (err) { throw err }
  }

  static async authenticateAdmin(params) {
    try {
      console.log("Data gotten")
      const admin = await db.Admins.findOne({ username: params.username })
      if (!admin) return { message: 'Authentication failed. User not found.', status: 404 }
      const password = util.comparePassword(params.password, admin.password)
      if (!password) return { message: 'Authentication failed. Wrong password.', status: 400 }
      else {
        const payload = {
          id: admin.id,
          username: admin.username,
          firstname: admin.firstname,
          lastname: admin.lastname,
          role: admin.role,
          time: new Date()
        }
        const token = util.generateToken(payload)
        return { token: { token, admin: payload }, message: "Authentication Successful", status: 200 }
      }
    } catch (err) { throw err }
  }
}

module.exports = AuthService
