import { Router } from 'express'
import RemitaController from '../controllers/RemitaController'

const router = Router()

router.post('/', RemitaController.getSalaryHistory)

export default router