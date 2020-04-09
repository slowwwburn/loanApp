import { Router } from 'express'
import AdminController from '../controllers/AdminController'

const router = Router()

router.get('/', AdminController.getAdmins)
router.post('/', AdminController.addAdmin)
router.get('/:id', AdminController.getAdmin)
router.put('/:id', AdminController.updateAdmin)
router.delete('/:id', AdminController.deleteAdmin)

export default router