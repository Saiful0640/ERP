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
-- Table structure for table `get_monthly_attendence`
--

DROP TABLE IF EXISTS `get_monthly_attendence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `get_monthly_attendence` (
  `id` bigint NOT NULL,
  `sectionid` bigint DEFAULT NULL,
  `absentdays` double DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `compid` bigint DEFAULT NULL,
  `empcode` varchar(255) DEFAULT NULL,
  `empname` varchar(255) DEFAULT NULL,
  `groupid` bigint DEFAULT NULL,
  `latedays` double DEFAULT NULL,
  `leavedays` double DEFAULT NULL,
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
  `tdaabsentdays` double DEFAULT NULL,
  `tdaleavedays` double DEFAULT NULL,
  `tdaworkingdays` double DEFAULT NULL,
  `totalpressentdays` double DEFAULT NULL,
  `tourdays` double DEFAULT NULL,
  `workdays` double DEFAULT NULL,
  `workingdays` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `get_monthly_attendence`
--

LOCK TABLES `get_monthly_attendence` WRITE;
/*!40000 ALTER TABLE `get_monthly_attendence` DISABLE KEYS */;
/*!40000 ALTER TABLE `get_monthly_attendence` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-18 14:41:48
