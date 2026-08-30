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
-- Table structure for table `approute`
--

DROP TABLE IF EXISTS `approute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approute` (
  `idapproute` int NOT NULL AUTO_INCREMENT,
  `group` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `route` varchar(100) NOT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`idapproute`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approute`
--

LOCK TABLES `approute` WRITE;
/*!40000 ALTER TABLE `approute` DISABLE KEYS */;
/*!40000 ALTER TABLE `approute` ENABLE KEYS */;
UNLOCK TABLES;

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
  `raze` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Cantidad en cc o pajillas (opcional)',
  `observations` text COLLATE utf8mb4_unicode_ci COMMENT 'Comentarios adicionales',
  `idResponsible` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Quién realizó la inseminación',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar inseminaciones artificiales de bovinos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artificialinseminations`
--

LOCK TABLES `artificialinseminations` WRITE;
/*!40000 ALTER TABLE `artificialinseminations` DISABLE KEYS */;
INSERT INTO `artificialinseminations` VALUES (1,1,'2026-07-31','SEM-001','girolando','Primera inseminación, buena receptividad','Dr. Juan Pérez','2026-08-01 12:54:02','2026-08-21 12:57:38'),(2,2,'2026-07-30','SEM-002','girolando','Segunda inseminación, esperando resultados','Dra. María Gómez','2026-08-01 12:54:02','2026-08-21 12:57:38'),(3,77,'2026-08-01','SEM-001','girolando','Primera inseminación, buena receptividad','Dr. Juan Pérez','2026-08-01 12:54:02','2026-08-21 12:57:38');
/*!40000 ALTER TABLE `artificialinseminations` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `births`
--

LOCK TABLES `births` WRITE;
/*!40000 ALTER TABLE `births` DISABLE KEYS */;
INSERT INTO `births` VALUES (1,'VACA-001','Potrero Norte','2026-07-10 06:30:00','Hembra','Holstein',38.5,'Normal','Parto sin complicaciones, ternera saludable','Dr. Juan Pérez',1,'2026-08-05 07:57:04','2026-08-05 07:57:04'),(2,'VACA-002','Potrero Sur','2026-07-15 08:15:00','Macho','Brahman',42,'Normal','Parto exitoso, ternero fuerte','Dra. María Gómez',1,'2026-08-05 07:57:04','2026-08-05 07:57:04'),(3,'VACA-003','Potrero Este','2026-07-20 22:45:00','Hembra','Jersey',32,'Prematuro','Parto prematuro, ternera necesita cuidados especiales','Dr. Carlos Rodríguez',1,'2026-08-05 07:57:04','2026-08-05 07:57:04'),(4,'VACA-004','Potrero Oeste','2026-07-25 04:00:00','Macho','Angus',40.5,'Débil','Parto asistido, ternero débil pero estable','Dra. Ana Martínez',1,'2026-08-05 07:57:04','2026-08-05 07:57:04'),(5,'VACA-001','Potrero Norte','2026-07-10 11:30:00','Hembra','Holstein',38.5,'Normal','Parto sin complicaciones, ternera saludable','Dr. Juan Pérez',1,'2026-08-05 12:58:22','2026-08-05 12:58:22');
/*!40000 ALTER TABLE `births` ENABLE KEYS */;
UNLOCK TABLES;

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
  `sex` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entrydate` datetime NOT NULL COMMENT 'Fecha de ingreso del bovino',
  `paddock` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Potrero donde se encuentra el bovino',
  `birthdate` datetime NOT NULL COMMENT 'Fecha de nacimiento del bovino',
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'URL de la foto del bovino (opcional)',
  `currentweight` float NOT NULL COMMENT 'Peso actual del bovino',
  `classificationbytype` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Clasificación del bovino por tipo (ej: lechero, carne, doble propósito)',
  `active` tinyint(1) DEFAULT '1' COMMENT 'Estado del bovino (activo/inactivo)',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar bovinos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cattles`
--

LOCK TABLES `cattles` WRITE;
/*!40000 ALTER TABLE `cattles` DISABLE KEYS */;
INSERT INTO `cattles` VALUES (1,'Luna','Holstein','','2026-01-15 10:00:00','Potrero Norte','2024-03-20 08:00:00','luna.jpg',450.5,'Lechero',1,'2026-08-05 07:19:01','2026-08-05 07:19:01'),(2,'Toro Bravo','Brahman','','2026-01-20 14:30:00','Potrero Sur','2023-05-10 07:00:00','torobravo.jpg',650,'Carne',1,'2026-08-05 07:19:01','2026-08-05 07:19:01'),(3,'Manchita','Jersey','','2026-02-01 09:15:00','Potrero Este','2024-07-15 06:00:00','manchita.jpg',380,'Lechero',1,'2026-08-05 07:19:01','2026-08-05 07:19:01'),(4,'Negro','Angus','','2026-02-10 16:45:00','Potrero Oeste','2023-11-25 05:00:00','negro.jpg',580,'Carne',1,'2026-08-05 07:19:01','2026-08-05 07:19:01'),(5,'Chochinegra','GYR','','2026-01-15 15:00:00','Rozo','2024-03-20 13:00:00','chichinegra.jpg',450.5,'Lechero',1,'2026-08-05 12:20:35','2026-08-05 12:20:35');
/*!40000 ALTER TABLE `cattles` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (1,'Pasto Elefante','Pasto','kg',5000,150,'Proveedor A','Excelente para engorde',1,'2026-08-05 13:33:54','2026-08-05 13:33:54');
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `milk`
--

LOCK TABLES `milk` WRITE;
/*!40000 ALTER TABLE `milk` DISABLE KEYS */;
INSERT INTO `milk` VALUES (1,1,'2026-06-19 00:00:00','Mañana',15.5,'Excelente','Vaca en buen estado, sin novedades',1,1,'2026-06-20 00:05:42','2026-06-20 00:05:42'),(2,1,'2026-06-21 00:00:00','Mañana',5,'Excelente','Vaca en buen estado, sin novedades',1,1,'2026-06-22 00:57:55','2026-06-22 00:57:55'),(3,1,'2026-06-21 00:00:00','Mañana',5,' super Excelente','Vaca en buen estado, sin novedades',1,1,'2026-06-27 18:57:32','2026-06-27 18:57:32');
/*!40000 ALTER TABLE `milk` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `mortalities`
--

LOCK TABLES `mortalities` WRITE;
/*!40000 ALTER TABLE `mortalities` DISABLE KEYS */;
INSERT INTO `mortalities` VALUES (1,'BOV-001','2026-07-15 08:30:00','Enfermedad respiratoria','Dr. Juan Pérez','Enterrado','Animal enfermo desde hace 3 días, no respondió al tratamiento','2026-08-05 07:49:21','2026-08-05 07:49:21'),(2,'BOV-002','2026-07-20 14:00:00','Accidente','Dra. María Gómez','Incinerado','Cayó y se fracturó la pata, se tomó la decisión de sacrificio','2026-08-05 07:49:21','2026-08-05 07:49:21'),(3,'BOV-003','2026-07-25 10:15:00','Vejez','Carlos Rodríguez','Vendido para consumo','Animal de 12 años, muerte natural por edad avanzada','2026-08-05 07:49:21','2026-08-05 07:49:21'),(4,'BOV-004','2026-07-28 16:45:00','Parasitosis','Dr. Juan Pérez','Enterrado','Desparasitación tardía, no logró recuperarse','2026-08-05 07:49:21','2026-08-05 07:49:21'),(5,'BOV-001','2026-07-15 13:30:00','Enfermedad respiratoria','Dr. Juan Pérez','Enterrado','Animal enfermo desde hace 3 días, no respondió al tratamiento','2026-08-05 12:52:11','2026-08-05 12:52:11');
/*!40000 ALTER TABLE `mortalities` ENABLE KEYS */;
UNLOCK TABLES;

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
  `observations` text,
  `idResponsible` varchar(100) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mounts`
--

LOCK TABLES `mounts` WRITE;
/*!40000 ALTER TABLE `mounts` DISABLE KEYS */;
INSERT INTO `mounts` VALUES (1,1,2,'2026-08-01',1,'Primer servicio, buena receptividad','Dr. Juan Pérez','2026-08-05 12:07:20','2026-08-05 12:07:20');
/*!40000 ALTER TABLE `mounts` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `nutrition`
--

LOCK TABLES `nutrition` WRITE;
/*!40000 ALTER TABLE `nutrition` DISABLE KEYS */;
INSERT INTO `nutrition` VALUES (1,'BOV-001','FOOD-001','Pasto','15 kg','Mañana','Dr. Juan Pérez','2026-08-05 08:55:36','2026-08-05 08:55:36'),(2,'BOV-002','FOOD-002','Concentrado','5 kg','Tarde','Dra. María Gómez','2026-08-05 08:55:36','2026-08-05 08:55:36'),(3,'BOV-003','FOOD-003','Silo','10 kg','Noche','Dr. Carlos Rodríguez','2026-08-05 08:55:36','2026-08-05 08:55:36'),(4,'BOV-004','FOOD-001','Pasto','12 kg','Mañana','Dr. Juan Pérez','2026-08-05 08:55:36','2026-08-05 08:55:36'),(5,'BOV-005','FOOD-002','Concentrado','6 kg','Tarde','Dra. Ana Martínez','2026-08-05 08:55:36','2026-08-05 08:55:36'),(6,'BOV-67','FOOD-001','Pasto','15 kg','Mañana','Dr. Juan Pérez','2026-08-05 13:59:19','2026-08-05 13:59:19');
/*!40000 ALTER TABLE `nutrition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pastures`
--

DROP TABLE IF EXISTS `pastures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pastures` (
  `id` int NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pastures`
--

LOCK TABLES `pastures` WRITE;
/*!40000 ALTER TABLE `pastures` DISABLE KEYS */;
INSERT INTO `pastures` VALUES (1,'Potrero Norte',12.50,25,'Brachiaria','2026-08-10 08:00:00',NULL,'Ocupado','Glifosato','2026-08-21 12:27:34','2026-08-21 12:27:34'),(2,'Potrero Sur',8.75,15,'Kikuyo',NULL,'2026-08-05 17:00:00','En descanso','Fertilizante NPK','2026-08-21 12:27:34','2026-08-21 12:27:34'),(3,'Potrero Este',20.00,40,'Pasto Elefante','2026-08-15 07:30:00',NULL,'Disponible',NULL,'2026-08-21 12:27:34','2026-08-21 12:27:34');
/*!40000 ALTER TABLE `pastures` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar responsables del sistema';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsibles`
--

LOCK TABLES `responsibles` WRITE;
/*!40000 ALTER TABLE `responsibles` DISABLE KEYS */;
INSERT INTO `responsibles` VALUES (1,'Dr. Juan Pérez','Veterinario','juan.perez@livestock.com','3001234567','Active','2026-08-05 07:12:18','2026-08-05 07:12:18'),(2,'Dra. María Gómez','Veterinaria','maria.gomez@livestock.com','3007654321','Active','2026-08-05 07:12:18','2026-08-05 07:12:18'),(3,'Carlos Rodríguez','Operario','carlos.rodriguez@livestock.com','3109876543','Active','2026-08-05 07:12:18','2026-08-05 07:12:18'),(4,'Ana Martínez','Administrador','ana.martinez@livestock.com','3204567890','Active','2026-08-05 07:12:18','2026-08-05 07:12:18'),(5,'Luis Fernández','Veterinario','luis.fernandez@livestock.com','3009876543','Inactive','2026-08-05 07:12:18','2026-08-05 07:12:18'),(8,'Dr. Juan Pérez','Veterinario','juanpablo@livestock.com','3001234567','Active','2026-08-05 12:14:19','2026-08-05 12:14:19');
/*!40000 ALTER TABLE `responsibles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roll`
--

DROP TABLE IF EXISTS `roll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roll` (
  `idroll` int NOT NULL,
  `slug` varchar(45) NOT NULL,
  `label` varchar(45) NOT NULL,
  `idrollroute` int NOT NULL,
  `active` tinyint DEFAULT '0',
  PRIMARY KEY (`idroll`),
  KEY `fk_roll_rollroute_idx` (`idrollroute`),
  CONSTRAINT `fk_roll_rollroute` FOREIGN KEY (`idrollroute`) REFERENCES `rollroute` (`idrollroute`)
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
-- Table structure for table `rollroute`
--

DROP TABLE IF EXISTS `rollroute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rollroute` (
  `idrollroute` int NOT NULL AUTO_INCREMENT,
  `idapproute` int NOT NULL,
  `is_admin` tinyint NOT NULL DEFAULT '0',
  `is_instructor` tinyint NOT NULL DEFAULT '0',
  `is_pasante` tinyint NOT NULL DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`idrollroute`),
  KEY `fk_rollroute_approute_idx` (`idapproute`),
  CONSTRAINT `fk_rollroute_approute` FOREIGN KEY (`idapproute`) REFERENCES `approute` (`idapproute`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rollroute`
--

LOCK TABLES `rollroute` WRITE;
/*!40000 ALTER TABLE `rollroute` DISABLE KEYS */;
/*!40000 ALTER TABLE `rollroute` ENABLE KEYS */;
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
  `id` int NOT NULL AUTO_INCREMENT,
  `idBovine` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Bovino tratado',
  `treatment_date` datetime NOT NULL COMMENT 'Fecha del tratamiento',
  `medication_used` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Medicamento utilizado en el tratamiento',
  `applied_dose` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Dosis administrada',
  `application_route` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Vía de administración del medicamento (oral, intramuscular, intravenosa)',
  `associated_diagnosis` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Enfermedad o condición que se está tratando',
  `treatment_duration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Duración del tratamiento',
  `observations` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Observaciones adicionales sobre el tratamiento',
  `idResponsible` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nombre del responsable del tratamiento aplicado',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización del registro',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para registrar tratamientos de bovinos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatments`
--

LOCK TABLES `treatments` WRITE;
/*!40000 ALTER TABLE `treatments` DISABLE KEYS */;
INSERT INTO `treatments` VALUES (1,'BOV-001','2026-07-31 13:36:40','Ivermectina','1 ml / 50 kg','Intramuscular','Parasitosis','3 días','Tratamiento exitoso','Dr. Juan Pérez','2026-07-31 13:36:40','2026-07-31 13:36:40'),(2,'BOV-002','2026-07-30 13:36:40','Penicilina','2 ml','Intramuscular','Infección respiratoria','5 días','Pendiente de evolución','Dra. María Gómez','2026-07-31 13:36:40','2026-07-31 13:36:40'),(4,'BOV-001','2026-07-31 15:00:00','Ivermectina','1 ml / 50 kg','Intramuscular','Parasitosis','3 días','Tratamiento exitoso, continuar monitoreo','Dr. Juan Pérez','2026-07-31 18:42:06','2026-07-31 18:42:06');
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
  `password` varchar(50) NOT NULL,
  `documentId` varchar(30) NOT NULL,
  `postJob` varchar(50) NOT NULL,
  `idroll` int DEFAULT NULL,
  `verifyEmail` tinyint DEFAULT '0',
  `active` tinyint DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `solicito_newPassword` tinyint DEFAULT '0',
  PRIMARY KEY (`userId`),
  KEY `idRoll_idx` (`idroll`),
  CONSTRAINT `idRoll` FOREIGN KEY (`idroll`) REFERENCES `roll` (`idroll`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'sebas',NULL,'sebastian@gmail.com','1234567','12345678901','APRENDIZ',NULL,0,1,'2026-06-19 17:39:20','2026-06-19 17:39:20',0),(2,'Carlos Rodríguez',NULL,'carlos@test.com','123456','98765432','Encargado de Ganado',NULL,0,1,'2026-07-23 20:29:08','2026-07-23 20:29:08',0),(4,'Nombre del usuario',NULL,'correo@gm.com','contraseña','12345678','Cargo del usuario',NULL,0,1,'2026-07-27 12:21:39','2026-07-27 12:21:39',0),(5,'Ana Sofia Gonzalez Yepes',NULL,'asgy2005@gmail.com','contraseña','1105305295','Psicologa',NULL,0,1,'2026-07-28 01:49:47','2026-07-28 01:49:47',0),(6,'Zara',NULL,'zaritaGPT@gmail.com','1234','1205648732','Programada estrella',NULL,0,1,'2026-07-30 18:44:07','2026-07-30 18:44:07',0),(7,'Sebitas prueba 1',NULL,'sebastiancalderon5204@gmail.com','1234','1049234658','Gerente livestock',NULL,0,1,'2026-07-31 05:11:09','2026-07-31 05:11:09',0),(8,'Sebitas prueba2',NULL,'sebastiancalderon5204@gmail.com','1234','1049234658','Gerente livestock',NULL,0,1,'2026-07-31 05:15:24','2026-07-31 05:15:24',0),(9,'Zara Ñustes',NULL,'zaranustes1702@gm.com','1234','12345678','Se lo tu quea ser',NULL,0,1,'2026-07-31 13:07:22','2026-07-31 13:07:22',0),(10,'Zara Ñustes',NULL,'zaranustes1702@gmail.com','1234','12345678','Se lo tu quea ser',NULL,0,1,'2026-07-31 13:13:31','2026-07-31 13:13:31',0),(11,'Zara Ñustes 2',NULL,'zaranustes1702@gmail.com','1234','12345678','Se lo tu quea ser',NULL,0,1,'2026-07-31 13:15:55','2026-07-31 13:15:55',0),(12,'sebatian',NULL,'sebastiancalderonlozano@gmail.com','1234','12345678','OG',NULL,0,1,'2026-07-31 14:39:15','2026-07-31 14:39:15',0),(13,'Natalia Prieto',NULL,'prietoguzmannatalia8@gmail.com','contraseña','12345678','eso',NULL,0,1,'2026-08-01 19:18:01','2026-08-01 19:18:01',0),(14,'Danna Luzabell Villamizar Saldaña',NULL,'villamizarsaldanadaniela@gmail.com','soypobre123','1034401733','uu',NULL,0,1,'2026-08-03 01:40:28','2026-08-03 01:40:28',0),(15,'Sebastian Calderon','e370f2f8-26f3-4d1f-992f-587b080784e5','sebastiancalderon5204@gmail.com','Sebitas77','3121384','Administrador',NULL,0,1,'2026-08-28 16:46:42','2026-08-28 16:46:42',0),(16,'Sebastian Calderón','728b66c6-57c7-4e87-97b8-08cfe85d935b','sebastiancalderon5204@gmail.com','SEBITAS123','3206546','operario',NULL,0,1,'2026-08-28 17:21:32','2026-08-28 17:21:32',0),(17,'Shebas','d87d1041-7751-41bf-9321-db4590678cd0','sebastiancalderon5204@gmail.com','12345678','12345678','asistente',NULL,0,1,'2026-08-28 17:32:51','2026-08-28 17:32:51',0),(18,'Stefany','e8f177d5-0856-4e38-94f5-e4788fbb77f9','sebastiancalderon5204@gmail.com','123456789','12345678','veterinaria',NULL,0,1,'2026-08-28 17:40:07','2026-08-28 17:40:07',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

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
  `vaccine_lot` varchar(255) NOT NULL,
  `medicine_name` varchar(255) NOT NULL,
  `idResponsible` varchar(255) NOT NULL,
  `observations` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idBovine` (`idBovine`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacunations`
--

LOCK TABLES `vacunations` WRITE;
/*!40000 ALTER TABLE `vacunations` DISABLE KEYS */;
INSERT INTO `vacunations` VALUES (1,'VACA-001','2026-08-15 08:30:00','2 ml','LOTE-ABC-123','Vacuna Antiaftosa','Juan Pérez','Primera dosis anual','2026-08-21 10:24:29','2026-08-21 10:24:29'),(2,'VACA-002','2026-08-16 09:00:00','5 ml','LOTE-DEF-456','Vacuna Brucelosis','María Gómez','Revisar en 24 horas','2026-08-21 10:24:29','2026-08-21 10:24:29'),(3,'VACA-003','2026-08-17 10:15:00','3 ml','LOTE-GHI-789','Vacuna Clostridial','Carlos Ruiz','Dosis de refuerzo','2026-08-21 10:24:29','2026-08-21 10:24:29');
/*!40000 ALTER TABLE `vacunations` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping data for table `weighings`
--

LOCK TABLES `weighings` WRITE;
/*!40000 ALTER TABLE `weighings` DISABLE KEYS */;
INSERT INTO `weighings` VALUES (1,'BOV-001','2026-07-31 12:02:19',450.5,2.3,'Normal','Animal en buen estado, ganando peso adecuadamente','Juan Pérez','2026-07-31 12:02:19','2026-07-31 12:02:19'),(2,'BOV-002','2026-07-30 12:02:19',380,-1.5,'Delgado','Animal perdió peso, revisar alimentación','María Gómez','2026-07-31 12:02:19','2026-07-31 12:02:19'),(3,'BOV-003','2026-07-29 12:02:19',520.75,3.2,'Gordo','Excelente condición, animal listo para comercialización','Carlos Rodríguez','2026-07-31 12:02:19','2026-07-31 12:02:19'),(4,'BOV-001','2026-07-31 12:05:00',450.5,2.3,'Normal','Animal en buen estado, ganando peso adecuadamente','Juan Pérez','2026-07-31 12:05:00','2026-07-31 12:05:00'),(5,'BOV-002','2026-07-30 12:05:00',380,-1.5,'Delgado','Animal perdió peso, revisar alimentación','María Gómez','2026-07-31 12:05:00','2026-07-31 12:05:00'),(6,'BOV-003','2026-07-29 12:05:00',520.75,3.2,'Gordo','Excelente condición, animal listo para comercialización','Carlos Rodríguez','2026-07-31 12:05:00','2026-07-31 12:05:00'),(7,'BOV-001','2026-07-31 12:54:35',450.5,2.3,'Normal','Animal en buen estado, ganando peso adecuadamente','Juan Pérez','2026-07-31 12:54:35','2026-07-31 12:54:35'),(8,'BOV-002','2026-07-30 12:54:35',380,-1.5,'Delgado','Animal perdió peso, revisar alimentación','María Gómez','2026-07-31 12:54:35','2026-07-31 12:54:35'),(9,'BOV-003','2026-07-29 12:54:35',520.75,3.2,'Gordo','Excelente condición, animal listo para comercialización','Carlos Rodríguez','2026-07-31 12:54:35','2026-07-31 12:54:35'),(10,'BOV-001','2026-07-31 12:55:43',450.5,2.3,'Normal','Animal en buen estado, ganando peso adecuadamente','Juan Pérez','2026-07-31 12:55:43','2026-07-31 12:55:43'),(13,'BOV-023','2026-08-04 19:30:00',380,-1.5,'Delgado','Animal perdió peso, revisar alimentación',NULL,'2026-08-05 13:48:49','2026-08-05 13:48:49');
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

-- Dump completed on 2026-08-30 10:01:02
