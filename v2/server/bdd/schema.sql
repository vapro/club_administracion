CREATE DATABASE bdestudiantes;

USE  bdestudiantes;

/*			TABLAS DE USO GENERAL			*/
/*	tb_direcciones
	Una entidad (persona, club, etc) puede tener mas de una dirección. Por ejemplo un socio puede tener una dirección residencial 
	y una laboral. El campo USO es el que dará el detalle. 

    DESA OK
*/
CREATE TABLE tb_direcciones(
	id_direcciones INT unsigned  NOT NULL AUTO_INCREMENT,
	calle VARCHAR(40) COLLATE utf8_unicode_ci NOT NULL,
	numero VARCHAR(6) COLLATE utf8_unicode_ci NOT NULL,
	piso VARCHAR(2) COLLATE utf8_unicode_ci ,
	departamento VARCHAR(4) COLLATE utf8_unicode_ci ,
	manzana VARCHAR(2) COLLATE utf8_unicode_ci ,
	barrio VARCHAR(30) COLLATE utf8_unicode_ci ,
	localidad VARCHAR(30) COLLATE utf8_unicode_ci  NOT NULL,
	provincia VARCHAR(20) COLLATE utf8_unicode_ci ,
	codigo_postal VARCHAR(10) COLLATE utf8_unicode_ci ,
	uso VARCHAR(30) COLLATE utf8_unicode_ci,
    PRIMARY KEY (id_direcciones)
);
/*	tb_agrupador_telefonos
	Cada persona (id_datos_personales_fk) puede tener mas de un telefono
    DESA OK*/
CREATE TABLE tb_agrupador_telefonos(
	id_agrupador INT  unsigned  NOT NULL AUTO_INCREMENT,
    id_datos_personales_fk INT NOT NULL,
	domicilio VARCHAR(30) COLLATE utf8_unicode_ci,
	celular  VARCHAR(30) COLLATE utf8_unicode_ci,
    PRIMARY KEY (id_agrupador)
);

/*	tb_datos_personales
	Es es el agrupamiento de los datos personales indiferentemente si quienes lo usan son socios, profesorores, empleados, etc.

    DESA OK
*/
CREATE TABLE tb_datos_personales(
	id_datos_personales INT unsigned  NOT NULL AUTO_INCREMENT,
	dni INT unsigned NOT NULL,
	fecha_nacimiento DATE NOT NULL,
	apellido VARCHAR(40)  COLLATE utf8_unicode_ci NOT NULL,
	nombre  VARCHAR(40)   COLLATE utf8_unicode_ci NOT NULL,
	id_direccion_fk INT NOT NULL,
	direccion_mail VARCHAR(60) COLLATE utf8_unicode_ci, 
	path_foto VARCHAR(100)  COLLATE utf8_unicode_ci,
    PRIMARY KEY (id_datos_personales),   
    UNIQUE KEY users_email_unique (dni)
);
/*------NO IMPLEMENTADO----------*/
ALTER TABLE tb_datos_personales 
ADD CONSTRAINT id_direccion_fk
  FOREIGN KEY (id_direccion_fk)
  REFERENCES tb_direcciones (id_direcciones)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
/*		TABLAS ESPECIFICAS:	TARJETAS		*/

/*	tb_tarjetas
	Tabla maestra de tarjetas.
	Cada tarjeta tiene una identificación única que estará atada a cada socio, si vienen tarjetas nuevas este número reemplazará al que viene de fábrica
	Cada id_tarjeta 
	Habrá un historial de tarjetas asociadas a un socio.
*/
CREATE TABLE tb_tarjetas(
	id_tarjeta_fijo VARCHAR(11)	
);

/*	tb_tarjeta_fabrica
	Despliego por cada socio una cantidad N de tarjetas. 
	Solo una tarjeta perteneciente a un socio puede estar en ESTADO = TRUE (Habilitado) el resto debe estar en FALSE (Des-habilitado)
	La fecha de apertura se dará cuando se habilite la tarjeta, sin embargo, la fecha de cierre se dará cuando se otorgue una nueva tarjeta,
	por lo que puede haber una tarjeta en estado FALSE y no tener una fecha de cierre (Esto querrá decir que si o si habrá un estado pendiente 
	de entrega de tarjeta, en el caso de tener que reemplazarla)
*/
CREATE TABLE tb_tarjeta_fabrica(
	id_tarjeta_fabrica VARCHAR(11),
	id_tarjeta_fijo_fk VARCHAR(11),
	estado BOOLEAN,
	fecha_apertura DATE,
	fecha_cierre DATE
);

/*		TABLAS GENERALES: CATEGORIAS y ACTIVIDADES		*/

/* Desa OK*/
CREATE TABLE tb_categorias(
	id_categoria INT unsigned  NOT NULL AUTO_INCREMENT,
	descripcion_categoria VARCHAR(50)  COLLATE utf8_unicode_ci,
    precio_cuota_social DECIMAL(6,2),
    PRIMARY KEY (id_categoria)
);

/*	tb_actividades
	Las actividades son los deportes que se practican. Por una cuestión de practicidad agrego a la cuota social como una actividad mas.
    DESA OK
*/
CREATE TABLE tb_actividades(
	id_actividad  INT unsigned  NOT NULL AUTO_INCREMENT,
	descripcion_actividad VARCHAR(30) COLLATE utf8_unicode_ci,  
	precio DECIMAL(8,2),
    PRIMARY KEY (id_actividad)
);


/*	tb_agrupador_actividades
    DESA OK
*/
CREATE TABLE tb_agrupador_actividades(
	id_agrupador INT NOT NULL AUTO_INCREMENT,
	id_socio_fk INT,
	id_actividad_fk INT,
	estado BOOLEAN,
	fecha_inicio DATE,
	fecha_fin DATE
    PRIMARY KEY (id_agrupador)
);
/*
***********************
**FDV : FALTAN LAS FK**
***********************
*/
/*		TABLAS ESPECIFICAS: SOCIOS		*/

/*	tb_socios
<	Es la tabla maestra de socios. Contendrá todos los datos básicos de cada socio o ex socio de la institución
    DESA OK
*/
CREATE TABLE tb_socios(
    id_socio INT NOT NULL AUTO_INCREMENT,
	id_direcciones_fk INT,
	id_datos_personales_fk INT,
	id_tarjeta_fijo_fk INT,
	id_categoria_fk INT,
    id_actividad_socio_fk INT,
    PRIMARY KEY (id_socio)
);

/*
    DESA OK
*/
CREATE TABLE tb_actividad_socio(
	id_actividad_socio INT NOT NULL AUTO_INCREMENT,
	id_socio_fk INT NOT NULL,
	id_actividad_fk INT NOT NULL,
    PRIMARY KEY (id_actividad_socio)
);

/*  tb_empadronamiento
    Esta tabla permanecerá activa mientras se lleve a cabo el empadronamiento.
    FECHA_ORIGINAL muestra la fecha en que originalmente se se dio de alta el socio.
                   Si es NULL entonces es un socio nuevo.
    FECHA_EMPADRONAMIENTO es la fecha que fue a generar el trámite.
    MIGRADO lleva el valor FALSE hasta que se migra finalmente a la nueva arquitectura y pasa a ser TRUE

    DESA OK
*/
CREATE TABLE tb_empadronamiento(
    id_empadronamiento INT NOT NULL AUTO_INCREMENT,
    id_socio_fk INT NOT NULL,
    fecha_empadronamiento DATE NOT NULL,
    fecha_original DATE,
    migrado BOOLEAN, 
    PRIMARY KEY(id_empadronamiento) 
);