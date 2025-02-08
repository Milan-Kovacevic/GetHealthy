-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: get_healthy
-- ------------------------------------------------------
-- Server version	8.0.38

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
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `UserId` int NOT NULL,
  PRIMARY KEY (`UserId`),
  CONSTRAINT `fk_ADMINISTRATOR_USER_ACCOUNT` FOREIGN KEY (`UserId`) REFERENCES `user_account` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (1);
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CategoryId` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(128) NOT NULL,
  PRIMARY KEY (`CategoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Strength'),(2,'Cardio'),(3,'Flexibility'),(4,'Endurance'),(5,'Balance'),(6,'Weight Loss'),(7,'HIIT'),(8,'Pilates'),(9,'Yoga'),(10,'Functional Training'),(11,'Rehabilitation'),(12,'Powerlifting'),(13,'Bodybuilding'),(14,'CrossFit'),(15,'Mobility'),(16,'Martial Arts'),(17,'Sports Performance'),(18,'Dance Fitness'),(19,'Prenatal Fitness'),(20,'Postnatal Fitness'),(21,'Aquatic Training'),(22,'Core Strength'),(23,'Stretching'),(24,'Circuit Training'),(25,'Mental Wellness'),(26,'Athletic Conditioning'),(27,'Outdoor Training'),(28,'Senior Fitness'),(29,'Kids Fitness'),(30,'Mindfulness & Meditation'),(31,'Self-defense'),(32,'Kettlebell Training'),(33,'TRX Training'),(34,'Bootcamp'),(35,'Running'),(36,'Cycling'),(37,'Swimming'),(38,'Climbing'),(39,'Rowing'),(40,'Boxing');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `CommentId` int NOT NULL AUTO_INCREMENT,
  `Content` varchar(512) NOT NULL,
  `DatePosted` datetime NOT NULL,
  `UserId` int NOT NULL,
  `ProgramId` int NOT NULL,
  PRIMARY KEY (`CommentId`),
  KEY `fk_COMMENT_TRAINEE_idx` (`UserId`),
  KEY `fk_COMMENT_TRAINING_PROGRAM_idx` (`ProgramId`),
  CONSTRAINT `fk_COMMENT_TRAINEE` FOREIGN KEY (`UserId`) REFERENCES `trainee` (`UserId`) ON DELETE CASCADE,
  CONSTRAINT `fk_COMMENT_TRAINING_PROGRAM` FOREIGN KEY (`ProgramId`) REFERENCES `training_program` (`ProgramId`) ON DELETE CASCADE,
  CONSTRAINT `FKdvidd63j3j11h5ahh0jevhjdo` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'Great program for beginners!','2024-12-20 12:00:00',3,1);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise`
--

DROP TABLE IF EXISTS `exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise` (
  `ExerciseId` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(128) NOT NULL,
  `Description` varchar(512) DEFAULT NULL,
  `VideoLink` varchar(255) DEFAULT NULL,
  `FirstExerciseMetricId` int NOT NULL,
  `SecondExerciseMetricId` int DEFAULT NULL,
  PRIMARY KEY (`ExerciseId`),
  KEY `fk_EXERCISE_EXERCISE_METRIC1_idx` (`FirstExerciseMetricId`),
  KEY `fk_EXERCISE_EXERCISE_METRIC2_idx` (`SecondExerciseMetricId`),
  CONSTRAINT `fk_EXERCISE_EXERCISE_METRIC1` FOREIGN KEY (`FirstExerciseMetricId`) REFERENCES `exercise_metric` (`Id`),
  CONSTRAINT `fk_EXERCISE_EXERCISE_METRIC2` FOREIGN KEY (`SecondExerciseMetricId`) REFERENCES `exercise_metric` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise`
--

