FROM node:16-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install --frozen-lockfile

COPY . .
RUN npm run build

FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install --frozen-lockfile --production

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
