# FullStack Challenge

## How to run the thing?  

Duplicate the .env.local file and rename it to `.env`  

`cd ./backend && \`  
`cp .env.local .env`  

In your new `.env` file, insert your credentials in the following variables:  
`POSTGRES_USER=  
POSTGRES_PASSWORD=`  

Now in the root project, let's run:  
`docker-compose up --build`  

Then access the api container by:  
`docker exec -it <container-id> bash`  

Once inside, will need to run a migration:  
`npm run migrate-dev`  

Now, seed the database (optional):  
`npm run seed`  

Once the backend is set up, let's install the frontend dependencies on your local machine:  
`cd ./frontent && npm i`  

Finally, run the project:  
`npm start`
