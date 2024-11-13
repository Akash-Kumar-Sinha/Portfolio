FROM node:20

WORKDIR /app

COPY package* ./
COPY ./prisma ./

RUN npm install

COPY . .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "dev"]