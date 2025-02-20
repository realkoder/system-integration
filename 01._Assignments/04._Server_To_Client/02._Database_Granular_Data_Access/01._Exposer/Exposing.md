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
# Use the official MySQL image from Docker Hub
FROM mysql:latest

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=admin
ENV MYSQL_DATABASE=my_database
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=user

# Copy initialization scripts (if any)
COPY ./init.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306
```

Now create a file `init.sql` and add the following:

```sql
CREATE DATABASE IF NOT EXISTS strict_music_database;
USE strict_music_database;

CREATE TABLE IF NOT EXISTS artists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  artist_name VARCHAR(255),
  started_year INT,
  origin_country VARCHAR(255),
  still_active BOOLEAN,
  website_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  artist_id INT,
  release_date DATE,
  genre VARCHAR(255),
  FOREIGN KEY (artist_id) REFERENCES artists(id)
);

CREATE TABLE IF NOT EXISTS albums (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  album_cover_url VARCHAR(255),
  artist_id INT,
  release_date DATE,
  FOREIGN KEY (artist_id) REFERENCES artists(id)
);

CREATE TABLE IF NOT EXISTS song_album (
  song_id INT,
  album_id INT,
  PRIMARY KEY (song_id, album_id),
  FOREIGN KEY (song_id) REFERENCES songs(id),
  FOREIGN KEY (album_id) REFERENCES albums(id)
);

```

<br>

Create a `docker-compose.yml`

```yml
services:
  mysql:
    build: .
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: admin
      MYSQL_DATABASE: my_database
      MYSQL_USER: user
      MYSQL_PASSWORD: user
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

<br>

Now it's time to boot it all up - execute the following command 🚀

```bash
docker compose up --build
```
