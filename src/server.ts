import 'reflect-metadata'

import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 4001

app.use(cors())
app.use(express.json())

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Bienvenue sur l'API KanjiMaster !"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})