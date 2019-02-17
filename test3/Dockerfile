# build image
FROM node:11.6.0 as builder

# ↓ ↓ ↓   .env vars    ↓ ↓ ↓

ARG PUBLIC_KEY_EXAMPLE="default"


# ↑ ↑ ↑   .env vars    ↑ ↑ ↑


ARG NODE_ENV="production"
ARG SASS_PATH
WORKDIR /home/app
COPY ./src ./src
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./webpack.config.js ./webpack.config.js
RUN npm install --no-package-lock
RUN npm run build

# deploy image
FROM nginx:1.15.8-alpine
ARG PORT="80"
ENV PORT=$PORT
COPY --from=builder /home/app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/mime.types /etc/nginx/mime.types

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
