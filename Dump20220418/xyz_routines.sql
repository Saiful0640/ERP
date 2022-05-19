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
-- Temporary view structure for view `personalinfo`
--

DROP TABLE IF EXISTS `personalinfo`;
/*!50001 DROP VIEW IF EXISTS `personalinfo`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `personalinfo` AS SELECT 
 1 AS `membercode`,
 1 AS `membername`,
 1 AS `description`,
 1 AS `Department`,
 1 AS `id`,
 1 AS `departmentid`,
 1 AS `designationid`,
 1 AS `compid`,
 1 AS `moduleid`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `holidayss`
--

DROP TABLE IF EXISTS `holidayss`;
/*!50001 DROP VIEW IF EXISTS `holidayss`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `holidayss` AS SELECT 
 1 AS `holiday`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `personalinfo`
--

/*!50001 DROP VIEW IF EXISTS `personalinfo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `personalinfo` AS select `employeinfo`.`membercode` AS `membercode`,`employeinfo`.`membername` AS `membername`,`designation`.`description` AS `description`,`department`.`description` AS `Department`,`employeinfo`.`id` AS `id`,`employmentinfo`.`departmentid` AS `departmentid`,`employmentinfo`.`designationid` AS `designationid`,`employeinfo`.`compid` AS `compid`,`employeinfo`.`moduleid` AS `moduleid` from (`employeinfo` left join ((`employmentinfo` left join `designation` on(((`employmentinfo`.`compid` = `designation`.`compid`) and (`employmentinfo`.`designationid` = `designation`.`id`)))) left join `department` on(((`employmentinfo`.`departmentid` = `department`.`id`) and (`employmentinfo`.`compid` = `department`.`compid`)))) on(((`employmentinfo`.`membercode` = `employeinfo`.`membercode`) and (`employmentinfo`.`compid` = `employeinfo`.`compid`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `holidayss`
--

/*!50001 DROP VIEW IF EXISTS `holidayss`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `holidayss` AS select count(`holidaysetup`.`hdate`) AS `holiday` from `holidaysetup` where ((`holidaysetup`.`hyear` between '20220101' and '20220601') and (`holidaysetup`.`note` > '0')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-18 14:41:58
