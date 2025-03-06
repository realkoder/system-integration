# Integrating Docker based MongoDB

#### 1. executed `docker-compose up --build`

![Docker compose up --build](assets/docker-compose-up.png)

<br>

---

#### 2. in a new terminal connected to mongodb with user login credentials `docker exec -it strictdb mongosh -u user -p user --authenticationDatabase strict_music_database`

![Connecting MongoDB](assets/connecting-mongodb.png)

<br>

---

#### 3. listed dbs and switched to strict_music_database `show dbs; use strict_music_database;`

![show dbs and switch to specific db](assets/show-and-set-db.png)

<br>

---

#### 4. show collections but fails since not allowed access to all collections`show collections`

![show collections not allowed](assets/show-collections.png)

<br>

---

#### 5. show all albums but fails since not allowed access `db.albums.find()`

![show albums but not allowed](assets/albums-not-allowed.png)

<br>

---

#### 6. show all songs 'db.songs.find()`

![show songs](assets/show-songs.png)
