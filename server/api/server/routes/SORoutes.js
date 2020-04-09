import { Router } from 'express'
import SOController from '../controllers/SOController'

const router = Router()

router.get('/', SOController.getMandates)
router.post('/', SOController.addMandate)
router.get('/:ref', SOController.getMandate)
router.put('/:ref', SOController.updateDebit)
router.delete('/:ref', SOController.deleteMandate)

export default router