INSERT INTO get_healthy.user_account (UserId, Username, Password, Email, Enabled, Role, CreatedAt, LastAccessed) 
VALUES  
(1,'admin','$2a$10$DuRNelOjYmg8awgA3siiF.xOUqHDVifNVdX3.IbIlTnqcihewMesG','admin@gethealthy.dev',1, 0,'2024-11-10 12:55:37',NULL),
(2,'slavkop','$2a$10$uoiH.79xLOtIXI8kceg0b.bPfg5XRfq4U5eNYZ3C1Bn3m5LqyMq6i','slavko.popovic@gmail.com',1, 1,'2024-11-11 12:57:24',NULL),
(3,'anjam','$2a$10$IUHWplripOBnL6Xb7T93x./6wCJM8sAe7szn4V6FsftX3/RKWg2ai','anja.mirkovic@hotmail.com',1, 2,'2024-11-12 12:59:01',NULL),
(4,'danijels','$2a$10$tYCYgVyfgMVMaKSTwGAecOlOhwLoAj9RQwpOxslE31TP46nKIcA.W','danijel.stojanovic@yahoo.com',1, 2,'2024-11-25 13:05:33',NULL),
(5,'nikolam','$2a$10$Zil7pr.UGndxeTc4jQFjR.fugrPXQ10CCPO/fcs7duhWeRYAB73eq','nikola.mitrovic@gmail.com',0, 2,'2024-11-29 13:08:50',NULL),
(6,'stankos','$2a$10$SRTuS/wbjmH0w8puhu1p3eOZnOqUJO6aH5Db2M1G7MTRW1SO2V9Te','stanko.soldat@gmail.com',1, 1,'2024-12-01 13:09:54',NULL),
(7,'dejanb','$2a$10$6wjc0WkcGQgFchYGuVqYC.59WOoo0qMq58Qa0YHwkH/pA7L8tozjK','dejan.babic@yahoo.com',1, 1,'2024-12-07 13:10:44',NULL),
(8,'jelenav','$2a$10$TkaiiDS.9T9mHm0GFICCvOhrdheRoK6UT6Fhl7e0bJQ3WKGcwnMuS','jelena.vaskovic@yahoo.com',1, 1,'2024-12-08 13:11:37',NULL),
(9,'zoranl','$2a$10$LJeOlBbmsFVrSSOCWEXkQuXenNwXWLjw8qwWnXhEDWGvOjYjZygHW','zoran.lazic@yahoo.com',1, 1,'2024-12-11 13:12:31',NULL),
(10,'mirjanag','$2a$10$soUI.8HtyK1c5yDu254ip..3owkMjaUYWjXkdQZXpjctURAsNdBJu','mirjana.gavric@gmail.com',0, 2,'2024-12-15 20:49:05',NULL);

INSERT INTO get_healthy.administrator (UserId)
VALUES 
  (1);
  
INSERT INTO get_healthy.user (UserId, FirstName, LastName, DateOfBirth, Gender, ProfilePictureFilePath)
VALUES 
  (1, 'Marko', 'Marković', '1985-05-15', 0, NULL),
  (2,'Slavko','Popović','1983-12-05', 0, 'slavkop.jpg'),
  (3,'Anja','Mirković','1995-08-03', 1, 'anjam.jpg'),
  (4,'Danijel','Stojanović','1991-07-06', 0, 'danijels.jpg'),
  (5,'Nikola','Mitrović','2000-04-07', 0, NULL),
  (6,'Stanko','Soldat','1999-03-02', 0, NULL),
  (7,'Dejan','Babić','2004-05-06', 0, NULL),
  (8,'Jelena','Vasković','2003-07-09', 1, NULL),
  (9,'Zoran','Lazić','1994-01-02', 0, NULL),
  (10,'Mirjana', 'Gavrić', '1996-11-07', 1, NULL);
  
INSERT INTO get_healthy.trainee (UserId, Height, Weight, MedicalHistory)
VALUES 
  (2, 178.0, 75.0, NULL),
  (6, 185.0, 85.0, 'Mild hypertension (high blood pressure)'), 
  (7, 180.0, 78.0, NULL),
  (8, 165.0, 60.0, 'Asthma'), 
  (9, 182.0, 80.0, 'Previous ACL injury');
  
