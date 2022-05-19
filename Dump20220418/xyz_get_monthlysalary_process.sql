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
-- Table structure for table `get_monthlysalary_process`
--

DROP TABLE IF EXISTS `get_monthlysalary_process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `get_monthlysalary_process` (
  `id` bigint NOT NULL,
  `userid` bigint DEFAULT NULL,
  `absentdays` double DEFAULT NULL,
  `absentdeductamount` double DEFAULT NULL,
  `advanceamount` double DEFAULT NULL,
  `compid` bigint DEFAULT NULL,
  `empcode` varchar(255) DEFAULT NULL,
  `empname` varchar(255) DEFAULT NULL,
  `entrydate` datetime(6) DEFAULT NULL,
  `extentmobilebill` double DEFAULT NULL,
  `fine` double DEFAULT NULL,
  `grosssalary` double DEFAULT NULL,
  `groupid` bigint DEFAULT NULL,
  `incometax` double DEFAULT NULL,
  `latedays` double DEFAULT NULL,
  `latedeductamount` double DEFAULT NULL,
  `leavedays` double DEFAULT NULL,
  `loanamount` double DEFAULT NULL,
  `meetingamount` double DEFAULT NULL,
  `memberid` bigint DEFAULT NULL,
  `moduleid` bigint DEFAULT NULL,
  `narration` varchar(255) DEFAULT NULL,
  `netpayment` double DEFAULT NULL,
  `overtimeamount` double DEFAULT NULL,
  `overtimehour` double DEFAULT NULL,
  `overtimehouramount` double DEFAULT NULL,
  `periodid` bigint DEFAULT NULL,
  `providentfund` double DEFAULT NULL,
  `sectionid` bigint DEFAULT NULL,
  `stampamount` double DEFAULT NULL,
  `tadaamount` double DEFAULT NULL,
  `totaldeductamount` double DEFAULT NULL,
  `totalpressent` double DEFAULT NULL,
  `tourdays` double DEFAULT NULL,
  `workingdays` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `get_monthlysalary_process`
--

LOCK TABLES `get_monthlysalary_process` WRITE;
/*!40000 ALTER TABLE `get_monthlysalary_process` DISABLE KEYS */;
/*!40000 ALTER TABLE `get_monthlysalary_process` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-18 14:41:47
