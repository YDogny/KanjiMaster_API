# KanjiMaster API

API REST permettant de gérer les utilisateurs et les fonctionnalités d'une application d'apprentissage du japonais.

## Présentation

KanjiMaster API est un backend développé avec **Node.js, Express et TypeScript**. Il a pour objectif de fournir les fonctionnalités nécessaires à une application d'apprentissage du japonais : gestion des utilisateurs, authentification et, à terme, gestion des caractères japonais.

Le projet utilise une architecture modulaire inspirée de la **Clean Architecture**, afin de séparer les responsabilités et de faciliter la maintenance et l'évolution du code.

## Technologies utilisées

| Technologie | Utilisation |
|---|---|
| Node.js | Environnement d'exécution |
| Express 5 | Création de l'API REST |
| TypeScript | Typage et structuration du code |
| MySQL | Base de données relationnelle |
| TypeORM | Communication avec la base de données |
| Zod | Validation des données entrantes |
| bcrypt | Hachage et vérification des mots de passe |
| JSON Web Token (JWT) | Authentification par jeton |
| dotenv | Gestion des variables d'environnement |

## Prérequis

Avant de lancer le projet, il faut disposer de :

- **Node.js** (version compatible avec le projet)
- **npm**
- **MySQL** (ou un environnement comme UwAmp)
- **Git**
- **Postman** (pour tester les endpoints)

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

Cette commande installe les dépendances définies dans `package.json`.

### 4. Configurer les variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
# Serveur
PORT=4001

# Base de données MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=kanjimaster

# JWT - Access Token
JWT_ACCESS_SECRET=your_access_secret
JWT_ACCESS_EXPIRES_IN=15m

# JWT - Refresh Token
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d
```

Remplacer les valeurs par celles de votre environnement.

**Important :**
- Les secrets JWT doivent être suffisamment longs et aléatoires.
- Le fichier `.env` contient des informations sensibles et ne doit jamais être envoyé sur GitHub.
- Ne jamais partager ses secrets ou ses tokens.

## Configuration de la base de données

### 1. Démarrer MySQL

Démarrer votre serveur MySQL, par exemple depuis UwAmp.

Les paramètres de connexion doivent correspondre à ceux définis dans le fichier `.env`.

### 2. Créer la base de données

Créer une base de données nommée `kanjimaster` :

```sql
CREATE DATABASE kanjimaster
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

### 3. Connexion avec TypeORM

La connexion à MySQL est configurée dans :

```text
src/core/config/data-source.ts
```

TypeORM utilise les variables d'environnement pour établir la connexion.

La configuration actuelle utilise :

```typescript
synchronize: false
```

Cela signifie que TypeORM ne crée pas et ne modifie pas automatiquement les tables à partir des entités.

**Attention :** les tables nécessaires au fonctionnement de l'application doivent donc être présentes dans la base de données avant le lancement de l'API. La création et la gestion du schéma doivent être réalisées manuellement ou au moyen de migrations.

## Lancement du projet

### Mode développement

```bash
npm run dev
```

Le serveur est lancé avec `tsx watch`, ce qui permet de redémarrer automatiquement l'application lors des modifications.

L'API est accessible à l'adresse :

```text
http://localhost:4001
```

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

Le projet est organisé par contextes fonctionnels et par responsabilités.

```text
src/
├── core/
│   ├── config/
│   │   └── data-source.ts
│   ├── http/
│   │   ├── api.middleware.ts
│   │   └── error.response.ts
│   └── ...
│
├── contexts/
│   ├── auth/
│   │   ├── app/
│   │   │   ├── inputs/
│   │   │   ├── interfaces/
│   │   │   ├── services/
│   │   │   └── usecase/
│   │   ├── domain/
│   │   │   └── errors/
│   │   ├── infra/
│   │   │   ├── persistence/
│   │   │   │   └── typeorm/
│   │   │   └── security/
│   │   └── presentation/
│   │       ├── controllers/
│   │       ├── dtos/
│   │       ├── presenters/
│   │       └── routes/
│   │
│   └── user/
│       ├── app/
│       ├── domain/
│       ├── infra/
│       └── presentation/
│
├── server.ts
│
dist/
.env
.gitignore
package.json
package-lock.json
tsconfig.json
README.md
```

