-- MySQL dump 10.13  Distrib 5.6.13, for osx10.8 (x86_64)
--
-- Host: localhost    Database: WishListDB
-- ------------------------------------------------------
-- Server version	5.6.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Account_Details`
--

DROP TABLE IF EXISTS `Account_Details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Account_Details` (
  `UserId` varchar(36) DEFAULT NULL,
  `Password` varchar(40) DEFAULT NULL,
  `Type` int(11) DEFAULT NULL,
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `EmailId` varchar(30) DEFAULT NULL,
  `ContactNumber` varchar(30) DEFAULT NULL,
  `Name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Account_Details`
--

LOCK TABLES `Account_Details` WRITE;
/*!40000 ALTER TABLE `Account_Details` DISABLE KEYS */;
INSERT INTO `Account_Details` VALUES ('f61827d6-2a21-44ec-8a32-49925e2758e4','abc',2,1,'2014-04-08 03:10:56','abc@abc.com',NULL,'ravi'),('6df11ca8-0ee2-4097-a544-f7ca81cb855b','ravi',2,2,'2014-04-08 09:04:51','ravi@abc.com',NULL,'ravi'),('70603ab0-0812-44d1-8c0a-89ef912ef987','a',2,3,'2014-04-08 09:05:23','a@a.com',NULL,'a'),('376d2cc1-ac94-441b-a94f-4bafbb068a33','a',2,4,'2014-04-08 09:05:24','a@a.com',NULL,'a'),('6bdc8632-ada2-43b0-95a5-6524e898ffab','a',2,5,'2014-04-08 09:08:00','a@a.com',NULL,'a'),('8f26e4b9-f882-4f4c-9527-c9cfbbe6df54','a',2,6,'2014-04-08 09:08:33','a',NULL,'a'),('d463973a-5733-42de-a9d3-cdcdcc4577a2','a',2,7,'2014-04-08 09:09:46','a',NULL,'a'),('93bdca0f-8371-4f9f-891a-5ce235043879','nbas',2,8,'2014-04-08 09:18:44','bb',NULL,'a'),('89923a63-0d32-41f0-954f-39e0dbd57add','asds',2,9,'2014-04-08 09:19:08','bbasd',NULL,'a'),('66732c04-80b5-4b6b-adb3-a5e757779feb','sda',2,10,'2014-04-08 09:19:18','adsa',NULL,'ad');
/*!40000 ALTER TABLE `Account_Details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Group_Relationships`
--

DROP TABLE IF EXISTS `Group_Relationships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Group_Relationships` (
  `UserId` varchar(36) DEFAULT NULL,
  `RelativeId` varchar(36) DEFAULT NULL,
  `GroupId` int(11) DEFAULT NULL,
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Group_Relationships`
--