INSERT INTO get_healthy.trainer (UserId, Biography, ContactInfo)
VALUES 
  (3, 'Hi, I\'m Anja Mirković, a certified personal trainer with over 8 years of experience in the fitness industry. My passion is helping people achieve their fitness goals through personalized workout plans and proper nutrition. I specialize in weightlifting, strength training, and functional fitness. Whether you\'re just starting or looking to take your training to the next level, I\'m here to guide and support you on your journey.', '+387065111223'),
  (4, 'My name is Danijel Stojanović, and I have dedicated my career to helping people build strength, improve mobility, and enhance overall fitness. With years of experience in strength training and endurance workouts, I design effective programs tailored to my clients’ needs. I believe in a balanced approach that combines weight training, cardio, and proper recovery to achieve long-term results.', '+387065111224'),
  (5, 'I\'m Nikola Mitrović, a passionate fitness trainer specializing in high-intensity interval training (HIIT) and bodyweight exercises. My approach focuses on making workouts both challenging and enjoyable while ensuring progress for every client. I also provide guidance on nutrition to help you fuel your body for optimal performance and fat loss. Let’s work together to build strength, endurance, and confidence!', '+387065111225'),
  (10, 'Hey there, I\'m Mirjana Gavrić, a certified fitness instructor with expertise in yoga, pilates, and functional movement training. I believe fitness is not just about exercise—it’s about creating a lifestyle that supports both physical and mental well-being. With over a decade of experience, I help my clients improve flexibility, build strength, and develop a sustainable approach to health. Whether you\'re a beginner or experienced, I’m here to support your journey.', '+387065111226');
  
INSERT INTO get_healthy.qualification (UserId, CertificationFilePath)
VALUES 
  (3, 'AnjaMirkovic.pdf'),
  (4, 'DanijelStojanovic.pdf'),
  (5, 'NikolaMitrovic.pdf');
  

INSERT INTO get_healthy.category (CategoryId, Name)  
VALUES  
    (1, 'Strength'),  
    (2, 'Cardio'),  
    (3, 'HIIT'),  
    (4, 'Yoga'),  
    (5, 'Pilates'),  
    (6, 'CrossFit'),  
    (7, 'Bodyweight'),  
    (8, 'Functional Training'),  
    (9, 'Martial Arts'),  
    (10, 'Calisthenics'),  
    (11, 'Endurance Training'),  
    (12, 'Powerlifting'),  
    (13, 'Injury Prevention'),  
    (14, 'Rehabilitation'),  
    (15, 'Flexibility'),  
    (16, 'Mobility'),  
    (17, 'Dance Fitness'),  
    (18, 'Senior Fitness'),  
    (19, 'Self-defense'),  
    (20, 'Gym-oriented');    
    
INSERT INTO get_healthy.exercise_metric (Id, Name, Unit)
VALUES 
  (1, 'Repetitions', 'reps'),
  (2, 'Time', 'seconds'),
  (3, 'Distance', 'meters'),
  (4, 'Weight', 'kg'),
  (5, 'Calories', 'kcal'),
  (6, 'Heart Rate', 'bpm');
    
