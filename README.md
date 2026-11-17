# KanjiMaster API

API REST dédiée à l'apprentissage du japonais.

## Technologies utilisées

- Node.js
- TypeScript
- Express.js
- TypeORM
- MySQL
- JWT (authentification prévue)

## Prérequis

Avant de commencer, installer :

- [Node.js](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/installer/)
- [Git](https://git-scm.com/)

## Installation du projet

Cloner le dépôt :

```bash
git clone https://github.com/YDogny/KanjiMaster_API.git
```

Accéder au dossier :

```bash
cd KanjiMaster_API
```

Installer les dépendances :

```bash
npm install
```

Cette commande installe automatiquement les dépendances déclarées dans `package.json`.

## Lancement du serveur

En développement :

```bash
npm run dev
```

Le serveur démarre sur :

http://localhost:4001

## Vérification de l'API

Une route de vérification est disponible :

```http
GET /api/health
```

Elle permet de vérifier que le serveur fonctionne.

## Commandes disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Démarre le serveur en développement |
| `npm run build` | Compile le code TypeScript |
| `npm start` | Démarre la version compilée |

## Structure du projet

```text
KanjiMaster_API/
├── src/
│   ├── config/
│   ├── characters/
│   ├── models/
│   └── server.ts
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## État du projet

Projet en cours de développement.

Les fonctionnalités et la connexion à la base de données seront ajoutées progressivement.