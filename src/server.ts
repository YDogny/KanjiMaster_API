import 'reflect-metadata'

import express from 'express'
import cors from 'cors'

import { db } from "./core/data-source.js";
import userRouter from "./contexts/user/routes/user.route.js"
import { errorMiddleware } from './core/middleware/error.middleware.js';
import { envoiMailListener } from './core/bus/listener/send-validation-event.listener.js';
//import authRouter from "./contexts/auth/routes/auth.route"

const app = express()
const PORT = 4001

app.use(cors())
app.use(express.json())

app.use("/user", userRouter);
//app.use("/auth", authRouter);

app.use(errorMiddleware);

try {
  await db.initialize();
  envoiMailListener();
  console.log("Connexion à la base de données réussie !");

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

} catch (error) {
  console.error("Error connecting to the database:", error);
}
