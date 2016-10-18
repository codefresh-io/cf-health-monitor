FROM node:6.3.0-slim

ENV SHELL /bin/bash
COPY *.js package.json cf-health-monitor/

WORKDIR /cf-health-monitor
RUN npm install

EXPOSE 5999

CMD npm start