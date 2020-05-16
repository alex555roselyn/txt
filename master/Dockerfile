FROM node:12.2.0-alpine

# set working directory
WORKDIR /app/demo

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies

COPY / /app
#COPY app/ /app/
#COPY /app/package.json /app
RUN ls -la /app/*
RUN npm install 




EXPOSE 3002/tcp



# start app
CMD ["npm", "start"]