CREATE DATABASE  IF NOT EXISTS `livestock` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `livestock`;
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
-- Table structure for table `app_routes`
--

DROP TABLE IF EXISTS `app_routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_routes` (
  `id_app_routes` int NOT NULL AUTO_INCREMENT,
  `name_route` varchar(45) DEFAULT NULL,
  `route` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `icon` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_app_routes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_routes`
--

LOCK TABLES `app_routes` WRITE;
/*!40000 ALTER TABLE `app_routes` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_routes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_routes_roll`
--

DROP TABLE IF EXISTS `app_routes_roll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_routes_roll` (
  `id_app_routes_roll` int NOT NULL AUTO_INCREMENT,
  `id_app_routes` int DEFAULT NULL,
  `id_roll` int DEFAULT NULL,
  PRIMARY KEY (`id_app_routes_roll`),
  KEY `id_roll_idx` (`id_app_routes`),
  KEY `fk_app_routes_roll_roll` (`id_roll`),
  CONSTRAINT `fk_app_routes_roll_app_routes` FOREIGN KEY (`id_app_routes`) REFERENCES `app_routes` (`id_app_routes`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_app_routes_roll_roll` FOREIGN KEY (`id_roll`) REFERENCES `roll` (`id_roll`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_routes_roll`
--

LOCK TABLES `app_routes_roll` WRITE;
/*!40000 ALTER TABLE `app_routes_roll` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_routes_roll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artificialinseminations`
--

DROP TABLE IF EXISTS `artificialinseminations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artificialinseminations` (
  `id_artifInse` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único de la inseminación',
  `id_Bovine` int NOT NULL COMMENT 'Vaca a inseminar',
  `inseminationDate` date NOT NULL COMMENT 'Día del procedimiento',
  `semenID` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Código o lote de la pajilla',
  `id_race` int NOT NULL COMMENT 'Cantidad en cc o pajillas (opcional)',
  `observations` text COLLATE utf8mb4_unicode_ci COMMENT 'Comentarios adicionales',
  `idResponsible` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Quién realizó la inseminación',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id_artifInse`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar inseminaciones artificiales de bovinos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artificialinseminations`
--

LOCK TABLES `artificialinseminations` WRITE;
/*!40000 ALTER TABLE `artificialinseminations` DISABLE KEYS */;
INSERT INTO `artificialinseminations` VALUES (1,2,'2026-10-15','32333',6,'6768790','10','2026-10-15 16:31:58','2026-10-15 16:31:58'),(2,3,'2026-10-15','002',4,'fghjkghnl.','1','2026-10-15 16:40:51','2026-10-15 16:40:51'),(3,2,'2026-10-15','008854',4,'djhbysfsfkjbye','2','2026-10-15 19:32:52','2026-10-15 19:32:52');
/*!40000 ALTER TABLE `artificialinseminations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `births`
--

DROP TABLE IF EXISTS `births`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `births` (
  `id_birth` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del nacimiento',
  `id_Bovine` int DEFAULT NULL COMMENT 'Identificación de la madre',
  `id_pasture` int DEFAULT NULL COMMENT 'Identificación del potrero/terreno',
  `birthdate` datetime DEFAULT NULL COMMENT 'Fecha de nacimiento del bovino',
  `sex` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Sexo del bovino (Macho/Hembra)',
  `id_race` int DEFAULT NULL COMMENT 'Raza del bovino',
  `birthweight` float DEFAULT NULL COMMENT 'Peso al nacer del bovino',
  `conditionatbirth` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Condición al nacer (ej: normal, prematuro, débil)',
  `observations` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Observaciones adicionales sobre el nacimiento',
  `idResponsible` int DEFAULT NULL COMMENT 'Responsable del registro del nacimiento',
  `active` tinyint(1) DEFAULT '1' COMMENT 'Estado del registro (activo/inactivo)',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id_birth`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar nacimientos de bovinos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `births`
--

LOCK TABLES `births` WRITE;
/*!40000 ALTER TABLE `births` DISABLE KEYS */;
INSERT INTO `births` VALUES (1,2,4,'2026-10-14 00:00:00','Macho',2,70,NULL,'YES',10,1,'2026-10-14 13:17:40','2026-10-14 13:17:40'),(2,2,2,'2026-10-14 00:00:00','Macho',1,46,NULL,'esta bueno ',3,1,'2026-10-14 13:20:29','2026-10-14 13:20:29'),(3,2,3,'2026-10-15 00:00:00','Hembra',2,400,NULL,'no nada',1,1,'2026-10-15 12:44:42','2026-10-15 12:44:42'),(4,6,1,'2026-10-15 00:00:00','Macho',1,100,NULL,'nacio hijo de lola',3,1,'2026-10-15 19:24:44','2026-10-15 19:24:44');
/*!40000 ALTER TABLE `births` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cattles`
--

DROP TABLE IF EXISTS `cattles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cattles` (
  `id_Bovine` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del bovino',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nombre del bovino',
  `id_race` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Raza del bovino',
  `sex` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entrydate` datetime NOT NULL COMMENT 'Fecha de ingreso del bovino',
  `id_pasture` int NOT NULL COMMENT 'Potrero donde se encuentra el bovino',
  `birthdate` datetime NOT NULL COMMENT 'Fecha de nacimiento del bovino',
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'URL de la foto del bovino (opcional)',
  `currentweight` float NOT NULL COMMENT 'Peso actual del bovino',
  `classificationbytype` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Clasificación del bovino por tipo (ej: lechero, carne, doble propósito)',
  `active` tinyint(1) DEFAULT '1' COMMENT 'Estado del bovino (activo/inactivo)',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id_Bovine`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar bovinos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cattles`
--

LOCK TABLES `cattles` WRITE;
/*!40000 ALTER TABLE `cattles` DISABLE KEYS */;
INSERT INTO `cattles` VALUES (1,'Taurus','1','Macho','2026-10-14 00:00:00',4,'2026-10-14 00:00:00',NULL,700,'Carne',1,'2026-10-14 12:10:34','2026-10-14 12:10:34'),(2,'Juanita','2','Hembra','2026-10-14 00:00:00',3,'2026-10-14 00:00:00',NULL,500,'Lechero',1,'2026-10-14 12:24:07','2026-10-14 12:24:07'),(3,'Tomasa','4','Hembra','2026-10-15 00:00:00',1,'2025-10-15 00:00:00',NULL,800,'Lechero',1,'2026-10-15 12:27:11','2026-10-15 12:27:11'),(4,'Roberta','3','Hembra','2026-10-01 00:00:00',3,'2025-02-15 00:00:00',NULL,500,'Lechero',1,'2026-10-15 13:13:08','2026-10-15 13:13:08'),(5,'paquita','3','Hembra','2026-10-14 00:00:00',2,'2026-10-14 00:00:00',NULL,400,'Lechero',0,'2026-10-15 17:59:15','2026-10-15 17:59:15'),(6,'lola','6','Hembra','2026-10-15 00:00:00',1,'2025-02-15 00:00:00',NULL,600,'Lechero',1,'2026-10-15 19:19:05','2026-10-15 19:19:05');
/*!40000 ALTER TABLE `cattles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food` (
  `id_food` int NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`id_food`),
  UNIQUE KEY `food_name` (`food_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (1,'Pasto Elefante','Pasto','kg',5000,150,'Proveedor A','Excelente para engorde',1,'2026-08-05 13:33:54','2026-08-05 13:33:54'),(2,'Pasto verde','Forraje','Unidad',40,3500,'don alex','',1,'2026-09-25 03:07:39','2026-09-25 03:07:39'),(3,'concentrado','Concentrado','Bulto',30,85000,'don juan',NULL,1,'2026-10-15 19:28:38','2026-10-15 19:28:38');
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `milk`
--

DROP TABLE IF EXISTS `milk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `milk` (
  `id_milk` int NOT NULL AUTO_INCREMENT,
  `id_Bovine` int NOT NULL,
  `milkingDate` datetime NOT NULL,
  `shift` enum('Mañana','Tarde','Noche') NOT NULL,
  `litersQuantity` float NOT NULL,
  `milkQuality` varchar(45) NOT NULL,
  `observations` varchar(50) NOT NULL,
  `idResponsible` int NOT NULL,
  `active` tinyint DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id_milk`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milk`
--

LOCK TABLES `milk` WRITE;
/*!40000 ALTER TABLE `milk` DISABLE KEYS */;
INSERT INTO `milk` VALUES (1,3,'2026-10-15 00:00:00','Mañana',16,'Excelente','alña',2,1,'2026-10-15 17:45:56','2026-10-15 17:45:56'),(2,3,'2026-10-15 00:00:00','Mañana',500,'Buena','estuvo mansita',10,1,'2026-10-15 19:34:59','2026-10-15 19:34:59');
/*!40000 ALTER TABLE `milk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mortalities`
--

DROP TABLE IF EXISTS `mortalities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mortalities` (
  `id_mortality` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del registro de mortalidad',
  `id_Bovine` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Identificación del bovino',
  `dateofdeath` datetime DEFAULT NULL COMMENT 'Fecha de muerte del bovino',
  `idResponsible` int DEFAULT NULL COMMENT 'Responsable del registro de la muerte del bovino',
  `fateoftheanimal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Destino del animal después de la muerte (enterrado, incinerado, vendido para consumo)',
  `observations` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Observaciones adicionales sobre la muerte del bovino',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id_mortality`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar mortalidad de bovinos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mortalities`
--

LOCK TABLES `mortalities` WRITE;
/*!40000 ALTER TABLE `mortalities` DISABLE KEYS */;
INSERT INTO `mortalities` VALUES (2,'1','2026-10-14 00:00:00',4,'Enterrado','Se echo vick vaporub','2026-10-14 14:02:41','2026-10-14 14:02:41'),(3,'6','2026-10-15 00:00:00',3,'Vendido para consumo','murio cuando tuvo el ternero','2026-10-15 19:25:30','2026-10-15 19:25:30');
/*!40000 ALTER TABLE `mortalities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mounts`
--

DROP TABLE IF EXISTS `mounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mounts` (
  `id_mount` int NOT NULL AUTO_INCREMENT,
  `id_cow` int NOT NULL,
  `id_bull` int NOT NULL,
  `breedingDate` date NOT NULL,
  `serviceNumber` int NOT NULL,
  `observations` text,
  `idResponsible` int NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_mount`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mounts`
--

LOCK TABLES `mounts` WRITE;
/*!40000 ALTER TABLE `mounts` DISABLE KEYS */;
INSERT INTO `mounts` VALUES (1,2,1,'2026-10-15',2,'zWzfd',2,'2026-10-15 17:30:47','2026-10-15 17:30:47'),(2,4,1,'2026-10-15',3,'nfhgurhtirfug',8,'2026-10-15 19:33:37','2026-10-15 19:33:37');
/*!40000 ALTER TABLE `mounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nutrition`
--

DROP TABLE IF EXISTS `nutrition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nutrition` (
  `id_nutrition` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del registro de nutrición',
  `id_Bovine` int NOT NULL COMMENT 'Número de arete o identificador único del animal',
  `id_food` int NOT NULL COMMENT 'Código del alimento del catálogo de alimentos',
  `quantity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Cantidad en kg, litros según el tipo de alimento',
  `frequency` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Frecuencia de alimentación (mañana, tarde, noche)',
  `idResponsible` int NOT NULL COMMENT 'Nombre del responsable de la nutrición',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id_nutrition`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar nutrición de bovinos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nutrition`
--

LOCK TABLES `nutrition` WRITE;
/*!40000 ALTER TABLE `nutrition` DISABLE KEYS */;
INSERT INTO `nutrition` VALUES (1,1,1,'1','Mañana',1,'2026-10-14 23:34:17','2026-10-14 23:34:17'),(2,4,1,'7','Mañana y Tarde',2,'2026-10-15 19:27:35','2026-10-15 19:27:35');
/*!40000 ALTER TABLE `nutrition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pastures`
--

DROP TABLE IF EXISTS `pastures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pastures` (
  `id_pasture` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `extension` decimal(10,2) NOT NULL,
  `forageCapacity` int NOT NULL COMMENT 'Aforo: Capacidad máxima de animales',
  `pastureType` varchar(255) NOT NULL,
  `cattleEntryDate` datetime DEFAULT NULL COMMENT 'Fecha de ingreso del ganado',
  `cattleExitDate` datetime DEFAULT NULL COMMENT 'Fecha de salida del ganado',
  `currentStatus` varchar(255) NOT NULL,
  `lastChemicalApplication` varchar(255) DEFAULT NULL COMMENT 'Nombre del último fertilizante, herbicida o químico aplicado',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_pasture`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pastures`
--

LOCK TABLES `pastures` WRITE;
/*!40000 ALTER TABLE `pastures` DISABLE KEYS */;
INSERT INTO `pastures` VALUES (1,'Potrero Norte',12.50,25,'Brachiaria','2026-08-10 08:00:00',NULL,'Ocupado','Glifosato','2026-08-21 12:27:34','2026-08-21 12:27:34'),(2,'Potrero Sur',8.75,15,'Kikuyo',NULL,'2026-08-05 17:00:00','En descanso','Fertilizante NPK','2026-08-21 12:27:34','2026-08-21 12:27:34'),(3,'Potrero Este',20.00,40,'Pasto Elefante','2026-08-15 07:30:00',NULL,'Disponible',NULL,'2026-08-21 12:27:34','2026-08-21 12:27:34'),(4,'El eden',5.00,20,'leguminosa','2026-09-03 00:00:00','2026-09-24 00:00:00','activa','Acetogan','2026-09-25 02:45:31','2026-09-25 02:45:31'),(5,'el majao',4.00,20,'hierba','2026-10-15 00:00:00','2026-10-15 00:00:00','activa','glisofato','2026-10-15 19:36:20','2026-10-15 19:36:20');
/*!40000 ALTER TABLE `pastures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `races`
--

DROP TABLE IF EXISTS `races`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `races` (
  `id_race` int NOT NULL AUTO_INCREMENT,
  `name_race` varchar(255) NOT NULL,
  `active` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_race`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `races`
--

LOCK TABLES `races` WRITE;
/*!40000 ALTER TABLE `races` DISABLE KEYS */;
INSERT INTO `races` VALUES (1,'Holstein','Active','2026-10-07 13:51:05','2026-10-07 13:51:05'),(2,'GYR','Active','2026-10-07 13:51:23','2026-10-07 13:51:23'),(3,'Angus','Active','2026-10-07 13:51:45','2026-10-07 13:51:45'),(4,'Girolando','Active','2026-10-07 19:20:46','2026-10-07 19:20:46'),(5,'Bramah','Active','2026-10-14 14:14:35','2026-10-14 14:14:35'),(6,'Cebu','Active','2026-10-15 16:30:50','2026-10-15 16:30:50'),(7,'jersey','Active','2026-10-15 19:27:03','2026-10-15 19:27:03');
/*!40000 ALTER TABLE `races` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsibles`
--

DROP TABLE IF EXISTS `responsibles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsibles` (
  `idResponsible` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del responsable',
  `fullName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nombre completo del responsable',
  `role` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Tipo/rol del responsable',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Correo electrónico del responsable',
  `phoneNumber` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Número de teléfono del responsable',
  `status` enum('Active','Inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Active' COMMENT 'Estado del responsable (Activo/Inactivo)',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`idResponsible`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar responsables del sistema';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsibles`
--

LOCK TABLES `responsibles` WRITE;
/*!40000 ALTER TABLE `responsibles` DISABLE KEYS */;
INSERT INTO `responsibles` VALUES (1,'Dr. Juan Pérez','Veterinario','juan.perez@livestock.com','3001234567','Active','2026-08-05 07:12:18','2026-08-05 07:12:18'),(2,'Dra. María Gómez','Veterinaria','maria.gomez@livestock.com','3007654321','Active','2026-08-05 07:12:18','2026-08-05 07:12:18'),(3,'Carlos Rodríguez','Operario','carlos.rodriguez@livestock.com','3109876543','Active','2026-08-05 07:12:18','2026-08-05 07:12:18'),(4,'Ana Martínez','Administrador','ana.martinez@livestock.com','3204567890','Active','2026-08-05 07:12:18','2026-08-05 07:12:18'),(5,'Luis Fernández','Veterinario','luis.fernandez@livestock.com','3009876543','Inactive','2026-08-05 07:12:18','2026-08-05 07:12:18'),(8,'Dr. Juan Pérez','Veterinario','juanpablo@livestock.com','3001234567','Active','2026-08-05 12:14:19','2026-08-05 12:14:19'),(10,'Euclides','Asistente','euclides@gmail.com','34567890','Active','2026-09-25 04:06:13','2026-09-25 04:06:13'),(11,'andres','Asistente','andresdylan@gmail.com','12345678','Active','2026-10-15 19:39:39','2026-10-15 19:39:39');
/*!40000 ALTER TABLE `responsibles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roll`
--

DROP TABLE IF EXISTS `roll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roll` (
  `id_roll` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(45) DEFAULT NULL,
  `name_roll` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_roll`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roll`
--

LOCK TABLES `roll` WRITE;
/*!40000 ALTER TABLE `roll` DISABLE KEYS */;
/*!40000 ALTER TABLE `roll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route_app_permisos`
--

DROP TABLE IF EXISTS `route_app_permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route_app_permisos` (
  `idroute_app_permisos` int NOT NULL,
  `idapproute` int NOT NULL,
  `idroll` int NOT NULL,
  `c` tinyint NOT NULL DEFAULT '0',
  `r` tinyint NOT NULL DEFAULT '0',
  `u` tinyint NOT NULL DEFAULT '0',
  `d` tinyint NOT NULL DEFAULT '0',
  `i` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`idroute_app_permisos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route_app_permisos`
--

LOCK TABLES `route_app_permisos` WRITE;
/*!40000 ALTER TABLE `route_app_permisos` DISABLE KEYS */;
/*!40000 ALTER TABLE `route_app_permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token-resetpassword`
--

DROP TABLE IF EXISTS `token-resetpassword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token-resetpassword` (
  `idtoken-resetPassword` int NOT NULL,
  `userId` int DEFAULT NULL,
  `token` varchar(45) DEFAULT NULL,
  `host` varchar(45) DEFAULT NULL,
  `usado` tinyint DEFAULT '0',
  PRIMARY KEY (`idtoken-resetPassword`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token-resetpassword`
--

LOCK TABLES `token-resetpassword` WRITE;
/*!40000 ALTER TABLE `token-resetpassword` DISABLE KEYS */;
/*!40000 ALTER TABLE `token-resetpassword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatments`
--

DROP TABLE IF EXISTS `treatments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatments` (
  `id_treatment` int NOT NULL AUTO_INCREMENT,
  `id_Bovine` int NOT NULL COMMENT 'Bovino tratado',
  `treatment_date` datetime NOT NULL COMMENT 'Fecha del tratamiento',
  `medication_used` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Medicamento utilizado en el tratamiento',
  `applied_dose` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Dosis administrada',
  `application_route` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Vía de administración del medicamento (oral, intramuscular, intravenosa)',
  `associated_diagnosis` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Enfermedad o condición que se está tratando',
  `treatment_duration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Duración del tratamiento',
  `observations` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Observaciones adicionales sobre el tratamiento',
  `idResponsible` int NOT NULL COMMENT 'Nombre del responsable del tratamiento aplicado',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id_treatment`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar tratamientos de bovinos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatments`
--

LOCK TABLES `treatments` WRITE;
/*!40000 ALTER TABLE `treatments` DISABLE KEYS */;
INSERT INTO `treatments` VALUES (1,1,'2026-10-15 00:00:00','acetogan','5','Intramuscular','paracitos','7','estaba malito',3,'2026-10-15 16:16:04','2026-10-15 16:16:04'),(2,2,'2026-10-15 00:00:00','acetogan','5','Tópica','saragoza','3','gusanos',8,'2026-10-15 16:18:35','2026-10-15 16:18:35'),(3,3,'2026-10-15 00:00:00','acetogan','7','Intramuscular','paracitos','5','tiene paracitos',4,'2026-10-15 19:32:01','2026-10-15 19:32:01');
/*!40000 ALTER TABLE `treatments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `uuid` varchar(45) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `salt` varchar(50) DEFAULT NULL,
  `documentId` varchar(30) NOT NULL,
  `postJob` varchar(50) NOT NULL,
  `id_roll` int DEFAULT NULL,
  `verifyEmail` tinyint DEFAULT '0',
  `active` tinyint DEFAULT '0',
  `solNewPassword` tinyint DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `fk_id_roll_idx` (`id_roll`),
  CONSTRAINT `fk_users_roll` FOREIGN KEY (`id_roll`) REFERENCES `roll` (`id_roll`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'sebastian','acef07d2-f9e8-459d-82c9-571e339742e2','sebastiancalderon5204@gmail.com','$2b$10$CITODoZ5SeIRDe.mkfQIBObxvBC/8NnQibghpz/pS3OzBHi.RMPue','$2b$10$CITODoZ5SeIRDe.mkfQIBO','123456789','Administrador',NULL,0,1,0,'2026-09-25 16:18:18','2026-09-25 16:18:18'),(2,'Arnold','3a8891d7-ba16-450d-b10a-d23f8311141e','arnoldandresvasquez@gmail.com','$2b$10$Uqd.GEGj5WLK8JEkjCW9ZOnQHLMSklSCXKYADTTW0fTYgjx0Jr4Ga','$2b$10$Uqd.GEGj5WLK8JEkjCW9ZO','12345678','operario',NULL,0,1,0,'2026-09-25 19:26:00','2026-09-25 19:26:00'),(3,'Stefany','0d1b4b3a-4cbf-4116-b4d7-5fc730674d2d','vasquezstefany182@gmail.com','$2b$10$R2IOIAOk/QaeNLuzSbwuEexn.NtNPqwMzXMfV46D5lu1MlqCjdu.6','$2b$10$R2IOIAOk/QaeNLuzSbwuEe','2134567890\'','administrador',NULL,0,1,0,'2026-10-05 12:07:33','2026-10-05 12:07:33'),(6,'Dylan','207c525e-e950-4e2d-be66-c21ac98d725c','dylan@gmail.com','$2b$10$aFo.B0SqjtTuhtwaq8PzUO4KbbiccUwARipC9MQHX0Oxxc45IzFPi','$2b$10$aFo.B0SqjtTuhtwaq8PzUO','1234568','asistente',NULL,0,1,0,'2026-10-05 12:19:07','2026-10-05 12:19:07'),(7,'tatiana','5c6625d1-d9b9-4e4c-a83c-88fc69dcf891','caperatatiana822@gmail.com','$2b$10$MY8vrF0sylmu.CLMm3KBhuJRs2EHw3U9PaBq65gUyEKhVN0WNKBzS','$2b$10$MY8vrF0sylmu.CLMm3KBhu','9876543','asistente',NULL,0,1,0,'2026-10-15 19:38:04','2026-10-15 19:38:04');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacunations`
--

DROP TABLE IF EXISTS `vacunations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacunations` (
  `id_vacunation` int NOT NULL AUTO_INCREMENT,
  `id_Bovine` int NOT NULL,
  `vaccination_date` datetime NOT NULL,
  `applied_dose` varchar(255) NOT NULL,
  `vaccine_lot` varchar(255) NOT NULL,
  `medicine_name` varchar(255) NOT NULL,
  `idResponsible` int NOT NULL,
  `observations` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_vacunation`),
  UNIQUE KEY `idBovine` (`id_Bovine`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacunations`
--

LOCK TABLES `vacunations` WRITE;
/*!40000 ALTER TABLE `vacunations` DISABLE KEYS */;
INSERT INTO `vacunations` VALUES (1,1,'2026-10-14 00:00:00','5','5555','penicilina',2,'nada','2026-10-15 12:59:22','2026-10-15 12:59:22'),(2,4,'2026-10-15 00:00:00','7','GTR71390','Ciperbetrina',4,'Se porto bien','2026-10-15 16:02:23','2026-10-15 16:02:23'),(4,3,'2026-10-15 00:00:00','5','btfyb245','glifosato',1,'para fumigarla','2026-10-15 19:31:05','2026-10-15 19:31:05');
/*!40000 ALTER TABLE `vacunations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weighings`
--

DROP TABLE IF EXISTS `weighings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weighings` (
  `id_weighing` int NOT NULL AUTO_INCREMENT,
  `id_Bovine` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Identificación del bovino',
  `weighingdate` datetime NOT NULL COMMENT 'Fecha del pesaje del bovino',
  `currentweight` float NOT NULL COMMENT 'Peso actual del bovino',
  `profitorloss` float NOT NULL COMMENT 'Ganancia o pérdida de peso del bovino desde el último pesaje',
  `bodycondition` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Condición corporal del bovino (delgado, normal, gordo)',
  `observations` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Observaciones adicionales sobre el pesaje del bovino',
  `idResponsible` int DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id_weighing`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar pesajes de bovinos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weighings`
--

LOCK TABLES `weighings` WRITE;
/*!40000 ALTER TABLE `weighings` DISABLE KEYS */;
INSERT INTO `weighings` VALUES (1,'1','2026-10-13 00:00:00',700,50,'Normal','Esta bien',4,'2026-10-13 17:22:51','2026-10-13 17:22:51'),(2,'2','2026-10-13 00:00:00',300,-5,'Delgado','dfghjklñ',10,'2026-10-13 19:46:39','2026-10-13 19:46:39'),(3,'1','2026-10-15 00:00:00',800,100,'Normal','No ha desayunado',1,'2026-10-15 12:33:47','2026-10-15 12:33:47'),(4,'2','2026-10-15 00:00:00',600,100,'Normal','bueno',10,'2026-10-15 19:22:06','2026-10-15 19:22:06'),(5,'4','2026-10-15 00:00:00',300,100,'Normal','gordito',10,'2026-10-15 19:22:47','2026-10-15 19:22:47'),(6,'6','2026-10-15 00:00:00',600,100,'Delgado','esta flacucho',8,'2026-10-15 19:23:37','2026-10-15 19:23:37');
/*!40000 ALTER TABLE `weighings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-15 15:15:25