*Arborescence simplifiée : certains dossiers contiennent des fichiers supplémentaires.*

### Organisation par responsabilités

| Dossier | Rôle |
|---|---|
| `app` | Contient les cas d'utilisation, les services applicatifs, les interfaces et les entrées |
| `domain` | Regroupe les éléments liés au domaine métier, notamment les erreurs |
| `infra` | Contient les implémentations techniques : TypeORM, repositories et sécurité |
| `presentation` | Gère les contrôleurs, les routes, les DTO et les presenters |
| `core` | Regroupe les éléments communs à l'application : configuration, connexion BDD et gestion des erreurs |

Cette organisation permet de limiter les dépendances entre la logique métier et les technologies utilisées.

## Routes de l'API

Les routes sont organisées par contexte fonctionnel.

Les endpoints ne possèdent pas de préfixe `/api`.

| Préfixe | Fonction |
|---|---|
| `/auth` | Inscription, connexion et gestion des tokens |
| `/user` | Gestion des utilisateurs |
| `/char` | Gestion des caractères japonais (à développer) |

### Authentification

| Méthode | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Création d'un compte |
| POST | `/auth/login` | Connexion d'un utilisateur |
| POST | `/auth/refresh` | Renouvellement des tokens |
| POST | `/auth/logout` | Révocation du Refresh Token |

#### Inscription

Exemple de corps de requête :

```json
{
    "username": "testauth",
    "email": "testauth@example.com",
    "password": "Password123!"
}
```

L'inscription crée un utilisateur, enregistre son mot de passe sous forme hachée et génère les deux tokens d'authentification.

#### Connexion

Exemple de corps de requête :

```json
{
    "email": "testauth@example.com",
    "password": "Password123!"
}
```

Si les identifiants sont valides, l'API retourne les informations de l'utilisateur ainsi que les tokens.

#### Renouvellement des tokens

Exemple de corps de requête :

```json
{
    "refreshToken": "YOUR_REFRESH_TOKEN"
}
```

Le Refresh Token est vérifié puis remplacé par un nouveau couple de tokens. L'ancien Refresh Token est révoqué.

#### Déconnexion

Exemple de corps de requête :

```json
{
    "refreshToken": "YOUR_REFRESH_TOKEN"
}
```

Le Refresh Token est révoqué afin qu'il ne puisse plus être utilisé.

## Authentification et sécurité JWT

L'API utilise deux types de JSON Web Tokens pour gérer l'authentification.

### Access Token

- Durée de validité par défaut : **15 minutes**.
- Permet d'authentifier les requêtes nécessitant une connexion.
- Est signé avec une clé secrète dédiée.

### Refresh Token

- Durée de validité par défaut : **7 jours**.
- Permet de renouveler l'Access Token sans demander à l'utilisateur de se reconnecter.
- Est signé avec une clé secrète différente de celle de l'Access Token.
- Est enregistré en base de données sous forme de hash SHA-256, et non en clair.

### Fonctionnement du renouvellement

1. L'utilisateur se connecte et reçoit un Access Token et un Refresh Token.
2. Lorsque l'Access Token expire, le client utilise le Refresh Token.
3. L'API vérifie la validité du Refresh Token et son état en base de données.
4. L'ancien Refresh Token est révoqué.
5. Un nouveau couple de tokens est généré et enregistré.

Ce mécanisme de rotation permet d'empêcher la réutilisation d'un ancien Refresh Token.

### Déconnexion

Lors de la déconnexion, le Refresh Token est révoqué en base de données.

Un token révoqué ne peut plus servir à renouveler une session.

### Protection des mots de passe

Les mots de passe ne sont jamais enregistrés en clair dans la base de données.

Ils sont hachés avec **bcrypt** avant leur enregistrement, puis vérifiés lors de la connexion.

## Gestion des erreurs

L'API utilise un middleware centralisé pour gérer les erreurs.

Les erreurs de validation Zod, les erreurs métier et les erreurs JWT sont converties en réponses HTTP structurées.

Exemple de réponse :

```json
{
    "code": 401,
    "message": "Token invalide.",
    "errId": "er-jwt-401-invalid"
}
```

Principaux codes HTTP utilisés :

