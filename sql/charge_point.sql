CREATE DATABASE  IF NOT EXISTS `charge_point` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `charge_point`;
-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: charge_point
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.20.04.1

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
-- Table structure for table `charge_point`
--

DROP TABLE IF EXISTS `charge_point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `charge_point` (
  `MODEL` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `VENDOR` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `SERIAL_NUMBER` int(4) unsigned zerofill NOT NULL,
  PRIMARY KEY (`SERIAL_NUMBER`),
  UNIQUE KEY `SERIAL_NUMBER` (`SERIAL_NUMBER`),
  UNIQUE KEY `SERIAL_NUMBER_2` (`SERIAL_NUMBER`),
  UNIQUE KEY `SERIAL_NUMBER_3` (`SERIAL_NUMBER`),
  UNIQUE KEY `SERIAL_NUMBER_4` (`SERIAL_NUMBER`),
  UNIQUE KEY `SERIAL_NUMBER_5` (`SERIAL_NUMBER`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `charge_point`
--

LOCK TABLES `charge_point` WRITE;
/*!40000 ALTER TABLE `charge_point` DISABLE KEYS */;
INSERT INTO `charge_point` VALUES ('cp_001','ttu',0001),('cp_001','ttu',0002),('cp_001','ttu',0003),('cp_001','ttu',0004),('cp_001','ttu',0005),('cp_001','ttu',0006),('cp_001','ttu',0007),('cp_001','ttu',0008),('cp_001','ttu',0009),('cp_001','ttu',0010);
/*!40000 ALTER TABLE `charge_point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `charge_point_info`
--

DROP TABLE IF EXISTS `charge_point_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `charge_point_info` (
  `STATE` varchar(16) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `START_TIME` datetime DEFAULT NULL,
  `CURRENT_METER` int DEFAULT '0',
  `CUMULATIVE_METER` int DEFAULT '0',
  `SERIAL_NUMBER` int(4) unsigned zerofill NOT NULL,
  `IDTAG` varchar(8) COLLATE utf8mb3_unicode_ci NOT NULL,
  `ERROR_CODE` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`SERIAL_NUMBER`),
  UNIQUE KEY `SERIAL_NUMBER` (`SERIAL_NUMBER`),
  UNIQUE KEY `IDTAG` (`IDTAG`),
  UNIQUE KEY `IDTAG_2` (`IDTAG`),
  UNIQUE KEY `SERIAL_NUMBER_2` (`SERIAL_NUMBER`),
  UNIQUE KEY `SERIAL_NUMBER_3` (`SERIAL_NUMBER`),
  UNIQUE KEY `SERIAL_NUMBER_4` (`SERIAL_NUMBER`),
  UNIQUE KEY `SERIAL_NUMBER_5` (`SERIAL_NUMBER`),
  CONSTRAINT `charge_point_info_chk_1` CHECK ((`STATE` in (_utf8mb4'Available',_utf8mb4'Preparing',_utf8mb4'Charging',_utf8mb4'Finishing',_utf8mb4'Unavailable'))),
  CONSTRAINT `chk_valid_ERROR_CODE` CHECK ((`ERROR_CODE` in (_utf8mb4'ConnectorLockFailure',_utf8mb4'EVCommunicationError',_utf8mb4'GroundFailure',_utf8mb4'HighTemperature',_utf8mb4'InternalError',_utf8mb4'LocalListConflict',_utf8mb4'NoError',_utf8mb4'OtherError',_utf8mb4'OverCurrentFailure',_utf8mb4'OverVoltage',_utf8mb4'PowerMeterFailure',_utf8mb4'PowerSwitchFailure',_utf8mb4'ReaderFailure',_utf8mb4'ResetFailure',_utf8mb4'UnderVoltage',_utf8mb4'WeakSignal')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `charge_point_info`
--

LOCK TABLES `charge_point_info` WRITE;
/*!40000 ALTER TABLE `charge_point_info` DISABLE KEYS */;
INSERT INTO `charge_point_info` VALUES ('Unavailable',NULL,0,100,0001,'C2309015','NoError'),('Available',NULL,0,260,0002,'C2309024','NoError'),('Available',NULL,0,150,0003,'C2309033','NoError'),('Available',NULL,0,1940,0004,'C2309042','NoError'),('Charging','2023-11-23 13:21:34',45,567,0005,'C2309051','NoError'),('Available',NULL,0,2065,0006,'C2309060','NoError'),('Available',NULL,0,6532,0007,'C2309079','NoError'),('Available',NULL,0,124,0008,'C2309088','NoError'),('Available',NULL,0,263,0009,'C2309097','NoError'),('Available',NULL,0,98965,0010,'C2309105','NoError'),('Unavailable',NULL,0,0,0011,'cc','NoError');
/*!40000 ALTER TABLE `charge_point_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-22 13:38:23
