#!/bin/bash

if [ -x "$(command -v mkcert)" ]; then
  mkcert -cert-file cert.pem --key-file cert-key.pem localhost 127.0.0.1 ::1
else
  echo "Error: mkcert is not installed. use 'brew install mkdcert'"
  exit 1  
fi