FROM node:14.15.4-alpine3.12

RUN apk add --no-cache bash

# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
# COPY ./package.json ./package-lock.json /app/

# Then install the NPM module
RUN npm install

# Copy current directory to APP folder
COPY . /app/

EXPOSE 3000
CMD ["npm", "run", "dev:server"]
