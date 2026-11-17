import { Router } from 'express'
import * as userController from '../controllers/user.controller'

const router = Router()

router.get('/', userController.getUsers)
router.get('/:id', userController.getUserById)
//router.post('/ajouter', userController.createUser)
//router.put('/modifier/:id', userController.updateUser)
//router.delete('/supprimer/:id', userController.deleteUser)

export default router