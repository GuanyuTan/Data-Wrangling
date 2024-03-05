FROM node:20-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm ci --force
WORKDIR /app
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]