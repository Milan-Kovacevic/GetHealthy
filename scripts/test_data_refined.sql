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
  
 INSERT INTO training_program(ProgramId, `Name`, Difficulty, TrainingDuration, `Description`, Requirements, CreatedAt, UserId) VALUES
-- (1, 'Beginner Full Body', 'Beginner', 30, 
--     'This program provides a comprehensive introduction to fitness by targeting all major muscle groups. Perfect for individuals new to exercise, the plan incorporates simple movements and focuses on developing consistency while avoiding overtraining.', 
--     'No prior experience is needed. Comfortable workout clothing and a positive attitude are recommended to maximize results.', 
--     '2024-12-20 10:00:00', 1),
(2, 'Intermediate Strength', 1, 45, 
    'This program is tailored for those looking to improve their overall strength and muscle endurance. It combines compound movements with isolation exercises to target specific muscle groups, helping participants achieve balanced development.', 
    'A set of adjustable dumbbells or access to a gym is required. Participants should also have a basic understanding of strength training principles and maintain proper form to prevent injuries.', 
    '2024-12-21 11:00:00', 2),
(3, 'Advanced Cardio Burn', 2, 60, 
    'Designed for fitness enthusiasts seeking to challenge their cardiovascular system, this program includes high-intensity intervals, endurance drills, and plyometric exercises. It aims to significantly boost stamina while burning calories efficiently.', 
    'High-quality running shoes are essential for safety during high-impact exercises. Participants should have prior experience with cardio workouts and no underlying heart conditions.', 
    '2024-12-22 12:00:00', 2),
(4, 'Yoga for Flexibility', 0, 40, 
    'This yoga program focuses on improving flexibility, balance, and mental clarity. By incorporating gentle stretches and guided breathing exercises, it promotes relaxation and stress relief while enhancing physical well-being.', 
    'A yoga mat is required for comfort during floor poses. Participants should have a quiet space free of distractions to fully immerse themselves in the practice.', 
    '2024-12-23 09:30:00', 2),
(5, 'HIIT Challenge', 2, 30, 
    'A high-intensity interval training program designed for maximum calorie burn in minimal time. This fast-paced plan alternates between bursts of intense effort and short recovery periods to keep your metabolism elevated throughout the day.', 
    'No special equipment is required. Participants should have a towel and water bottle on hand due to the intensity of the workouts. Prior experience with HIIT is strongly recommended.', 
    '2024-12-24 08:45:00', 2),
(6, 'Functional Fitness', 1, 50, 
    'This program emphasizes exercises that mimic everyday movements to improve functional strength and mobility. It includes a mix of strength, flexibility, and balance exercises tailored to enhance overall physical performance.', 
    'Resistance bands, a sturdy chair, and an optional medicine ball are required. Participants should have a basic understanding of proper form to avoid strain during dynamic movements.', 
    '2024-12-25 07:15:00', 2),
(7, 'Core Strength Builder', 1, 30, 
    'This program is dedicated to building a stronger and more stable core, which is essential for better posture, balance, and athletic performance. It includes a combination of static holds and dynamic core exercises.', 
    'An exercise mat is needed for comfort during floor exercises. Participants should focus on engaging their core throughout each movement for maximum effectiveness.', 
    '2024-12-26 06:00:00', 2),
(8, 'Weightlifting Basics', 0, 60, 
    'Ideal for beginners, this program introduces foundational weightlifting techniques and movements. It covers proper form, breathing techniques, and progressive overload strategies to ensure safe and effective workouts.', 
    'A barbell, weight plates, and a flat bench are required. Access to a squat rack is recommended for safety during compound lifts. Participants should be ready to learn and practice new skills consistently.', 
    '2024-12-27 15:00:00', 2),
(9, 'Marathon Training', 2, 120, 
    'This detailed marathon training plan is designed for experienced runners aiming to complete or improve their performance in a marathon. It includes long-distance runs, tempo runs, and recovery days strategically planned to prevent overtraining.', 
    'Participants will need high-quality running shoes, moisture-wicking clothing, and a GPS watch or fitness tracker to monitor progress. A dedicated running route with varying terrain is also recommended.', 
    '2024-12-28 14:00:00', 2),
(10, 'Powerlifting Pro', 2, 90, 
    'This specialized program focuses on the three main powerlifting lifts: squat, bench press, and deadlift. It incorporates progressive overload techniques and accessory exercises to maximize strength gains.', 
    'A barbell, weight plates, a power rack, and a flat bench are essential. Participants should have prior experience with heavy lifting and understand basic safety techniques, such as spotting and bracing.', 
    '2024-12-29 13:00:00', 2);
    

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
