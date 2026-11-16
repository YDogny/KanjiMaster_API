import { Router } from 'express'
import charactersControllers from './characters.controller.ts'
const router = Router()

router.get('/', charactersControllers.getCharacters)

export default router