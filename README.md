# KanjiMaster API

API REST permettant de gérer les utilisateurs et les fonctionnalités d'une application d'apprentissage du japonais.

## Présentation

KanjiMaster API est un projet développé avec **Node.js, Express et TypeScript**. Il a pour objectif de fournir un backend permettant de gérer les utilisateurs et, à terme, les contenus liés à l'apprentissage du japonais.

Le projet est organisé autour d'une architecture modulaire afin de séparer les responsabilités et de faciliter son évolution.

## Technologies utilisées

| Technologie | Utilisation |
|---|---|
| Node.js | Environnement d'exécution |
| Express 5 | Création de l'API REST |
| TypeScript | Typage et structuration du code |
| MySQL | Base de données relationnelle |
| TypeORM | Communication avec la base de données |
| Zod | Validation des données entrantes |
| bcrypt | Hachage des mots de passe |
| JSON Web Token (JWT) | Authentification par jeton |
| dotenv | Gestion des variables d'environnement |

## Prérequis

Avant de lancer le projet, il faut disposer de :

- Node.js
- npm
- MySQL
- Git

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/YDogny/KanjiMaster_API.git
```

### 2. Accéder au projet

```bash
cd KanjiMaster_API
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Configurer les variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
PORT=4001

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=kanjimaster

JWT_SECRET=your_secret
```

Remplacer les valeurs par celles de votre environnement.

**Important :** le fichier `.env` contient des informations sensibles et ne doit pas être envoyé sur GitHub.

### 5. Préparer la base de données

Créer une base de données MySQL nommée `kanjimaster`.

La connexion à la base de données est configurée avec TypeORM.

## Lancement du projet

### Mode développement

```bash
npm run dev
```

Le serveur est lancé avec `tsx watch`, ce qui permet de redémarrer automatiquement l'application lors des modifications.

### Compilation TypeScript

```bash
npm run build
```

Les fichiers compilés sont générés dans le dossier `dist`.

### Mode production

```bash
npm start
```

Cette commande démarre l'application compilée à partir de `dist/server.js`.

## Organisation du projet

```text
src/
├── contexts/
│   └── user/
│       ├── controllers/
│       ├── entities/
│       ├── errors/
│       ├── repositories/
│       ├── routes/
│       ├── services/
│       └── types/
│           └── zod/
│
├── core/
│   ├── data-source.ts
│   ├── http/
│   └── middleware/
│
└── server.ts

dist/
.env
.gitignore
package.json
tsconfig.json
README.md
```

### Organisation par responsabilités

- **Controllers** : réceptionnent les requêtes HTTP et construisent les réponses.
- **Entities** : représentent les tables de la base de données avec TypeORM.
- **Repositories** : centralisent les opérations d'accès aux données.
- **Services** : contiennent la logique métier.
- **Routes** : définissent les endpoints de l'API.
- **Errors** : regroupent la gestion des erreurs.
- **Zod** : définit les schémas de validation des données entrantes.
- **Core** : regroupe les éléments communs à l'application, notamment la connexion à la base de données.

## Routes de l'API

Les routes sont organisées par contexte fonctionnel.

Les endpoints ne possèdent pas de préfixe `/api`.

Exemples de préfixes :

- `/user`
- `/auth`
- `/char`

La liste détaillée des endpoints et de leurs méthodes HTTP sera complétée au fur et à mesure de leur implémentation.

## Sécurité

Le projet prévoit plusieurs mécanismes de sécurité :

- Hachage des mots de passe avec bcrypt.
- Authentification basée sur JWT.
- Validation des données reçues avec Zod.
- Utilisation de variables d'environnement pour les informations sensibles.

## État du projet

Le projet est actuellement en cours de développement.

Les prochaines étapes comprennent notamment :

- Finalisation du CRUD des utilisateurs.
- Mise en place de l'authentification.
- Développement de la gestion des caractères japonais.
- Ajout des validations et de la gestion des erreurs.
- Tests des différents endpoints.

## Auteur

**Yann Dogny**

GitHub : https://github.com/YDogny