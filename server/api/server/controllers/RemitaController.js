import remitaService from '../services/RemitaService'
import Util from '../utils/Utils'

const util = new Util()

class RemitaController {
  static async getSalaryHistory(req, res) {
    const { number, channel } = req.body
    try {
      if (!number || !channel) {
        util.setSuccess(200, 'Please provide complete/correct details.')
        return util.send(res)
      }
      const history = await remitaService.getSalaryHistory(number, channel)
      util.setSuccess(200, `${history.responseMsg}`, history.data)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async MandateSetUp(req, res) {
    const { customer, details } = req.body
    try {
      if (!customer) {
        util.setSuccess(200, 'Please provide customer information')
        return util.send(res)
      }
      if (!details) {
        util.setSuccess(200, 'Please provide mandate details')
        return util.send(res)
      }
      if (!details.type) {
        util.setSuccess(200, 'Please provide mandate type')
        return util.send(res)
      }
      const mandate = await remitaService.setUpMandate(customer, details)
      util.setSuccess(200, 'Mandate generated', mandate)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }

  }

  static async StopMandate(req, res) {
    const mandate = req.body
    try {
      await remitaService.StopMandate(mandate)
      util.setSuccess(200, 'Mandate stopped')
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }
}

export default RemitaController