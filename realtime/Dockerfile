FROM node:alpine
MAINTAINER Geert Baeke


# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install dependencies
COPY package.json /usr/src/app
RUN npm install

# copy app sources
COPY index.js /usr/src/app
COPY index.html /usr/src/app

CMD ["npm", "start"]