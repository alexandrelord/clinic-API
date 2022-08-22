FROM node:14

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci --silent

COPY . ./
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]