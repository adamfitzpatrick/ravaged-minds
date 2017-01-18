#!/usr/bin/env bash

cd /opt/app

if [ "$RAVAGED_MINDS_PRODUCTION" = true  ]; then
    echo "PROD"
else
    npm start
fi
