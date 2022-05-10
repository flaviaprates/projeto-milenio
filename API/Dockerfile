FROM node:16.13.0
WORKDIR /desafio-dev-jr-pl
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
CMD ["node", "src/index.js"]
EXPOSE 8080