INSERT INTO get_healthy.exercise (ExerciseId, Name, Description, VideoLink, FirstExerciseMetricId, SecondExerciseMetricId)
VALUES 
  (1, 'Push-Up', 'A basic push-up exercise for upper body strength.', 'https://example.com/pushup', 1, NULL),
  (2, 'Plank', 'Core strengthening plank exercise.', 'https://example.com/plank', 2, NULL),
  (3, 'Running', 'A cardiovascular exercise for endurance and stamina.', 'https://example.com/running', 3, 2),
  (4, 'Deadlift', 'A weightlifting exercise to build strength in the lower body.', 'https://example.com/deadlift', 1, 4),
  (5, 'Cycling', 'A low-impact exercise for improving cardiovascular fitness.', 'https://example.com/cycling', 3, 5),
  (6, 'Burpees', 'A full-body exercise that increases strength and endurance.', 'https://example.com/burpees', 1, 2),
  (7, 'Jump Rope', 'A cardio exercise that improves coordination and burns calories.', 'https://example.com/jumprope', 1, 2),
  (8, 'Squats', 'A lower-body exercise to build leg and glute strength.', 'https://example.com/squats', 1, 4),
  (9, 'Bench Press', 'An upper-body strength exercise for chest muscles.', 'https://example.com/benchpress', 1, 4),
  (10, 'Yoga', 'A flexibility and balance exercise.', 'https://example.com/yoga', 2, 6),
  (11, 'Pull-Ups', 'An upper-body strength exercise focusing on the back and arms.', 'https://example.com/pullups', 1, NULL),
  (12, 'Leg Press', 'A lower-body exercise to strengthen legs using a machine.', 'https://example.com/legpress', 1, 4),
  (13, 'Bicep Curl', 'An arm exercise to strengthen biceps.', 'https://example.com/bicepcurl', 1, 4),
  (14, 'Tricep Dips', 'An exercise to strengthen triceps.', 'https://example.com/tricepdips', 1, 4),
  (15, 'Lunges', 'A lower-body exercise for improving balance and leg strength.', 'https://example.com/lunges', 1, 4),
  (16, 'Shoulder Press', 'An upper-body exercise to strengthen shoulders.', 'https://example.com/shoulderpress', 1, 4),
  (17, 'Lat Pulldown', 'An exercise to strengthen the back muscles.', 'https://example.com/latpulldown', 1, 4),
  (18, 'Chest Fly', 'An upper-body exercise to target chest muscles.', 'https://example.com/chestfly', 1, 4),
  (19, 'Leg Curl', 'A lower-body exercise to strengthen hamstrings.', 'https://example.com/legcurl', 1, 4),
  (20, 'Ab Crunch', 'An exercise to strengthen abdominal muscles.', 'https://example.com/abcrunch', 1, 5),
  (21, 'Hammer Curl', 'A variation of the bicep curl that targets both biceps and forearms.', 'https://example.com/hammercurl', 1, 4),
  (22, 'Romanian Deadlift', 'A deadlift variation focusing on hamstrings and glutes.', 'https://example.com/romaniandeadlift', 1, 4),
  (23, 'Seated Row', 'A back exercise using a cable machine.', 'https://example.com/seatedrow', 1, 4),
  (24, 'Face Pull', 'An exercise for rear delts and upper back using a cable machine.', 'https://example.com/facepull', 1, 4),
  (25, 'Barbell Squat', 'A compound movement targeting legs and glutes.', 'https://example.com/barbellsquat', 1, 4),
  (26, 'Overhead Triceps Extension', 'An isolation exercise for the triceps.', 'https://example.com/tricepsextension', 1, 4),
  (27, 'Dumbbell Lateral Raise', 'A shoulder isolation exercise.', 'https://example.com/lateralraise', 1, 4),
  (28, 'Incline Bench Press', 'A variation of the bench press that targets the upper chest.', 'https://example.com/inclinebenchpress', 1, 4),
  (29, 'Cable Chest Fly', 'An isolation exercise for the chest using cables.', 'https://example.com/cablechestfly', 1, 4),
  (30, 'Leg Extension', 'A quadriceps-focused machine exercise.', 'https://example.com/legextension', 1, 4),
  (31, 'Trap Bar Deadlift', 'A deadlift variation that reduces lower back strain.', 'https://example.com/trapbardeadlift', 1, 4),
  (32, 'Dumbbell Shrug', 'An exercise that targets the trapezius muscles.', 'https://example.com/dumbbellshrug', 1, 4),
  (33, 'Preacher Curl', 'An isolation exercise for the biceps.', 'https://example.com/preachercurl', 1, 4),
  (34, 'Reverse Fly', 'An upper back exercise targeting the rear delts.', 'https://example.com/reversefly', 1, 4),
  (35, 'Kettlebell Swing', 'A full-body exercise focused on hip explosiveness.', 'https://example.com/kettlebellswing', 1, 4),
  (36, 'Treadmill Running', 'A cardio exercise that improves endurance and stamina.', 'https://example.com/treadmillrunning', 3, 2),
  (37, 'Rowing Machine', 'A full-body cardiovascular exercise that builds strength and endurance.', 'https://example.com/rowingmachine', 3, 2),
  (38, 'Cycling (Stationary Bike)', 'A low-impact exercise for cardiovascular health and leg strength.', 'https://example.com/stationarycycling', 3, 2),
  (39, 'Swimming', 'A full-body exercise that builds endurance and strengthens muscles.', 'https://example.com/swimming', 3, 2),
  (40, 'Elliptical Trainer', 'A cardio exercise that reduces joint impact while improving endurance.', 'https://example.com/elliptical', 2, NULL),
  (41, 'Mountain Climbers', 'A full-body exercise that strengthens the core and improves endurance.', 'https://example.com/mountainclimbers', 1, NULL),
  (42, 'Jump Squats', 'A plyometric exercise that builds lower-body strength and power.', 'https://example.com/jumpsquats', 1, NULL),
  (43, 'Handstand Push-Ups', 'An advanced upper-body exercise targeting shoulders and triceps.', 'https://example.com/handstandpushups', 1, NULL),
  (44, 'Box Jumps', 'A plyometric movement that improves explosive power and agility.', 'https://example.com/boxjumps', 1, NULL),
  (45, 'Step-Ups', 'A lower-body exercise focusing on legs and balance using a step or bench.', 'https://example.com/stepups', 1, NULL);
  
  
 INSERT INTO get_healthy.training_program (ProgramId, `Name`, Difficulty, TrainingDuration, `Description`, Requirements, CreatedAt, UserId, ImageFilePath) VALUES
 (1, 'Beginner Full Body', 0, 30, 
     'This program provides a comprehensive introduction to fitness by targeting all major muscle groups. Perfect for individuals new to exercise, the plan incorporates simple movements and focuses on developing consistency while avoiding overtraining.', 
     'No prior experience is needed. Comfortable workout clothing and a positive attitude are recommended to maximize results.', 
     '2025-01-01 10:00:00', 3, 'BeginnerFullBody.jpg'),
