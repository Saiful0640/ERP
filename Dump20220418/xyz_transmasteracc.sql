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
-- Table structure for table `transmasteracc`
--

DROP TABLE IF EXISTS `transmasteracc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transmasteracc` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `approvestatus` int DEFAULT NULL,
  `bankbranch` varchar(255) DEFAULT NULL,
  `billaddress` varchar(255) DEFAULT NULL,
  `billcontractno` varchar(255) DEFAULT NULL,
  `billcountry` varchar(255) DEFAULT NULL,
  `billemail` varchar(255) DEFAULT NULL,
  `billto` varchar(255) DEFAULT NULL,
  `branchid` bigint DEFAULT NULL,
  `chequedate` varchar(255) DEFAULT NULL,
  `chequeno` varchar(255) DEFAULT NULL,
  `compid` bigint DEFAULT NULL,
  `conrate` double DEFAULT NULL,
  `createdate` date DEFAULT NULL,
  `currencyrate` double DEFAULT NULL,
  `discountamount` double DEFAULT NULL,
  `discountrate` double DEFAULT NULL,
  `empid` bigint DEFAULT NULL,
  `formatevoucherno` varchar(255) DEFAULT NULL,
  `labourecost` double DEFAULT NULL,
  `moneyreciptid` bigint DEFAULT NULL,
  `narration` varchar(255) DEFAULT NULL,
  `netpayable` double DEFAULT NULL,
  `otheraddition` double DEFAULT NULL,
  `otherdeduction` double DEFAULT NULL,
  `paidamount` double DEFAULT NULL,
  `partyid` bigint DEFAULT NULL,
  `paymode` int DEFAULT NULL,
  `refaccountid` bigint DEFAULT NULL,
  `refbillid` int DEFAULT NULL,
  `refno` varchar(255) DEFAULT NULL,
  `salespersonempcode` varchar(255) DEFAULT NULL,
  `taxtamount` double DEFAULT NULL,
  `taxtrate` double DEFAULT NULL,
  `totalamount` double DEFAULT NULL,
  `transid` bigint DEFAULT NULL,
  `transtype` int DEFAULT NULL,
  `transportcost` double DEFAULT NULL,
  `userid` bigint DEFAULT NULL,
  `vatrate` double DEFAULT NULL,
  `voucherdate` varchar(255) DEFAULT NULL,
  `voucherno` int DEFAULT NULL,
  `vouchertype` varchar(255) DEFAULT NULL,
  `yearid` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transmasteracc`
--

LOCK TABLES `transmasteracc` WRITE;
/*!40000 ALTER TABLE `transmasteracc` DISABLE KEYS */;
INSERT INTO `transmasteracc` VALUES (1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,18,NULL,NULL,NULL,NULL,NULL,NULL,'2021-2022-CP-1',NULL,NULL,NULL,0,NULL,NULL,NULL,1,0,1,0,NULL,NULL,NULL,NULL,10000,1,11,NULL,31,NULL,'20220418',1,'CashPayment',56),(2,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,18,NULL,NULL,NULL,NULL,NULL,NULL,'2021-2022-CP-2',NULL,NULL,NULL,0,NULL,NULL,NULL,1,0,1,0,NULL,NULL,NULL,NULL,10000,2,11,NULL,31,NULL,'20220418',2,'CashPayment',56),(3,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,18,NULL,NULL,NULL,NULL,NULL,NULL,'2021-2022-CR-1',NULL,NULL,NULL,0,NULL,NULL,NULL,1,0,1,0,NULL,NULL,NULL,NULL,10000,1,11,NULL,31,NULL,'20220418',1,'CashReceive',56),(4,0,NULL,NULL,NULL,NULL,NULL,NULL,0,'20220418',NULL,18,NULL,NULL,NULL,NULL,NULL,NULL,'2021-2022-BP-1',NULL,NULL,NULL,0,NULL,NULL,NULL,4,0,4,0,NULL,NULL,NULL,NULL,10000,1,12,NULL,31,NULL,'20220418',1,'BankPayment',56),(5,0,NULL,NULL,NULL,NULL,NULL,NULL,0,'4/18/2022',NULL,18,NULL,NULL,NULL,NULL,NULL,NULL,'2021-2022-BP-2',NULL,NULL,NULL,0,NULL,NULL,NULL,4,0,4,0,NULL,NULL,NULL,NULL,10000,2,12,NULL,31,NULL,'4/18/2022',2,'BankReceive',56),(6,0,NULL,NULL,NULL,NULL,NULL,NULL,0,'20220418',NULL,18,NULL,NULL,NULL,NULL,NULL,NULL,'2021-2022-JO-1',NULL,NULL,NULL,0,NULL,NULL,NULL,4,0,4,0,'2222',NULL,NULL,NULL,1000,1,13,NULL,31,NULL,'20220418',1,'JournalEntry',56);
/*!40000 ALTER TABLE `transmasteracc` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-18 14:41:54
