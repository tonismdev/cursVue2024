# Dockerfile
# Name the node stage "builder"
FROM node:21 AS builder

ARG proxy

ENV http_proxy $proxy
ENV https_proxy $proxy

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
#RUN yarn install

# Afegeix el paquet @types/vue com a dependència de desenvolupament
#RUN yarn add @types/vue --dev

# Copy all files from current directory to working dir in image
#COPY . .

CMD ["yarn", "dev-docker"]
