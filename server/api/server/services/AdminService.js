import db from '../src/models'

class AdminService {
  static async addAdmin(admin) {
    try {
      return await db.Admins.create(admin)
    } catch (err) { throw err }
  }

  static async getAdmin(username) {
    try {
      return await db.Admins.findOne({ where: { username } })
    } catch (err) { throw err }
  }

  static async getAdminById(id) {
    try {
      return await db.Admins.findOne({ where: { id: Number(id) } })
    } catch (err) { throw err }
  }

  static async getAdminByEmail(email) {
    try {
      return await db.Admins.findOne({ where: { email } })
    } catch (err) { throw err }
  }

  static async updateAdmin(id, updateAdmin) {
    try {
      await db.Admins.update(updateAdmin, { where: { id: Number(id) } })
      return updateAdmin
    } catch (err) { throw err }
  }

  static async updatePassword(id, updatePassword) {
    try {
      return await db.Admins.update(
        { password: updatePassword },
        { where: { id: Number(id) } })
    } catch (err) { throw err }
  }

  static async deleteAdmin(id) {
    try {
      return await db.Admins.destroy({ where: { id: Number(id) } })
    } catch (error) { throw err }
  }
}

export default AdminService