FROM node:18.17.0 as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock tsconfig.json ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn global add nodemon

RUN yarn build

FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder /usr/src/app/build ./build

ENV NODE_PATH=./build

EXPOSE 8080