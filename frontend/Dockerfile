FROM node:20-alpine as builder

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]