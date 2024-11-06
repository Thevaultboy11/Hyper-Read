FROM node:lts-alpine
ARG APP_NAME=studenthub-web
RUN adduser -S nextjs -u 1001
RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY packages/${APP_NAME}/. /usr/src
RUN yarn install
RUN yarn run build
USER nextjs
CMD ["yarn", "run", "start"]