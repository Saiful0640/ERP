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
-- Table structure for table `leaveentry`
--

DROP TABLE IF EXISTS `leaveentry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaveentry` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `adate` varchar(255) DEFAULT NULL,
  `apptype` int DEFAULT NULL,
  `categoryid` bigint DEFAULT NULL,
  `compid` bigint DEFAULT NULL,
  `duration` double DEFAULT NULL,
  `edate` varchar(255) DEFAULT NULL,
  `entrydate` date DEFAULT NULL,
  `membercode` varchar(255) DEFAULT NULL,
  `moduleid` bigint DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `sdate` varchar(255) DEFAULT NULL,
  `userid` bigint DEFAULT NULL,
  `yearid` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaveentry`
--

LOCK TABLES `leaveentry` WRITE;
/*!40000 ALTER TABLE `leaveentry` DISABLE KEYS */;
INSERT INTO `leaveentry` VALUES (1,'20220104',0,1,18,3,'20220104','2022-04-12','qwe1',NULL,'ssd','20220104',NULL,NULL),(2,'20220430',0,1,18,1,'20220430','2022-04-12','emr1',NULL,'sfsdf','20220429',NULL,NULL),(3,'20220415',0,1,18,1,'20220415','2022-04-12','qwe1',NULL,'ddd','20220414',NULL,NULL),(4,'20220415',0,1,18,2,'20220415','2022-04-12','1',NULL,'dfsdfs','20220414',NULL,NULL),(5,'20220401',0,1,18,2,'20220417','2022-04-12','1',20,'sssadttttttt555','20220416',31,1),(6,'20220417',0,3,18,2,'20220418','2022-04-17','s1',20,'sick','20220417',31,2),(7,'20220414',0,2,18,4,'20221204','2022-04-17','s1',20,NULL,'20221201',31,2),(8,'20220501',0,3,18,4,'20220506','2022-04-17','ss',20,'sick','20220503',31,3),(9,'20220101',0,3,18,3,'20220103','2022-04-18','emr1',20,'sick','20220101',31,1);
/*!40000 ALTER TABLE `leaveentry` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-18 14:41:49