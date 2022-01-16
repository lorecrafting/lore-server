# lorecraft

To bring up the Evennia game server and Postgres database, go into ./server folder and execute `docker-compose up`
Make sure `.env.postgres` env file is filled out with postgres development environment credentials.

## Requirements
- Docker
- Xcode


## First Time Setup - 
1. Go into the `./server` folder
1. 
1. . `docker-compose up` 
On first boot of the server async issues may cause the migrations to fail, the workaround until 
this is resolved is to `docker-compose down` when it hangs the first time then `docker-compose` back up a second time to see migrations run.
It will hang again because Evennia needs a super user.  Shell into the app container and run `evennia createsuperuser` and follow the prompts. `docker-compose down` then `docker-compose up` again
