### Wildlife Hazard Forecast Tool

## Running for the First Time

This project uses the Prisma Data Platform as its remote database. Follow these instructions to create a remote database in your own Prisma Data platform account.

* Create a Prisma Data Platform account [here](https://console.prisma.io/?)
* In the Prisma Data Platform console, create a workspace for WHFT
* Within the workspace, create a project
* Within the project, click on Environments in the left nav
* Select the "Development" environment. This is the default environment, and should already be there.
* Within the Development environment, select "Database" in the left nav
* Create a relational database using Postgres
* Then select "API Keys" in the left nav
* Create an API key
* Select "Database" again in the left nav
* Under the heading "Configure your database access," click "Generate Database Credentials"
* Copy the given DATABASE_URL to your clipboard
* Create a .env file at root level of the project
* Paste the DATABASE_URL from your clipboard into your .env file, and save it

### Prisma CLI Commands

* Format your schema file by running `npx prisma format` in a terminal.
* Migrate schema changes to the remote database by running `npx prisma migrate dev` in a terminal. This is a destructive operation and is not guaranteed to keep existing data intact. 
* Add seed data to the database by running `npx prisma db seed` in a terminal.
* If your database gets into a weird state and you want to delete all data and recreate all tables from scratch, run `npx prisma migrate reset`.

## Running For Development

To start a local server, run `npm run dev` in a terminal.

## Tech Stack

This project uses:
* Type script (https://www.typescriptlang.org/docs/)
* Node (https://nodejs.org/docs/latest/api/)
* Express (https://expressjs.com/)
* PostgreSQL (https://www.postgresql.org/docs/17/index.html)
* Prisma ORM (https://www.prisma.io/docs)
