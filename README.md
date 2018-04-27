# Social Network API
Node backend for a project management app.

## Set Up
- Install dependencies with `npm install`
- Install nodemon with `npm install -g nodemon`
- Create a file in the root directory called local-env.sh

```bash
#!/bin/bash

export APP_PORT={{ port you want the server to run on // number }}
export APP_DB_URL={{ mongodb server url // string }}
export APP_SECRET={{ secret used for encrypting/decrypting tokens // string }}
```

## Running
- Start the server with `npm run start-dev`
