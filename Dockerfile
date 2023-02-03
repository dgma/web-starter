FROM node:lts-alpine

ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package.json package.json
COPY --chown=node:node package-lock.json package-lock.json

USER node

RUN npm install --production
RUN npm next build
RUN npm next export

COPY --chown=node:node .next .next
COPY --chown=node:node public public

EXPOSE 3000:8080

CMD npm start
