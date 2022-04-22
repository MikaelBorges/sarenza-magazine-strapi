#builder
FROM strapi/base:14-alpine as builder

RUN mkdir -p /srv/app
WORKDIR /srv/app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN NODE_TLS_REJECT_UNAUTHORIZED=0 yarn install --production
COPY . .
ENV NODE_ENV production
RUN yarn build

#runner
FROM strapi/base:14-alpine as runner

COPY --from=builder /srv/app  /srv/app
WORKDIR /srv/app
ENV NODE_ENV production
EXPOSE 1337
CMD ["yarn", "start"]