# chirper-backend

Back-end repo for Chirper, a WIP basic Twitter-like app

## Requirements

- MySQL Server should be installed (all data is locally stored)
- An SSL certificate will be needed to run the server - generate one by executing the following commands in the root directory:
  - `openssl genrsa -out key.pem`
  - `openssl req -new -key key.pem -out csr.pem`
  - `openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem`

## Setup

- `configTemplate.json` should be renamed to `config.json` and its values changed with your own values