| Code | Signification |
|---|---|
| 200 | Requête réussie |
| 201 | Ressource créée |
| 400 | Données invalides |
| 401 | Authentification requise ou token invalide |
| 409 | Conflit, par exemple une adresse email déjà utilisée |
| 500 | Erreur interne du serveur |

## Tests de l'API

Les tests manuels peuvent être réalisés avec **Postman**.

Avant de commencer :
1. Démarrer MySQL.
2. Vérifier la configuration du fichier `.env`.
3. Lancer l'API avec `npm run dev`.
4. Créer une collection Postman dédiée à KanjiMaster API.

URL de base :

```text
http://localhost:4001
```

### Tests d'authentification

Les scénarios suivants ont été testés manuellement et donnent les résultats attendus.

| Test | Requête | Résultat attendu |
|---|---|---|
| Inscription | `POST /auth/register` avec des données valides | 201 ou 200 selon le contrôleur |
| Connexion | `POST /auth/login` avec des identifiants valides | 200 |
| Mauvais mot de passe | `POST /auth/login` avec un mot de passe incorrect | 401 |
| Email invalide | `POST /auth/register` avec un email incorrect | 400 |
| Email déjà utilisé | `POST /auth/register` avec un email existant | 409 |
| Refresh valide | `POST /auth/refresh` avec un Refresh Token actif | 200 |
| Ancien Refresh Token | Réutilisation du token après renouvellement | 401 |
| Token invalide | `POST /auth/refresh` avec un token incorrect | 401 |
| Refresh Token manquant | `POST /auth/refresh` sans token | 400 |
| Déconnexion | `POST /auth/logout` avec un Refresh Token valide | 200 |
| Refresh après déconnexion | Réutilisation du token révoqué | 401 |

*Les codes de succès peuvent dépendre du statut effectivement défini dans le contrôleur. Vérifier le code utilisé pour chaque endpoint.*

### Vérifications en base de données

Après une inscription ou une connexion :

- Vérifier que l'utilisateur est bien enregistré.
- Vérifier que le mot de passe est haché avec bcrypt.
- Vérifier qu'un Refresh Token est enregistré dans la table `refresh_tokens`.
- Vérifier que la valeur enregistrée est un hash SHA-256 et non le token original.

Après un renouvellement :

- Vérifier que l'ancien Refresh Token possède une date de révocation (`revokedAt`).
- Vérifier qu'un nouveau Refresh Token est enregistré.
- Vérifier que le nouveau token possède une date d'expiration valide.

Après une déconnexion :

- Vérifier que le Refresh Token est révoqué.
- Vérifier qu'il ne peut plus être utilisé pour renouveler une session.

### Tests complémentaires à réaliser

- Tester les endpoints du CRUD utilisateur.
- Tester les données manquantes ou incorrectes sur les différents endpoints.
- Tester les accès aux routes protégées sans Access Token.
- Tester les accès avec un Access Token expiré.
- Tester les accès avec un Access Token invalide.
- Vérifier les comportements en cas d'indisponibilité de MySQL.

**Remarque :** les scénarios d'authentification ont été vérifiés manuellement avec Postman. Une suite de tests automatisés reste à mettre en place.

## État du projet

Le projet est en cours de développement.

### Fonctionnalités réalisées

- [x] Configuration du serveur Express avec TypeScript.
- [x] Connexion à MySQL avec TypeORM.
- [x] Organisation modulaire inspirée de la Clean Architecture.
- [x] Gestion des utilisateurs (CRUD).
- [x] Validation des entrées avec Zod.
- [x] Hachage des mots de passe avec bcrypt.
- [x] Inscription et connexion.
- [x] Authentification avec JWT.
- [x] Gestion des Access Tokens et Refresh Tokens.
- [x] Rotation et révocation des Refresh Tokens.
- [x] Middleware centralisé de gestion des erreurs.
- [x] Tests manuels de l'authentification avec Postman.

### Prochaines étapes

- [ ] Mettre en place des tests automatisés.
- [ ] Finaliser la documentation des endpoints utilisateurs.
- [ ] Développer la gestion des caractères japonais.
- [ ] Ajouter les fonctionnalités liées à l'apprentissage du japonais.
- [ ] Mettre en place un système de migrations pour la base de données.

## Auteur

**Yann Dogny**

GitHub : https://github.com/YDogny

Dépôt du projet : https://github.com/YDogny/KanjiMaster_API