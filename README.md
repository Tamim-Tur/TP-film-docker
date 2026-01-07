# Application de Streaming (Netflix Clone)
**Tamim TURKI - EFREI Paris - 7 janvier 2026**
Cette application est une plateforme de vidéo qui permet de :
- Créer un compte utilisateur et s'authentifier de manière sécurisée.
- Explorer un catalogue de films et séries classés par catégories (Action, Sci-Fi, etc.).
- Gérer sa propre liste de favoris ("My List").
- Visionner des contenus vidéos directement dans le navigateur via un lecteur intégré.

## Architecture et Technologies
Application de streaming complète basée sur : **React (Frontend)**, **Node.js/Express (Backend)**, **PostgreSQL (Gestion utilisateurs)** et **MongoDB (Catalogue Films)**.
## Prérequis
**Docker 20.10+** | **Docker Compose 2.0+** | **OS** : Linux/macOS/Windows (WSL2) | **4 GB RAM, 5 GB disque**
## Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                      UTILISATEUR                            │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP (Port 80)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND (Nginx)                          │
│  - React Application                                        │
│  - Serveur Nginx                                            │
│  - Port: 80                                                 │
└──────────────────────┬──────────────────────────────────────┘
                       │ Réseau: frontend
                       │ HTTP (Port 5050)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Node.js)                         │
│  - API REST Express                                         │
│  - Authentification JWT                                     │
│  - Port: 5050                                               │
└──────────┬────────────────────────┬─────────────────────────┘
           │ Réseau: backend        │ Réseau: backend
           │                        │
           ▼                        ▼
┌──────────────────────┐  ┌──────────────────────────────────┐
│  POSTGRESQL          │  │  MONGODB                         │
│  - Authentification  │  │  - Métadonnées films             │
│  - Favoris           │  │  - Catalogue                     │
│  - Port: 5432        │  │  - Port: 27017                   │
│  - Volume persistant │  │  - Volume persistant             │
└──────────────────────┘  └──────────────────────────────────┘
```
**4 conteneurs** : Frontend (Nginx:80) → Backend (Node:5050) → PostgreSQL (5432) + MongoDB (27017)  
**2 réseaux** : frontend (Frontend↔Backend), backend (Backend↔BDD isolées)  
**2 volumes** : postgres_data, mongodb_data (persistance)

## Installation
```bash
# 1. Cloner le projet
git clone https://github.com/Tamim-Tur/TP-film-docker.git  && cd film

# 2. Configurer les variables d'environnement
# Créer un fichier .env à la racine (voir .env.example)

# 3. Construire et lancer les conteneurs
docker-compose up -d --build

# 4. Remplir la base de données (Seeding)
docker exec streaming-backend npm run seed
```
**Accès**: [http://localhost](http://localhost) (Frontend) | [http://localhost:5050](http://localhost:5050) (API)

## Services

| Service    | Image                        | Port   | Rôle             | Dockerfile        |
|------------|--------------------          |------  |------------------|---------------    |
| Frontend   | node:18-alpine → nginx:alpine| 80     | Interface React  | client/Dockerfile |
| Backend    | node:18-alpine               | 5050   | API REST + JWT   | server/Dockerfile |
| PostgreSQL | postgres:15-alpine           | 5432*  | Utilisateurs     | -                 |
| MongoDB    | mongo:7-jammy                | 27017* | Catalogue        | -                 |

## Configuration
**Variables (.env)** : `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `MONGO_USER`, `MONGO_PASSWORD`, `JWT_SECRET` # à configurer selon vos données 

**Ports exposés** : 80 (Frontend), 5050 (Backend)
**Volumes** : `postgres_data` (PostgreSQL), `mongodb_data` (MongoDB)
**Réseaux** : `frontend` (Frontend↔Backend), `backend` (Backend↔BDD)

## Sécurité
1. Utilisateurs non-root (UID 1001)
2. Secrets via `.env` (exclu de Git)
3. Images Alpine officielles, versions fixes
4. BDD non exposées (isolation réseau)
5. Headers sécurité Nginx (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
6. Rate limiting (1000 req/15min)
7. Multi-stage build (optimisation)
8. `.dockerignore` (pas de secrets dans images)

## Choix techniques
**Docker Compose** : Simplicité, reproductibilité  
**Alpine** : Légèreté (~5 MB), sécurité  
**Multi-stage** : Optimisation (500→50 MB)  
**Réseaux séparés** : Moindre privilège, isolation  
**PostgreSQL+MongoDB** : Polyglot persistence

## Commandes utiles
`docker-compose up -d` #demarrer 
`docker-compose down` #arreter
`docker-compose up -d --build` # reconstruire
`docker logs -f streaming-backend` #logs backend
`docker-compose ps` #etat 
`docker exec streaming-backend npm run seed` #remplir bdd
`docker-compose down -v && docker-compose up -d --build` #reinitialisation totale
`docker system prune -a` #nettoyage docker

**Projet réalisé par Tamim TURKI - EFREI Paris - 7 janvier 2026**
