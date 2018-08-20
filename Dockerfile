# FROM node:8
FROM node:carbon

# COPY . /restaurantData-module
# WORKDIR /restaurantData-module
WORKDIR /
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3005

# CMD ["npm", "run", "build"]
CMD ["npm","run","start"]
