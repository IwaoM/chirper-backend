# chirper-backend

![text_logo](https://user-images.githubusercontent.com/43970996/215510363-bd8c4dd4-3f14-4967-a716-fbd0caaf35cf.svg)

A (very) simple Twitter-like social media app I built to practice fullstack development.

- **Both the [front-end](https://github.com/IwaoM/chirper-frontend) and the back-end (this repo) are needed to run the app.**
- Everything can run and data is stored locally (on the back-end's side).
- The entire app's interface is in French / l'intégralité de l'application a une interface en français.

## Requirements

- Node.JS 18.12.1 or newer is required - prior versions may work but were not tested.
- MySQL is needed to store the app's data - on Windows, the [MySQL installer](https://dev.mysql.com/downloads/installer/) can be used to install it.
  - In the installer, only the *Server* component is needed.

## Back-end setup

- Clone the repository.
- Rename `configTemplate.json` to `config.json` and change its values with your own values.
- An SSL certificate will be needed to run the server - generate one by executing the following commands in a terminal in the root directory:
  - `openssl genrsa -out key.pem`,
  - `openssl req -new -key key.pem -out csr.pem`, then follow the instructions,
  - `openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem`.
- In the root directory, run `npm install` to install required modules.
- Set up the front-end as well.
- Once everything is ready, run the server with `node server resetdb`. The `resetdb` argument will initialize the MySQL database and fill it with mock data.
- The following times, run the server with `node server` (without `resetdb`).
  - `node server resetdb` can still be run to reset the database to its default content.
  
## Features

A list of all of the client app's features can be found in the [front-end's readme](https://github.com/IwaoM/chirper-frontend/blob/main/README.md).
