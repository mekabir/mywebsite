# most dockerfiles start with a base image. we will use the ofic
FROM node:18

# any subsequent instruction in our dockerfile will start from this app directory
WORKDIR /app

#in docker we want to install our dependencies first so that they can be cached. 
COPY package*.json ./

# results of each run will be committed to the docker image as a layer
RUN npm install 

# we get our source code in our docker image
COPY . .

# we use an environment variable which we can set in our container using the ENV instruction
ENV PORT=8080

EXPOSE 8080

# unlike run it does not start a shell session. it is called exec form. 
CMD ["npm" , "start"]