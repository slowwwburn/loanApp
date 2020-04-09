import db from '../src/models'
import userService from '../services/UserService'

class SOService {
  static async getMandates() {
    try {
      return await db.SO.findAll()
    } catch (err) { throw err }
  }

  static async addMandate(params) {
    try {
      const user = await userService.getUserById(params.user)
      const created = await db.SO.create(params)
      created.setUser(user)
      return created
    } catch (err) { throw err }
  }

  static async getMandate(reference) {
    try {
      return await db.SO.findOne({ where: { reference } })
    } catch (err) { throw err }
  }

  static async getMandateById(id) {
    try {
      return await db.SO.findOne({ where: { id: Number(id) } })
    } catch (err) { throw err }
  }

  static async getMandateByStatus(status) {
    try {
      return await db.SO.findOne({ where: { status } })
    } catch (err) { throw err }
  }

  static async getMandateByReference(reference) {
    try {
      return await db.SO.findOne({ where: { reference } })
    } catch (err) { throw err }
  }

  static async updateStatus(id, status) {
    try {
      return await db.SO.update({ status }, { where: { id: Number(id) } })
    } catch (err) { throw err }
  }

  static async updateDebits(reference, debit) {
    try {
      return await db.SO.update(
        { debits: debits || `{${debit}}` },
        { where: { reference } })
    } catch (err) { throw err }
  }

  static async deleteMandate(reference) {
    try {
      return await db.SO.destroy({ where: { reference } })
    } catch (error) { throw err }
  }
}

export default SOService