FROM node:20-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

RUN chown -R appuser:appgroup /app
USER appuser

COPY package*.json ./

RUN npm ci 


COPY . .


EXPOSE 8100 


CMD ["ionic", "serve", "--host", "0.0.0.0"]