FROM node:14

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci --silent

COPY . ./
RUN npm run build

EXPOSE 9090
CMD ["node", "build/server.js"]