LOCK TABLES `exercise` WRITE;
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;
INSERT INTO `exercise` VALUES (1,'Push-Up','A basic push-up exercise for upper body strength.','https://example.com/pushup',1,NULL),(2,'Plank','Core strengthening plank exercise.','https://example.com/plank',2,NULL),(3,'Running','A cardiovascular exercise for endurance and stamina.','https://example.com/running',3,2),(4,'Deadlift','A weightlifting exercise to build strength in the lower body.','https://example.com/deadlift',4,NULL),(5,'Cycling','A low-impact exercise for improving cardiovascular fitness.','https://example.com/cycling',3,5),(6,'Burpees','A full-body exercise that increases strength and endurance.','https://example.com/burpees',1,2),(7,'Jump Rope','A cardio exercise that improves coordination and burns calories.','https://example.com/jumprope',3,2),(8,'Squats','A lower-body exercise to build leg and glute strength.','https://example.com/squats',1,4),(9,'Bench Press','An upper-body strength exercise for chest muscles.','https://example.com/benchpress',1,4),(10,'Yoga','A flexibility and balance exercise.','https://example.com/yoga',2,6),(11,'Pull-Ups','An upper-body strength exercise focusing on the back and arms.','https://example.com/pullups',1,NULL),(12,'Leg Press','A lower-body exercise to strengthen legs using a machine.','https://example.com/legpress',4,NULL),(13,'Bicep Curl','An arm exercise to strengthen biceps.','https://example.com/bicepcurl',4,NULL),(14,'Tricep Dips','An exercise to strengthen triceps.','https://example.com/tricepdips',1,NULL),(15,'Lunges','A lower-body exercise for improving balance and leg strength.','https://example.com/lunges',1,4),(16,'Shoulder Press','An upper-body exercise to strengthen shoulders.','https://example.com/shoulderpress',1,4),(17,'Lat Pulldown','An exercise to strengthen the back muscles.','https://example.com/latpulldown',4,NULL),(18,'Chest Fly','An upper-body exercise to target chest muscles.','https://example.com/chestfly',4,NULL),(19,'Leg Curl','A lower-body exercise to strengthen hamstrings.','https://example.com/legcurl',4,NULL),(20,'Ab Crunch','An exercise to strengthen abdominal muscles.','https://example.com/abcrunch',1,5);
/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_feedback`
--

DROP TABLE IF EXISTS `exercise_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_feedback` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Skipped` tinyint(1) NOT NULL,
  `TraineeExercisingId` int NOT NULL,
  `ExerciseId` int NOT NULL,
  `ProgramExerciseId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_EXERCISE_FEEDBACK_TRAINEE_EXERCISING1_idx` (`TraineeExercisingId`),
  KEY `fk_EXERCISE_FEEDBACK_EXERCISE1_idx` (`ExerciseId`),
  KEY `fk_EXERCISE_FEEDBACK_TRAINING_PROGRAM_EXERCISE1_idx` (`ProgramExerciseId`),
  CONSTRAINT `fk_EXERCISE_FEEDBACK_EXERCISE1` FOREIGN KEY (`ExerciseId`) REFERENCES `exercise` (`ExerciseId`),
  CONSTRAINT `fk_EXERCISE_FEEDBACK_TRAINEE_EXERCISING1` FOREIGN KEY (`TraineeExercisingId`) REFERENCES `trainee_exercising` (`Id`),
  CONSTRAINT `fk_EXERCISE_FEEDBACK_TRAINING_PROGRAM_EXERCISE1` FOREIGN KEY (`ProgramExerciseId`) REFERENCES `training_program_exercise` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_feedback`
--

LOCK TABLES `exercise_feedback` WRITE;
/*!40000 ALTER TABLE `exercise_feedback` DISABLE KEYS */;
INSERT INTO `exercise_feedback` VALUES (1,0,1,1,1),(2,0,1,11,2),(3,0,1,9,3),(4,0,1,14,4),(5,0,1,16,5),(6,0,2,1,1),(7,0,2,11,2),(8,0,2,9,3),(9,0,2,14,4),(10,0,2,16,5),(11,1,3,1,1),(12,0,3,11,2),(13,0,3,9,3),(14,0,3,14,4),(15,0,3,16,5),(16,0,4,1,1),(17,0,4,11,2),(18,0,4,9,3),(19,0,4,14,4),(20,0,4,16,5),(21,0,5,1,1),(22,0,5,11,2),(23,0,5,9,3),(24,0,5,14,4),(25,0,5,16,5),(26,0,6,1,1),(27,0,6,11,2),(28,0,6,9,3),(29,0,6,14,4),(30,0,6,16,5),(31,0,7,1,1),(32,0,7,11,2),(33,0,7,9,3),(34,0,7,14,4),(35,0,7,16,5),(36,0,8,1,1),(37,0,8,11,2),(38,0,8,9,3),(39,0,8,14,4),(40,0,8,16,5),(41,0,9,1,1),(42,0,9,11,2),(43,0,9,9,3),(44,0,9,14,4),(45,0,9,16,5),(46,0,10,1,1),(47,0,10,11,2),(48,0,10,9,3),(49,0,10,14,4),(50,0,10,16,5),(51,0,11,1,1),(52,0,11,11,2),(53,0,11,9,3),(54,0,11,14,4),(55,0,11,16,5),(56,0,12,1,1),(57,0,12,11,2),(58,0,12,9,3),(59,0,12,14,4),(60,0,12,16,5),(61,0,13,1,1),(62,0,13,11,2),(63,0,13,9,3),(64,0,13,14,4),(65,0,13,16,5),(66,0,14,1,1),(67,0,14,11,2),(68,0,14,9,3),(69,0,14,14,4),(70,0,14,16,5),(71,0,15,1,1),(72,0,15,11,2),(73,0,15,9,3),(74,0,15,14,4),(75,0,15,16,5);
/*!40000 ALTER TABLE `exercise_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_metric`
--

DROP TABLE IF EXISTS `exercise_metric`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_metric` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(128) NOT NULL,
  `Unit` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_metric`
--

LOCK TABLES `exercise_metric` WRITE;
/*!40000 ALTER TABLE `exercise_metric` DISABLE KEYS */;
INSERT INTO `exercise_metric` VALUES (1,'Repetitions','reps'),(2,'Time','seconds'),(3,'Distance','meters'),(4,'Weight','kg'),(5,'Calories','kcal'),(6,'Heart Rate','bpm');
/*!40000 ALTER TABLE `exercise_metric` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_set`
--

DROP TABLE IF EXISTS `exercise_set`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_set` (
  `ExerciseSetId` int NOT NULL AUTO_INCREMENT,
  `ProgramExericseId` int NOT NULL,
  `RestTime` int NOT NULL,
  `FirstMetricValue` varchar(128) NOT NULL,
  `SecondMetricValue` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`ExerciseSetId`),
  KEY `fk_EXERCISE_REP_TRAINING_PROGRAM_EXERCISE1_idx` (`ProgramExericseId`),
  CONSTRAINT `fk_EXERCISE_REP_TRAINING_PROGRAM_EXERCISE1` FOREIGN KEY (`ProgramExericseId`) REFERENCES `training_program_exercise` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_set`
--

