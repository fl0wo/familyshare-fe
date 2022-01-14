FROM node:14.18.1 as builder
WORKDIR /app
COPY package*.json /app/
RUN yarn install
COPY ./ /app/
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]