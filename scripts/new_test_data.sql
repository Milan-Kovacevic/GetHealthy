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