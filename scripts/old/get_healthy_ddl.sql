SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema get_healthy
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `get_healthy` ;

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
  `QualificationName` VARCHAR(128) NOT NULL,
  `QualificationValidTo` DATE NOT NULL,
  `CertificationFilePath` VARCHAR(192) NOT NULL,
  `QualificationDescription` VARCHAR(512) NULL,
  `FirstName` VARCHAR(96) NOT NULL,
  `LastName` VARCHAR(96) NOT NULL,
  `DateOfBirth` DATE NOT NULL,
  `Gender` TINYINT(4) NOT NULL,
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
  `ContactInfo` VARCHAR(128) NULL,
  `ProfilePictureFilePath` VARCHAR(192) NULL,
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
  `QualificationName` VARCHAR(128) NOT NULL,
  `ValidTo` DATE NOT NULL,
  `CertificationFilePath` VARCHAR(192) NOT NULL,
  `Description` VARCHAR(512) NULL,
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
-- Table `get_healthy`.`EXERCISE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`EXERCISE` (
  `ExerciseId` INT NOT NULL AUTO_INCREMENT,
  `ExerciseName` VARCHAR(128) NOT NULL,
  `Description` VARCHAR(512) NULL,
  `VideoLink` VARCHAR(192) NULL,
  `UserId` INT NOT NULL,
  INDEX `fk_EXERCISE_TRAINER_idx` (`UserId` ASC) VISIBLE,
  PRIMARY KEY (`ExerciseId`),
  CONSTRAINT `fk_EXERCISE_TRAINER`
    FOREIGN KEY (`UserId`)
    REFERENCES `get_healthy`.`TRAINER` (`UserId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `get_healthy`.`TRAINING_PROGRAM`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `get_healthy`.`TRAINING_PROGRAM` (
  `ProgramId` INT NOT NULL AUTO_INCREMENT,
  `ProgramName` VARCHAR(128) NOT NULL,
  `Info` VARCHAR(512) NULL,
  `Requirements` VARCHAR(512) NULL,
  `CreatedAt` DATE NOT NULL,
  `UserId` INT NOT NULL,
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
  `ExerciseId` INT NOT NULL,
  `ProgramId` INT NOT NULL,
  `NumberOfRepetitions` INT NOT NULL,
  `NumberOfSets` INT NOT NULL,
  `RestTime` INT NOT NULL,
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
  `CategoryName` VARCHAR(128) NOT NULL,
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
  `Id` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `ProgramId` INT NOT NULL,
  `MarkRead` TINYINT(1) NOT NULL,
  `SubmissionDate` DATETIME NOT NULL,
  `Note` VARCHAR(512) NULL,
  INDEX `fk_TRAINEE_has_TRAINING_PROGRAM_TRAINING_PROGRAM_idx` (`ProgramId` ASC) INVISIBLE,
  INDEX `fk_TRAINEE_has_TRAINING_PROGRAM_TRAINEE_idx` (`UserId` ASC) VISIBLE,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `UserId_ProgramId_UNIQUE` (`UserId` ASC, `ProgramId` ASC) VISIBLE,
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
  `Id` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `ProgramId` INT NOT NULL,
  `JoinDate` DATETIME NOT NULL,
  INDEX `fk_TRAINEE_ON_TRAINING_PROGRAM_TRAINEE_idx` (`UserId` ASC) VISIBLE,
  INDEX `fk_TRAINEE_ON_TRAINING_PROGRAM_TRAINING_PROGRAM_idx` (`ProgramId` ASC) VISIBLE,
  PRIMARY KEY (`Id`),
  INDEX `UserId_ProgramId_UNIQUE` (`UserId` ASC, `ProgramId` ASC) VISIBLE,
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
  `EndTime` TIME NULL,
  `DayOfWeek` TINYINT(4) NOT NULL,
  `ProgramId` INT NOT NULL,
  `UserId` INT NOT NULL,
  INDEX `fk_TRAINING_PROGRAM_ON_SCHEDULE_TRAINING_PROGRAM1_idx` (`ProgramId` ASC) VISIBLE,
  INDEX `fk_TRAINING_PROGRAM_ON_SCHEDULE_TRAINER1_idx` (`UserId` ASC) VISIBLE,
  PRIMARY KEY (`Id`),
  CONSTRAINT `fk_TRAINING_PROGRAM_ON_SCHEDULE_TRAINING_PROGRAM1`
    FOREIGN KEY (`ProgramId`)
    REFERENCES `get_healthy`.`TRAINING_PROGRAM` (`ProgramId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TRAINING_PROGRAM_ON_SCHEDULE_TRAINER1`
    FOREIGN KEY (`UserId`)
    REFERENCES `get_healthy`.`TRAINER` (`UserId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
