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
-- Table structure for table `getallemployment_info_list`
--

DROP TABLE IF EXISTS `getallemployment_info_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `getallemployment_info_list` (
  `id` bigint NOT NULL,
  `actiondate` varchar(255) DEFAULT NULL,
  `actiontypeid` int DEFAULT NULL,
  `compid` bigint DEFAULT NULL,
  `confirmationdate` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `departmentid` bigint DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `designationid` bigint DEFAULT NULL,
  `emptypeid` int DEFAULT NULL,
  `entrydate` datetime(6) DEFAULT NULL,
  `groupid` bigint DEFAULT NULL,
  `groupname` varchar(255) DEFAULT NULL,
  `jobdescription` varchar(255) DEFAULT NULL,
  `joblocation` bigint DEFAULT NULL,
  `joindate` varchar(255) DEFAULT NULL,
  `membercode` varchar(255) DEFAULT NULL,
  `memberid` bigint DEFAULT NULL,
  `membername` varchar(255) DEFAULT NULL,
  `moduleid` bigint DEFAULT NULL,
  `proconfirmationdate` varchar(255) DEFAULT NULL,
  `sectionid` bigint DEFAULT NULL,
  `sectionname` varchar(255) DEFAULT NULL,
  `userid` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `getallemployment_info_list`
--

LOCK TABLES `getallemployment_info_list` WRITE;
/*!40000 ALTER TABLE `getallemployment_info_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `getallemployment_info_list` ENABLE KEYS */;
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