LOCK TABLES `Group_Relationships` WRITE;
/*!40000 ALTER TABLE `Group_Relationships` DISABLE KEYS */;
/*!40000 ALTER TABLE `Group_Relationships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Group_Type`
--

DROP TABLE IF EXISTS `Group_Type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Group_Type` (
  `GroupId` int(11) DEFAULT NULL,
  `GroupType` varchar(30) DEFAULT NULL,
  `GroupDescription` varchar(50) DEFAULT NULL,
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Group_Type`
--

LOCK TABLES `Group_Type` WRITE;
/*!40000 ALTER TABLE `Group_Type` DISABLE KEYS */;
/*!40000 ALTER TABLE `Group_Type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Item_Details`
--

DROP TABLE IF EXISTS `Item_Details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Item_Details` (
  `ItemId` varchar(36) DEFAULT NULL,
  `ItemName` varchar(30) DEFAULT NULL,
  `Price` double DEFAULT NULL,
  `ItemDescription` varchar(100) DEFAULT NULL,
  `Category` varchar(30) DEFAULT NULL,
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Brand` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Item_Details`
--

LOCK TABLES `Item_Details` WRITE;
/*!40000 ALTER TABLE `Item_Details` DISABLE KEYS */;
INSERT INTO `Item_Details` VALUES ('f61827d6-2a21-44ec-8a32-49925e2758e4','Shoes',1,'abasdasdasab',NULL,2,'2014-04-08 03:50:34',NULL),('f61827d6-2a21-44ec-8a32-29325e275814','Shoes',NULL,'abc',NULL,3,'2014-04-08 05:40:44',NULL),('f61827d6-2a21-44ec-8a32-29925e275814','Shoes',NULL,'abc',NULL,4,'2014-04-08 05:41:02',NULL),('f61827d6-2a21-44ec-8a32-49925e275814','Shoes',NULL,'abc',NULL,5,'2014-04-08 05:41:20',NULL),('c53662e6-8d13-458d-adca-c870775b7d06','Bottle',NULL,NULL,NULL,6,'2014-04-10 04:46:48','Nalgene'),('d3d892ce-dbfe-4807-a8fc-4080aed41af3','Card',NULL,NULL,NULL,7,'2014-04-10 04:47:29','Nalgene'),('363ba17a-c7fe-47e4-9dfc-65c91aa16726','Soap',NULL,NULL,NULL,8,'2014-04-10 04:50:52','Lux');
/*!40000 ALTER TABLE `Item_Details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_WishList`
--

DROP TABLE IF EXISTS `User_WishList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_WishList` (
  `UserId` varchar(36) DEFAULT NULL,
  `WishListId` varchar(36) DEFAULT NULL,
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_WishList`
--

LOCK TABLES `User_WishList` WRITE;
/*!40000 ALTER TABLE `User_WishList` DISABLE KEYS */;
INSERT INTO `User_WishList` VALUES ('f61827d6-2a21-44ec-8a32-49925e2758e4','b9039bcc-c964-4d21-8024-224131776c38',1,'2014-04-08 03:10:56'),('6df11ca8-0ee2-4097-a544-f7ca81cb855b','6b378801-8141-41a1-91cb-597a4282410c',2,'2014-04-08 09:04:51'),('70603ab0-0812-44d1-8c0a-89ef912ef987','3a23a9c1-d3e5-4551-a0e2-cc48588dbac2',3,'2014-04-08 09:05:23'),('376d2cc1-ac94-441b-a94f-4bafbb068a33','1546c376-8417-41f0-9448-558170647d90',4,'2014-04-08 09:05:24'),('6bdc8632-ada2-43b0-95a5-6524e898ffab','fe8bb695-4fa4-4c35-b3c1-795c46dc15f4',5,'2014-04-08 09:08:00'),('8f26e4b9-f882-4f4c-9527-c9cfbbe6df54','d2aa291a-378c-41f1-9b4e-34f421f326db',6,'2014-04-08 09:08:33'),('d463973a-5733-42de-a9d3-cdcdcc4577a2','7501d05b-2200-4df2-aea2-c8a42c064306',7,'2014-04-08 09:09:46'),('93bdca0f-8371-4f9f-891a-5ce235043879','01a3e11d-d884-4351-a6b7-9a30a39baaeb',8,'2014-04-08 09:18:44'),('89923a63-0d32-41f0-954f-39e0dbd57add','49b90d32-595a-4428-bbf7-55c6de7faa96',9,'2014-04-08 09:19:08'),('66732c04-80b5-4b6b-adb3-a5e757779feb','cc78f1aa-9d9a-4475-88aa-952f13538fed',10,'2014-04-08 09:19:18');
/*!40000 ALTER TABLE `User_WishList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Wish_Group_Visibility`
--

DROP TABLE IF EXISTS `Wish_Group_Visibility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Wish_Group_Visibility` (
  `WishId` varchar(36) DEFAULT NULL,
  `GroupId` int(11) DEFAULT NULL,
  `IsVisible` tinyint(4) DEFAULT NULL,
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Wish_Group_Visibility`
--

LOCK TABLES `Wish_Group_Visibility` WRITE;
/*!40000 ALTER TABLE `Wish_Group_Visibility` DISABLE KEYS */;
/*!40000 ALTER TABLE `Wish_Group_Visibility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Wish_WishList`
--

DROP TABLE IF EXISTS `Wish_WishList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Wish_WishList` (
  `WishId` varchar(36) DEFAULT NULL,
  `ItemId` varchar(36) DEFAULT NULL,
  `WishListId` varchar(36) DEFAULT NULL,
  `ApproxPrice` double DEFAULT NULL,
  `IsReserved` tinyint(4) DEFAULT '0',
  `IsAcquired` tinyint(4) DEFAULT '0',
  `ReservedBy` varchar(36) DEFAULT NULL,
  `AcquiredBy` varchar(36) DEFAULT NULL,
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UserId` varchar(36) DEFAULT NULL,
  `Description` varchar(100) DEFAULT NULL,
  `PreferredBrand` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Wish_WishList`
--

LOCK TABLES `Wish_WishList` WRITE;
/*!40000 ALTER TABLE `Wish_WishList` DISABLE KEYS */;
INSERT INTO `Wish_WishList` VALUES ('4e65ab3a-7482-4df0-8820-54558b0e99b0','f61827d6-2a21-44ec-8a32-49925e275854','b9039bcc-c964-4d21-8024-224131776c38',5,1,NULL,'f61827d6-2a21-44ec-8a32-49925e2758e4',NULL,3,'2014-04-08 03:48:18','f61827d6-2a21-44ec-8a32-49925e2758e4','LargeShoes','Nike'),('b7645f31-387f-471b-b11f-88067c8870db','f61827d6-2a21-44ec-8a32-49925e275814','b9039bcc-c964-4d21-8024-224131776c38',5,0,0,NULL,NULL,6,'2014-04-08 05:29:33','f61827d6-2a21-44ec-8a32-49925e2758e4','LargeShoes','Nike'),('a9c87813-2fe1-4ccc-ada7-ac31f244ac07','f61827d6-2a21-44ec-8a32-29925e275814','b9039bcc-c964-4d21-8024-224131776c38',5,0,0,NULL,NULL,7,'2014-04-08 05:29:39','f61827d6-2a21-44ec-8a32-49925e2758e4','LargeShoes','Nike'),('565864e5-1ee7-49a0-96dc-c129a4caac5e','f61827d6-2a21-44ec-8a32-29325e275814','b9039bcc-c964-4d21-8024-224131776c38',5,0,0,NULL,NULL,8,'2014-04-08 05:29:42','f61827d6-2a21-44ec-8a32-49925e2758e4','LargeShoes','Nike'),('4dfa45db-3fb8-4cda-83f7-84f9948f5707','8b0835ac-f544-4a14-a0de-8a0db1126660','b9039bcc-c964-4d21-8024-224131776c38',2000,0,0,NULL,NULL,9,'2014-04-10 04:17:31','f61827d6-2a21-44ec-8a32-49925e2758e4','White In Color','Maruti'),('f32659f7-c45d-4fdc-b319-2fde2cdafd1f','c53662e6-8d13-458d-adca-c870775b7d06','b9039bcc-c964-4d21-8024-224131776c38',20,0,0,NULL,NULL,10,'2014-04-10 04:46:48','f61827d6-2a21-44ec-8a32-49925e2758e4','Blue','Nalgene');
/*!40000 ALTER TABLE `Wish_WishList` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-04-10  2:14:59
