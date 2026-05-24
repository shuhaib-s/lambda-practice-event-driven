FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


FROM node:alpine AS prod

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/build ./build

CMD ["node", "build/server.js"]