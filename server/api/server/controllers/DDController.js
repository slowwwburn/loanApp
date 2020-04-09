import configJson from '../src/config/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import ddService from '../services/DDService'
import Util from '../utils/Utils'

const util = new Util()

class DDController {
  static async getMandates(req, res) {
    try {
      const mandates = await ddService.getMandates()
      if (mandates.length == 0) util.setSuccess(200, `No mandates retrieved`, mandates)
      else util.setSuccess(200, `${mandates.length} Mandates retrieved`, mandates)
      return util.send(res)
    } catch (err) {
      console.log(err)
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async addMandate(req, res) {
    const mandate = req.body
    const { user, reference, requestId, repaymentAmt, maxNoDebits} = mandate
    try {
      if (!user || !reference || !requestId ||  !repaymentAmt || ! maxNoDebits) {
        util.setSuccess(200, 'Please provide complete mandate details')
        return util.send(res)
      }
      const exists = await ddService.getMandateByReference(reference)
      if (exists) {
        util.setSuccess(200, `Direct debit mandate with reference ${mandate.reference} already exists`)
        return util.send(res)
      }
      await ddService.addMandate(mandate)
      util.setSuccess(200, 'Mandate added')
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async getMandate(req, res) {
    const reference = req.params.ref
    try {
      const mandate = await ddService.getMandate(reference)
      if (mandate) util.setSuccess(200, 'Mandate successfully retrieved', mandate)
      else util.setSuccess(200, 'Mandate not found')
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async updateDebit(req, res) {
    const reference = req.params.ref
    const update = req.body
    try {
      const updated = await ddService.updateDebit(reference, update)
      util.setSuccess(200, 'Debit updated', updated)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async deleteMandate(req, res) {
    try {
      await ddService.deleteMandate(req.params.ref)
      util.setSuccess(200, `Mandate with reference ${req.params.ref} deleted`)
      util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      util.send(res)
    }
  }
}

export default DDController
