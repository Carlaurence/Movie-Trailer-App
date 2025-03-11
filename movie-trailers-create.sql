SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

/*1- ELIMINAR RELACIONES FORANEAS ENTRE TABLAS PREVIAMENTE EXISTENTES*/
ALTER TABLE public.Movie DROP CONSTRAINT "movie_fk0";
ALTER TABLE public.Movie DROP CONSTRAINT "movie_fk1";
ALTER TABLE  public.People_in_movie DROP CONSTRAINT "people_in_movie_fk0";
ALTER TABLE  public.People_in_movie DROP CONSTRAINT "people_in_movie_fk1";
ALTER TABLE  public.People_in_movie DROP CONSTRAINT "people_in_movie_fk2";
ALTER TABLE  public.Genre_in_movie DROP CONSTRAINT "genre_in_movie_fk0";
ALTER TABLE  public.Genre_in_movie DROP CONSTRAINT "genre_in_movie_fk1";

/*2- Y DESPUES ELIMINAR TODAS LAS TABLAS SI EXISTEN, PARA PODER CREARLAS NUEVAMENTE FROM SCRATCH*/
DROP TABLE IF EXISTS public.Role_in_film;
DROP TABLE IF EXISTS public.People;
DROP TABLE IF EXISTS public.Movie;
DROP TABLE IF EXISTS public.Genre;
DROP TABLE IF EXISTS public.Languag;
DROP TABLE IF EXISTS public.Country;
DROP TABLE IF EXISTS public.People_in_movie;
DROP TABLE IF EXISTS public.Genre_in_movie;
/*Find movie by Main_Character, Director, Productor, Genre, Language and Country*/


