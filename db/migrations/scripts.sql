CREATE DATABASE emprendimiento;
\c emprendimiento;

CREATE TABLE tiendas(
    id SERIAL PRIMARY KEY,
    email VARCHAR (255) NOT NULL UNIQUE,
    nombre_tienda VARCHAR (255) NOT NULL,
    nombre_emprendedor VARCHAR(255),
    direccion VARCHAR(255),
    comuna VARCHAR(255),
    rut VARCHAR(255),
    password VARCHAR (20) NOT NULL,
    imagen VARCHAR (255)
);

CREATE TABLE productos(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR (255) NOT NULL,
    descripcion VARCHAR (255) NOT NULL,
    precio INT,
    tienda_id INT,
    FOREIGN KEY (tienda_id) REFERENCES tiendas (id)
);

CREATE TABLE ganadorProducto(
    id SERIAL PRIMARY KEY,
    productoid INT,
    ganador_id INT
);

CREATE TABLE ganadores(
    id SERIAL PRIMARY KEY,
    nombre_ganador VARCHAR (255),
    email_ganador VARCHAR (255),
    codigo VARCHAR (45)
);

