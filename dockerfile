FROM node:15.6.0-alpine3.12
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm i -no-progress --loglevel=error
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
# COPY . /usr/src/app
# EXPOSE 3000
CMD [ "npm", "run", "build" ]