FROM node:6.9.4

COPY . /opt/app/
RUN cd /opt/app && npm i
