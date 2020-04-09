import db from '../src/models'
import userService from '../services/UserService'

class DDService {
  static async getMandates() {
    try {
      return await db.DD.findAll()
    } catch (err) { throw err }
  }

  static async addMandate(params) {
    try {
      const user = await userService.getUserById(params.user)
      const created = await db.DD.create(params)
      created.setUser(user)
      return created
    } catch (err) { throw err }
  }

  static async getMandate(reference) {
    try {
      return await db.DD.findOne({ where: { reference } })
    } catch (err) { throw err }
  }

  static async getMandateById(id) {
    try {
      return await db.DD.findOne({ where: { id: Number(id) } })
    } catch (err) { throw err }
  }

  static async getMandateByStatus(status) {
    try {
      return await db.DD.findOne({ where: { status } })
    } catch (err) { throw err }
  }

  static async getMandateByReference(reference) {
    try {
      return await db.DD.findOne({ where: { reference } })
    } catch (err) { throw err }
  }

  static async updateStatus(id, status) {
    try {
      return await db.DD.update({ status }, { where: { id: Number(id) } })
    } catch (err) { throw err }
  }

  static async updateDebit(reference, debit) {
    try {
      return await db.DD.update(
        { debits: debits || `{${debit}}` },
        { where: { reference } })
    } catch (err) { throw err }
  }

  static async deleteMandate(reference) {
    try {
      return await db.DD.destroy({ where: { reference } })
    } catch (error) { throw err }
  }
}

export default DDService