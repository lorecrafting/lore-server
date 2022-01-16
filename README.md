# lorecraft

## Requirements
- Docker
- Xcode

## First Time Setup - Backend

Note: Still a very manual process, things will be automated and tightened up.

1. Go into the `./server` folder
1. Make sure `.env.postgres` has the correct postgres development creds
1. `docker-compose up` for the first time will setup the DB and server will hang due to async issues
1. When it hangs `docker-compose down` then `docker-compose up` again and migrations should run.
1. It will hang again because the Evennia server needs a superuser.  Shell into the app container and run `evennia createsuperuser`
1. `docker-compose down` and `docker-compose up` should get everything up and running.

## React-Native Mobile Client

1. Go into the `./client` folder
2. `yarn install`
3. `cd ios && pod install && cd ..`
4. `yarn run start`

Make sure to setup ngrok and point the react-native app wsurl to the correct websocket url if you plan to test it on a device.  Without ngrok, the default websocket endpoint is `ws://localhost:4002`. You may have to change out the `window.wsurl` variable in the react-native codebase depending on your setup.