(2, 'Intermediate Strength', 1, 45, 
    'This program is tailored for those looking to improve their overall strength and muscle endurance. It combines compound movements with isolation exercises to target specific muscle groups, helping participants achieve balanced development.', 
    'A set of adjustable dumbbells or access to a gym is required. Participants should also have a basic understanding of strength training principles and maintain proper form to prevent injuries.', 
    '2025-01-02 11:00:00', 3, 'IntermediateStrength.jpg'),
(3, 'Advanced Cardio Burn', 2, 60, 
    'Designed for fitness enthusiasts seeking to challenge their cardiovascular system, this program includes high-intensity intervals, endurance drills, and plyometric exercises. It aims to significantly boost stamina while burning calories efficiently.', 
    'High-quality running shoes are essential for safety during high-impact exercises. Participants should have prior experience with cardio workouts and no underlying heart conditions.', 
    '2025-01-02 12:00:00', 4, NULL),
(4, 'Yoga for Flexibility', 0, 40, 
    'This yoga program focuses on improving flexibility, balance, and mental clarity. By incorporating gentle stretches and guided breathing exercises, it promotes relaxation and stress relief while enhancing physical well-being.', 
    'A yoga mat is required for comfort during floor poses. Participants should have a quiet space free of distractions to fully immerse themselves in the practice.', 
    '2025-01-03 09:30:00', 3, 'YogaForFlexibility.jpg'),
(5, 'HIIT Challenge', 2, 30, 
    'A high-intensity interval training program designed for maximum calorie burn in minimal time. This fast-paced plan alternates between bursts of intense effort and short recovery periods to keep your metabolism elevated throughout the day.', 
    'No special equipment is required. Participants should have a towel and water bottle on hand due to the intensity of the workouts. Prior experience with HIIT is strongly recommended.', 
    '2025-01-03 08:45:00', 5, 'HIITChallenge.jpg'),
(6, 'Functional Fitness', 1, 50, 
    'This program emphasizes exercises that mimic everyday movements to improve functional strength and mobility. It includes a mix of strength, flexibility, and balance exercises tailored to enhance overall physical performance.', 
    'Resistance bands, a sturdy chair, and an optional medicine ball are required. Participants should have a basic understanding of proper form to avoid strain during dynamic movements.', 
    '2025-01-05 07:15:00', 4, 'FunctionalFitness.jpg'),
(7, 'Core Strength Builder', 1, 30, 
    'This program is dedicated to building a stronger and more stable core, which is essential for better posture, balance, and athletic performance. It includes a combination of static holds and dynamic core exercises.', 
    'An exercise mat is needed for comfort during floor exercises. Participants should focus on engaging their core throughout each movement for maximum effectiveness.', 
    '2025-01-05 06:00:00', 3, 'CoreStrengthBuilder.jpg'),
(8, 'Weightlifting Basics', 0, 60, 
    'Ideal for beginners, this program introduces foundational weightlifting techniques and movements. It covers proper form, breathing techniques, and progressive overload strategies to ensure safe and effective workouts.', 
    'A barbell, weight plates, and a flat bench are required. Access to a squat rack is recommended for safety during compound lifts. Participants should be ready to learn and practice new skills consistently.', 
    '2025-01-06 15:00:00', 5, NULL),
(9, 'Marathon Training', 2, 120, 
    'This detailed marathon training plan is designed for experienced runners aiming to complete or improve their performance in a marathon. It includes long-distance runs, tempo runs, and recovery days strategically planned to prevent overtraining.', 
    'Participants will need high-quality running shoes, moisture-wicking clothing, and a GPS watch or fitness tracker to monitor progress. A dedicated running route with varying terrain is also recommended.', 
    '2025-01-06 14:00:00', 3, 'MarathonTraining.jpg'),
(10, 'Powerlifting Pro', 2, 90, 
    'This specialized program focuses on the three main powerlifting lifts: squat, bench press, and deadlift. It incorporates progressive overload techniques and accessory exercises to maximize strength gains.', 
    'A barbell, weight plates, a power rack, and a flat bench are essential. Participants should have prior experience with heavy lifting and understand basic safety techniques, such as spotting and bracing.', 
    '2025-01-08 13:00:00', 3, 'PowerliftingPro.jpg');
    
