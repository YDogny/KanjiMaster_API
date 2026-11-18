import { Router } from 'express'
import * as authController from '../controllers/auth.controller.js'

const router = Router()

router.post('/Inscription', authController.register)
router.post('/Connexion', authController.login)/*
router.post('/Déconnexion', authController.logout)
router.post('/RefreshToken', authController.refreshToken)*/

export default router