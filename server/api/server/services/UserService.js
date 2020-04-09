import db from '../src/models'
import Util from '../utils/Utils'

const util = new Util()

class UserService {
  static async getUsers() {
    try {
      return await db.User.findAll()
    } catch (err) { throw err }
  }

  static async addUser(user) {
    try {
      return await db.User.create(user)
    } catch (err) { throw err }
  }

  static async getUser(username) {
    try {
      return await db.User.findOne({ where: { username } })
    } catch (err) { throw err }
  }

  static async getUserById(id) {
    try {
      return await db.User.findOne({ where: { id: Number(id) } })
    } catch (err) { throw err }
  }

  static async getMappedMandates(user) {
    try {
      const ddMandates = await user.getDDs()
      const dfMandates = await user.getDFs()
      const soMandates = await user.getSOs()
      var mandates = []
      if (ddMandates.length > 0) mandates.push(util.getMandates(ddMandates, "DD"))
      if (dfMandates.length > 0) mandates.push(util.getMandates(dfMandates, "DF"))
      if (soMandates.length > 0) mandates.push(util.getMandates(soMandates, "SO"))
      // console.log(mandates)
      // const result = mandates
      const results = []
      mandates.map(x => {
        for (let i = 0; i <= x.length+1; i++) {
          results.push(x[i])
        }
      })
      results.filter(x => x == null).forEach(x => results.splice(results.indexOf(x), 1));
      const resulted = results.sort((a, b) => a.startDate - b.startDate)
      return resulted
    } catch (err) { throw err }
  }

  static async getUserByAccount(account, bankCode) {
    try {
      return await db.User.findOne({ where: { account, bankCode } })
    } catch (err) { throw err }
  }

  static async getUserByEmail(email) {
    try {
      return await db.User.findOne({ where: { email } })
    } catch (err) { throw err }
  }

  static async getUserByBVN(bvn) {
    try {
      return await db.User.findOne({ where: { bvn } })
    } catch (err) { throw err }
  }

  static async updateUser(id, updateUser) {
    try {
      await db.User.update(updateUser, { where: { id: Number(id) } })
      return updateUser
    } catch (err) { throw err }
  }

  static async updatePassword(id, updatePassword) {
    try {
      return await db.User.update(
        { password: updatePassword },
        { where: { id: Number(id) } })
    } catch (err) { throw err }
  }

  static async deleteUser(id) {
    try {
      return await db.User.destroy({ where: { id: Number(id) } })
    } catch (error) { throw err }
  }
}

export default UserService