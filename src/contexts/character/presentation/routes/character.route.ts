import { Router } from "express";
import * as characterController from "../controllers/character.controller.js";

const router = Router();

// Recherche : doit être déclarée avant /:id
router.get("/recherche", characterController.searchCharacters);

// Lecture
router.get("/", characterController.getCharacters);
router.get("/:id", characterController.getCharacterById);

// Création
router.post("/ajouter", characterController.createCharacter);

// Modification
router.put("/modifier/:id", characterController.updateCharacter);

// Suppression
router.delete("/supprimer/:id", characterController.deleteCharacter);

export default router;