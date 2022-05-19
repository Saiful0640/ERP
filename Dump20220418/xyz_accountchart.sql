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
-- Table structure for table `accountchart`
--

DROP TABLE IF EXISTS `accountchart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accountchart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `acctype` int DEFAULT NULL,
  `accountgroupid` int DEFAULT NULL,
  `accountid` int DEFAULT NULL,
  `accountname` varchar(255) DEFAULT NULL,
  `accountno` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `aliasname` varchar(255) DEFAULT NULL,
  `balancetype` int DEFAULT NULL,
  `bin` varchar(255) DEFAULT NULL,
  `branchid` int DEFAULT NULL,
  `compid` int DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `creditdays` double DEFAULT NULL,
  `creditlimit` double DEFAULT NULL,
  `criteriaid` int DEFAULT NULL,
  `currencyid` int DEFAULT NULL,
  `currencyrate` double DEFAULT NULL,
  `depriciationrate` double DEFAULT NULL,
  `detailsid` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `entrytime` date DEFAULT NULL,
  `groupaccountid` int DEFAULT NULL,
  `headgroupid` int DEFAULT NULL,
  `isactive` bit(1) DEFAULT NULL,
  `isbillbybill` bit(1) DEFAULT NULL,
  `isbranch` bit(1) DEFAULT NULL,
  `iscostcenter` bit(1) DEFAULT NULL,
  `isemployee` bit(1) DEFAULT NULL,
  `issalesaccount` bit(1) DEFAULT NULL,
  `issubledger` bit(1) DEFAULT NULL,
  `lowergroupid` int DEFAULT NULL,
  `mobileno` varchar(255) DEFAULT NULL,
  `openningbalance` double DEFAULT NULL,
  `parentid` int DEFAULT NULL,
  `phoneno` varchar(255) DEFAULT NULL,
  `presentbalance` double DEFAULT NULL,
  `proprietor_name` varchar(255) DEFAULT NULL,
  `statusstring` varchar(255) DEFAULT NULL,
  `tin` varchar(255) DEFAULT NULL,
  `indercriteriaid` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountchart`
--

LOCK TABLES `accountchart` WRITE;
/*!40000 ALTER TABLE `accountchart` DISABLE KEYS */;
INSERT INTO `accountchart` VALUES (1,0,1,0,'janata bank','0987654','Dhaka','jb',0,NULL,1,18,'0',0,0,0,1,0,0,0,'j@gmail.com','2022-04-07',1,0,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',94,'01764787',0,0,NULL,NULL,NULL,NULL,NULL,0),(2,0,1,1,'cash',NULL,NULL,'as',0,NULL,1,18,'0',0,0,0,1,0,0,0,NULL,'2022-04-07',1,0,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',0,NULL,10000,0,NULL,NULL,NULL,NULL,NULL,0),(3,0,1,2,'Saiful Islam',NULL,'DHAKA','sa',0,NULL,1,18,'Bangladesh',0,0,0,1,1220,0,0,'miansahin@gmail.com','2022-04-07',1,0,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',3,'01789754',1220,0,NULL,NULL,'s&a',NULL,NULL,0),(4,0,1,3,'safik',NULL,'Dhaka','s',0,NULL,1,18,'0',0,0,0,1,0,0,0,'s@gmail.com','2022-04-07',1,0,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',4,'019765346',110,0,NULL,NULL,'ss',NULL,NULL,0),(5,0,1,4,'Dutch Bangla Bank','678998','Dhaka','DBL',0,NULL,3,18,'0',0,0,0,1,0,0,0,'dbl@gmail.com','2022-04-17',1,0,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',94,'01987657',0,0,NULL,NULL,NULL,NULL,NULL,0),(6,0,1,5,'Eastern Bank Limited','098765434','Cumilla','EBL',0,NULL,1,18,'0',0,0,0,1,0,0,0,'ebl@gmail.com','2022-04-17',1,0,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',94,'01724791926',0,0,NULL,NULL,NULL,NULL,NULL,0),(7,0,1,6,'Rupali Bank','09567883','Dhaka','RP',0,NULL,2,18,'0',0,0,0,1,0,0,0,'rp@gmail.com','2022-04-17',1,0,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',94,'019247919',100000,0,NULL,NULL,NULL,NULL,NULL,0),(8,0,1,7,'fr',NULL,NULL,'aa',0,NULL,1,18,'0',0,0,0,1,0,0,0,NULL,'2022-04-17',1,0,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',0,NULL,10000,0,NULL,NULL,NULL,NULL,NULL,0),(9,0,1,8,'Mr. Masud Khan',NULL,'Dhaka','MK',0,NULL,1,18,'Bangladesh',0,0,0,1,0,0,0,'masud@gmail.com','2022-04-17',1,0,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',3,'0192469126',10000,0,NULL,NULL,'m&C',NULL,NULL,0),(10,0,1,9,'Mr. kalam Khan',NULL,'Dhaka','KK',0,NULL,1,18,'Bangladesh',0,0,0,1,0,0,0,'khan@gmail.com','2022-04-17',1,0,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',3,'019234468',0,0,NULL,NULL,'K&K',NULL,NULL,0),(11,0,1,10,'Amin KhN',NULL,'Dhaka','AM',0,NULL,1,18,'Bangladesh',0,0,0,1,0,0,0,'khan@gmail.com','2022-04-17',1,0,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',3,'01987656',0,0,NULL,NULL,'Amin Jweleris',NULL,NULL,0),(12,0,1,11,'asd',NULL,NULL,'asd',0,NULL,1,18,'0',0,0,0,1,0,0,0,NULL,'2022-04-18',1,0,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',0,NULL,10000,0,NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `accountchart` ENABLE KEYS */;
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
