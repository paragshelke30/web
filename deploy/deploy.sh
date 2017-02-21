#!/bin/bash

PROJECT="Web-Admin"
DEST_TEMP_DIR="/home/ec2-user/$PROJECT"
HOSTNAME="$(</var/deploy/$PROJECT/target-host)"
MAX_AGE=60

rm -rf "$DEST_TEMP_DIR"
mkdir "$DEST_TEMP_DIR"
tar xf "/var/deploy/$PROJECT/artifacts.tgz" -C "$DEST_TEMP_DIR"

aws s3 rm s3://$HOSTNAME --recursive
aws s3 cp "$DEST_TEMP_DIR" s3://$HOSTNAME/ --recursive --cache-control "max-age=$MAX_AGE"
