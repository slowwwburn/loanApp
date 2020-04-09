import configJson from '../src/config/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dfService from '../services/DFService'
import Util from '../utils/Utils'

const util = new Util()

class DFController {
  static async getMandates(req, res) {
    try {
      const mandates = await dfService.getMandates()
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
    const { reference, repaymentAmt, user } = mandate
    try {
      if (!reference || !repaymentAmt || !user) {
        util.setSuccess(200, 'Please provide complete mandate details')
        return util.send(res)
      }
      const exists = await dfService.getMandateByReference(reference)
      if (exists) {
        util.setSuccess(200, `Data referencing mandate with reference ${mandate.reference} already exists`)
        return util.send(res)
      }
      await dfService.addMandate(mandate)
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
      const mandate = await dfService.getMandate(reference)
      if (mandate) util.setSuccess(200, 'Mandate successfully retrieved', mandate)
      else util.setSuccess(200, 'Mandate not found')
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async updateRepayments(req, res) {
    const reference = req.params.ref
    const update = req.body
    try {
      const updated = await dfService.updateRepayments(id, update)
      util.setSuccess(200, 'Debit updated', updated)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async deleteMandate(req, res) {
    const ref = req.params.reference
    try {
      await dfService.deleteMandate(ref)
      util.setSuccess(200, `Mandate with reference ${ref} deleted`)
      util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      util.send(res)
    }
  }
}

export default DFController
