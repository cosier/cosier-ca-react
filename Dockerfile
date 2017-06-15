FROM cosier/os:latest
MAINTAINER Bailey Cosier <bailey@cosier.ca>

ENV APP_ROOT /barge/services/client
ENV APP_ENV  production

WORKDIR $APP_ROOT
RUN npm install phantomjs-prebuilt -g

RUN mkdir /usr/node

COPY package.json $APP_ROOT/package.json
ENV NODE_PATH  $APP_ROOT:$APP_ROOT/src

RUN npm install -g yarn

COPY yarn.lock $APP_ROOT/yarn.lock
RUN cd $APP_ROOT && \
  NODE_ENV=development \
  yarn

# RUN cd $APP_ROOT && \
  # NODE_ENV=development \
  # npm install

COPY bin      $APP_ROOT/bin
COPY src      $APP_ROOT/src
COPY server   $APP_ROOT/server
COPY tests    $APP_ROOT/tests
COPY config   $APP_ROOT/config
COPY build    $APP_ROOT/build
COPY public   $APP_ROOT/public

COPY REVISION $APP_ROOT/public/REVISION
COPY REVISION $APP_ROOT/dist/REVISION

COPY .babelrc  $APP_ROOT/.babelrc
COPY .env      $APP_ROOT/.env

RUN mkdir -p $APP_ROOT/tmp

RUN cd $APP_ROOT && APP_ENV=production bin/compile.sh
# RUN cd $APP_ROOT && bin/compile.sh

CMD "$APP_ROOT/bin/start.sh"
