# DB Migration and documentation

### COMMANDS

**Knex**
```bash
# Init knex
npx knex init

# see the below section for configuring the knex config generated file correctly

# CREATE A MIGRATION - that's gonna add user and products table to postgres DB
npx knex migrate:make create_users_products_table

# MIGRATION EXECUTION: Run the migration
npx knex migrate:latest

# ROLLBACK: migrate down
npx knex migrate:rollback

# SEEDING: create a seed file
npx knex seed:make seed_users

# RUN SEEDING
npx knex seed:run
```

Change config file to the below:
```javascript
import 'dotenv/config';

/**
 * @type { import("knex").Knex.Config }
 */
export default {
  client: 'postgresql',
  connection: {
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
```



**Docker compose**
```bash
# Boot up docker
docker compose up

# Interact with the postgres docker container
docker exec -it <docker-container-name> psql -U mydatabase -d mydatabase

# Docker compose down
docker compose down -v
```
