# 10b Migrate from One Database to Another

## Overview

This guide outlines the steps to migrate data from a _PostgreSQL_ database to a _MongoDB_ database using _Docker_. The migration script initializes the _PostgreSQL_ database and prepares it for data transfer.

## Steps

1. **Set Up Docker Containers**:
   Use the following command to start the PostgreSQL and MongoDB containers defined in `docker-compose.yml`:

   ```bash
   docker-compose up
   ```

2. **Initialize PostgreSQL Database**:
   The `init.sql` script will automatically run when the PostgreSQL container starts, creating the necessary tables and populating them with initial data.

3. **Dump PostgreSQL Data**:
   To create a dump of the PostgreSQL database, run:

   ```bash
   docker exec -it postgresdb pg_dump -U postgres music_database > pgdump.sql
   ```

4. **Migrate Data to MongoDB**:
   Use a migration tool or script to read the `pgdump.sql` file and insert the data into MongoDB. This step may require custom scripting depending on your data structure.

5. **Verify Data in MongoDB**:
   Connect to the MongoDB container and verify that the data has been migrated successfully:

   ```bash
   docker exec -it mongodb mongosh

   ```

6. **Take down docker-compose**:
   Stop running containers and can delete all
   ```bash
   docker compose down --rmi all --remove-orphans
   ```

---

Generate a dumpfile for _mongoodb_:

```bash
docker exec -it mongodb mongodump --db your_database_name --out /data/db/dump
```