INSERT INTO get_healthy.trainee_on_training_program (UserId, ProgramId, JoinDate) 
VALUES 
  (2, 1,'2025-01-02 10:00:00'),
  (6, 1,'2025-01-02 11:00:00'),
  (2, 2,'2025-01-04 16:30:00'),
  (2, 5,'2025-01-03 10:45:00'),
  (6, 2,'2025-01-04 17:30:00'),
  (7, 2,'2025-01-04 17:45:00'),
  (7, 1,'2025-01-04 17:46:00'),
  (7, 3,'2025-01-04 18:00:00'),
  (2, 4,'2025-01-07 10:00:00'),
  (6, 4,'2025-01-07 14:00:00'),
  (8, 3,'2025-01-07 07:00:00'),
  (8, 1,'2025-01-07 07:00:00');
  
INSERT INTO get_healthy.program_rating (Rate, ProgramId, UserId, DateRated)
VALUES 
  (5, 1, 2, '2025-01-02 14:45:00'),
  (4, 1, 6, '2025-01-03 12:30:00'),
  (4, 2, 2, '2025-01-03 16:40:00'),
  (5, 2, 6, '2025-01-05 19:00:00'),
  (3, 4, 2, '2025-01-06 11:00:00'),
  (4, 4, 6, '2025-01-06 17:15:00'),
  (5, 1, 7, '2025-01-07 07:45:00'),
  (4, 3, 8, '2025-01-07 08:00:00'),
  (5, 1, 8, '2025-01-07 08:00:00');
  
INSERT INTO get_healthy.comment (CommentId, Content, DatePosted, UserId, ProgramId)
VALUES 
  (1, 'Great program for beginners!', '2025-01-02 10:10:00', 2, 1),
  (2, 'Perfect program for someone just starting out.', '2025-01-02 11:06:30', 6, 1),
  (3, 'Thank you :)', '2025-01-03 08:54:32', 3, 1),
  (4, 'This program is exactly what I needed to take my strength to the next level.', '2025-01-04 18:34:28', 6, 2);
   
INSERT INTO get_healthy.training_program_category (ProgramId, CategoryId) 
VALUES 
  (1, 7), 
  (2, 1),
  (2, 3), 
  (2, 20),
  (3, 2), 
  (3, 3), 
  (4, 4),
  (4, 15), 
  (5, 3),
  (5, 11),
  (6, 8),
  (6, 15), 
  (7, 7), 
  (7, 1), 
  (8, 1), 
  (8, 20),
  (9, 6), 
  (9, 11), 
  (10, 12), 
  (10, 20);
  
INSERT INTO get_healthy.training_program_exercise (Id, Position, ExerciseId, ProgramId)
VALUES 
  (1,1,1,1),
  (2,2,11,1),
  (3,3,9,1),
  (4,4,14,1),
  (5,5,16,1);
  
INSERT INTO get_healthy.training_program_on_schedule (Id, StartTime, DayOfWeek, ProgramId)
VALUES 
  (1, '08:00:00', 1, 1),
  (2, '09:00:00', 2, 1),
  (3, '12:00:00', 4, 4),
  (4, '20:00:00', 5, 2),
  (5, '08:30:00', 5, 1);
  
INSERT INTO get_healthy.exercise_set (ExerciseSetId, ProgramExericseId, RestTime, FirstMetricValue, SecondMetricValue)
VALUES 
  (1,1,60,'15',NULL),
  (2,1,60,'15',NULL),
  (3,1,60,'15',NULL),
  (4,1,60,'15',NULL),
  (5,2,90,'10',NULL),
  (6,2,90,'10',NULL),
  (7,2,90,'10',NULL),
  (8,2,90,'10',NULL),
  (9,3,90,'10','100'),
  (10,3,90,'10','100'),
  (11,3,90,'10','100'),
  (12,3,90,'10','100'),
  (13,4,60,'15',NULL),
  (14,4,60,'15',NULL),
  (15,4,60,'15',NULL),
  (16,5,60,'12','50'),
  (17,5,60,'12','50'),
  (18,5,60,'12','50');
  
