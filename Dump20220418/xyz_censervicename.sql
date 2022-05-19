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
-- Table structure for table `censervicename`
--

DROP TABLE IF EXISTS `censervicename`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `censervicename` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `accountid` bigint DEFAULT NULL,
  `adddeduct` int DEFAULT NULL,
  `compid` bigint DEFAULT NULL,
  `isfixedamount` bit(1) DEFAULT NULL,
  `moduleid` bigint DEFAULT NULL,
  `servicename` varchar(255) DEFAULT NULL,
  `servicetypeid` int DEFAULT NULL,
  `unitprice` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `censervicename`
--

LOCK TABLES `censervicename` WRITE;
/*!40000 ALTER TABLE `censervicename` DISABLE KEYS */;
INSERT INTO `censervicename` VALUES (1,0,1,18,_binary '\0',30,'Basic',1,50),(2,0,1,18,_binary '\0',30,'House Rent',1,30),(3,0,-1,18,_binary '\0',30,'Provident Fund - Own',2,2),(4,0,1,18,_binary '\0',30,'Medical',1,15),(5,0,1,18,_binary '\0',30,'Transport',1,5),(6,0,1,18,_binary '\0',30,'Education',1,2);
/*!40000 ALTER TABLE `censervicename` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-18 14:41:53
