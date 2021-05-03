FROM node:16-alpine3.12 as build
RUN mkdir -p /app
COPY . /app/
WORKDIR /app
RUN npm install && npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
