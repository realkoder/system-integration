# 🚫 Exposing A DB with Granular Data Access 🚫

This approach is a dockerized PostgreSQL databasse, where two _user-profiles_ have been configured: **root** and **user**. 

The **root** profile has full access rights to everything, while the **user** has certain restrictions. These restrictions are based on the most granular level of data access in PostgreSQL, which is at the field attribute level for a given table.

The `PostgreSQL` database configured, is named `strict_music_database`, it's straightforward and consists of four tables: **artists, songs, albums, & song_album**.

For the _user-profile_ **user** there have been made restrictions to accessing the field **secret_info** for **artists** table. Try to see how you do **insertions** or **deletions** else way using the **user** _user-profile_? 🔍

## Why PostgreSQL? 🕵️‍♀️

PostgreSQL was chosen for this task due to its robust support for granular data access control. It allows for precise permissions at the column level within tables, making it an ideal choice for creating differentiated user profiles with varying access levels. This capability is crucial for tasks requiring detailed control over data visibility and manipulation rights, ensuring that users can only interact with data as intended by their role.


## Setting Up Local docker env 🐳

First start creating the environment for the needed two files (`docker-compose.yml` & `init.sql`):

```bash
# Just an example
mkdir Integrator

cd Integrator
```

Within the created directory, you need top copy the following two files from this repository's filepath `01._Assignments/04._Server_To_Client/02._Database_Granular_Data_Access/01._Exposer`:

**docker-compose.yml & init.sql**.

<br>

Now it's time to start the container and interact with it - execute the following commands 🚀

```bash
# Create the PostgreSQL dockerized container and boot it with docker-compose
docker compose up --build

# Access the running docker strictdb as user profile: user
docker exec -it strictdb psql -U user -d strict_music_database

# Access the running docker strictdb as super-user / postgres
docker exec -it strictdb psql -U postgres -d strict_music_database

# Terminate the container and delete created volume
docker compose down -v
```

<br>

## Commands to run

Execute the following commands where the _user-profile_ is set to **user**.
```sql
-- Read from artists but DENIED
SELECT * FROM artists;

-- Read from artists successfully (since secret_info is omitted)
SELECT  id, artist_name, started_year, origin_country, still_active, website_url FROM artists;

-- Insert into artist but DENIED
INSERT INTO artists (artist_name, started_year, origin_country, still_active, website_url) VALUES('MOCK Grips',2011,'DK',FALSE,'https://thirdworlds.net');

-- Insert into artist successfully
INSERT INTO artists (artist_name, started_year, origin_country, still_active, website_url, secret_info) VALUES('MOCK Grips',2011,'DK',FALSE,'https://thirdworlds.net', 'Some secrets');
```

## Links
