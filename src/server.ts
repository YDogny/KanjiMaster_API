import 'reflect-metadata'

import express from 'express'
import cors from 'cors'

import { db } from "./config/data-source";
import userRouter from "./contexts/user/routes/user.route"
//import authRouter from "./contexts/auth/routes/auth.route"

const app = express()
const PORT = 4001

app.use(cors())
app.use(express.json())

app.use("/user", userRouter);
//app.use("/auth", authRouter);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Bienvenue sur l'API KanjiMaster !"
  });
});

async function startServer() {
  try {
    await db.initialize();

    console.log("Connexion à la base de données réussie !");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

startServer();