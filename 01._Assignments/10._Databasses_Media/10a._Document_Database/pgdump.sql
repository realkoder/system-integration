--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: albums; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.albums (
    id integer NOT NULL,
    title character varying(255),
    album_cover_url character varying(255),
    artist_id integer,
    release_date date,
    secret_info character varying(1000)
);


ALTER TABLE public.albums OWNER TO postgres;

--
-- Name: albums_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.albums_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.albums_id_seq OWNER TO postgres;

--
-- Name: albums_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.albums_id_seq OWNED BY public.albums.id;


--
-- Name: artists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.artists (
    id integer NOT NULL,
    artist_name character varying(255),
    started_year integer,
    origin_country character varying(255),
    still_active boolean,
    website_url character varying(255),
    secret_info character varying(1000)
);


ALTER TABLE public.artists OWNER TO postgres;

--
-- Name: artists_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.artists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.artists_id_seq OWNER TO postgres;

--
-- Name: artists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.artists_id_seq OWNED BY public.artists.id;


--
-- Name: song_album; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.song_album (
    song_id integer NOT NULL,
    album_id integer NOT NULL
);


ALTER TABLE public.song_album OWNER TO postgres;

--
-- Name: songs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.songs (
    id integer NOT NULL,
    title character varying(255),
    artist_id integer,
    release_date date,
    secret_info character varying(1000)
);


ALTER TABLE public.songs OWNER TO postgres;

--
-- Name: songs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.songs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.songs_id_seq OWNER TO postgres;

--
-- Name: songs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.songs_id_seq OWNED BY public.songs.id;


--
-- Name: albums id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.albums ALTER COLUMN id SET DEFAULT nextval('public.albums_id_seq'::regclass);


--
-- Name: artists id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artists ALTER COLUMN id SET DEFAULT nextval('public.artists_id_seq'::regclass);


--
-- Name: songs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs ALTER COLUMN id SET DEFAULT nextval('public.songs_id_seq'::regclass);


--
-- Data for Name: albums; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.albums (id, title, album_cover_url, artist_id, release_date, secret_info) FROM stdin;
1	Exmilitary	https://upload.wikimedia.org/wikipedia/en/1/1a/Exmilitary_artwork.png	1	2011-04-25	\N
2	No Love Deep Web	https://upload.wikimedia.org/wikipedia/en/9/9e/No_Love_Deep_Web_artwork.png	1	2012-10-01	\N
3	Government Plates	https://upload.wikimedia.org/wikipedia/en/9/97/GovernmentPlates.jpg	1	2013-11-13	\N
4	The Powers That B	https://upload.wikimedia.org/wikipedia/en/b/bd/The_Powers_That_B_cover_art.jpg	1	2015-03-31	\N
\.


--
-- Data for Name: artists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.artists (id, artist_name, started_year, origin_country, still_active, website_url, secret_info) FROM stdin;
1	Death Grips	2008	USA	t	https://thirdworlds.net	A lot of conspiracy about these guys from Sacramento, such as they maybe have a secret album out there. They also released their "No love deep web" album based on an alternate reality game (ARG) https://en.wikipedia.org/wiki/No_Love_Deep_Web#Promotion
2	HO99O9	2012	USA	t	https://ho99o9.com	The twosome's last LP, 2017's hip-hop-and-hardcore-referencing United States of Horror, put the high-energy hybridists on a path that's led to tours with Alice in Chains, Korn and, later this year, Slipknot;  theyve modeled for Dr. Martens; you can count Metallica's Kirk Hammett among the band's ever-growing legion, lovingly dubbed the Death Kult. https://www.revolvermag.com/music/ho99o9-how-slipknot-endorsed-duo-teamed-travis-barker-their-most-devilish-music-yet/.
3	Jpegmafia	2007	USA	t	https://www.jpegmafia.net	
\.


--
-- Data for Name: song_album; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.song_album (song_id, album_id) FROM stdin;
1	1
2	2
3	3
\.


--
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.songs (id, title, artist_id, release_date, secret_info) FROM stdin;
1	Come Up and Get Me	1	2012-10-01	\N
2	Lil Boy	1	2012-10-01	\N
3	No Love	1	2012-10-01	\N
4	Black Dice	1	2012-10-01	\N
5	World of Dogs	1	2012-10-01	\N
6	Lock Your Doors	1	2012-10-01	\N
7	Whammy	1	2012-10-01	\N
8	Hunger Games	1	2012-10-01	\N
9	Deep Web	1	2012-10-01	\N
10	Stockton	1	2012-10-01	\N
11	Pop	1	2012-10-01	\N
12	Bass Rattle Stars Out the Sky	1	2012-10-01	\N
13	Artificial Death in the West	1	2012-10-01	\N
\.


--
-- Name: albums_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.albums_id_seq', 4, true);


--
-- Name: artists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.artists_id_seq', 3, true);


--
-- Name: songs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.songs_id_seq', 13, true);


--
-- Name: albums albums_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_pkey PRIMARY KEY (id);


--
-- Name: artists artists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_pkey PRIMARY KEY (id);


--
-- Name: song_album song_album_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.song_album
    ADD CONSTRAINT song_album_pkey PRIMARY KEY (song_id, album_id);


--
-- Name: songs songs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_pkey PRIMARY KEY (id);


--
-- Name: albums albums_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.artists(id);


--
-- Name: song_album song_album_album_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.song_album
    ADD CONSTRAINT song_album_album_id_fkey FOREIGN KEY (album_id) REFERENCES public.albums(id);


--
-- Name: song_album song_album_song_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.song_album
    ADD CONSTRAINT song_album_song_id_fkey FOREIGN KEY (song_id) REFERENCES public.songs(id);


--
-- Name: songs songs_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.artists(id);


--
-- Name: TABLE albums; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.albums TO migrator;


--
-- Name: TABLE artists; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.artists TO migrator;


--
-- Name: TABLE song_album; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.song_album TO migrator;


--
-- Name: TABLE songs; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.songs TO migrator;


--
-- PostgreSQL database dump complete
--

