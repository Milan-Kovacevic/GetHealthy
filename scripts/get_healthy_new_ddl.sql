-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema get_healthy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema get_healthy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `get_healthy` DEFAULT CHARACTER SET utf8 ;
USE `get_healthy` ;

-- -----------------------------------------------------
-- Table `get_healthy`.`USER_ACCOUNT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`USER_ACCOUNT` (
  `UserId` INT NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(64) NOT NULL,
  `Password` VARCHAR(512) NOT NULL,
  `Email` VARCHAR(128) NOT NULL,
  `Enabled` TINYINT(1) NOT NULL,
  `Role` TINYINT(4) NOT NULL,
  `CreatedAt` DATETIME NOT NULL,
  `LastAccessed` DATETIME NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE INDEX `Username_UNIQUE` (`Username` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`ADMINISTRATOR`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`ADMINISTRATOR` (
  `UserId` INT NOT NULL,
  PRIMARY KEY (`UserId`),
  CONSTRAINT `fk_ADMINISTRATOR_USER_ACCOUNT`
    FOREIGN KEY (`UserId`)
    REFERENCES `get_healthy`.`USER_ACCOUNT` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`USER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`USER` (
  `UserId` INT NOT NULL,
  `FirstName` VARCHAR(96) NOT NULL,
  `LastName` VARCHAR(96) NOT NULL,
  `DateOfBirth` DATE NOT NULL,
  `Gender` TINYINT(4) NOT NULL,
  `ProfilePictureFilePath` VARCHAR(192) NULL,
  PRIMARY KEY (`UserId`),
  INDEX `fk_USER_USER_ACCOUNT_idx` (`UserId` ASC) INVISIBLE,
  CONSTRAINT `fk_USER_USER_ACCOUNT`
    FOREIGN KEY (`UserId`)
    REFERENCES `get_healthy`.`USER_ACCOUNT` (`UserId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`REGISTRATION_REQUEST`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`REGISTRATION_REQUEST` (
  `UserId` INT NOT NULL,
  `IssueDate` DATETIME NOT NULL,
  `CertificationFilePath` VARCHAR(192) NOT NULL,
  `Description` VARCHAR(512) NULL,
  `FirstName` VARCHAR(96) NOT NULL,
  `LastName` VARCHAR(96) NOT NULL,
  PRIMARY KEY (`UserId`),
  CONSTRAINT `fk_REGISTRATION_REQUEST_USER_ACCOUNT`
    FOREIGN KEY (`UserId`)
    REFERENCES `get_healthy`.`USER_ACCOUNT` (`UserId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`TRAINER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`TRAINER` (
  `UserId` INT NOT NULL,
  `Biography` VARCHAR(512) NULL,
  `ContactInfo` VARCHAR(32) NULL,
  PRIMARY KEY (`UserId`),
  CONSTRAINT `fk_TRAINER_USER`
    FOREIGN KEY (`UserId`)
    REFERENCES `get_healthy`.`USER` (`UserId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`QUALIFICATION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`QUALIFICATION` (
  `UserId` INT NOT NULL,
  `CertificationFilePath` VARCHAR(192) NOT NULL,
  PRIMARY KEY (`UserId`),
  CONSTRAINT `fk_QUALIFICATION_TRAINER`
    FOREIGN KEY (`UserId`)
    REFERENCES `get_healthy`.`TRAINER` (`UserId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`NOTIFICATION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`NOTIFICATION` (
  `NotificationId` INT NOT NULL AUTO_INCREMENT,
  `MarkRead` TINYINT(1) NOT NULL,
  `ProgramName` VARCHAR(128) NOT NULL,
  `Date` DATETIME NOT NULL,
  `UserId` INT NOT NULL,
  `SenderId` INT NOT NULL,
  `NotificationType` TINYINT(4) NOT NULL,
  PRIMARY KEY (`NotificationId`),
  INDEX `fk_NOTIFICATION_USER1_idx` (`SenderId` ASC) VISIBLE,
  CONSTRAINT `fk_NOTIFICATION_USER`
    FOREIGN KEY (`UserId`)
    REFERENCES `get_healthy`.`USER` (`UserId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_NOTIFICATION_USER1`
    FOREIGN KEY (`SenderId`)
    REFERENCES `get_healthy`.`USER` (`UserId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`TRAINEE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`TRAINEE` (
  `UserId` INT NOT NULL,
  `Height` INT NULL,
  `Weight` DECIMAL(6,2) NULL,
  `MedicalHistory` VARCHAR(512) NULL,
  PRIMARY KEY (`UserId`),
  CONSTRAINT `fk_TRAINEE_USER`
    FOREIGN KEY (`UserId`)
    REFERENCES `get_healthy`.`USER` (`UserId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`EXERCISE_METRIC`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`EXERCISE_METRIC` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(128) NOT NULL,
  `Unit` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`EXERCISE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`EXERCISE` (
  `ExerciseId` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(128) NOT NULL,
  `Description` VARCHAR(512) NULL,
  `VideoLink` VARCHAR(192) NULL,
  `FirstExerciseMetricId` INT NULL,
  `SecondExerciseMetricId` INT NULL,
  PRIMARY KEY (`ExerciseId`),
  INDEX `fk_EXERCISE_EXERCISE_METRIC1_idx` (`FirstExerciseMetricId` ASC) VISIBLE,
  INDEX `fk_EXERCISE_EXERCISE_METRIC2_idx` (`SecondExerciseMetricId` ASC) VISIBLE,
  CONSTRAINT `fk_EXERCISE_EXERCISE_METRIC1`
    FOREIGN KEY (`FirstExerciseMetricId`)
    REFERENCES `get_healthy`.`EXERCISE_METRIC` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EXERCISE_EXERCISE_METRIC2`
    FOREIGN KEY (`SecondExerciseMetricId`)
    REFERENCES `get_healthy`.`EXERCISE_METRIC` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`TRAINING_PROGRAM`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`TRAINING_PROGRAM` (
  `ProgramId` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(128) NOT NULL,
  `Difficulty` TINYINT(4) NOT NULL,
  `TrainingDuration` INT NOT NULL,
  `Description` VARCHAR(512) NULL,
  `Requirements` VARCHAR(512) NULL,
  `CreatedAt` DATE NOT NULL,
  `UserId` INT NOT NULL,
  `Deleted` TINYINT(1) NULL,
  `ImageFilePath` VARCHAR(192) NULL,
  PRIMARY KEY (`ProgramId`),
  INDEX `fk_TRAINING_PROGRAM_TRAINER_idx` (`UserId` ASC) VISIBLE,
  CONSTRAINT `fk_TRAINING_PROGRAM_TRAINER`
    FOREIGN KEY (`UserId`)
    REFERENCES `get_healthy`.`TRAINER` (`UserId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`TRAINING_PROGRAM_EXERCISE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`TRAINING_PROGRAM_EXERCISE` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Position` INT NOT NULL,
  `ExerciseId` INT NOT NULL,
  `ProgramId` INT NOT NULL,
  INDEX `fk_EXERCISE_has_TRAINING_PROGRAM_TRAINING_PROGRAM_idx` (`ProgramId` ASC) VISIBLE,
  INDEX `fk_EXERCISE_has_TRAINING_PROGRAM_EXERCISE_idx` (`ExerciseId` ASC) VISIBLE,
  PRIMARY KEY (`Id`),
  CONSTRAINT `fk_EXERCISE_has_TRAINING_PROGRAM_EXERCISE`
    FOREIGN KEY (`ExerciseId`)
    REFERENCES `get_healthy`.`EXERCISE` (`ExerciseId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EXERCISE_has_TRAINING_PROGRAM_TRAINING_PROGRAM`
    FOREIGN KEY (`ProgramId`)
    REFERENCES `get_healthy`.`TRAINING_PROGRAM` (`ProgramId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`CATEGORY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`CATEGORY` (
  `CategoryId` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`CategoryId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`TRAINING_PROGRAM_CATEGORY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`TRAINING_PROGRAM_CATEGORY` (
  `ProgramId` INT NOT NULL,
  `CategoryId` INT NOT NULL,
  INDEX `fk_TRAINING_PROGRAM_has_CATEGORY_CATEGORY_idx` (`CategoryId` ASC) VISIBLE,
  INDEX `fk_TRAINING_PROGRAM_has_CATEGORY_TRAINING_PROGRAM_idx` (`ProgramId` ASC) VISIBLE,
  PRIMARY KEY (`CategoryId`, `ProgramId`),
  CONSTRAINT `fk_TRAINING_PROGRAM_has_CATEGORY_TRAINING_PROGRAM`
    FOREIGN KEY (`ProgramId`)
    REFERENCES `get_healthy`.`TRAINING_PROGRAM` (`ProgramId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TRAINING_PROGRAM_has_CATEGORY_CATEGORY`
    FOREIGN KEY (`CategoryId`)
    REFERENCES `get_healthy`.`CATEGORY` (`CategoryId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`TRAINING_PROGRAM_APPLICATION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`TRAINING_PROGRAM_APPLICATION` (
  `UserId` INT NOT NULL,
  `ProgramId` INT NOT NULL,
  `MarkRead` TINYINT(1) NOT NULL,
  `SubmissionDate` DATETIME NOT NULL,
  `Note` VARCHAR(512) NULL,
  INDEX `fk_TRAINEE_has_TRAINING_PROGRAM_TRAINING_PROGRAM_idx` (`ProgramId` ASC) INVISIBLE,
  INDEX `fk_TRAINEE_has_TRAINING_PROGRAM_TRAINEE_idx` (`UserId` ASC) VISIBLE,
  UNIQUE INDEX `UserId_ProgramId_UNIQUE` (`UserId` ASC, `ProgramId` ASC) VISIBLE,
  PRIMARY KEY (`UserId`, `ProgramId`),
  CONSTRAINT `fk_TRAINEE_has_TRAINING_PROGRAM_TRAINEE`
    FOREIGN KEY (`UserId`)
    REFERENCES `get_healthy`.`TRAINEE` (`UserId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TRAINEE_has_TRAINING_PROGRAM_TRAINING_PROGRAM`
    FOREIGN KEY (`ProgramId`)
    REFERENCES `get_healthy`.`TRAINING_PROGRAM` (`ProgramId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`COMMENT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`COMMENT` (
  `CommentId` INT NOT NULL AUTO_INCREMENT,
  `Content` VARCHAR(512) NOT NULL,
  `DatePosted` DATETIME NOT NULL,
  `UserId` INT NOT NULL,
  `ProgramId` INT NOT NULL,
  PRIMARY KEY (`CommentId`),
  INDEX `fk_COMMENT_TRAINEE_idx` (`UserId` ASC) VISIBLE,
  INDEX `fk_COMMENT_TRAINING_PROGRAM_idx` (`ProgramId` ASC) VISIBLE,
  CONSTRAINT `fk_COMMENT_TRAINEE`
    FOREIGN KEY (`UserId`)
    REFERENCES `get_healthy`.`TRAINEE` (`UserId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_COMMENT_TRAINING_PROGRAM`
    FOREIGN KEY (`ProgramId`)
    REFERENCES `get_healthy`.`TRAINING_PROGRAM` (`ProgramId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`PROGRAM_RATING`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`PROGRAM_RATING` (
  `RatingId` INT NOT NULL AUTO_INCREMENT,
  `Rate` INT NOT NULL,
  `ProgramId` INT NOT NULL,
  `UserId` INT NOT NULL,
  PRIMARY KEY (`RatingId`),
  INDEX `fk_PROGRAM_RATING_TRAINING_PROGRAM_idx` (`ProgramId` ASC) INVISIBLE,
  INDEX `fk_PROGRAM_RATING_TRAINEE_idx` (`UserId` ASC) VISIBLE,
  UNIQUE INDEX `UserId_ProgramId_UNIQUE` (`UserId` ASC, `ProgramId` ASC) VISIBLE,
  CONSTRAINT `fk_PROGRAM_RATING_TRAINING_PROGRAM`
    FOREIGN KEY (`ProgramId`)
    REFERENCES `get_healthy`.`TRAINING_PROGRAM` (`ProgramId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PROGRAM_RATING_TRAINEE`
    FOREIGN KEY (`UserId`)
    REFERENCES `get_healthy`.`TRAINEE` (`UserId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`TRAINEE_ON_TRAINING_PROGRAM`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`TRAINEE_ON_TRAINING_PROGRAM` (
  `UserId` INT NOT NULL,
  `ProgramId` INT NOT NULL,
  `JoinDate` DATETIME NOT NULL,
  INDEX `fk_TRAINEE_ON_TRAINING_PROGRAM_TRAINEE_idx` (`UserId` ASC) VISIBLE,
  INDEX `fk_TRAINEE_ON_TRAINING_PROGRAM_TRAINING_PROGRAM_idx` (`ProgramId` ASC) VISIBLE,
  INDEX `UserId_ProgramId_UNIQUE` (`UserId` ASC, `ProgramId` ASC) VISIBLE,
  PRIMARY KEY (`UserId`, `ProgramId`),
  CONSTRAINT `fk_TRAINEE_ON_TRAINING_PROGRAM_TRAINEE`
    FOREIGN KEY (`UserId`)
    REFERENCES `get_healthy`.`TRAINEE` (`UserId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TRAINEE_ON_TRAINING_PROGRAM_TRAINING_PROGRAM`
    FOREIGN KEY (`ProgramId`)
    REFERENCES `get_healthy`.`TRAINING_PROGRAM` (`ProgramId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`TRAINING_PROGRAM_ON_SCHEDULE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`TRAINING_PROGRAM_ON_SCHEDULE` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `StartTime` TIME NOT NULL,
  `DayOfWeek` TINYINT(4) NOT NULL,
  `ProgramId` INT NOT NULL,
  INDEX `fk_TRAINING_PROGRAM_ON_SCHEDULE_TRAINING_PROGRAM1_idx` (`ProgramId` ASC) VISIBLE,
  PRIMARY KEY (`Id`),
  CONSTRAINT `fk_TRAINING_PROGRAM_ON_SCHEDULE_TRAINING_PROGRAM1`
    FOREIGN KEY (`ProgramId`)
    REFERENCES `get_healthy`.`TRAINING_PROGRAM` (`ProgramId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`EXERCISE_SET`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`EXERCISE_SET` (
  `ExerciseSetId` INT NOT NULL AUTO_INCREMENT,
  `ProgramExericseId` INT NOT NULL,
  `RestTime` INT NOT NULL,
  `FirstMetricValue` VARCHAR(128) NOT NULL,
  `SecondMetricValue` VARCHAR(128) NULL,
  INDEX `fk_EXERCISE_REP_TRAINING_PROGRAM_EXERCISE1_idx` (`ProgramExericseId` ASC) VISIBLE,
  PRIMARY KEY (`ExerciseSetId`),
  CONSTRAINT `fk_EXERCISE_REP_TRAINING_PROGRAM_EXERCISE1`
    FOREIGN KEY (`ProgramExericseId`)
    REFERENCES `get_healthy`.`TRAINING_PROGRAM_EXERCISE` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`TRAINEE_EXERCISING`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`TRAINEE_EXERCISING` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `ProgramId` INT NOT NULL,
  `DateTaken` DATETIME NOT NULL,
  `UserId` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_TRAINEE_EXERCISE_TRAINING_PROGRAM1_idx` (`ProgramId` ASC) VISIBLE,
  INDEX `fk_TRAINEE_EXERCISING_TRAINEE1_idx` (`UserId` ASC) VISIBLE,
  CONSTRAINT `fk_TRAINEE_EXERCISE_TRAINING_PROGRAM1`
    FOREIGN KEY (`ProgramId`)
    REFERENCES `get_healthy`.`TRAINING_PROGRAM` (`ProgramId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TRAINEE_EXERCISING_TRAINEE1`
    FOREIGN KEY (`UserId`)
    REFERENCES `get_healthy`.`TRAINEE` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`EXERCISE_FEEDBACK`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`EXERCISE_FEEDBACK` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Skipped` TINYINT(1) NULL,
  `TraineeExercisingId` INT NOT NULL,
  `ExerciseId` INT NOT NULL,
  `ProgramExerciseId` INT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_EXERCISE_FEEDBACK_TRAINEE_EXERCISING1_idx` (`TraineeExercisingId` ASC) VISIBLE,
  INDEX `fk_EXERCISE_FEEDBACK_EXERCISE1_idx` (`ExerciseId` ASC) VISIBLE,
  INDEX `fk_EXERCISE_FEEDBACK_TRAINING_PROGRAM_EXERCISE1_idx` (`ProgramExerciseId` ASC) VISIBLE,
  CONSTRAINT `fk_EXERCISE_FEEDBACK_TRAINEE_EXERCISING1`
    FOREIGN KEY (`TraineeExercisingId`)
    REFERENCES `get_healthy`.`TRAINEE_EXERCISING` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EXERCISE_FEEDBACK_EXERCISE1`
    FOREIGN KEY (`ExerciseId`)
    REFERENCES `get_healthy`.`EXERCISE` (`ExerciseId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EXERCISE_FEEDBACK_TRAINING_PROGRAM_EXERCISE1`
    FOREIGN KEY (`ProgramExerciseId`)
    REFERENCES `get_healthy`.`TRAINING_PROGRAM_EXERCISE` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`EXERCISE_SET_FEEDBACK`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`EXERCISE_SET_FEEDBACK` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `ExerciseFeedbackId` INT NOT NULL,
  `Skipped` TINYINT(1) NULL,
  `Completed` TINYINT(1) NULL,
  `FirstMetricValueFeedback` VARCHAR(128) NULL,
  `SecondMetricValueFeedback` VARCHAR(128) NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_EXERCISE_SET_FEEDBACK_EXERCISE_FEEDBACK1_idx` (`ExerciseFeedbackId` ASC) VISIBLE,
  CONSTRAINT `fk_EXERCISE_SET_FEEDBACK_EXERCISE_FEEDBACK1`
    FOREIGN KEY (`ExerciseFeedbackId`)
    REFERENCES `get_healthy`.`EXERCISE_FEEDBACK` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
