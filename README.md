# FullStack Challenge

## How to run the thing?

In the root project let's run:
`docker-compose up --build`

Then access the api container by:
`docker exec -it <container-id> bash`

Once there run you will need to run a migration:
`npm run migrate-dev`

Now seed the database (optional):
`npm run seed`

Once the backend is set up, let's install the frontend dependencies in your local machine:
`cd ./frontent && npm i`

Finally, run the project:
`npm run`






