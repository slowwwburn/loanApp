import { Router } from 'express'
import UserController from '../controllers/UserController'

const router = Router()

router.get('/', UserController.getUsers)
router.post('/', UserController.register)
router.get('/:id', UserController.getMappedMandates)
// router.get('/:ref', UserController.getMate)
// router.put('/:ref', UserController.updateDebit)

export default router