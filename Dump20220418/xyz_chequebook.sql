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
-- Table structure for table `chequebook`
--

DROP TABLE IF EXISTS `chequebook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chequebook` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `accountid` bigint DEFAULT NULL,
  `chequeno` bigint DEFAULT NULL,
  `compid` bigint DEFAULT NULL,
  `isrejected` bit(1) DEFAULT NULL,
  `isused` bit(1) DEFAULT NULL,
  `reciveddate` varchar(255) DEFAULT NULL,
  `rejecdate` varchar(255) DEFAULT NULL,
  `rejectereson` varchar(255) DEFAULT NULL,
  `rejectedby` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chequebook`
--

LOCK TABLES `chequebook` WRITE;
/*!40000 ALTER TABLE `chequebook` DISABLE KEYS */;
INSERT INTO `chequebook` VALUES (1,2,5,18,_binary '\0',_binary '\0','20220404',NULL,NULL,31),(2,2,6,18,_binary '\0',_binary '\0','20220404',NULL,NULL,31),(3,2,2,18,_binary '\0',_binary '','20220404',NULL,NULL,31),(4,2,1,18,_binary '',_binary '\0','20220405','20220405',NULL,31),(5,2,4,18,_binary '\0',_binary '\0','20220404',NULL,NULL,31),(6,2,3,18,_binary '\0',_binary '\0','20220404',NULL,NULL,31),(7,2,8,18,_binary '\0',_binary '','4/4/2022',NULL,NULL,31),(8,2,7,18,_binary '\0',_binary '','20220404',NULL,NULL,31),(9,2,9,18,_binary '\0',_binary '\0','20220404',NULL,NULL,31),(10,2,10,18,_binary '\0',_binary '\0','20220404',NULL,NULL,31),(11,3,2,18,_binary '\0',_binary '\0','20220404',NULL,NULL,31),(12,3,1,18,_binary '\0',_binary '\0','20220404',NULL,NULL,31),(13,3,5,18,_binary '\0',_binary '\0','20220404',NULL,NULL,31),(14,3,6,18,_binary '\0',_binary '\0','20220404',NULL,NULL,31),(15,3,3,18,_binary '\0',_binary '\0','20220404',NULL,NULL,31),(16,3,7,18,_binary '\0',_binary '\0','20220404',NULL,NULL,31),(17,3,8,18,_binary '\0',_binary '\0','20220404',NULL,NULL,31),(18,3,4,18,_binary '\0',_binary '\0','20220404',NULL,NULL,31),(19,3,9,18,_binary '\0',_binary '\0','20220404',NULL,NULL,31),(20,0,6,18,_binary '\0',_binary '\0','20220407',NULL,NULL,31),(21,0,4,18,_binary '\0',_binary '\0','20220407',NULL,NULL,31),(22,0,1,18,_binary '\0',_binary '\0','20220407',NULL,NULL,31),(23,0,3,18,_binary '\0',_binary '\0','20220407',NULL,NULL,31),(24,0,5,18,_binary '\0',_binary '\0','20220407',NULL,NULL,31),(25,0,2,18,_binary '\0',_binary '\0','20220407',NULL,NULL,31),(26,0,7,18,_binary '\0',_binary '\0','20220407',NULL,NULL,31),(27,0,8,18,_binary '\0',_binary '\0','20220407',NULL,NULL,31),(28,0,9,18,_binary '\0',_binary '\0','20220407',NULL,NULL,31),(29,0,10,18,_binary '\0',_binary '\0','20220407',NULL,NULL,31),(30,4,4,18,_binary '',_binary '\0','20220417','20220418',NULL,31),(31,4,5,18,_binary '',_binary '\0','20220416','20220419',NULL,31),(32,4,2,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31),(33,4,3,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31),(34,4,1,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31),(35,4,6,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31),(36,4,7,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31),(37,4,8,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31),(38,4,9,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31),(39,4,10,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31),(40,4,11,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31),(41,4,12,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31),(42,4,14,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31),(43,4,13,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31),(44,4,15,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31),(45,4,16,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31),(46,4,17,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31),(47,4,18,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31),(48,4,19,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31),(49,4,20,18,_binary '\0',_binary '\0','20220417',NULL,NULL,31);
/*!40000 ALTER TABLE `chequebook` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-18 14:41:55
