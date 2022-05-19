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
-- Table structure for table `subledger`
--

DROP TABLE IF EXISTS `subledger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subledger` (
  `id` bigint NOT NULL,
  `datecreated` date DEFAULT NULL,
  `interestrate` double DEFAULT NULL,
  `accountid` bigint DEFAULT NULL,
  `aliasname` varchar(255) DEFAULT NULL,
  `branchid` bigint DEFAULT NULL,
  `compid` bigint DEFAULT NULL,
  `isactive` bit(1) DEFAULT NULL,
  `openingbalance` double DEFAULT NULL,
  `subledger` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subledger`
--

LOCK TABLES `subledger` WRITE;
/*!40000 ALTER TABLE `subledger` DISABLE KEYS */;
INSERT INTO `subledger` VALUES (58,NULL,NULL,2,NULL,0,18,_binary '\0',0,'jjjj'),(111,NULL,NULL,2,NULL,0,18,_binary '\0',0,'secont subledger'),(244,NULL,NULL,4,NULL,0,18,_binary '\0',0,'subledger for depreciation ex'),(248,NULL,NULL,1,'abc',0,18,_binary '\0',10000,'cash'),(252,NULL,NULL,7,NULL,0,18,_binary '\0',10000,'Furniture subledger');
/*!40000 ALTER TABLE `subledger` ENABLE KEYS */;
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