CREATE TABLE public.Role_in_film (
    "_id" serial NOT NULL,
    "role_name" varchar NOT NULL,

    CONSTRAINT "role_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.People (
    "_id" serial NOT NULL,
    "first_name" varchar NOT NULL,
    "last_name" varchar NOT NULL,
    "birth_year" varchar,
    "gender" varchar,
    "nationality" varchar,
    
    CONSTRAINT "people_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.Movie (
    "_id" serial NOT NULL,
    "title" varchar NOT NULL,
    "release_date" DATE NOT NULL,

    "backdrop_path" varchar NOT NULL,
    "poster_path"varchar NOT NULL,
    "overview" varchar NOT NULL,
    "video" varchar NOT NULL,
    
    "language_id" bigint,
    "country_id" bigint,

    CONSTRAINT "movie_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.Genre (
    "_id" serial NOT NULL,
    "genre_name" varchar NOT NULL,
    
    CONSTRAINT "genre_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.Languag (
    "_id" serial NOT NULL,
    "original_language" varchar NOT NULL,
    "suffix" varchar NOT NULL,
    CONSTRAINT "language_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.Country (
    "_id" serial NOT NULL,
    "country_name" varchar NOT NULL,
    "suffix" varchar NOT NULL,
    CONSTRAINT "country_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

/*TABLA INTERMEDIA MAESTRO-DETALLE*/
CREATE TABLE  public.People_in_movie (
    "_id" serial NOT NULL,
    "person_id" bigint NOT NULL,
    "role_id" bigint NOT NULL,
    "movie_id" bigint NOT NULL,
    
    CONSTRAINT "people_in_movie_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

/*TABLA INTERMEDIA MAESTRO-DETALLE*/
CREATE TABLE  public.Genre_in_movie (
    "_id" serial NOT NULL,
    "movie_id" bigint NOT NULL,
    "genre_id" bigint NOT NULL,
    
    CONSTRAINT "genre_in_movie_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

/*SETTING FOREING KEYS*/
ALTER TABLE public.Movie ADD CONSTRAINT "movie_fk0" FOREIGN KEY ("language_id") REFERENCESpublic.Languag("_id");
ALTER TABLE public.Movie ADD CONSTRAINT "movie_fk1" FOREIGN KEY ("country_id") REFERENCESpublic.Country("_id");

ALTER TABLE  public.People_in_movie ADD CONSTRAINT "people_in_movie_fk0" FOREIGN KEY ("person_id") REFERENCES public.People("_id");
ALTER TABLE  public.People_in_movie ADD CONSTRAINT "people_in_movie_fk1" FOREIGN KEY ("movie_id") REFERENCES public.Movie("_id");
ALTER TABLE  public.People_in_movie ADD CONSTRAINT "people_in_movie_fk2" FOREIGN KEY ("role_id") REFERENCES public.Role_in_film("_id");

ALTER TABLE  public.Genre_in_movie ADD CONSTRAINT "genre_in_movie_fk0" FOREIGN KEY ("genre_id") REFERENCES public.Genre("_id");
ALTER TABLE  public.Genre_in_movie ADD CONSTRAINT "genre_in_movie_fk1" FOREIGN KEY ("movie_id") REFERENCES public.Movie("_id");


/*INSERTAR VALORES DE PAISES DE LA INDUSTRIA CINEMATOGRAFICA*/
INSERT INTO public.Country ("country_name", "suffix") VALUES
('United States', 'USA'),
('United Kingdom', 'GBR'),
('France', 'FRA'),
('China', 'CHN'),
('India', 'IND'),
('Germany', 'DEU'),
('Japan', 'JPN'),
('Italy', 'ITA'),
('Canada', 'CAN'),
('South Korea', 'KOR'),
('Spain', 'ESP'),
('Russia', 'RUS'),
('Australia', 'AUS'),
('Hong Kong', 'HKG'),
('New Zealand', 'NZL'),
('Brazil', 'BRA'),
('Mexico', 'MEX');

/*INSERTAR VALORES DE LANGUAGES*/
INSERT INTO public.Languag ("original_language", "suffix") VALUES
('English', 'en'),
('Spanish', 'es'),
('Mandarin Chinese', 'zh'),
('Hindi', 'hi'),
('French', 'fr'),
('Russian', 'ru'),
('Portuguese', 'pt'),
('German', 'de'),
('Japanese', 'ja'),
('Korean', 'ko'),
('Italian', 'it');

/*INSERTAR VALORES DE GENEROS*/
INSERT INTO public.Genre ("genre_name") VALUES
('Action'),
('Adventure'),
('Comedy'),
('Drama'),
('Fantasy'),
('Horror'),
('Musical'),
('Documental'),
('Mistery'),
('Romance'),
('Science Fiction'),
('Sports'),
('Thriller'),
('Wetern');

/*INSERTAR VALORES DE LOS ROLES*/
INSERT INTO public.Role_in_film ("role_name") VALUES
('Leading_Actor'),
('Antagonist'),
('Director'),
('Producer'),
('Film_Editor'),
('Production_Designer'),
('Makeup_Artist');


/*
CREATE TABLE public.Movie (
    "_id" serial NOT NULL,
    "title" varchar NOT NULL,
    "release_date" DATE NOT NULL,

    "backdrop_path" varchar NOT NULL,
    "poster_path"varchar NOT NULL,
    "overview" varchar NOT NULL,
    "video" varchar NOT NULL,
    
    "language_id" bigint,
    "country_id" bigint,

    CONSTRAINT "movie_pk" PRIMARY KEY ("_id")
)
CREATE TABLE public.People (
    "_id" serial NOT NULL,
    "first_name" varchar NOT NULL,
    "last_name" varchar NOT NULL,
    "birth_year" varchar,
    "gender" varchar,
    "nationality" varchar,
    
    CONSTRAINT "people_pk" PRIMARY KEY ("_id")
)
OK 1-joker 2024
Overview: During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.
Director: 'Todd', 'Phillips'
Actor:'Joaquin', 'Phoenix'
Actor: 'Lady', 'Gaga'
Genre Id's:
OK 2- Joker 2019
Director: 'Todd', 'Phillips'
Actor:'Joaquin', 'Phoenix'
Actor: 'Robert', 'De Niro'
Actor: 'Zazie', 'Beetz'
OK 3- The Dark Knight (2008)
DIrector: 'Christopher', 'Nolan'
Actor: 'Christian', 'Bale'
Actor: 'Heath', 'Ledger'
Actor: 'Aaron', 'Eckhart'
ok4-Gladiator
Director:'Ridley', 'Scott'
Actor:'Russell', 'Crowe'
Actor:'Connie', 'Nielsen'
Actor:'Joaquin', 'Phoenix'
Actor:'Djimon', 'Gaston'
Genre Id's:
OK5-American Gangster
Director:'Ridley', 'Scott'
Actor:'Russell', 'Crowe'
Actor: 'Denzel', 'Washington'
Actor: 'Cuba Mark', 'Gooding'
Actor: 'Chiwetel', 'Ejiofor'
OK6-Training Day
Director: 'Antoine', 'Fuqua'
Actor: 'Denzel', 'Washington'
Actor: 'Ethan', 'Hawke'
OK7-Man of Honor
Director: 'George', 'Tillman'
Actor: 'Robert', 'De Niro'
Actor: 'Cuba Mark', 'Gooding'
Actor: 'Charlize', 'Theron'
8- Jerry Maguire
Director: 'Cameron', 'Crowe'
Actor: 'Tom', 'Cruise'
Actor: 'Cuba Mark', 'Gooding'
9- GoodFellas
Director: 'Martin', 'Scorsese'
Actor: 'Robert', 'De Niro'
Actor: 'Joe', 'Pesci'
Actor: 'Raymond', 'Liotta'
10- Casino
Director: 'Martin', 'Scorsese'
Actor: 'Robert', 'De Niro'
Actor: 'Joe', 'Pesci'
Actor: 'Sharon', 'Stone'
11- Mad Max: Fury Road
Director: George Miller
Actor: 'Sharon', 'Stone'

Vanila Sky
Actor: 'Tom', 'Cruise'
MI1
MI2
MI3
The Wolf of Wall Street

3-
3-
*/

/*INSERTAR VALORES DE PERSONAS LOS CUALES PUEDEN SER DIRECTORES Y ACTORES*/

INSERT INTO public.People ("first_name", "last_name", "birth_year", "gender", "nationality") VALUES
('Todd', 'Phillips', '1970', 'Male', 'United States'),
('Joaquin', 'Phoenix', '1974', 'Male', 'Puerto Rico'),
('Lady', 'Gaga', '1986', 'Female', 'United States'),

('Zazie', 'Beetz', '1991', 'Female', 'Germany'),

('Christopher', 'Nolan', '1970', 'Male', 'United Kingdom'),
('Christian', 'Bale', '1974', 'Male', 'United Kingdom'),
('Heath', 'Ledger', '1979', 'Male', 'Australia'),
('Aaron', 'Eckhart', '1968', 'Male', 'United States'),

('Ridley', 'Scott', '1937', 'Male', 'United Kingdom'),
('Russell', 'Crowe', '1964', 'Male', 'New Zealand'),
('Connie', 'Nielsen', '1965', 'Female', 'Denmark'),
('Djimon', 'Gaston', '1964', 'Male', 'Benin'),
('Denzel', 'Washington', '1954', 'Male', 'United States'),
('Cuba Mark', 'Gooding', '1968', 'Male', 'United States'),
('Chiwetel', 'Ejiofor', '1977', 'Male', 'United Kingdom'),
('Antoine', 'Fuqua', '1965', 'Male', 'United States'),
('Ethan', 'Hawke', '1970', 'Male', 'United States'),
('George', 'Tillman', '1969', 'Male', 'United States'),
('Robert', 'De Niro', '1943', 'Male', 'United States'),
('Charlize', 'Theron', '1975', 'Female', 'South Africa'),
('Cameron', 'Crowe', '1957', 'Male', 'United States'),
('Tom', 'Cruise', '1962', 'Male', 'United States'),
('Martin', 'Scorsese', '1942', 'Male', 'United States'),
('Joe', 'Pesci', '1943', 'Male', 'United States'),
('Raymond', 'Liotta', '1954', 'Male', 'Dominican Republic'),
('Sharon', 'Stone', '1958', 'Female', 'United States'),
('George', 'Miller', '1945', 'Male', 'Australia'),
('Edward', 'Hardy', '1977', 'Male', 'United Kingdom');
-- ('', '', '', '', 'United States'),
-- ('', '', '', '', 'United States');


/*INSERTAR MOVIES*/
/*Joker 2019*/
INSERT INTO public.Movie (
    "title", 
    "release_date", 
    "backdrop_path", 
    "poster_path", 
    "overview", 
    "video", 
    "language_id", 
    "country_id"
) VALUES ('Joker', '2019-10-04', 'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/gZWl93sf8AxavYpVT1Un6EF3oCj.jpg', 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg', 'Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a futile attempt to feel like he is part of the world around him. Isolated, bullied and disregarded by society, Fleck begins a slow descent into madness as he transforms into the criminal mastermind known as the Joker.', 'https://www.youtube.com/watch?v=zAGVQLHvwOY&ab_channel=WarnerBros.Pictures', 1, 1);


/*Joker 2024*/
INSERT INTO public.Movie (
    "title", 
    "release_date", 
    "backdrop_path", 
    "poster_path", 
    "overview", 
    "video", 
    "language_id", 
    "country_id"
) VALUES ('Joker', '2024-10-04', 'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/uGmYqxh8flqkudioyFtD7IJSHxK.jpg', 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/aciP8Km0waTLXEYf5ybFK5CSUxl.jpg', 'Struggling with his dual identity, failed comedian Arthur Fleck meets the love of his life, Harley Quinn, while incarcerated at Arkham State Hospital.', 'https://www.youtube.com/watch?v=_OKAwz2MsJs&ab_channel=WarnerBros.Pictures', 1, 1);


/*The Dark Knight */
INSERT INTO public.Movie (
    "title", 
    "release_date", 
    "backdrop_path", 
    "poster_path", 
    "overview", 
    "video", 
    "language_id", 
    "country_id"
) VALUES ('The Dark Knight', '2008-07-18', 'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/oOv2oUXcAaNXakRqUPxYq5lJURz.jpg', 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 'With the help of allies Lt. Jim Gordon (Gary Oldman) and DA Harvey Dent (Aaron Eckhart), Batman (Christian Bale) has been able to keep a tight lid on crime in Gotham City. But when a vile young criminal calling himself the Joker (Heath Ledger) suddenly throws the town into chaos, the caped Crusader begins to tread a fine line between heroism and vigilantism.', 'https://www.youtube.com/watch?v=LDG9bisJEaI&ab_channel=DC', 1, 1);


/*Gladiator*/
INSERT INTO public.Movie (
    "title", 
    "release_date", 
    "backdrop_path", 
    "poster_path", 
    "overview", 
    "video", 
    "language_id", 
    "country_id"
) VALUES ('Gladiator', '2000-05-05', 'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/Ar7QuJ7sJEiC0oP3I8fKBKIQD9u.jpg', 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg', 'After the death of Emperor Marcus Aurelius, his devious son takes power and demotes Maximus, one of Rome is most capable generals who Marcus preferred. Eventually, Maximus is forced to become a gladiator and battle to the death against other men for the amusement of paying audiences.', 'https://www.youtube.com/watch?v=P5ieIbInFpg&ab_channel=ParamountMovies', 1, 1);


/*American Gangster*/
INSERT INTO public.Movie (
    "title", 
    "release_date", 
    "backdrop_path", 
    "poster_path", 
    "overview", 
    "video", 
    "language_id", 
    "country_id"
) VALUES ('American Gangster', '2007-10-19', 'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/y42MEf1rvoLEWYEyNuOADxQ6MQ7.jpg', 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/ueG6NzK1GzAFbnXxVJHxgIOq5CH.jpg', 'Harlem drug dealer Frank Lucas rises to power in corrupt 1970s New York, equalling and surpassing the notorious Mafia families with the reach of his empire. On the other side of the law, honest cop Richie Roberts dedicates himself to taking down `the most dangerous man walking the streets. Lucas acts with impunity, smuggling heroin into the US in the coffins of American soldiers killed in Vietnam.', 'VYmxZJAbolo', 1, 1);


/*Training Day*/
INSERT INTO public.Movie (
    "title", 
    "release_date", 
    "backdrop_path", 
    "poster_path", 
    "overview", 
    "video", 
    "language_id", 
    "country_id"
) VALUES ('Training Day', '2001-10-05', 'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/mkfRdkM7FtmOndrh1jML3MIRB2i.jpg', 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/bUeiwBQdupBLQthMCHKV7zv56uv.jpg', 'Police drama about a veteran officer who escorts a rookie on his first day with the LAPD"s tough inner-city narcotics unit. "Training Day" is a blistering action drama that asks the audience to decide what is necessary, what is heroic and what crosses the line in the harrowing gray zone of fighting urban crime. Does law-abiding law enforcement come at the expense of justice and public safety? If so, do we demand safe streets at any cost?', 'VQ-SCoyUwfg', 1, 1);

/*Man of honor*/
INSERT INTO public.Movie (
    "title", 
    "release_date", 
    "backdrop_path", 
    "poster_path", 
    "overview", 
    "video", 
    "language_id", 
    "country_id"
) VALUES ('Man of honor', '2000-11-01', 'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/laNHiehbOHYM3y9FVFfqmLuX8X5.jpg', 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/wNUAnXV1mzOOfvnVBIYsalkk078.jpg', 'Carl Brashear (Cuba Gooding Jr.) is an ambitious sharecropper who joins the U.S. Navy to become the world is first black master diver. But as he works through diving training, the bitter and racist Master Chief Billy Sunday (Robert De Niro) sets out to make Carl is journey as difficult as possible. Despite the entire Navy doubting his potential and sabotaging his training, the determined Carl proves that he can overcome the discrimination around him.', 'E21xH5vg0yo', 1, 1);

/*GoodFellas*/
INSERT INTO public.Movie (
    "title", 
    "release_date", 
    "backdrop_path", 
    "poster_path", 
    "overview", 
    "video", 
    "language_id", 
    "country_id"
) VALUES ('GoodFellas', '1990-09-19', 'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/7TF4p86ZafnxFuNqWdhpHXFO244.jpg', 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg', 'Henry Hill knows only too well that he must put the Mob is interests before everything, even his family, but when the good times turn sour, his loyalties dissolve in the face of greater rewards. Faced with a terrible retribution, Hill can see only one way to get out alive.', 'xWMxvFvhAB8', 1, 1);