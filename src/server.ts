import 'reflect-metadata'

import express from 'express'
import cors from 'cors'

import { db } from "./core/config/data-source.js";
import userRoutes from "./contexts/user/presentation/routes/user.route.js";
import { apiMiddleware } from './core/http/api.middleware.js';
import { envoiMailListener } from './core/bus/listener/send-validation-event.listener.js';
import authRoutes from "./contexts/auth/presentation/routes/auth.route.js"

const app = express()
const PORT = 4001

app.use(cors())
app.use(express.json())

app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.use(apiMiddleware);

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
