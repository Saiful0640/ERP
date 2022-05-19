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
-- Table structure for table `assigncriteria`
--

DROP TABLE IF EXISTS `assigncriteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assigncriteria` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `accountid` bigint DEFAULT NULL,
  `activedate` varchar(255) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `compid` bigint DEFAULT NULL,
  `createddate` date DEFAULT NULL,
  `detailsid` bigint DEFAULT NULL,
  `memberid` bigint DEFAULT NULL,
  `moduleid` bigint DEFAULT NULL,
  `processtype` int DEFAULT NULL,
  `serviceaccountid` bigint DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assigncriteria`
--

LOCK TABLES `assigncriteria` WRITE;
/*!40000 ALTER TABLE `assigncriteria` DISABLE KEYS */;
INSERT INTO `assigncriteria` VALUES (1,0,NULL,20000,18,'2022-04-16',1,1,30,1,1,_binary ''),(2,0,NULL,6000,18,'2022-04-16',1,1,30,1,4,_binary ''),(3,0,NULL,800,18,'2022-04-16',1,1,30,1,6,_binary ''),(4,0,NULL,800,18,'2022-04-16',1,1,30,2,3,_binary ''),(5,0,NULL,2000,18,'2022-04-16',1,1,30,1,5,_binary ''),(6,0,NULL,12000,18,'2022-04-16',1,1,30,1,2,_binary ''),(7,0,NULL,12000,18,'2022-04-16',1,2,30,1,2,_binary ''),(8,0,NULL,20000,18,'2022-04-16',1,2,30,1,1,_binary ''),(9,0,NULL,2000,18,'2022-04-16',1,2,30,1,5,_binary ''),(10,0,NULL,800,18,'2022-04-16',1,2,30,1,6,_binary ''),(11,0,NULL,6000,18,'2022-04-16',1,2,30,1,4,_binary ''),(12,0,NULL,800,18,'2022-04-16',1,2,30,2,3,_binary ''),(13,0,NULL,12000,18,'2022-04-16',1,3,30,1,2,_binary ''),(14,0,NULL,20000,18,'2022-04-16',1,3,30,1,1,_binary ''),(15,0,NULL,800,18,'2022-04-16',1,3,30,1,6,_binary ''),(16,0,NULL,6000,18,'2022-04-16',1,3,30,1,4,_binary ''),(17,0,NULL,2000,18,'2022-04-16',1,3,30,1,5,_binary ''),(18,0,NULL,800,18,'2022-04-16',1,3,30,2,3,_binary '');
/*!40000 ALTER TABLE `assigncriteria` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-18 14:41:57
