# Utilisation d'une image Node.js
FROM node:18-alpine AS base
# Création d'un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
WORKDIR /app
COPY package*.json ./
# Installation des dépendances de production uniquement
RUN npm ci --only=production && npm cache clean --force
COPY --chown=nodejs:nodejs . .
# Exposition du port de l'API
EXPOSE 5050
# Changement vers l'utilisateur non-root
USER nodejs
# Commande de démarrage
CMD ["node", "src/index.js"]
