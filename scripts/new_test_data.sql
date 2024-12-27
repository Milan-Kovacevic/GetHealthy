use get_healthy;

-- delete from category where CategoryId between 1 and 11;
-- delete from user_account where UserId between 1 and 11;
-- delete from user where UserId between 1 and 11;
-- delete from trainer where UserId between 1 and 11;
-- delete from training_program where ProgramId between 1 and 11;

INSERT INTO category (CategoryId, Name) VALUES (1,'Flexibility'),(2,'Cardio'),(3,'Strength');
INSERT INTO user_account(UserId, Username, `Password`, Email, Enabled, `Role`, CreatedAt) VALUES (1, 'anjam', 'anja', 'anjam@mail.com', 1, 1,'2024-12-13 18:55:37');

INSERT INTO user (UserId, FirstName, LastName, DateOfBirth, Gender, ProfilePictureFilePath) 
VALUES (1, 'Anja', 'Mirković', '1995-08-03', 1, 'images/female.jpg');

INSERT INTO trainer(UserId, Biography, ContactInfo) VALUES (1,'Magistar sporta i tjelesnog odgoja sa dugogodišnjim iskustvom personal trenera u fitness centrima. Nekoliko godina je radila kao trener plivanja u klubu „Adriatic“ na olimpijskom bazenu Otoka. Rad se bazirao na radu sa neplivačima i djecom predškolskog uzrasta i mladje.', '065/111-222'); 

INSERT INTO training_program(ProgramId, `Name`, Difficulty, TrainingDuration, `Description`, Requirements, CreatedAt, UserId) VALUES (1,'Pilates Harmony', 1, 45, '\"Pilates Harmony\" je holistički program vježbanja koji se fokusira na razvoj snage, fleksibilnosti, stabilnosti i koordinacije tijela. Ovaj program takođe promoviše unutrašnji mir i mentalni fokus kroz tehnike disanja i svijesti o tijelu. Vježbe u \"Pilates Harmony\" se obično izvode polako i kontrolisano, sa naglaskom na pravilnoj tehnici izvođenja. Ovaj program može biti prilagođen različitim nivoima vježbača, od početnika do naprednih.','Preporučuje se nošenje udobne sportske odjeće koja omogućava slobodno kretanje. \nTrebaće Vam udobna podloga (npr. yoga mat) na kojoj ćete izvoditi vježbe.','2023-12-13',1);
INSERT INTO training_program(ProgramId, `Name`, Difficulty, TrainingDuration, `Description`, Requirements, CreatedAt, UserId) VALUES
(1, 'Beginner Full Body', 'Beginner', 30, 
    'This program provides a comprehensive introduction to fitness by targeting all major muscle groups. Perfect for individuals new to exercise, the plan incorporates simple movements and focuses on developing consistency while avoiding overtraining.', 
    'No prior experience is needed. Comfortable workout clothing and a positive attitude are recommended to maximize results.', 
    '2024-12-20 10:00:00', 1),
(2, 'Intermediate Strength', 'Intermediate', 45, 
    'This program is tailored for those looking to improve their overall strength and muscle endurance. It combines compound movements with isolation exercises to target specific muscle groups, helping participants achieve balanced development.', 
    'A set of adjustable dumbbells or access to a gym is required. Participants should also have a basic understanding of strength training principles and maintain proper form to prevent injuries.', 
    '2024-12-21 11:00:00', 1),
(3, 'Advanced Cardio Burn', 'Advanced', 60, 
    'Designed for fitness enthusiasts seeking to challenge their cardiovascular system, this program includes high-intensity intervals, endurance drills, and plyometric exercises. It aims to significantly boost stamina while burning calories efficiently.', 
    'High-quality running shoes are essential for safety during high-impact exercises. Participants should have prior experience with cardio workouts and no underlying heart conditions.', 
    '2024-12-22 12:00:00', 1),
(4, 'Yoga for Flexibility', 'Beginner', 40, 
    'This yoga program focuses on improving flexibility, balance, and mental clarity. By incorporating gentle stretches and guided breathing exercises, it promotes relaxation and stress relief while enhancing physical well-being.', 
    'A yoga mat is required for comfort during floor poses. Participants should have a quiet space free of distractions to fully immerse themselves in the practice.', 
    '2024-12-23 09:30:00', 1),
(5, 'HIIT Challenge', 'Advanced', 30, 
    'A high-intensity interval training program designed for maximum calorie burn in minimal time. This fast-paced plan alternates between bursts of intense effort and short recovery periods to keep your metabolism elevated throughout the day.', 
    'No special equipment is required. Participants should have a towel and water bottle on hand due to the intensity of the workouts. Prior experience with HIIT is strongly recommended.', 
    '2024-12-24 08:45:00', 1),
(6, 'Functional Fitness', 'Intermediate', 50, 
    'This program emphasizes exercises that mimic everyday movements to improve functional strength and mobility. It includes a mix of strength, flexibility, and balance exercises tailored to enhance overall physical performance.', 
    'Resistance bands, a sturdy chair, and an optional medicine ball are required. Participants should have a basic understanding of proper form to avoid strain during dynamic movements.', 
    '2024-12-25 07:15:00', 1),
