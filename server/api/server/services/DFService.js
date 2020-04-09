import db from '../src/models'
import userService from '../services/UserService'
// import DD from '../src/models/dd'

class DFService {
  static async getMandates() {
    try {
      return await db.DF.findAll()
    } catch (err) { throw err }
  }

  static async addMandate(params) {
    try {
      const user = await userService.getUserById(params.user)
      const created = await db.DF.create(params)
      created.setUser(user)
      return created
    } catch (err) { throw err }
  }

  static async getMandate(reference) {
    try {
      return await db.DF.findOne({ where: { reference } })
    } catch (err) { throw err }
  }

  static async getMandateById(id) {
    try {
      return await db.DF.findOne({ where: { id: Number(id) } })
    } catch (err) { throw err }
  }

  static async getMandateByStatus(status) {
    try {
      return await db.DF.find({ where: { status } })
    } catch (err) { throw err }
  }

  static async getMandateByReference(reference) {
    try {
      return await db.DF.findOne({ where: { reference } })
    } catch (err) { throw err }
  }

  static async updateStatus(id, status) {
    try {
      return await db.DF.update({ status }, { where: { id: Number(id) } })
    } catch (err) { throw err }
  }

  static async updateRepayments(id, debit) {
    try {
      return await db.DF.update(
        { repayments: reapyments || `{${debit}}`, noOfRepayments: Sequelize.literal('noOfRepayments + 1') },
        { where: { id: Number(id) } })
    } catch (err) { throw err }
  }

  static async deleteMandate(reference) {
    try {
      return await db.DF.destroy({ where: { reference } })
    } catch (error) { throw err }
  }
}

export default DFService