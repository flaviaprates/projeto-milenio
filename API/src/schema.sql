create database milenio_capital;

drop table if exists routes

create table routes(
    id serial primary key,
    data jsonb
);
