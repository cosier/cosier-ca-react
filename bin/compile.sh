#!/bin/bash

CLIENT_BIN_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CLIENT_ROOT=$( cd $CLIENT_BIN_DIR/../ && pwd )

# Ensure APP_ROOT is available to the app
APP_ROOT=$CLIENT_ROOT

if [ -z "$APP_ENV" ]; then
  APP_ENV=production
fi

if [[ "$APP_ENV" == "development" ]]; then
  COMMAND="deploy:dev"
else
  COMMAND="deploy:prod"
fi

echo
echo "Client: $APP_ENV Build"
echo "COMMAND=$COMMAND"
echo "======================================================="
echo


#--------------------------

COMMAND="deploy:dev"

NODE_ENV=$APP_ENV \
  APP_ENV=$APP_ENV \
  $APP_ROOT/bin/npm run $COMMAND

