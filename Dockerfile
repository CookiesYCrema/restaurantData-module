FROM node:carbon

WORKDIR /
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3005

CMD ["npm","run","start"]

##############################

# FROM node:8

# COPY . /restaurantData-module
# WORKDIR /restaurantData-module

# RUN npm install

# EXPOSE 3005

# CMD ["npm", "run", "build"]
# CMD ["npm","run","start"]