INSERT INTO get_healthy.trainee_exercising (Id, ProgramId, DateTaken, UserId, ProgramScheduleId)
VALUES 
  (1,1,'2025-01-01 00:00:00',2,NULL),
  (2,1,'2025-01-03 00:00:00',2,NULL),
  (3,1,'2025-01-05 00:00:00',2,NULL),
  (4,1,'2025-01-07 00:00:00',2,NULL),
  (5,1,'2025-01-09 00:00:00',2,NULL),
  (6,1,'2025-01-11 00:00:00',2,NULL),
  (7,1,'2025-01-13 00:00:00',2,NULL),
  (8,1,'2025-01-15 00:00:00',2,NULL),
  (9,1,'2025-01-17 00:00:00',2,NULL),
  (10,1,'2025-01-19 00:00:00',2,NULL),
  (11,1,'2025-01-21 00:00:00',2,NULL),
  (12,1,'2025-01-23 00:00:00',2,NULL),
  (13,1,'2025-01-25 00:00:00',2,NULL),
  (14,1,'2025-01-27 00:00:00',2,NULL),
  (15,1,'2025-02-05 00:00:00',2,NULL);

INSERT INTO get_healthy.exercise_feedback (Id, Skipped, TraineeExercisingId, ExerciseId, ProgramExerciseId)
VALUES (1,0,1,1,1),(2,0,1,11,2),(3,0,1,9,3),(4,0,1,14,4),(5,0,1,16,5),(6,0,2,1,1),(7,0,2,11,2),(8,0,2,9,3),(9,0,2,14,4),(10,0,2,16,5),(11,1,3,1,1),(12,0,3,11,2),(13,0,3,9,3),(14,0,3,14,4),(15,0,3,16,5),(16,0,4,1,1),(17,0,4,11,2),(18,0,4,9,3),(19,0,4,14,4),(20,0,4,16,5),(21,0,5,1,1),(22,0,5,11,2),(23,0,5,9,3),(24,0,5,14,4),(25,0,5,16,5),(26,0,6,1,1),(27,0,6,11,2),(28,0,6,9,3),(29,0,6,14,4),(30,0,6,16,5),(31,0,7,1,1),(32,0,7,11,2),(33,0,7,9,3),(34,0,7,14,4),(35,0,7,16,5),(36,0,8,1,1),(37,0,8,11,2),(38,0,8,9,3),(39,0,8,14,4),(40,0,8,16,5),(41,0,9,1,1),(42,0,9,11,2),(43,0,9,9,3),(44,0,9,14,4),(45,0,9,16,5),(46,0,10,1,1),(47,0,10,11,2),(48,0,10,9,3),(49,0,10,14,4),(50,0,10,16,5),(51,0,11,1,1),(52,0,11,11,2),(53,0,11,9,3),(54,0,11,14,4),(55,0,11,16,5),(56,0,12,1,1),(57,0,12,11,2),(58,0,12,9,3),(59,0,12,14,4),(60,0,12,16,5),(61,0,13,1,1),(62,0,13,11,2),(63,0,13,9,3),(64,0,13,14,4),(65,0,13,16,5),(66,0,14,1,1),(67,0,14,11,2),(68,0,14,9,3),(69,0,14,14,4),(70,0,14,16,5),(71,0,15,1,1),(72,0,15,11,2),(73,0,15,9,3),(74,0,15,14,4),(75,0,15,16,5);

