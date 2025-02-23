-- ==============================================
-- 🎧🎧🎧 SQL initialization for strict_music_database 🎧🎧🎧
-- ==============================================

-- Creating tables for strict_music_database
CREATE TABLE IF NOT EXISTS artists (
    id SERIAL PRIMARY KEY,
    artist_name VARCHAR(255),
    started_year INT,
    origin_country VARCHAR(255),
    still_active BOOLEAN,
    website_url VARCHAR(255),
    secret_info VARCHAR(1000)
);

CREATE TABLE IF NOT EXISTS songs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    artist_id INT,
    release_date DATE,
    secret_info VARCHAR(1000),
    FOREIGN KEY (artist_id) REFERENCES artists (id)
);

CREATE TABLE IF NOT EXISTS albums (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    album_cover_url VARCHAR(255),
    artist_id INT,
    release_date DATE,
    secret_info VARCHAR(1000),
    FOREIGN KEY (artist_id) REFERENCES artists (id)
);

CREATE TABLE IF NOT EXISTS song_album (
    song_id INT,
    album_id INT,
    PRIMARY KEY (song_id, album_id),
    FOREIGN KEY (song_id) REFERENCES songs (id),
    FOREIGN KEY (album_id) REFERENCES albums (id)
);


-- ===========================================
-- 💽 💽 💽 Populating tables with some data to interact with 💽 💽 💽
-- ===========================================
INSERT INTO artists (artist_name, started_year, origin_country, still_active, website_url, secret_info ) 
VALUES 
    (
        'Death Grips',
        2008,
        'USA',
        TRUE,
        'https://thirdworlds.net',
        'A lot of conspiracy about these guys from Sacramento, such as they maybe have a secret album out there. They also released their "No love deep web" album based on an alternate reality game (ARG) https://en.wikipedia.org/wiki/No_Love_Deep_Web#Promotion'
    ),
    (
        'HO99O9',
        2012,
        'USA',
        TRUE,
        'https://ho99o9.com',
        'The twosome''s last LP, 2017''s hip-hop-and-hardcore-referencing United States of Horror, put the high-energy hybridists on a path that''s led to tours with Alice in Chains, Korn and, later this year, Slipknot;  theyve modeled for Dr. Martens; you can count Metallica''s Kirk Hammett among the band''s ever-growing legion, lovingly dubbed the Death Kult. https://www.revolvermag.com/music/ho99o9-how-slipknot-endorsed-duo-teamed-travis-barker-their-most-devilish-music-yet/.'
    ),
    (
        'Jpegmafia',
        2007,
        'USA',
        TRUE,
        'https://www.jpegmafia.net',
        ''
    );

INSERT INTO songs (title, artist_id, release_date)
VALUES 
    ('Come Up and Get Me', 1, '2012-10-01'),
    ('Lil Boy', 1, '2012-10-01'),
    ('No Love', 1, '2012-10-01'),
    ('Black Dice', 1, '2012-10-01'),
    ('World of Dogs', 1, '2012-10-01'),
    ('Lock Your Doors', 1, '2012-10-01'),
    ('Whammy', 1, '2012-10-01'),
    ('Hunger Games', 1, '2012-10-01'),
    ('Deep Web', 1, '2012-10-01'),
    ('Stockton', 1, '2012-10-01'),
    ('Pop', 1, '2012-10-01'),
    ('Bass Rattle Stars Out the Sky', 1, '2012-10-01'),
    ('Artificial Death in the West', 1, '2012-10-01');

INSERT INTO albums (title, album_cover_url, artist_id, release_date)
VALUES
    (
        'Exmilitary',
        'https://upload.wikimedia.org/wikipedia/en/1/1a/Exmilitary_artwork.png',
        1,
        '2011-04-25'
    ),
    (
        'No Love Deep Web',
        'https://upload.wikimedia.org/wikipedia/en/9/9e/No_Love_Deep_Web_artwork.png',
        1,
        '2012-10-01'
    ),
    (
        'Government Plates',
        'https://upload.wikimedia.org/wikipedia/en/9/97/GovernmentPlates.jpg',
        1,
        '2013-11-13'
    ),
    (
        'The Powers That B',
        'https://upload.wikimedia.org/wikipedia/en/b/bd/The_Powers_That_B_cover_art.jpg',
        1,
        '2015-03-31'
    );

INSERT INTO song_album (song_id, album_id) 
VALUES
    (1, 1),
    (2, 2),
    (3, 3);


-- ==================================================
-- 👷‍♀️👷‍♀️👷‍♀️ USER CREATION AND GRANULAR DATA ACCESS 👷‍♀️👷‍♀️👷‍♀️
-- ==================================================
CREATE ROLE "user" WITH LOGIN PASSWORD 'user';

GRANT CONNECT ON DATABASE strict_music_database TO "user";

GRANT USAGE ON SCHEMA public TO "user";

-- Grant SELECT on all tables in the public schema to "user"
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO "user";

GRANT USAGE, UPDATE ON ALL SEQUENCES IN SCHEMA public TO "user";

-- Alter default privileges to automatically grant SELECT on new tables to "user"
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO "user";

-- Exclude access to the 'secret_info' column in the 'artists' table
REVOKE SELECT ON artists FROM "user";
GRANT SELECT (id, artist_name, started_year, origin_country, still_active, website_url) ON artists TO "user";

REVOKE INSERT ON artists FROM "user";
GRANT INSERT (id, artist_name, started_year, origin_country, still_active, website_url) ON artists TO "user";