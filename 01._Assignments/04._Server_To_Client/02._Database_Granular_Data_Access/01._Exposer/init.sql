CREATE ROLE root WITH LOGIN SUPERUSER CREATEDB CREATEROLE PASSWORD 'admin';

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE strict_music_database TO root;

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

-- 💽 💽 💽 inserting data to test with 💽 💽 💽
INSERT INTO
    artists (
        artist_name,
        started_year,
        origin_country,
        still_active,
        website_url,
        secret_info
    )
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

INSERT INTO
    songs (title, artist_id, release_date)
VALUES
    ('Love Me Do', 1, '1962-10-05'),
    ('Satisfaction', 2, '1965-08-20'),
    ('Jailhouse Rock', 3, '1957-09-24');

INSERT INTO
    albums (title, album_cover_url, artist_id, release_date)
VALUES
    (
        'Please Please Me',
        'http://albums/thebeetles/pleasepleaseme.jpg',
        1,
        '1963-03-22'
    ),
    (
        'Out of Our Heads',
        'http://albums/therollingstones/outofourheads.jpg',
        2,
        '1965-07-30'
    ),
    (
        'Elvis Presley',
        'http://albums/elvispresley/elvispresley.jpg',
        3,
        '1956-03-23'
    );

INSERT INTO
    song_album (song_id, album_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3);

-- USER CREATION AND GRANULAR DATA ACCESS
CREATE ROLE "user" WITH LOGIN PASSWORD 'user';

-- Grant privileges to the 'user' on the 'my_database' database
-- GRANT CONNECT ON DATABASE strict_music_database TO "user";
-- GRANT USAGE ON SCHEMA public TO "user";
-- GRANT SELECT (id, artist_name, started_year, origin_country, still_active, website_url) ON artists TO "user";

GRANT CONNECT ON DATABASE strict_music_database TO "user";
GRANT USAGE ON SCHEMA public TO "user";

-- Grant SELECT on all tables in the public schema to "user"
GRANT SELECT ON ALL TABLES IN SCHEMA public TO "user";

-- Alter default privileges to automatically grant SELECT on new tables to "user"
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO "user";

-- Exclude access to the 'secret_info' column in the 'artists' table
REVOKE SELECT ON artists FROM "user";
GRANT SELECT (id, artist_name, started_year, origin_country, still_active, website_url) ON artists TO "user";
