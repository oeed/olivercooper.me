#!/bin/bash

cd  /Users/olivercooper/Dropbox/Documents/Projects/Portoflio\ 2017/olivercooper.me
JEKYLL_ENV=production bundler exec jekyll build && s3_website push