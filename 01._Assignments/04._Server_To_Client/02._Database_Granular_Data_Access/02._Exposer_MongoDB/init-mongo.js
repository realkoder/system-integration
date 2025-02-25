// ==============================================
// 🎧🎧🎧 MongoDB initialization for strict_music_database 🎧🎧🎧
// ==============================================

db = db.getSiblingDB("strict_music_database");

// ===========================================
// 💽 💽 💽 Populating collections with some data to interact with 💽 💽 💽
// ===========================================

// Insert into artists collection
db.artists.insertMany([
  {
    _id: 1,
    artist_name: "Death Grips",
    started_year: 2008,
    origin_country: "USA",
    still_active: true,
    website_url: "https://thirdworlds.net",
    secret_info:
      'A lot of conspiracy about these guys from Sacramento, such as they maybe have a secret album out there. They also released their "No love deep web" album based on an alternate reality game (ARG) https://en.wikipedia.org/wiki/No_Love_Deep_Web#Promotion',
  },
  {
    _id: 2,
    artist_name: "HO99O9",
    started_year: 2012,
    origin_country: "USA",
    still_active: true,
    website_url: "https://ho99o9.com",
    secret_info:
      "The twosome's last LP, 2017's hip-hop-and-hardcore-referencing United States of Horror, put the high-energy hybridists on a path that's led to tours with Alice in Chains, Korn and, later this year, Slipknot; theyve modeled for Dr. Martens; you can count Metallica's Kirk Hammett among the band's ever-growing legion, lovingly dubbed the Death Kult. https://www.revolvermag.com/music/ho99o9-how-slipknot-endorsed-duo-teamed-travis-barker-their-most-devilish-music-yet/.",
  },
  {
    _id: 3,
    artist_name: "Jpegmafia",
    started_year: 2007,
    origin_country: "USA",
    still_active: true,
    website_url: "https://www.jpegmafia.net",
    secret_info: "",
  },
]);

// Insert into songs collection
db.songs.insertMany([
  {
    _id: 1,
    title: "Come Up and Get Me",
    artist_id: 1,
    release_date: new Date("2012-10-01"),
  },
  {
    _id: 2,
    title: "Lil Boy",
    artist_id: 1,
    release_date: new Date("2012-10-01"),
  },
  {
    _id: 3,
    title: "No Love",
    artist_id: 1,
    release_date: new Date("2012-10-01"),
  },
  {
    _id: 4,
    title: "Black Dice",
    artist_id: 1,
    release_date: new Date("2012-10-01"),
  },
  {
    _id: 5,
    title: "World of Dogs",
    artist_id: 1,
    release_date: new Date("2012-10-01"),
  },
  {
    _id: 6,
    title: "Lock Your Doors",
    artist_id: 1,
    release_date: new Date("2012-10-01"),
  },
  {
    _id: 7,
    title: "Whammy",
    artist_id: 1,
    release_date: new Date("2012-10-01"),
  },
  {
    _id: 8,
    title: "Hunger Games",
    artist_id: 1,
    release_date: new Date("2012-10-01"),
  },
  {
    _id: 9,
    title: "Deep Web",
    artist_id: 1,
    release_date: new Date("2012-10-01"),
  },
  {
    _id: 10,
    title: "Stockton",
    artist_id: 1,
    release_date: new Date("2012-10-01"),
  },
  { _id: 11, title: "Pop", artist_id: 1, release_date: new Date("2012-10-01") },
  {
    _id: 12,
    title: "Bass Rattle Stars Out the Sky",
    artist_id: 1,
    release_date: new Date("2012-10-01"),
  },
  {
    _id: 13,
    title: "Artificial Death in the West",
    artist_id: 1,
    release_date: new Date("2012-10-01"),
  },
]);

// Insert into albums collection
db.albums.insertMany([
  {
    _id: 1,
    title: "Exmilitary",
    album_cover_url:
      "https://upload.wikimedia.org/wikipedia/en/1/1a/Exmilitary_artwork.png",
    artist_id: 1,
    release_date: new Date("2011-04-25"),
  },
  {
    _id: 2,
    title: "No Love Deep Web",
    album_cover_url:
      "https://upload.wikimedia.org/wikipedia/en/9/9e/No_Love_Deep_Web_artwork.png",
    artist_id: 1,
    release_date: new Date("2012-10-01"),
  },
  {
    _id: 3,
    title: "Government Plates",
    album_cover_url:
      "https://upload.wikimedia.org/wikipedia/en/9/97/GovernmentPlates.jpg",
    artist_id: 1,
    release_date: new Date("2013-11-13"),
  },
  {
    _id: 4,
    title: "The Powers That B",
    album_cover_url:
      "https://upload.wikimedia.org/wikipedia/en/b/bd/The_Powers_That_B_cover_art.jpg",
    artist_id: 1,
    release_date: new Date("2015-03-31"),
  },
]);



// ==================================================
// 👷‍♀️👷‍♀️👷‍♀️ USER CREATION AND GRANULAR DATA ACCESS 👷‍♀️👷‍♀️👷‍♀️
// ==================================================

// mongodb docs -> https://www.mongodb.com/docs/manual/reference/system-roles-collection/#mongodb-data-admin.system.roles.privileges
// Create the restricted role and a user with that role to restrict access to song-document with id === 1
db.createRole(
  {
    role: "restrictedSongReader",
    privileges: [
      {
        resource: { db: "strict_music_database", collection: "songs" },
        actions: [ "find" ],
        query: { $and: [{ _id: { $ne: 1 } }] }
      }
    ],
    roles: []
  }
);


db.createUser(
  {
    user: "user",
    pwd: "user",
    roles: [
      { role: "restrictedSongReader", db: "strict_music_database" }]
    }
);
