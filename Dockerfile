FROM node:12-alpine
RUN apk add g++ make python openssl

RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser --disabled-password app
COPY . .
RUN chown -R app:app /opt/app
USER app
RUN npm install

CMD [ "npm", "run", "pm2" ]
