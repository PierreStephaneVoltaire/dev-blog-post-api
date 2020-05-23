FROM node:12.13-alpine  as builder
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}


ARG aws_access_key_id
ENV aws_access_key_id=${aws_access_key_id}

ARG aws_secret_access_key
ENV aws_secret_access_key=${aws_secret_access_key}

ARG region
ENV region=${region}

ARG db_type
ENV db_type=${db_type}

ARG db_host
ENV db_host=${db_host}

ARG db_port
ENV db_port=${db_port}

ARG db_username
ENV db_username=${db_username}

ARG db_password
ENV db_password=${db_password}

ARG db_database
ENV db_database=${db_database}

ARG api_port
ENV api_port=${api_port}

ARG environment
ENV environment=${environment}

ARG api_secure_port
ARG api_secure_port=${api_secure_port}

ARG redis_pass
ARG redis_pass=${redis_pass}


WORKDIR /usr/app
RUN npm i -g  nodemon yarn
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build
FROM node:latest as serve
COPY --from=builder /usr/app/node_modules node_modules
COPY --from=builder /usr/app/dist dist
CMD node dist/main.js
EXPOSE $api_port $api_secure_port

