import { Router } from 'express'
import DFController from '../controllers/DFController'

const router = Router()

router.get('/', DFController.getMandates)
router.post('/', DFController.addMandate)
router.get('/:ref', DFController.getMandate)
router.put('/:ref', DFController.updateRepayments)

export default router