import express from 'express'
import cors from 'cors'
import { Router } from 'express'
import charactersRouters from './characters/characters.roots.ts'

const app = express()
const PORT = 4001

const router = Router()
router.get('/api/health')

app.use(cors())
app.use(express.json())

app.use(router)
app.use('/characters', charactersRouters)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})