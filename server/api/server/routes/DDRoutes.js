import { Router } from 'express'
import DDController from '../controllers/DDController'

const router = Router()

router.get('/', DDController.getMandates)
router.post('/', DDController.addMandate)
router.get('/:ref', DDController.getMandate)
router.put('/:ref', DDController.updateDebit)
router.delete('/:ref', DDController.deleteMandate)

export default router