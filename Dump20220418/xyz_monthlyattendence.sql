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
-- Table structure for table `monthlyattendence`
--

DROP TABLE IF EXISTS `monthlyattendence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monthlyattendence` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `absentdays` double DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `apptype` int DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `compid` bigint DEFAULT NULL,
  `empcode` varchar(255) DEFAULT NULL,
  `empname` varchar(255) DEFAULT NULL,
  `entrydate` date DEFAULT NULL,
  `groupid` bigint DEFAULT NULL,
  `grouptypeid` bigint DEFAULT NULL,
  `latedays` double DEFAULT NULL,
  `leavedays` double DEFAULT NULL,
  `membercode` varchar(255) DEFAULT NULL,
  `memberid` bigint DEFAULT NULL,
  `membername` varchar(255) DEFAULT NULL,
  `moduleid` bigint DEFAULT NULL,
  `overtimeamount` double DEFAULT NULL,
  `overtimehours` double DEFAULT NULL,
  `payableamount` double DEFAULT NULL,
  `payabledays` double DEFAULT NULL,
  `pdwise` double DEFAULT NULL,
  `penalty` double DEFAULT NULL,
  `periodid` bigint DEFAULT NULL,
  `pmwise` double DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `sectionid` bigint DEFAULT NULL,
  `tdaabsentdays` double DEFAULT NULL,
  `tdaleavedays` double DEFAULT NULL,
  `tdaworkingdays` double DEFAULT NULL,
  `totalpressentdays` double DEFAULT NULL,
  `tourdays` double DEFAULT NULL,
  `userid` bigint DEFAULT NULL,
  `workdays` double DEFAULT NULL,
  `workingdays` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monthlyattendence`
--

LOCK TABLES `monthlyattendence` WRITE;
/*!40000 ALTER TABLE `monthlyattendence` DISABLE KEYS */;
INSERT INTO `monthlyattendence` VALUES (1,2,NULL,NULL,'dfrtgythytgvf',18,'emr1',NULL,NULL,1,NULL,1,1,'emr1',1,NULL,37,0,0,0,20,NULL,NULL,1,NULL,'0',1,2,1,23,27,0,NULL,NULL,30);
/*!40000 ALTER TABLE `monthlyattendence` ENABLE KEYS */;
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
