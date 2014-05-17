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
  `Activated` int(1) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `RelationshipAlias` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `Image_Store`
--

DROP TABLE IF EXISTS `Image_Store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Image_Store` (
  `ImageId` varchar(36) DEFAULT NULL,
  `ImageName` varchar(50) DEFAULT NULL,
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UserId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `ImageId` varchar(36) DEFAULT NULL,
  `ImageName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-05-17  0:45:22
