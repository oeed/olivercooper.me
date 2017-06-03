#!/bin/bash

cd  /Users/olivercooper/Dropbox/Documents/Projects/Portoflio\ 2017/olivercooper.me
while true; do
	JEKYLL_ENV=development jekyll serve --incremental
	echo "Server closed. Starting again..."
done

