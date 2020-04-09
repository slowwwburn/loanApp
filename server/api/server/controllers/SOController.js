import soService from '../services/SOService'
import Util from '../utils/Utils'

const util = new Util()

class SOController {
  static async getMandates(req, res) {
    try {
      const mandates = await soService.getMandates()
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
      const exists = await soService.getMandateByReference(reference)
      if (exists) {
        util.setSuccess(200, `Data referencing mandate with reference ${mandate.reference} already exists`)
        return util.send(res)
      }
      await soService.addMandate(mandate)
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
      const mandate = await soService.getMandate(reference)
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
      const updated = await soService.updateDebits(reference, update)
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
      await soService.deleteMandate(ref)
      util.setSuccess(200, `Mandate with reference ${ref} deleted`)
      util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      util.send(res)
    }
  }
}

export default SOController
