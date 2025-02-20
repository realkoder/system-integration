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


-- 💽 💽 💽 inserting data to test with 💽 💽 💽

INSERT INTO artists (artist_name, started_year, origin_country, still_active, website_url) VALUES
('Death Grips', 2008, 'US', TRUE, 'https://thirdworlds.net'),
('The Rolling Stones', 1962, 'UK', TRUE, 'http://therollingstones.co.uk'),
('Elvis Presley', 1954, 'USA', FALSE, 'http://elvispresley.com');

INSERT INTO songs (title, artist_id, release_date, genre) VALUES
('Love Me Do', 1, '1962-10-05', 'Rock'),
('Satisfaction', 2, '1965-08-20', 'Rock'),
('Jailhouse Rock', 3, '1957-09-24', 'Rock');

INSERT INTO albums (title, album_cover_url, artist_id, release_date) VALUES
('Please Please Me', 'http://albums/thebeetles/pleasepleaseme.jpg', 1, '1963-03-22'),
('Out of Our Heads', 'http://albums/therollingstones/outofourheads.jpg', 2, '1965-07-30'),
('Elvis Presley', 'http://albums/elvispresley/elvispresley.jpg', 3, '1956-03-23');

INSERT INTO song_album (song_id, album_id) VALUES
(1, 1),
(2, 2),
(3, 3);