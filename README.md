# KanjiMaster API

API REST dédiée à l'apprentissage du japonais.

KanjiMaster a pour objectif de proposer une API permettant de gérer des utilisateurs et des caractères japonais (hiragana, katakana et kanji).

## Technologies utilisées

- **Node.js** : environnement d'exécution JavaScript.
- **TypeScript** : typage statique.
- **Express** : création du serveur et des routes HTTP.
- **TypeORM** : gestion de la base de données et des entités.
- **MySQL** : système de gestion de base de données.
- **mysql2** : pilote de connexion MySQL.
- **dotenv** : gestion des variables d'environnement.

## Fonctionnalités réalisées

- [x] Initialisation du projet Node.js.
- [x] Configuration de TypeScript.
- [x] Mise en place du serveur Express.
- [x] Création de la route GET `/api/health`.
- [x] Configuration de TypeORM.
- [x] Connexion à une base de données MySQL.
- [x] Configuration de l'encodage UTF-8 (`utf8mb4`).
- [x] Création de l'entité `UserEntity`.
- [x] Création de la table `users` dans MySQL.

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

## Configuration de la base de données

Créer une base de données MySQL nommée `kanjimaster`.

Créer ensuite un fichier `.env` à la racine du projet en prenant exemple sur `.env.example` :

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=kanjimaster
```

Remplacer `your_password` par le mot de passe de son compte MySQL.

**Important :** le fichier `.env` contient des informations sensibles et ne doit jamais être envoyé sur GitHub.

## Lancement du serveur

En développement :

```bash
npm run dev
```

Compiler le projet TypeScript :

```bash
npm run build
```

Démarrer la version compilée :

```bash
npm start
```

Le serveur démarre sur :

http://localhost:4001

## Vérification de l'API

Une route de vérification est disponible :

```http
GET /api/health
```

Elle permet de vérifier que le serveur Express fonctionne.

## Commandes disponibles

| Commande | Description |
|---|---|
| `npm install` | Installe les dépendances |
| `npm run dev` | Démarre le serveur en développement |
| `npm run build` | Compile le code TypeScript |
| `npm start` | Démarre la version compilée |

## Structure du projet

```text
KanjiMaster_API/
├── src/
│   ├── config/
│   │   ├── data-source.ts
│   │   └── test-source.ts
│   ├── entities/
│   │   ├── User.entity.ts
│   │   └── Character.entity.ts
│   └── server.ts
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## État du développement

Le projet est actuellement en cours de développement.

Les bases du serveur Express, de TypeScript et de la connexion MySQL avec TypeORM sont mises en place.

La prochaine étape consiste à développer les fonctionnalités de gestion des utilisateurs (CRUD), puis l'authentification JWT et la gestion des caractères japonais.

## Évolutions prévues

- [ ] Développement du CRUD utilisateur.
- [ ] Hachage sécurisé des mots de passe.
- [ ] Mise en place de l'authentification JWT.
- [ ] Gestion des caractères japonais.
- [ ] Développement des routes CRUD pour les caractères.
- [ ] Validation des données.
- [ ] Mise en place de tests automatisés.