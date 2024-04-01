CREATE Schema IF NOT EXISTS dentistAppointments;

USE dentistAppointments;

CREATE TABLE `estudiantes` (
  `Matricula` varchar(7) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  PRIMARY KEY (`Matricula`),
  UNIQUE KEY `Matricula` (`Matricula`)
);

CREATE TABLE `pacientes` (
  `Cedula` varchar(13) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `Edad` date NOT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `Matricula_Estudiante` varchar(7) DEFAULT NULL,
  `EmergenciaMedica` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Cedula`),
  UNIQUE KEY `Cedula` (`Cedula`),
  KEY `Matricula_Estudiante` (`Matricula_Estudiante`),
  CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`Matricula_Estudiante`) REFERENCES `estudiantes` (`Matricula`)
);

CREATE TABLE `preguntas` (
  `ID_Pregunta` int NOT NULL AUTO_INCREMENT,
  `Pregunta` varchar(500),
  `ID_Procedimiento` int NOT NULL,
  PRIMARY KEY (`ID_Pregunta`),
  UNIQUE KEY `ID_Pregunta_UNIQUE` (`ID_Pregunta`),
  UNIQUE KEY `unique_procedure_question` (`ID_Procedimiento`, `Pregunta`),
  KEY `ID_Procedimiento` (`ID_Procedimiento`),
  CONSTRAINT `preguntas_ibfk_1` FOREIGN KEY (`ID_Procedimiento`) REFERENCES `procedimientos` (`ID_Procedimiento`)
);

CREATE TABLE `procedimientos` (
  `ID_Procedimiento` int NOT NULL AUTO_INCREMENT,
  `NombreProcedimiento` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_Procedimiento`),
  UNIQUE KEY `ID_Procedimiento_UNIQUE` (`ID_Procedimiento`)
);

CREATE TABLE `respuestas` (
  `ID_Pregunta` int DEFAULT NULL,
  `ID_Procedimiento` int DEFAULT NULL,
  `respuesta` varchar(100) DEFAULT NULL,
  UNIQUE KEY (`ID_Pregunta`),
  KEY `ID_Pregunta` (`ID_Pregunta`),
  KEY `ID_Procedimiento` (`ID_Procedimiento`),
  CONSTRAINT `respuestas_ibfk_1` FOREIGN KEY (`ID_Pregunta`) REFERENCES `preguntas` (`ID_Pregunta`),
  CONSTRAINT `respuestas_ibfk_2` FOREIGN KEY (`ID_Procedimiento`) REFERENCES `procedimientos` (`ID_Procedimiento`)
);


