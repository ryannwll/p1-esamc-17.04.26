create database if not exists mydb;
use mydb;

create table usuarios (
    id int auto_increment primary key,
    nome varchar(100) not null,
    email varchar(150) not null unique,
    senha varchar(255) not null,
    criado_em timestamp default current_timestamp,
);

create table eventos (
    id auto_increment primary key,
    organizador_id int not null,
    titulo varchar(150) not null,
    descricao data_evento date not null,
    codigo varchar(20) not null unique,
    criado_em timestamp default current_timestamp,
    foreign key (organizador_id)
    references usuarios(id)
)