(7, 'Core Strength Builder', 'Intermediate', 30, 
    'This program is dedicated to building a stronger and more stable core, which is essential for better posture, balance, and athletic performance. It includes a combination of static holds and dynamic core exercises.', 
    'An exercise mat is needed for comfort during floor exercises. Participants should focus on engaging their core throughout each movement for maximum effectiveness.', 
    '2024-12-26 06:00:00', 1),
(8, 'Weightlifting Basics', 'Beginner', 60, 
    'Ideal for beginners, this program introduces foundational weightlifting techniques and movements. It covers proper form, breathing techniques, and progressive overload strategies to ensure safe and effective workouts.', 
    'A barbell, weight plates, and a flat bench are required. Access to a squat rack is recommended for safety during compound lifts. Participants should be ready to learn and practice new skills consistently.', 
    '2024-12-27 15:00:00', 1),
(9, 'Marathon Training', 'Advanced', 120, 
    'This detailed marathon training plan is designed for experienced runners aiming to complete or improve their performance in a marathon. It includes long-distance runs, tempo runs, and recovery days strategically planned to prevent overtraining.', 
    'Participants will need high-quality running shoes, moisture-wicking clothing, and a GPS watch or fitness tracker to monitor progress. A dedicated running route with varying terrain is also recommended.', 
    '2024-12-28 14:00:00', 1),
(10, 'Powerlifting Pro', 'Advanced', 90, 
    'This specialized program focuses on the three main powerlifting lifts: squat, bench press, and deadlift. It incorporates progressive overload techniques and accessory exercises to maximize strength gains.', 
    'A barbell, weight plates, a power rack, and a flat bench are essential. Participants should have prior experience with heavy lifting and understand basic safety techniques, such as spotting and bracing.', 
    '2024-12-29 13:00:00', 1);
    
    
    
INSERT INTO training_program_category(ProgramId, CategoryId) values(1, 1), (1, 2), (1, 3);

INSERT INTO user_account(UserId, Username, `Password`, Email, Enabled, `Role`, CreatedAt) VALUES (2, 'milam', 'mila', 'mila@mail.com', 1, 2,'2024-12-13 18:55:37');
INSERT INTO user_account(UserId, Username, `Password`, Email, Enabled, `Role`, CreatedAt) VALUES (3, 'markov', 'marko', 'markov@mail.com', 1, 2,'2024-12-13 18:40:37');
INSERT INTO user_account(UserId, Username, `Password`, Email, Enabled, `Role`, CreatedAt) VALUES (4, 'nadjan', 'nadja', 'nadjan@mail.com', 1, 2,'2024-12-13 18:55:37');

INSERT INTO user (UserId, FirstName, LastName, DateOfBirth, Gender, ProfilePictureFilePath) 
VALUES (2, 'Mila', 'Milic', '2000-09-03', 1, 'images/female.jpg'), 
(3, 'Marko', 'Vukic', '2003-09-04', 0, 'images/male.jpg'),
(4, 'Nadja', 'Milic', '2000-09-03', 1, 'images/female.jpg');

INSERT INTO trainee(UserId, Height, Weight, MedicalHistory) VALUES (2, 170, 65, 'No medical history'), 
(3, 180, 70, 'No medical history'), (4, 165, 60, 'No medical history');

INSERT INTO trainee_on_training_program(UserId, ProgramId, JoinDate) VALUES (2, 1, '2024-12-13'), (3, 1, '2024-12-13'), (4, 1, '2024-12-13');

INSERT INTO exercise_metric (id, name, unit) VALUES
(1, 'Reps', ''),
(2, 'Weight', 'kg'),
(3, 'Time', 'seconds');

INSERT INTO exercise (ExerciseId, Name, Description, VideoLink, FirstExerciseMetricId, SecondExerciseMetricId) VALUES
(1, 'Push-ups', 'Basic chest exercise', 'https://www.youtube.com/embed/IODxDxX7oi4', 1, 2),
(2, 'Squats', 'Lower body exercise', 'https://www.youtube.com/embed/YaXPRqUwItQ', 1, NULL),
(3, 'Plank', 'Core strength exercise', 'https://www.youtube.com/embed/pSHjTRCQxIw', 3, NULL),
(4, 'Lunges', 'Exercise for legs and glutes', 'https://www.youtube.com/embed/QOVaHwm-Q6U', 1, NULL),
(5, 'Deadlifts', 'Full-body strength exercise', 'https://www.youtube.com/embed/r4MzxtBKyNE', 1, 2),
(6, 'Bicep Curls', 'Exercise for arm strength', 'https://www.youtube.com/embed/ykJmrZ5v0Oo', 1, 2),
(7, 'Pull-ups', 'Upper body strength exercise', 'https://www.youtube.com/embed/eGo4IYlbE5g', 1, NULL),
(8, 'Bench Press', 'Chest and triceps exercise', 'https://www.youtube.com/embed/gRVjAtPip0Y', 1, 2),
(9, 'Burpees', 'Full-body cardio exercise', 'https://www.youtube.com/embed/TU8QYVW0gDU', 1, NULL),
(10, 'Mountain Climbers', 'Cardio and core workout', 'https://www.youtube.com/embed/cnyTQDSE884', 3, NULL);