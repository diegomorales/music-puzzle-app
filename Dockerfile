FROM node:10

RUN mkdir -p /home/node/code

RUN npm i -g npm

USER node

WORKDIR /home/node/code

RUN echo 'alias ll="ls -la"' >> /home/node/.bashrc
RUN echo 'npm start' >> /home/node/.bash_history
