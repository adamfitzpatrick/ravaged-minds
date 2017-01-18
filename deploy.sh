#!/usr/bin/env bash

# Note that this is for use with the Amazon-endorsed EC2 Linux version.  You must be logged in as
# root.

echo "[mongodb-org-3.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.0/x86_64/
gpgcheck=0
enabled=1
" > /etc/yum.repos.d/mongodb-org-3.0.repo

yum install -y mongodb-org
service mongod start

curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
yum install -y nodejs

npm i
npm rebuild node-sass
export PRODUCTION=true
npm run deploy &
