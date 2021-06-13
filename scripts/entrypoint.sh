#!/bin/sh

nginx -g 'daemon off;' & 
node /var/share/nginx/html/index.js
