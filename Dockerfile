FROM node:20-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

RUN chown -R appuser:appgroup /app
USER appuser

COPY package*.json ./

RUN npm ci 


COPY . .


EXPOSE 5173 


CMD ["npm", "run", "dev", "--host", "0.0.0.0"]