INSERT INTO get_healthy.exercise_set_feedback (Id, ExerciseFeedbackId, Skipped, Completed, FirstMetricValueFeedback, SecondMetricValueFeedback)
VALUES (1,1,0,0,'3',NULL),(2,1,0,0,'3',NULL),(3,1,0,0,'3',NULL),(4,1,0,0,'3',NULL),(5,2,0,0,'3',NULL),(6,2,0,0,'3',NULL),(7,2,0,0,'3',NULL),(8,2,0,0,'3',NULL),(9,3,0,0,'3','11'),(10,3,0,0,'2','11'),(11,3,0,0,'3','11'),(12,3,0,0,'3','11'),(13,4,0,0,'3',NULL),(14,4,0,0,'3',NULL),(15,4,0,0,'2',NULL),(16,5,0,0,'2','12'),(17,5,0,0,'2','12'),(18,5,0,0,'2','12'),(19,6,0,0,'3',NULL),(20,6,0,0,'3',NULL),(21,6,0,0,'3',NULL),(22,6,0,0,'3',NULL),(23,7,0,0,'4',NULL),(24,7,0,0,'4',NULL),(25,7,0,0,'3',NULL),(26,7,0,0,'3',NULL),(27,8,0,0,'4','13'),(28,8,0,0,'3','13'),(29,8,0,0,'4','13'),(30,8,0,0,'4','13'),(31,9,0,0,'4',NULL),(32,9,0,0,'3',NULL),(33,9,0,0,'4',NULL),(34,10,0,0,'4','14'),(35,10,0,0,'3','14'),(36,10,0,0,'4','14'),(37,11,0,0,'4',NULL),(38,11,0,0,'3',NULL),(39,11,0,0,'3',NULL),(40,11,0,0,'4',NULL),(41,12,0,0,'3',NULL),(42,12,0,0,'4',NULL),(43,12,0,0,'3',NULL),(44,12,0,0,'4',NULL),(45,13,0,0,'5','15'),(46,13,0,0,'5','15'),(47,13,0,0,'5','15'),(48,13,0,0,'4','15'),(49,14,0,0,'5',NULL),(50,14,0,0,'4',NULL),(51,14,0,0,'5',NULL),(52,15,0,0,'5','16'),(53,15,0,0,'5','16'),(54,15,0,0,'5','16'),(55,16,0,0,'5',NULL),(56,16,0,0,'5',NULL),(57,16,0,0,'5',NULL),(58,16,0,0,'5',NULL),(59,17,0,0,'5',NULL),(60,17,0,0,'5',NULL),(61,17,0,0,'5',NULL),(62,17,0,0,'5',NULL),(63,18,0,0,'5','17'),(64,18,0,0,'4','17'),(65,18,0,0,'5','17'),(66,18,0,0,'4','17'),(67,19,0,0,'6',NULL),(68,19,0,0,'6',NULL),(69,19,0,0,'6',NULL),(70,20,0,0,'6','18'),(71,20,0,0,'6','18'),(72,20,0,0,'6','18'),(73,21,0,0,'5',NULL),(74,21,0,0,'6',NULL),(75,21,0,0,'6',NULL),(76,21,0,0,'5',NULL),(77,22,0,0,'6',NULL),(78,22,0,0,'5',NULL),(79,22,0,0,'6',NULL),(80,22,0,0,'6',NULL),(81,23,0,0,'5','19'),(82,23,0,0,'6','19'),(83,23,0,0,'5','19'),(84,23,0,0,'6','19'),(85,24,0,0,'5',NULL),(86,24,0,0,'5',NULL),(87,24,0,0,'6',NULL),(88,25,0,0,'7','20'),(89,25,0,0,'7','20'),(90,25,0,0,'7','20'),(91,26,0,0,'6',NULL),(92,26,0,0,'7',NULL),(93,26,0,0,'6',NULL),(94,26,0,0,'7',NULL),(95,27,0,0,'7',NULL),(96,27,0,0,'6',NULL),(97,27,0,0,'7',NULL),(98,27,0,0,'7',NULL),(99,28,0,0,'7','21'),(100,28,0,0,'7','21'),(101,28,0,0,'7','21'),(102,28,0,0,'6','21'),(103,29,0,0,'7',NULL),(104,29,0,0,'7',NULL),(105,29,0,0,'7',NULL),(106,30,0,0,'7','22'),(107,30,0,0,'7','22'),(108,30,0,0,'7','22'),(109,31,0,0,'7',NULL),(110,31,0,0,'7',NULL),(111,31,0,0,'7',NULL),(112,31,0,0,'6',NULL),(113,32,0,0,'7',NULL),(114,32,0,0,'8',NULL),(115,32,0,0,'7',NULL),(116,32,0,0,'8',NULL),(117,33,0,0,'8','24'),(118,33,0,0,'7','24'),(119,33,0,0,'8','24'),(120,33,0,0,'8','24'),(121,34,0,0,'8',NULL),(122,34,0,0,'8',NULL),(123,34,0,0,'7',NULL),(124,35,0,0,'8','24'),(125,35,0,0,'8','24'),(126,35,0,0,'7','24'),(127,36,0,0,'8',NULL),(128,36,0,0,'8',NULL),(129,36,0,0,'8',NULL),(130,36,0,0,'8',NULL),(131,37,0,0,'8',NULL),(132,37,0,0,'8',NULL),(133,37,0,0,'7',NULL),(134,37,0,0,'8',NULL),(135,38,0,0,'9','26'),(136,38,0,0,'9','26'),(137,38,0,0,'9','26'),(138,38,0,0,'9','26'),(139,39,0,0,'9',NULL),(140,39,0,0,'8',NULL),(141,39,0,0,'9',NULL),(142,40,0,0,'9','27'),(143,40,0,0,'9','27'),(144,40,0,0,'9','27'),(145,41,0,0,'9',NULL),(146,41,0,0,'9',NULL),(147,41,0,0,'9',NULL),(148,41,0,0,'8',NULL),(149,42,0,0,'9',NULL),(150,42,0,0,'9',NULL),(151,42,0,0,'9',NULL),(152,42,0,0,'9',NULL),(153,43,0,0,'9','28'),(154,43,0,0,'9','28'),(155,43,0,0,'9','28'),(156,43,0,0,'8','28'),(157,44,0,0,'10',NULL),(158,44,0,0,'10',NULL),(159,44,0,0,'10',NULL),(160,45,0,0,'10','29'),(161,45,0,0,'9','29'),(162,45,0,0,'10','29'),(163,46,0,0,'9',NULL),(164,46,0,0,'10',NULL),(165,46,0,0,'9',NULL),(166,46,0,0,'9',NULL),(167,47,0,0,'10',NULL),(168,47,0,0,'10',NULL),(169,47,0,0,'10',NULL),(170,47,0,0,'9',NULL),(171,48,0,0,'10','30'),(172,48,0,0,'10','30'),(173,48,0,0,'10','30'),(174,48,0,0,'10','30'),(175,49,0,0,'10',NULL),(176,49,0,0,'10',NULL),(177,49,0,0,'10',NULL),(178,50,0,0,'10','31'),(179,50,0,0,'11','31'),(180,50,0,0,'11','31'),(181,51,0,0,'11',NULL),(182,51,0,0,'11',NULL),(183,51,0,0,'11',NULL),(184,51,0,0,'11',NULL),(185,52,0,0,'11',NULL),(186,52,0,0,'11',NULL),(187,52,0,0,'11',NULL),(188,52,0,0,'11',NULL),(189,53,0,0,'11','32'),(190,53,0,0,'11','32'),(191,53,0,0,'10','32'),(192,53,0,0,'10','32'),(193,54,0,0,'10',NULL),(194,54,0,0,'11',NULL),(195,54,0,0,'11',NULL),(196,55,0,0,'11','33'),(197,55,0,0,'11','33'),(198,55,0,0,'10','33'),(199,56,0,0,'11',NULL),(200,56,0,0,'11',NULL),(201,56,0,0,'10',NULL),(202,56,0,0,'11',NULL),(203,57,0,0,'11',NULL),(204,57,0,0,'11',NULL),(205,57,0,0,'12',NULL),(206,57,0,0,'12',NULL),(207,58,0,0,'12','34'),(208,58,0,0,'12','34'),(209,58,0,0,'12','34'),(210,58,0,0,'12','34'),(211,59,0,0,'12',NULL),(212,59,0,0,'11',NULL),(213,59,0,0,'12',NULL),(214,60,0,0,'12','35'),(215,60,0,0,'12','35'),(216,60,0,0,'12','35'),(217,61,0,0,'11',NULL),(218,61,0,0,'12',NULL),(219,61,0,0,'12',NULL),(220,61,0,0,'12',NULL),(221,62,0,0,'12',NULL),(222,62,0,0,'12',NULL),(223,62,0,0,'11',NULL),(224,62,0,0,'11',NULL),(225,63,0,0,'13','36'),(226,63,0,0,'12','36'),(227,63,0,0,'13','36'),(228,63,0,0,'12','36'),(229,64,0,0,'13',NULL),(230,64,0,0,'13',NULL),(231,64,0,0,'13',NULL),(232,65,0,0,'13','37'),(233,65,0,0,'12','37'),(234,65,0,0,'12','37'),(235,66,0,0,'13',NULL),(236,66,0,0,'13',NULL),(237,66,0,0,'13',NULL),(238,66,0,0,'13',NULL),(239,67,0,0,'13',NULL),(240,67,0,0,'13',NULL),(241,67,0,0,'13',NULL),(242,67,0,0,'12',NULL),(243,68,0,0,'13','39'),(244,68,0,0,'12','39'),(245,68,0,0,'13','39'),(246,68,0,0,'13','39'),(247,69,0,0,'13',NULL),(248,69,0,0,'14',NULL),(249,69,0,0,'13',NULL),(250,70,0,0,'14','39'),(251,70,0,0,'14','39'),(252,70,0,0,'13','39'),(253,71,0,0,'13',NULL),(254,71,0,0,'13',NULL),(255,71,0,0,'14',NULL),(256,71,0,0,'14',NULL),(257,72,0,0,'14',NULL),(258,72,0,0,'14',NULL),(259,72,0,0,'14',NULL),(260,72,0,0,'14',NULL),(261,73,0,0,'14','41'),(262,73,0,0,'13','41'),(263,73,0,0,'14','41'),(264,73,0,0,'14','41'),(265,74,0,0,'13',NULL),(266,74,0,0,'14',NULL),(267,74,0,0,'14',NULL),(268,75,0,0,'14','42'),(269,75,0,0,'14','42'),(270,75,0,1,'15','42');


     
    
  
