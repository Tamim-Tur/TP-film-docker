# Stage 1: Build 
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Installation de toutes les dépendances 
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run build

# Stage 2: Serveur Nginx
FROM nginx:alpine
# Création d'un utilisateur non-root
RUN addgroup -g 1001 -S frontend && adduser -S frontend -u 1001 -G frontend
# Copie de la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf
# Copie des fichiers buildés depuis le stage builder (stage 1)
COPY --from=builder /app/dist /usr/share/nginx/html
# Exposition du port HTTP
EXPOSE 80
# Changement des permissions
RUN chown -R frontend:frontend /usr/share/nginx/html && \
    chown -R frontend:frontend /var/cache/nginx && \
    chown -R frontend:frontend /var/log/nginx && \
    chown -R frontend:frontend /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R frontend:frontend /var/run/nginx.pid
# Utilisation de l'utilisateur non-root
USER frontend
# Démarrage de Nginx
CMD ["nginx", "-g", "daemon off;"]
