-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: xyz
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `censerviceamtsetting`
--

DROP TABLE IF EXISTS `censerviceamtsetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `censerviceamtsetting` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `serviceid` int DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `compid` bigint DEFAULT NULL,
  `detailsid` int DEFAULT NULL,
  `meterno` varchar(255) DEFAULT NULL,
  `moduleid` bigint DEFAULT NULL,
  `processtype` int DEFAULT NULL,
  `serialno` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `censerviceamtsetting`
--

LOCK TABLES `censerviceamtsetting` WRITE;
/*!40000 ALTER TABLE `censerviceamtsetting` DISABLE KEYS */;
INSERT INTO `censerviceamtsetting` VALUES (14,0,NULL,18,0,NULL,30,0,0),(15,0,NULL,18,0,NULL,30,0,0),(16,0,NULL,18,0,NULL,30,0,0),(23,1,200000,18,1,NULL,30,1,1),(24,6,8000,18,1,NULL,30,1,5),(25,4,60000,18,1,NULL,30,1,3),(26,2,120000,18,1,NULL,30,1,2),(27,3,8000,18,1,NULL,30,2,1),(28,5,20000,18,1,NULL,30,1,4);
/*!40000 ALTER TABLE `censerviceamtsetting` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-18 14:41:56
