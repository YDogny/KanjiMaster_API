import "reflect-metadata";
import "dotenv/config";

import bcrypt from "bcrypt";
import { db } from "./data-source";
import { UserEntity } from "../contexts/user/entities/User.entity";

// Les 3 utilisateurs fictifs à créer
const testUsers = [
  {
    username: "Sakura",
    email: "sakura@test.fr",
    password: "Sakura123!",
  },
  {
    username: "Naruto",
    email: "naruto@test.fr",
    password: "Naruto123!",
  },
  {
    username: "Tanaka",
    email: "tanaka@test.fr",
    password: "Tanaka123!",
  },
];

async function seedUsers() {
  try {
    // Connexion à MySQL
    await db.initialize();
    console.log("Connexion à MySQL réussie !");

    // Récupération du repository User
    const userRepository = db.getRepository(UserEntity);

    for (const user of testUsers) {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await userRepository.findOne({
        where: { email: user.email },
      });

      if (existingUser) {
        console.log(`${user.username} existe déjà, ignoré.`);
        continue;
      }

      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Préparer le nouvel utilisateur
      const newUser = userRepository.create({
        username: user.username,
        email: user.email,
        password: hashedPassword,
      });

      // Enregistrer dans MySQL
      await userRepository.save(newUser);

      console.log(`${user.username} ajouté avec succès !`);
    }
  } catch (error) {
    console.error("Erreur lors de la création des utilisateurs :", error);
    process.exitCode = 1;
  } finally {
    // Fermer la connexion
    if (db.isInitialized) {
      await db.destroy();
    }
  }
}

seedUsers();