LOCK TABLES `exercise_set` WRITE;
/*!40000 ALTER TABLE `exercise_set` DISABLE KEYS */;
INSERT INTO `exercise_set` VALUES (1,1,60,'15',NULL),(2,1,60,'15',NULL),(3,1,60,'15',NULL),(4,1,60,'15',NULL),(5,2,90,'10',NULL),(6,2,90,'10',NULL),(7,2,90,'10',NULL),(8,2,90,'10',NULL),(9,3,90,'10','100'),(10,3,90,'10','100'),(11,3,90,'10','100'),(12,3,90,'10','100'),(13,4,60,'15',NULL),(14,4,60,'15',NULL),(15,4,60,'15',NULL),(16,5,60,'12','50'),(17,5,60,'12','50'),(18,5,60,'12','50');
/*!40000 ALTER TABLE `exercise_set` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_set_feedback`
--

DROP TABLE IF EXISTS `exercise_set_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_set_feedback` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ExerciseFeedbackId` int NOT NULL,
  `Skipped` tinyint(1) NOT NULL,
  `Completed` tinyint(1) NOT NULL,
  `FirstMetricValueFeedback` varchar(128) DEFAULT NULL,
  `SecondMetricValueFeedback` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_EXERCISE_SET_FEEDBACK_EXERCISE_FEEDBACK1_idx` (`ExerciseFeedbackId`),
  CONSTRAINT `fk_EXERCISE_SET_FEEDBACK_EXERCISE_FEEDBACK1` FOREIGN KEY (`ExerciseFeedbackId`) REFERENCES `exercise_feedback` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=271 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_set_feedback`
--

LOCK TABLES `exercise_set_feedback` WRITE;
/*!40000 ALTER TABLE `exercise_set_feedback` DISABLE KEYS */;
INSERT INTO `exercise_set_feedback` VALUES (1,1,0,0,'3',NULL),(2,1,0,0,'3',NULL),(3,1,0,0,'3',NULL),(4,1,0,0,'3',NULL),(5,2,0,0,'3',NULL),(6,2,0,0,'3',NULL),(7,2,0,0,'3',NULL),(8,2,0,0,'3',NULL),(9,3,0,0,'3','11'),(10,3,0,0,'2','11'),(11,3,0,0,'3','11'),(12,3,0,0,'3','11'),(13,4,0,0,'3',NULL),(14,4,0,0,'3',NULL),(15,4,0,0,'2',NULL),(16,5,0,0,'2','12'),(17,5,0,0,'2','12'),(18,5,0,0,'2','12'),(19,6,0,0,'3',NULL),(20,6,0,0,'3',NULL),(21,6,0,0,'3',NULL),(22,6,0,0,'3',NULL),(23,7,0,0,'4',NULL),(24,7,0,0,'4',NULL),(25,7,0,0,'3',NULL),(26,7,0,0,'3',NULL),(27,8,0,0,'4','13'),(28,8,0,0,'3','13'),(29,8,0,0,'4','13'),(30,8,0,0,'4','13'),(31,9,0,0,'4',NULL),(32,9,0,0,'3',NULL),(33,9,0,0,'4',NULL),(34,10,0,0,'4','14'),(35,10,0,0,'3','14'),(36,10,0,0,'4','14'),(37,11,0,0,'4',NULL),(38,11,0,0,'3',NULL),(39,11,0,0,'3',NULL),(40,11,0,0,'4',NULL),(41,12,0,0,'3',NULL),(42,12,0,0,'4',NULL),(43,12,0,0,'3',NULL),(44,12,0,0,'4',NULL),(45,13,0,0,'5','15'),(46,13,0,0,'5','15'),(47,13,0,0,'5','15'),(48,13,0,0,'4','15'),(49,14,0,0,'5',NULL),(50,14,0,0,'4',NULL),(51,14,0,0,'5',NULL),(52,15,0,0,'5','16'),(53,15,0,0,'5','16'),(54,15,0,0,'5','16'),(55,16,0,0,'5',NULL),(56,16,0,0,'5',NULL),(57,16,0,0,'5',NULL),(58,16,0,0,'5',NULL),(59,17,0,0,'5',NULL),(60,17,0,0,'5',NULL),(61,17,0,0,'5',NULL),(62,17,0,0,'5',NULL),(63,18,0,0,'5','17'),(64,18,0,0,'4','17'),(65,18,0,0,'5','17'),(66,18,0,0,'4','17'),(67,19,0,0,'6',NULL),(68,19,0,0,'6',NULL),(69,19,0,0,'6',NULL),(70,20,0,0,'6','18'),(71,20,0,0,'6','18'),(72,20,0,0,'6','18'),(73,21,0,0,'5',NULL),(74,21,0,0,'6',NULL),(75,21,0,0,'6',NULL),(76,21,0,0,'5',NULL),(77,22,0,0,'6',NULL),(78,22,0,0,'5',NULL),(79,22,0,0,'6',NULL),(80,22,0,0,'6',NULL),(81,23,0,0,'5','19'),(82,23,0,0,'6','19'),(83,23,0,0,'5','19'),(84,23,0,0,'6','19'),(85,24,0,0,'5',NULL),(86,24,0,0,'5',NULL),(87,24,0,0,'6',NULL),(88,25,0,0,'7','20'),(89,25,0,0,'7','20'),(90,25,0,0,'7','20'),(91,26,0,0,'6',NULL),(92,26,0,0,'7',NULL),(93,26,0,0,'6',NULL),(94,26,0,0,'7',NULL),(95,27,0,0,'7',NULL),(96,27,0,0,'6',NULL),(97,27,0,0,'7',NULL),(98,27,0,0,'7',NULL),(99,28,0,0,'7','21'),(100,28,0,0,'7','21'),(101,28,0,0,'7','21'),(102,28,0,0,'6','21'),(103,29,0,0,'7',NULL),(104,29,0,0,'7',NULL),(105,29,0,0,'7',NULL),(106,30,0,0,'7','22'),(107,30,0,0,'7','22'),(108,30,0,0,'7','22'),(109,31,0,0,'7',NULL),(110,31,0,0,'7',NULL),(111,31,0,0,'7',NULL),(112,31,0,0,'6',NULL),(113,32,0,0,'7',NULL),(114,32,0,0,'8',NULL),(115,32,0,0,'7',NULL),(116,32,0,0,'8',NULL),(117,33,0,0,'8','24'),(118,33,0,0,'7','24'),(119,33,0,0,'8','24'),(120,33,0,0,'8','24'),(121,34,0,0,'8',NULL),(122,34,0,0,'8',NULL),(123,34,0,0,'7',NULL),(124,35,0,0,'8','24'),(125,35,0,0,'8','24'),(126,35,0,0,'7','24'),(127,36,0,0,'8',NULL),(128,36,0,0,'8',NULL),(129,36,0,0,'8',NULL),(130,36,0,0,'8',NULL),(131,37,0,0,'8',NULL),(132,37,0,0,'8',NULL),(133,37,0,0,'7',NULL),(134,37,0,0,'8',NULL),(135,38,0,0,'9','26'),(136,38,0,0,'9','26'),(137,38,0,0,'9','26'),(138,38,0,0,'9','26'),(139,39,0,0,'9',NULL),(140,39,0,0,'8',NULL),(141,39,0,0,'9',NULL),(142,40,0,0,'9','27'),(143,40,0,0,'9','27'),(144,40,0,0,'9','27'),(145,41,0,0,'9',NULL),(146,41,0,0,'9',NULL),(147,41,0,0,'9',NULL),(148,41,0,0,'8',NULL),(149,42,0,0,'9',NULL),(150,42,0,0,'9',NULL),(151,42,0,0,'9',NULL),(152,42,0,0,'9',NULL),(153,43,0,0,'9','28'),(154,43,0,0,'9','28'),(155,43,0,0,'9','28'),(156,43,0,0,'8','28'),(157,44,0,0,'10',NULL),(158,44,0,0,'10',NULL),(159,44,0,0,'10',NULL),(160,45,0,0,'10','29'),(161,45,0,0,'9','29'),(162,45,0,0,'10','29'),(163,46,0,0,'9',NULL),(164,46,0,0,'10',NULL),(165,46,0,0,'9',NULL),(166,46,0,0,'9',NULL),(167,47,0,0,'10',NULL),(168,47,0,0,'10',NULL),(169,47,0,0,'10',NULL),(170,47,0,0,'9',NULL),(171,48,0,0,'10','30'),(172,48,0,0,'10','30'),(173,48,0,0,'10','30'),(174,48,0,0,'10','30'),(175,49,0,0,'10',NULL),(176,49,0,0,'10',NULL),(177,49,0,0,'10',NULL),(178,50,0,0,'10','31'),(179,50,0,0,'11','31'),(180,50,0,0,'11','31'),(181,51,0,0,'11',NULL),(182,51,0,0,'11',NULL),(183,51,0,0,'11',NULL),(184,51,0,0,'11',NULL),(185,52,0,0,'11',NULL),(186,52,0,0,'11',NULL),(187,52,0,0,'11',NULL),(188,52,0,0,'11',NULL),(189,53,0,0,'11','32'),(190,53,0,0,'11','32'),(191,53,0,0,'10','32'),(192,53,0,0,'10','32'),(193,54,0,0,'10',NULL),(194,54,0,0,'11',NULL),(195,54,0,0,'11',NULL),(196,55,0,0,'11','33'),(197,55,0,0,'11','33'),(198,55,0,0,'10','33'),(199,56,0,0,'11',NULL),(200,56,0,0,'11',NULL),(201,56,0,0,'10',NULL),(202,56,0,0,'11',NULL),(203,57,0,0,'11',NULL),(204,57,0,0,'11',NULL),(205,57,0,0,'12',NULL),(206,57,0,0,'12',NULL),(207,58,0,0,'12','34'),(208,58,0,0,'12','34'),(209,58,0,0,'12','34'),(210,58,0,0,'12','34'),(211,59,0,0,'12',NULL),(212,59,0,0,'11',NULL),(213,59,0,0,'12',NULL),(214,60,0,0,'12','35'),(215,60,0,0,'12','35'),(216,60,0,0,'12','35'),(217,61,0,0,'11',NULL),(218,61,0,0,'12',NULL),(219,61,0,0,'12',NULL),(220,61,0,0,'12',NULL),(221,62,0,0,'12',NULL),(222,62,0,0,'12',NULL),(223,62,0,0,'11',NULL),(224,62,0,0,'11',NULL),(225,63,0,0,'13','36'),(226,63,0,0,'12','36'),(227,63,0,0,'13','36'),(228,63,0,0,'12','36'),(229,64,0,0,'13',NULL),(230,64,0,0,'13',NULL),(231,64,0,0,'13',NULL),(232,65,0,0,'13','37'),(233,65,0,0,'12','37'),(234,65,0,0,'12','37'),(235,66,0,0,'13',NULL),(236,66,0,0,'13',NULL),(237,66,0,0,'13',NULL),(238,66,0,0,'13',NULL),(239,67,0,0,'13',NULL),(240,67,0,0,'13',NULL),(241,67,0,0,'13',NULL),(242,67,0,0,'12',NULL),(243,68,0,0,'13','39'),(244,68,0,0,'12','39'),(245,68,0,0,'13','39'),(246,68,0,0,'13','39'),(247,69,0,0,'13',NULL),(248,69,0,0,'14',NULL),(249,69,0,0,'13',NULL),(250,70,0,0,'14','39'),(251,70,0,0,'14','39'),(252,70,0,0,'13','39'),(253,71,0,0,'13',NULL),(254,71,0,0,'13',NULL),(255,71,0,0,'14',NULL),(256,71,0,0,'14',NULL),(257,72,0,0,'14',NULL),(258,72,0,0,'14',NULL),(259,72,0,0,'14',NULL),(260,72,0,0,'14',NULL),(261,73,0,0,'14','41'),(262,73,0,0,'13','41'),(263,73,0,0,'14','41'),(264,73,0,0,'14','41'),(265,74,0,0,'13',NULL),(266,74,0,0,'14',NULL),(267,74,0,0,'14',NULL),(268,75,0,0,'14','42'),(269,75,0,0,'14','42'),(270,75,0,1,'15','42');
/*!40000 ALTER TABLE `exercise_set_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `NotificationId` int NOT NULL AUTO_INCREMENT,
  `MarkRead` tinyint(1) NOT NULL,
  `Metadata` varchar(255) DEFAULT NULL,
  `Date` datetime NOT NULL,
  `UserId` int NOT NULL,
  `SenderId` int NOT NULL,
  `NotificationType` tinyint NOT NULL,
  PRIMARY KEY (`NotificationId`),
  KEY `fk_NOTIFICATION_USER1_idx` (`SenderId`),
  KEY `fk_NOTIFICATION_USER` (`UserId`),
  CONSTRAINT `fk_NOTIFICATION_USER` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`) ON DELETE CASCADE,
  CONSTRAINT `fk_NOTIFICATION_USER1` FOREIGN KEY (`SenderId`) REFERENCES `user` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program_rating`
--

DROP TABLE IF EXISTS `program_rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `program_rating` (
  `Rate` int NOT NULL,
  `ProgramId` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`UserId`,`ProgramId`),
  UNIQUE KEY `UserId_ProgramId_UNIQUE` (`UserId`,`ProgramId`),
  KEY `fk_PROGRAM_RATING_TRAINING_PROGRAM_idx` (`ProgramId`) /*!80000 INVISIBLE */,
  KEY `fk_PROGRAM_RATING_TRAINEE_idx` (`UserId`),
  CONSTRAINT `fk_PROGRAM_RATING_TRAINEE` FOREIGN KEY (`UserId`) REFERENCES `trainee` (`UserId`) ON DELETE CASCADE,
  CONSTRAINT `fk_PROGRAM_RATING_TRAINING_PROGRAM` FOREIGN KEY (`ProgramId`) REFERENCES `training_program` (`ProgramId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program_rating`
--

LOCK TABLES `program_rating` WRITE;
/*!40000 ALTER TABLE `program_rating` DISABLE KEYS */;
INSERT INTO `program_rating` VALUES (5,1,3);
/*!40000 ALTER TABLE `program_rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qualification`
--

DROP TABLE IF EXISTS `qualification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qualification` (
  `UserId` int NOT NULL,
  `CertificationFilePath` varchar(255) NOT NULL,
  PRIMARY KEY (`UserId`),
  CONSTRAINT `fk_QUALIFICATION_TRAINER` FOREIGN KEY (`UserId`) REFERENCES `trainer` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qualification`
--

LOCK TABLES `qualification` WRITE;
/*!40000 ALTER TABLE `qualification` DISABLE KEYS */;
/*!40000 ALTER TABLE `qualification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration_request`
--

DROP TABLE IF EXISTS `registration_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registration_request` (
  `UserId` int NOT NULL,
  `IssueDate` datetime NOT NULL,
  `CertificationFilePath` varchar(255) NOT NULL,
  `Description` varchar(512) DEFAULT NULL,
  `FirstName` varchar(96) NOT NULL,
  `LastName` varchar(96) NOT NULL,
  PRIMARY KEY (`UserId`),
  CONSTRAINT `fk_REGISTRATION_REQUEST_USER_ACCOUNT` FOREIGN KEY (`UserId`) REFERENCES `user_account` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration_request`
--

LOCK TABLES `registration_request` WRITE;
/*!40000 ALTER TABLE `registration_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `registration_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainee`
--

DROP TABLE IF EXISTS `trainee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainee` (
  `UserId` int NOT NULL,
  `Height` decimal(6,2) DEFAULT NULL,
  `Weight` decimal(6,2) DEFAULT NULL,
  `MedicalHistory` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  CONSTRAINT `fk_TRAINEE_USER` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainee`
--

LOCK TABLES `trainee` WRITE;
/*!40000 ALTER TABLE `trainee` DISABLE KEYS */;
INSERT INTO `trainee` VALUES (3,175.50,68.00,'No known medical conditions'),(4,189.50,88.00,NULL);
/*!40000 ALTER TABLE `trainee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainee_exercising`
--

DROP TABLE IF EXISTS `trainee_exercising`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainee_exercising` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ProgramId` int NOT NULL,
  `DateTaken` datetime NOT NULL,
  `UserId` int NOT NULL,
  `ProgramScheduleId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_TRAINEE_EXERCISE_TRAINING_PROGRAM1_idx` (`ProgramId`),
  KEY `fk_TRAINEE_EXERCISING_TRAINEE1_idx` (`UserId`),
  KEY `fk_TRAINEE_EXERCISING_TRAINING_PROGRAM_ON_SCHEDULE1_idx` (`ProgramScheduleId`),
  CONSTRAINT `fk_TRAINEE_EXERCISE_TRAINING_PROGRAM1` FOREIGN KEY (`ProgramId`) REFERENCES `training_program` (`ProgramId`),
  CONSTRAINT `fk_TRAINEE_EXERCISING_TRAINEE1` FOREIGN KEY (`UserId`) REFERENCES `trainee` (`UserId`),
  CONSTRAINT `fk_TRAINEE_EXERCISING_TRAINING_PROGRAM_ON_SCHEDULE1` FOREIGN KEY (`ProgramScheduleId`) REFERENCES `training_program_on_schedule` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainee_exercising`
--

LOCK TABLES `trainee_exercising` WRITE;
/*!40000 ALTER TABLE `trainee_exercising` DISABLE KEYS */;
INSERT INTO `trainee_exercising` VALUES (1,1,'2024-01-01 00:00:00',4,NULL),(2,1,'2024-01-03 00:00:00',4,NULL),(3,1,'2024-01-05 00:00:00',4,NULL),(4,1,'2024-01-07 00:00:00',4,NULL),(5,1,'2024-01-09 00:00:00',4,NULL),(6,1,'2024-01-11 00:00:00',4,NULL),(7,1,'2024-01-13 00:00:00',4,NULL),(8,1,'2024-01-15 00:00:00',4,NULL),(9,1,'2024-01-17 00:00:00',4,NULL),(10,1,'2024-01-19 00:00:00',4,NULL),(11,1,'2024-01-21 00:00:00',4,NULL),(12,1,'2024-01-23 00:00:00',4,NULL),(13,1,'2024-01-25 00:00:00',4,NULL),(14,1,'2024-01-27 00:00:00',4,NULL),(15,1,'2025-02-05 00:00:00',4,NULL);
/*!40000 ALTER TABLE `trainee_exercising` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainee_on_training_program`
--

DROP TABLE IF EXISTS `trainee_on_training_program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainee_on_training_program` (
  `UserId` int NOT NULL,
  `ProgramId` int NOT NULL,
  `JoinDate` datetime NOT NULL,
  PRIMARY KEY (`UserId`,`ProgramId`),
  KEY `fk_TRAINEE_ON_TRAINING_PROGRAM_TRAINEE_idx` (`UserId`),
  KEY `fk_TRAINEE_ON_TRAINING_PROGRAM_TRAINING_PROGRAM_idx` (`ProgramId`),
  KEY `UserId_ProgramId_UNIQUE` (`UserId`,`ProgramId`),
  CONSTRAINT `fk_TRAINEE_ON_TRAINING_PROGRAM_TRAINEE` FOREIGN KEY (`UserId`) REFERENCES `trainee` (`UserId`) ON DELETE CASCADE,
  CONSTRAINT `fk_TRAINEE_ON_TRAINING_PROGRAM_TRAINING_PROGRAM` FOREIGN KEY (`ProgramId`) REFERENCES `training_program` (`ProgramId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainee_on_training_program`
--

LOCK TABLES `trainee_on_training_program` WRITE;
/*!40000 ALTER TABLE `trainee_on_training_program` DISABLE KEYS */;
INSERT INTO `trainee_on_training_program` VALUES (3,1,'2024-12-18 10:00:00'),(4,1,'2023-01-01 00:00:00');
/*!40000 ALTER TABLE `trainee_on_training_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainer`
--

DROP TABLE IF EXISTS `trainer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainer` (
  `UserId` int NOT NULL,
  `Biography` varchar(512) DEFAULT NULL,
  `ContactInfo` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  CONSTRAINT `fk_TRAINER_USER` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainer`
--

LOCK TABLES `trainer` WRITE;
/*!40000 ALTER TABLE `trainer` DISABLE KEYS */;
INSERT INTO `trainer` VALUES (2,'Experienced fitness trainer specializing in weightlifting and cardio.','+387065111222');
/*!40000 ALTER TABLE `trainer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `training_program`
--

DROP TABLE IF EXISTS `training_program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training_program` (
  `ProgramId` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(128) NOT NULL,
  `Difficulty` tinyint NOT NULL,
  `TrainingDuration` int NOT NULL,
  `Description` varchar(512) NOT NULL,
  `Requirements` varchar(512) DEFAULT NULL,
  `CreatedAt` datetime NOT NULL,
  `UserId` int NOT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `ImageFilePath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ProgramId`),
  KEY `fk_TRAINING_PROGRAM_TRAINER_idx` (`UserId`),
  CONSTRAINT `fk_TRAINING_PROGRAM_TRAINER` FOREIGN KEY (`UserId`) REFERENCES `trainer` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training_program`
--

LOCK TABLES `training_program` WRITE;
/*!40000 ALTER TABLE `training_program` DISABLE KEYS */;
INSERT INTO `training_program` VALUES (1,'Beginner Full Body',0,30,'This program provides a comprehensive introduction to fitness by targeting all major muscle groups. Perfect for individuals new to exercise, the plan incorporates simple movements and focuses on developing consistency while avoiding overtraining.','No prior experience is needed. Comfortable workout clothing and a positive attitude are recommended to maximize results.','2024-12-20 10:00:00',2,NULL,'BeginnerFullBody.jpeg'),(2,'Intermediate Strength',1,45,'This program is tailored for those looking to improve their overall strength and muscle endurance. It combines compound movements with isolation exercises to target specific muscle groups, helping participants achieve balanced development.','A set of adjustable dumbbells or access to a gym is required. Participants should also have a basic understanding of strength training principles and maintain proper form to prevent injuries.','2024-12-21 11:00:00',2,NULL,'IntermediateStrength.jpeg'),(3,'Advanced Cardio Burn',2,60,'Designed for fitness enthusiasts seeking to challenge their cardiovascular system, this program includes high-intensity intervals, endurance drills, and plyometric exercises. It aims to significantly boost stamina while burning calories efficiently.','High-quality running shoes are essential for safety during high-impact exercises. Participants should have prior experience with cardio workouts and no underlying heart conditions.','2024-12-22 12:00:00',2,NULL,'AdvancedCardioBurn.jpeg'),(4,'Yoga for Flexibility',0,40,'This yoga program focuses on improving flexibility, balance, and mental clarity. By incorporating gentle stretches and guided breathing exercises, it promotes relaxation and stress relief while enhancing physical well-being.','A yoga mat is required for comfort during floor poses. Participants should have a quiet space free of distractions to fully immerse themselves in the practice.','2024-12-23 09:30:00',2,NULL,'YogaForFlexibility.jpeg'),(5,'HIIT Challenge',2,30,'A high-intensity interval training program designed for maximum calorie burn in minimal time. This fast-paced plan alternates between bursts of intense effort and short recovery periods to keep your metabolism elevated throughout the day.','No special equipment is required. Participants should have a towel and water bottle on hand due to the intensity of the workouts. Prior experience with HIIT is strongly recommended.','2024-12-24 08:45:00',2,NULL,'HIITChallenge.jpeg'),(6,'Functional Fitness',1,50,'This program emphasizes exercises that mimic everyday movements to improve functional strength and mobility. It includes a mix of strength, flexibility, and balance exercises tailored to enhance overall physical performance.','Resistance bands, a sturdy chair, and an optional medicine ball are required. Participants should have a basic understanding of proper form to avoid strain during dynamic movements.','2024-12-25 07:15:00',2,NULL,'FunctionalFitness.jpeg'),(7,'Core Strength Builder',1,30,'This program is dedicated to building a stronger and more stable core, which is essential for better posture, balance, and athletic performance. It includes a combination of static holds and dynamic core exercises.','An exercise mat is needed for comfort during floor exercises. Participants should focus on engaging their core throughout each movement for maximum effectiveness.','2024-12-26 06:00:00',2,NULL,'CoreStrengthBuilder.jpeg'),(8,'Weightlifting Basics',0,60,'Ideal for beginners, this program introduces foundational weightlifting techniques and movements. It covers proper form, breathing techniques, and progressive overload strategies to ensure safe and effective workouts.','A barbell, weight plates, and a flat bench are required. Access to a squat rack is recommended for safety during compound lifts. Participants should be ready to learn and practice new skills consistently.','2024-12-27 15:00:00',2,NULL,'WeightliftingBasics.jpeg'),(9,'Marathon Training',2,120,'This detailed marathon training plan is designed for experienced runners aiming to complete or improve their performance in a marathon. It includes long-distance runs, tempo runs, and recovery days strategically planned to prevent overtraining.','Participants will need high-quality running shoes, moisture-wicking clothing, and a GPS watch or fitness tracker to monitor progress. A dedicated running route with varying terrain is also recommended.','2024-12-28 14:00:00',2,NULL,'MarathonTraining.jpeg'),(10,'Powerlifting Pro',2,90,'This specialized program focuses on the three main powerlifting lifts: squat, bench press, and deadlift. It incorporates progressive overload techniques and accessory exercises to maximize strength gains.','A barbell, weight plates, a power rack, and a flat bench are essential. Participants should have prior experience with heavy lifting and understand basic safety techniques, such as spotting and bracing.','2024-12-29 13:00:00',2,NULL,'PowerliftingPro.jpeg');
/*!40000 ALTER TABLE `training_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `training_program_application`
--

DROP TABLE IF EXISTS `training_program_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training_program_application` (
  `UserId` int NOT NULL,
  `ProgramId` int NOT NULL,
  `MarkRead` tinyint(1) NOT NULL,
  `SubmissionDate` datetime NOT NULL,
  `Note` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`UserId`,`ProgramId`),
  UNIQUE KEY `UserId_ProgramId_UNIQUE` (`UserId`,`ProgramId`),
  KEY `fk_TRAINEE_has_TRAINING_PROGRAM_TRAINING_PROGRAM_idx` (`ProgramId`) /*!80000 INVISIBLE */,
  KEY `fk_TRAINEE_has_TRAINING_PROGRAM_TRAINEE_idx` (`UserId`),
  CONSTRAINT `fk_TRAINEE_has_TRAINING_PROGRAM_TRAINEE` FOREIGN KEY (`UserId`) REFERENCES `trainee` (`UserId`) ON DELETE CASCADE,
  CONSTRAINT `fk_TRAINEE_has_TRAINING_PROGRAM_TRAINING_PROGRAM` FOREIGN KEY (`ProgramId`) REFERENCES `training_program` (`ProgramId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training_program_application`
--

LOCK TABLES `training_program_application` WRITE;
/*!40000 ALTER TABLE `training_program_application` DISABLE KEYS */;
INSERT INTO `training_program_application` VALUES (3,3,0,'2024-12-15 16:00:00','Excited to start this program.');
/*!40000 ALTER TABLE `training_program_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `training_program_category`
--

DROP TABLE IF EXISTS `training_program_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training_program_category` (
  `ProgramId` int NOT NULL,
  `CategoryId` int NOT NULL,
  PRIMARY KEY (`CategoryId`,`ProgramId`),
  KEY `fk_TRAINING_PROGRAM_has_CATEGORY_CATEGORY_idx` (`CategoryId`),
  KEY `fk_TRAINING_PROGRAM_has_CATEGORY_TRAINING_PROGRAM_idx` (`ProgramId`),
  CONSTRAINT `fk_TRAINING_PROGRAM_has_CATEGORY_CATEGORY` FOREIGN KEY (`CategoryId`) REFERENCES `category` (`CategoryId`) ON DELETE CASCADE,
  CONSTRAINT `fk_TRAINING_PROGRAM_has_CATEGORY_TRAINING_PROGRAM` FOREIGN KEY (`ProgramId`) REFERENCES `training_program` (`ProgramId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training_program_category`
--

LOCK TABLES `training_program_category` WRITE;
/*!40000 ALTER TABLE `training_program_category` DISABLE KEYS */;
INSERT INTO `training_program_category` VALUES (1,1);
/*!40000 ALTER TABLE `training_program_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `training_program_exercise`
--

DROP TABLE IF EXISTS `training_program_exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training_program_exercise` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Position` int NOT NULL,
  `ExerciseId` int NOT NULL,
  `ProgramId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_EXERCISE_has_TRAINING_PROGRAM_TRAINING_PROGRAM_idx` (`ProgramId`),
  KEY `fk_EXERCISE_has_TRAINING_PROGRAM_EXERCISE_idx` (`ExerciseId`),
  CONSTRAINT `fk_EXERCISE_has_TRAINING_PROGRAM_EXERCISE` FOREIGN KEY (`ExerciseId`) REFERENCES `exercise` (`ExerciseId`) ON DELETE CASCADE,
  CONSTRAINT `fk_EXERCISE_has_TRAINING_PROGRAM_TRAINING_PROGRAM` FOREIGN KEY (`ProgramId`) REFERENCES `training_program` (`ProgramId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training_program_exercise`
--

LOCK TABLES `training_program_exercise` WRITE;
/*!40000 ALTER TABLE `training_program_exercise` DISABLE KEYS */;
INSERT INTO `training_program_exercise` VALUES (1,1,1,1),(2,2,11,1),(3,3,9,1),(4,4,14,1),(5,5,16,1);
/*!40000 ALTER TABLE `training_program_exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `training_program_on_schedule`
--

DROP TABLE IF EXISTS `training_program_on_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training_program_on_schedule` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `StartTime` time NOT NULL,
  `DayOfWeek` tinyint NOT NULL,
  `ProgramId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_TRAINING_PROGRAM_ON_SCHEDULE_TRAINING_PROGRAM1_idx` (`ProgramId`),
  CONSTRAINT `fk_TRAINING_PROGRAM_ON_SCHEDULE_TRAINING_PROGRAM1` FOREIGN KEY (`ProgramId`) REFERENCES `training_program` (`ProgramId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training_program_on_schedule`
--

LOCK TABLES `training_program_on_schedule` WRITE;
/*!40000 ALTER TABLE `training_program_on_schedule` DISABLE KEYS */;
INSERT INTO `training_program_on_schedule` VALUES (1,'08:00:00',1,1),(2,'20:00:00',5,2);
/*!40000 ALTER TABLE `training_program_on_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserId` int NOT NULL,
  `FirstName` varchar(96) NOT NULL,
  `LastName` varchar(96) NOT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `Gender` tinyint DEFAULT NULL,
  `ProfilePictureFilePath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  KEY `fk_USER_USER_ACCOUNT_idx` (`UserId`) /*!80000 INVISIBLE */,
  CONSTRAINT `fk_USER_USER_ACCOUNT` FOREIGN KEY (`UserId`) REFERENCES `user_account` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Admin','Borivoje','1985-05-15',1,NULL),(2,'John','Doe','1985-05-15',1,NULL),(3,'Jane','Smith','1990-10-20',0,NULL),(4,'Jack','Sparrow','1996-11-07',0,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_account`
--

DROP TABLE IF EXISTS `user_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_account` (
  `UserId` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(64) NOT NULL,
  `Password` varchar(512) NOT NULL,
  `Email` varchar(128) NOT NULL,
  `Enabled` tinyint(1) NOT NULL,
  `Role` tinyint NOT NULL,
  `CreatedAt` datetime NOT NULL,
  `LastAccessed` datetime DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `Username_UNIQUE` (`Username`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_account`
--

LOCK TABLES `user_account` WRITE;
/*!40000 ALTER TABLE `user_account` DISABLE KEYS */;
INSERT INTO `user_account` VALUES (1,'admin1','$2a$12$2FgxuDftoQZo4qBIXtkgI.1iSGadToaPm8.CWXRsnIs4m/EFZ7gya','admin1@example.com',1,0,'2024-12-01 10:00:00','2024-12-20 15:30:00'),(2,'trainer1','$2a$12$2FgxuDftoQZo4qBIXtkgI.1iSGadToaPm8.CWXRsnIs4m/EFZ7gya','trainer1@example.com',1,2,'2024-12-01 11:00:00',NULL),(3,'trainee1','$2a$12$2FgxuDftoQZo4qBIXtkgI.1iSGadToaPm8.CWXRsnIs4m/EFZ7gya','trainee1@example.com',1,1,'2024-12-02 09:30:00',NULL),(4,'trainee2','$2a$12$2FgxuDftoQZo4qBIXtkgI.1iSGadToaPm8.CWXRsnIs4m/EFZ7gya','trainee2@example.com',1,1,'2025-01-08 10:31:26',NULL);
/*!40000 ALTER TABLE `user_account` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-07 23:24:57
