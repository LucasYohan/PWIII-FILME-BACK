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

INSERT INTO users (name, surname, username, email, password, telephone, typeUser)
VALUES (
  'Yohan',
  'Marinho',
  'Yohan',
  'yohan@example.com',
  '123',
  '11999999999',
  'admin'
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

INSERT INTO movies (name_movie, director, release_date, gender_movie, age_range, main_actor, synopsis, imagem)
VALUES 
('Missão Final', 'Carlos Mendes', '2023-07-14', 'ação', '14', 'João Silva', 'Um agente aposentado é chamado para sua última missão para salvar o mundo de uma ameaça global.', 'missao_final.jpg');

INSERT INTO movies (name_movie, director, release_date, gender_movie, age_range, main_actor, synopsis, imagem)
VALUES 
('Inception', 'Christopher Nolan', '2010-07-16', 'ficção_cientifica', '14', 'Leonardo DiCaprio', 'Um ladrão especializado em extrair segredos dos sonhos recebe a missão de implantar uma ideia na mente de um alvo.', 'inception.jpg');

INSERT INTO movies (name_movie, director, release_date, gender_movie, age_range, main_actor, synopsis, imagem)
VALUES 
('The Godfather', 'Francis Ford Coppola', '1972-03-24', 'drama', '18', 'Marlon Brando', 'A saga da família mafiosa Corleone enquanto lida com poder, lealdade e violência no submundo do crime.', 'the_godfather.jpg');

INSERT INTO movies (name_movie, director, release_date, gender_movie, age_range, main_actor, synopsis, imagem)
VALUES 
('Titanic', 'James Cameron', '1997-12-19', 'drama', '12', 'Leonardo DiCaprio', 'Um romance proibido floresce entre duas pessoas de mundos diferentes a bordo do fatídico RMS Titanic.', 'titanic.jpg');

INSERT INTO movies (name_movie, director, release_date, gender_movie, age_range, main_actor, synopsis, imagem)
VALUES 
('Avengers: Endgame', 'Anthony Russo', '2019-04-26', 'ação', '12', 'Robert Downey Jr.', 'Após o estalar de dedos de Thanos, os Vingadores restantes se unem para reverter a destruição e restaurar o universo.', 'avengers_endgame.jpg');

INSERT INTO movies (name_movie, director, release_date, gender_movie, age_range, main_actor, synopsis, imagem)
VALUES 
('Parasite', 'Bong Joon-ho', '2019-05-30', 'suspense', '16', 'Song Kang-ho', 'Uma família pobre se infiltra na vida de uma família rica, desencadeando uma série de eventos inesperados e trágicos.', 'parasite.jpg');

drop table movies;

select * from movies;

INSERT INTO movies (
  name_movie, director, release_date, gender_movie, age_range, main_actor, synopsis, imagem
) VALUES (
  'incrivel mundo', 'robert', '2008-07-18', 'ação', '12', 'Christian Bale',
  'Batman enfrenta o Coringa em Gotham City.',
  'batman.jpg'
);

select * from movies;

create table review(
	id_review 		int auto_increment primary key,
	review			varchar(600),
    review_user		int,
    review_movie 	int,
    deletado 		boolean default true,

	constraint fk_user foreign key (review_user) references users(id_user),
	constraint fk_movie foreign key (review_movie) references movies(id_movie)
);

drop table review;