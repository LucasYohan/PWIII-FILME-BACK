create database bd_resenhapop;
use bd_resenhapop;
drop database bd_resenhapop;

create table users(
	id_user  	int auto_increment primary key,
    name 	  	varchar(64),
    surname		varchar(64),
	username  	varchar(64),
	email		varchar(64),
    password  	varchar(34),
    telephone 	varchar(11),
	typeUser	enum('admin', 'comum') default "comum"
);

select * from users;

create table movies(
	id_movie 		int auto_increment primary key,
	name_movie 		varchar(64),
	director		varchar(64),
	release_date	date,
	gender_movie	enum('ação', 'comédia', 'drama', 'terror', 'suspense', 'ficção_cientifica'),
	age_range		enum('livre', '10', '12', '14', '16', '18'),
	main_actor		varchar(64),
	synopsis		varchar(300),
    imagem VARCHAR(100)
);

insert into movies (name_movie, director, release_date, gender_movie, age_range, main_actor, synopsis) values ("teste", "teste", now(), "drama", "livre", "teste", "teste");

INSERT INTO movies (
  name_movie, director, release_date, gender_movie, age_range, main_actor, synopsis, imagem
) VALUES (
  'Batman', 'Christopher Nolan', '2008-07-18', 'ação', '12', 'Christian Bale',
  'Batman enfrenta o Coringa em Gotham City.',
  'batman.jpg'
);

select * from movies;

create table review(
	id_review 		int auto_increment primary key,
	review			varchar(600),
    review_user		int,
    review_movie 	int,

	constraint fk_user foreign key (review_user) references users(id_users),
	constraint fk_movie foreign key (review_movie) references movies(id_movie)
);