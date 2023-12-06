FROM node:lts-alpine
WORKDIR /usr/dist
COPY package.json ./
COPY tsconfig.json ./
COPY .env ./
COPY ./service-account-file.json ./service-account-file.json
RUN ls -a
RUN npm install
COPY ./dist ./
EXPOSE 6099
CMD ["npm","start"]