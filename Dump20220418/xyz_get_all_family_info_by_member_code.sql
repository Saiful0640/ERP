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
-- Table structure for table `get_all_family_info_by_member_code`
--

DROP TABLE IF EXISTS `get_all_family_info_by_member_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `get_all_family_info_by_member_code` (
  `id` bigint NOT NULL,
  `countryid` bigint DEFAULT NULL,
  `nationalityid` varchar(255) DEFAULT NULL,
  `bloodgroupid` int DEFAULT NULL,
  `comtype` int DEFAULT NULL,
  `compid` bigint DEFAULT NULL,
  `createddate` date DEFAULT NULL,
  `dateofbirth` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fmembername` varchar(255) DEFAULT NULL,
  `genderid` int DEFAULT NULL,
  `isnominee` int DEFAULT NULL,
  `maritialstatusid` int DEFAULT NULL,
  `membercode` varchar(255) DEFAULT NULL,
  `mobileno` varchar(255) DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  `moduleid` bigint DEFAULT NULL,
  `occupationid` bigint DEFAULT NULL,
  `passportno` varchar(255) DEFAULT NULL,
  `percentage` bigint DEFAULT NULL,
  `picture` longblob,
  `placeofbirth` varchar(255) DEFAULT NULL,
  `relationship` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `get_all_family_info_by_member_code`
--

LOCK TABLES `get_all_family_info_by_member_code` WRITE;
/*!40000 ALTER TABLE `get_all_family_info_by_member_code` DISABLE KEYS */;
/*!40000 ALTER TABLE `get_all_family_info_by_member_code` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-18 14:41:51
