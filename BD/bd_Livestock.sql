CREATE DATABASE IF NOT EXISTS livestock_completo;
USE livestock_completo;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: livestock
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artificialinseminations`
--

DROP TABLE IF EXISTS `artificialinseminations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artificialinseminations` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único de la inseminación',
  `idBovine` int NOT NULL COMMENT 'Vaca a inseminar',
  `inseminationDate` date NOT NULL COMMENT 'Día del procedimiento',
  `semenID` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Código o lote de la pajilla',
  `donorBull` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Nombre o código del toro (opcional)',
  `semenDose` decimal(10,2) DEFAULT NULL COMMENT 'Cantidad en cc o pajillas (opcional)',
  `observations` text COLLATE utf8mb4_unicode_ci COMMENT 'Comentarios adicionales',
  `idResponsible` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Quién realizó la inseminación',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar inseminaciones artificiales de bovinos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `births`
--

DROP TABLE IF EXISTS `births`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `births` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del nacimiento',
  `motheridentification` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Identificación de la madre',
  `landidentification` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Identificación del potrero/terreno',
  `birthdate` datetime DEFAULT NULL COMMENT 'Fecha de nacimiento del bovino',
  `sex` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Sexo del bovino (Macho/Hembra)',
  `race` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Raza del bovino',
  `birthweight` float DEFAULT NULL COMMENT 'Peso al nacer del bovino',
  `conditionatbirth` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Condición al nacer (ej: normal, prematuro, débil)',
  `observations` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Observaciones adicionales sobre el nacimiento',
  `responsible` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Responsable del registro del nacimiento',
  `active` tinyint(1) DEFAULT '1' COMMENT 'Estado del registro (activo/inactivo)',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar nacimientos de bovinos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cattles`
--

DROP TABLE IF EXISTS `cattles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cattles` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del bovino',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nombre del bovino',
  `raze` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Raza del bovino',
  `entrydate` datetime NOT NULL COMMENT 'Fecha de ingreso del bovino',
  `paddock` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Potrero donde se encuentra el bovino',
  `birthdate` datetime NOT NULL COMMENT 'Fecha de nacimiento del bovino',
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'URL de la foto del bovino (opcional)',
  `currentweight` float NOT NULL COMMENT 'Peso actual del bovino',
  `classificationbytype` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Clasificación del bovino por tipo (ej: lechero, carne, doble propósito)',
  `state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Estado del bovino (ej: saludable, enfermo, en tratamiento)',
  `active` tinyint(1) DEFAULT '1' COMMENT 'Estado del bovino (activo/inactivo)',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar bovinos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food` (
  `id` int NOT NULL AUTO_INCREMENT,
  `food_name` varchar(255) NOT NULL,
  `food_type` varchar(255) NOT NULL,
  `unit_measure` varchar(50) NOT NULL,
  `stock_quantity` float NOT NULL,
  `cost_per_unit` float NOT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  `observations` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `food_name` (`food_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `milk`
--

DROP TABLE IF EXISTS `milk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `milk` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idBovine` int NOT NULL,
  `milkingDate` datetime NOT NULL,
  `shift` enum('Mañana','Tarde','Noche') NOT NULL,
  `litersQuantity` float NOT NULL,
  `milkQuality` varchar(45) NOT NULL,
  `observations` varchar(50) NOT NULL,
  `idResponsible` int NOT NULL,
  `active` tinyint DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mortalities`
--

DROP TABLE IF EXISTS `mortalities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mortalities` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del registro de mortalidad',
  `idBovine` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Identificación del bovino',
  `dateofdeath` datetime DEFAULT NULL COMMENT 'Fecha de muerte del bovino',
  `causeofdeath` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Causa de muerte del bovino',
  `responsible` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Responsable del registro de la muerte del bovino',
  `fateoftheanimal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Destino del animal después de la muerte (enterrado, incinerado, vendido para consumo)',
  `observations` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Observaciones adicionales sobre la muerte del bovino',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar mortalidad de bovinos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mounts`
--

DROP TABLE IF EXISTS `mounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idBovine` int NOT NULL,
  `bullId` int NOT NULL,
  `breedingDate` date NOT NULL,
  `serviceNumber` int NOT NULL,
  `bovineCondition` enum('Celo','Quieta','Rechaza') NOT NULL,
  `observations` text,
  `idResponsible` varchar(100) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nutrition`
--

DROP TABLE IF EXISTS `nutrition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nutrition` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del registro de nutrición',
  `idBovine` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Número de arete o identificador único del animal',
  `idFood` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Código del alimento del catálogo de alimentos',
  `food_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Tipo de alimento (pasto, concentrado, silo, forraje, etc)',
  `quantity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Cantidad en kg, litros según el tipo de alimento',
  `frequency` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Frecuencia de alimentación (mañana, tarde, noche)',
  `idResponsible` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nombre del responsable de la nutrición',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar nutrición de bovinos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pastures`
--

DROP TABLE IF EXISTS `pastures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pastures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `extension` float NOT NULL,
  `maxCapacity` float NOT NULL,
  `pastureType` varchar(45) NOT NULL,
  `currentStatus` varchar(45) NOT NULL,
  `restDays` int NOT NULL,
  `occupationDays` int NOT NULL,
  `active` tinyint DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `responsibles`
--

DROP TABLE IF EXISTS `responsibles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsibles` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del responsable',
  `fullName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nombre completo del responsable',
  `role` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Tipo/rol del responsable',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Correo electrónico del responsable',
  `phoneNumber` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Número de teléfono del responsable',
  `status` enum('Active','Inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Active' COMMENT 'Estado del responsable (Activo/Inactivo)',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar responsables del sistema';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `treatments`
--

DROP TABLE IF EXISTS `treatments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idBovine` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Bovino tratado',
  `treatment_date` datetime NOT NULL COMMENT 'Fecha del tratamiento',
  `medication_used` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Medicamento utilizado en el tratamiento',
  `applied_dose` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Dosis administrada',
  `application_route` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Vía de administración del medicamento (oral, intramuscular, intravenosa)',
  `associated_diagnosis` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Enfermedad o condición que se está tratando',
  `treatment_duration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Duración del tratamiento',
  `treatment_result` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Resultado del tratamiento',
  `observations` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Observaciones adicionales sobre el tratamiento',
  `idResponsible` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nombre del responsable del tratamiento aplicado',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar tratamientos de bovinos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `documentId` varchar(30) NOT NULL,
  `postJob` varchar(50) NOT NULL,
  `verifyEmail` tinyint DEFAULT '0',
  `active` tinyint DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vacunations`
--

DROP TABLE IF EXISTS `vacunations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacunations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idBovine` varchar(255) NOT NULL,
  `vaccination_date` datetime NOT NULL,
  `applied_dose` varchar(255) NOT NULL,
  `application_site` varchar(255) NOT NULL,
  `application_condition` varchar(255) NOT NULL,
  `idResponsible` varchar(255) NOT NULL,
  `observations` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `weighings`
--

DROP TABLE IF EXISTS `weighings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weighings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idBovine` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Identificación del bovino',
  `weighingdate` datetime NOT NULL COMMENT 'Fecha del pesaje del bovino',
  `currentweight` float NOT NULL COMMENT 'Peso actual del bovino',
  `profitorloss` float NOT NULL COMMENT 'Ganancia o pérdida de peso del bovino desde el último pesaje',
  `bodycondition` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Condición corporal del bovino (delgado, normal, gordo)',
  `observations` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Observaciones adicionales sobre el pesaje del bovino',
  `idResponsible` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar pesajes de bovinos';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-06  9:14:07
