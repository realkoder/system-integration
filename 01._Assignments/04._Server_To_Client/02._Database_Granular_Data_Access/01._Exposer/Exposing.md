# 🚫 Exposing A DB with Granular Data Access 🚫

## Setting Up Local MySQL Database with Docker 🐳

First start with creating an environment for all the needed files (`Dockerfile`, `init.sql` & `docker-compose.yml` ):

```bash
# Just an example xD
mkdir Integrator

cd Integrator
```

<br>

Then create a `Dockerfile` with the content from below:

```dockerfile
# Use the official PostgreSQL image from Docker Hub
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=strict_music_database

# Copy initialization scripts (if any)
COPY ./init.sql /docker-entrypoint-initdb.d/

# Expose PostgreSQL port
EXPOSE 5432
```

Now create a file `init.sql` and add the following:

```sql


```

<br>

Create a `docker-compose.yml`

```yml
services:
  postgres:
    container_name: strictdb
    image: postgres:latest
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: strict_music_database
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

volumes:
  postgres_data:
```

<br>

Now it's time to boot it all up and interact - execute the following commands 🚀

```bash
# Create the PostgreSQL dockerized container and boot it with docker-compose
docker compose up --build

# Access the running docker strictdb as user profile: user
docker exec -it strictdb psql -U user -d strict_music_database
docker exec -it strictdb psql
```
