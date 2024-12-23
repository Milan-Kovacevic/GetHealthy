-- Test data for get_healthy.USER_ACCOUNT
INSERT INTO get_healthy.user_account (UserId, Username, Password, Email, Enabled, Role, CreatedAt, LastAccessed)
VALUES 
  (1, 'admin1', 'passwordHash1', 'admin1@example.com', 1, 0, '2024-12-01 10:00:00', '2024-12-20 15:30:00'),
  (2, 'trainer1', 'passwordHash2', 'trainer1@example.com', 1, 1, '2024-12-01 11:00:00', NULL),
  (3, 'trainee1', 'passwordHash3', 'trainee1@example.com', 1, 2, '2024-12-02 09:30:00', '2024-12-21 08:00:00');

-- Test data for get_healthy.ADMINISTRATOR
INSERT INTO get_healthy.administrator (UserId)
VALUES 
  (1);

-- Test data for get_healthy.USER
INSERT INTO get_healthy.user (UserId, FirstName, LastName, DateOfBirth, Gender, ProfilePictureFilePath)
VALUES 
  (2, 'John', 'Doe', '1985-05-15', 1, '/images/john_doe.png'),
  (3, 'Jane', 'Smith', '1990-10-20', 0, '/images/jane_smith.png');

-- Test data for get_healthy.REGISTRATION_REQUEST
INSERT INTO get_healthy.registration_request (UserId, IssueDate, CertificationFilePath, Description, FirstName, LastName)
VALUES 
  (2, '2024-12-10 14:00:00', '/certs/trainer_cert1.pdf', 'Certified fitness trainer with 5 years of experience', 'John', 'Doe');

-- Test data for get_healthy.TRAINER
INSERT INTO get_healthy.trainer (UserId, Biography, ContactInfo)
VALUES 
  (2, 'Experienced fitness trainer specializing in weightlifting and cardio.', 'john.doe@example.com');

-- Test data for get_healthy.TRAINEE
INSERT INTO get_healthy.trainee (UserId, Height, Weight, MedicalHistory)
VALUES 
  (3, 175.5, 68.0, 'No known medical conditions');

-- Test data for get_healthy.EXERCISE_METRIC
INSERT INTO get_healthy.exercise_metric (Id, Name, Unit)
VALUES 
  (1, 'Repetitions', 'reps'),
  (2, 'Time', 'seconds');

-- Test data for get_healthy.EXERCISE
INSERT INTO get_healthy.exercise (ExerciseId, Name, Description, VideoLink, FirstExerciseMetricId, SecondExerciseMetricId)
VALUES 
  (1, 'Push-Up', 'A basic push-up exercise for upper body strength.', 'https://example.com/pushup', 1, NULL),
  (2, 'Plank', 'Core strengthening plank exercise.', 'https://example.com/plank', 2, NULL);

-- Test data for get_healthy.TRAINING_PROGRAM
INSERT INTO get_healthy.training_program (ProgramId, Name, Difficulty, TrainingDuration, Description, Requirements, CreatedAt, UserId, Deleted, ImageFilePath)
VALUES 
  (1, 'Beginner Strength', 1, 30, 'Strength training program for beginners.', 'No prior experience needed', '2024-12-01', 2, 0, '/images/beginner_strength.png');

-- Test data for get_healthy.TRAINING_PROGRAM_EXERCISE
INSERT INTO get_healthy.training_program_exercise (Id, Position, ExerciseId, ProgramId)
VALUES 
  (1, 1, 1, 1),
  (2, 2, 2, 1);

-- Test data for get_healthy.CATEGORY
INSERT INTO get_healthy.category (CategoryId, Name)
VALUES 
  (1, 'Strength'),
  (2, 'Cardio');

-- Test data for get_healthy.TRAINING_PROGRAM_CATEGORY
INSERT INTO get_healthy.training_program_category (ProgramId, CategoryId)
VALUES 
  (1, 1);

-- Test data for get_healthy.TRAINING_PROGRAM_APPLICATION
INSERT INTO get_healthy.training_program_application (UserId, ProgramId, MarkRead, SubmissionDate, Note)
VALUES 
  (3, 1, 0, '2024-12-15 16:00:00', 'Excited to start this program.');

-- Test data for get_healthy.COMMENT
INSERT INTO get_healthy.comment (CommentId, Content, DatePosted, UserId, ProgramId)
VALUES 
  (1, 'Great program for beginners!', '2024-12-20 12:00:00', 3, 1);

-- Test data for get_healthy.PROGRAM_RATING
INSERT INTO get_healthy.program_rating (Rate, ProgramId, UserId)
VALUES 
  (5, 1, 3);

-- Test data for get_healthy.TRAINEE_ON_TRAINING_PROGRAM
INSERT INTO get_healthy.trainee_on_training_program (UserId, ProgramId, JoinDate)
VALUES 
  (3, 1, '2024-12-18 10:00:00');

-- Test data for get_healthy.TRAINING_PROGRAM_ON_SCHEDULE
INSERT INTO get_healthy.training_program_on_schedule (Id, StartTime, DayOfWeek, ProgramId)
VALUES 
  (1, '08:00:00', 1, 1);

-- Test data for get_healthy.EXERCISE_SET
INSERT INTO get_healthy.exercise_set (ExerciseSetId, ProgramExericseId, RestTime, FirstMetricValue, SecondMetricValue)
VALUES 
  (1, 1, 60, '10', NULL),
  (2, 2, 90, '30', NULL);

-- Test data for get_healthy.TRAINEE_EXERCISING
INSERT INTO get_healthy.trainee_exercising (Id, ProgramId, DateTaken, UserId)
VALUES 
  (1, 1, '2024-12-20 10:00:00', 3);

-- Test data for get_healthy.EXERCISE_FEEDBACK
INSERT INTO get_healthy.exercise_feedback (Id, Skipped, TraineeExercisingId, ExerciseId, ProgramExerciseId)
VALUES 
  (1, 0, 1, 1, 1);

-- Test data for get_healthy.EXERCISE_SET_FEEDBACK
INSERT INTO get_healthy.exercise_set_feedback (Id, ExerciseFeedbackId, Skipped, Completed, FirstMetricValueFeedback, SecondMetricValueFeedback)
VALUES 
  (1, 1, 0, 1, '10', NULL);
