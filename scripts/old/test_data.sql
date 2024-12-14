use `get_healthy`;

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
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (1);
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Trening snage'),(2,'Funkcionalni trening'),(3,'Trening izdržljivosti'),(4,'Trening za donji dio tijela'),(5,'Yoga'),(6,'Pilates trening'),(7,'Trening za fleksibilnost i stabilnost'),(8,'Relaksacija i opuštanje'),(9,'Kardiovaskularni trening'),(10,'Pliometrijski trening'),(11,'Tehnika trčanja');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'Odličan trening, trener je veoma pristupačan za sve moguće konsultacije!','2023-09-11 23:24:12',8,3),(2,'Trening i trener odlični!','2023-09-11 23:33:36',2,9),(3,'Veoma zahtjevan trening :(','2023-09-11 23:29:00',8,8),(4,'OK','2023-09-11 23:29:15',8,10),(5,'Nije moj tip treninga :( \nInače. trener je odličan','2023-09-11 23:34:51',7,4),(6,'NICE\n','2023-09-11 23:35:15',7,5),(7,'Meni odličaaan\n','2023-09-11 23:35:40',7,8),(8,'Super','2023-09-12 15:41:01',8,4),(9,'Odlično za opuštanje','2023-09-11 23:37:48',9,4),(10,'Takođe, meni odličan trening. Let`s go Sparta','2023-09-11 23:39:41',10,8);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `exercise`
--

LOCK TABLES `exercise` WRITE;
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;
INSERT INTO `exercise` VALUES (1,'Plank','Lezite na stomak, podlaktice na podu ispod ramena.\nPodignite tijelo tako da ste oslonjeni na podlaktice i prste na nogama.\nDržite ravnu liniju od glave do pete, zadržavajući napetost u core mišićima.\nDržite se što duže možete.','https://www.youtube.com/watch?v=b75M62-tsxw',3),(2,'Russian Twist','Sjedite na pod sa savijenim koljenima i stopalima na podu.\nNaginjite se unazad nekoliko centimetara i podignite noge od poda.\nDržite ruke ispred grudi i rotirajte torzo sa strane na stranu, dodirujući rukama pod sa svake strane.','https://www.youtube.com/watch?v=wkD8rjkodUI',3),(3,'Leg Raises','Lezite na leđa sa ispruženim nogama.\nPodignite noge ravno prema plafonu, zadržavajući kontrolu.\nPolako spustite noge nazad prema podu bez da dodirnete pod.','https://www.youtube.com/watch?v=l4kQd9eWclE',3),(4,'Bicycle Crunches','Lezite na leđa, savijte koljena i postavite ruke iza glave.\nPodignite ramena od poda i prinesite suprotni lakat prema suprotnem koljenu.\nPonavljajte pokrete poput vožnje bicikla.','https://www.youtube.com/watch?v=Iwyvozckjak',3),(5,'Mountain Climbers','Postavite se u poziciju sklekova.\nAlternativno povlačite koljena prema grudima, simulirajući brzu trku na mjestu.','https://www.youtube.com/watch?v=nmwgirgXLYM',3),(6,'Dead Bug','Lezite na leđa sa savijenim nogama pod uglom od 90 stepeni i rukama prema gore.\nPostepeno ispravite jednu nogu i istovremeno spustite suprotnu ruku unazad prema podu.\nVratite se u početni položaj i ponovite sa suprotnim stranama.','https://www.youtube.com/watch?v=g_BYB0R-4Ws',3),(7,'Sumo čučanj','Stanite sa širokim stavom nogu i prstima okrenutim malo na spoljnu stranu.\nSpustite se u čučanj tako da koljena budu savijena pod pravim uglom, držeći leđa ravno.\nPovucite se nazad gore koristeći mišiće gluteusa.','https://www.youtube.com/watch?v=sqDGkIBYPAk',3),(8,'Hip Thrusts','Sjedite na podu sa savijenim koljenima i leđima na stolici ili klupe.\nPostavite težinu na bokove i podignite karlicu prema gore dok su vam noge ravne.\nPauzirajte na vrhu i spustite se nazad.','https://www.youtube.com/watch?v=aweBS7K71l8',3),(9,'Glute Bridge Leg Raises','Lezite na leđa sa savijenim koljenima i stopalima na podu.\nPodignite karlicu prema gore u mostu, a zatim podignite jednu nogu prema gore, držeći stopalo blizu plafona.\nSpustite nogu i ponovite sa drugom nogom.','https://www.youtube.com/watch?v=AVAXhy6pl7o',3),(10,'Deadlifts','Držite bučice ili šipku ispred tijela.\nSavijte se u kukovima, zadržavajući ravna leđa, i spustite bučice prema podu.\nPovucite se nazad gore, koristeći mišiće gluteusa i leđa.','https://www.youtube.com/watch?v=op9kVnSso6Q',3),(11,'Fire Hydrants','','https://www.youtube.com/watch?v=CAZZz7uP-Ok',3),(12,'Most','Lezite na leđa sa savijenim koljenima i stopalima postavljenim na podu, rastojanjem ramena.\nRuke stavite uz tijelo sa dlanovima okrenutim prema dolje.\nPodignite karlicu prema gore tako da se tijelo podiže u most.\nOdržavajte liniju od ramena do koljena i držite trbušne mišiće aktiviranim.\nPauzirajte na vrhu, a zatim se polako spustite nazad na pod.','https://www.youtube.com/watch?v=-ZY3Rgm-UXg',3),(13,'Pilates Roll-Up ','Lezite na leđa sa ispruženim nogama i rukama iznad glave.\nPolako podižite ruke i glavu prema plafonu, istovremeno podižući gornji dio tijela od poda.\nNastavite da se kotrljate prema napred, približavajući se ka ispravljenom sjedenju.\nPolako se vraćajte unazad do ležećeg položaja.','https://www.youtube.com/watch?v=FZNwIJ03fhQ',3),(14,'Pilates Hundred','Lezite na leđa sa ispravljenim nogama i podignite ih sa poda tako da su u visini kukova.\nPodignite glavu i gornji dio tijela sa poda.\nRukama napravite male udarce prema napred i nazad, simulirajući brojanje do sto.\nOdržavajte trbušne mišiće napetim tokom vježbe.','https://www.youtube.com/watch?v=UaqpuUzs1i8',3),(15,'Pilates Saw','Sjedite na podu sa ispravljenim nogama raširenim u širini ramena.\nRuke ispružite u širini ramena.\nOkrenite gornji dio tijela i ruke u suprotnom pravcu, pokušavajući dodirnuti prstima suprotnog stopala.\nVratite se u početni položaj i ponovite sa suprotne strane.','https://www.youtube.com/watch?v=1XcU-WsTcaU',3),(16,'Pilates Plivanje','Lezite na stomak sa ispruženim rukama i nogama.\nPodignite glavu, ruke i noge sa poda.\nIspružite noge i ruke prema naprijed i nazad u ritmičkom pokretu, simulirajući plivanje.\nOdržavajte stomak čvrstim i gornji dio tijela podignutim sa poda.','https://www.youtube.com/watch?v=bY6ZyiO_7ek',3),(17,'Planinski položaj(Tadasana)','Stanite uspravno sa stopalima zajedno.\nRuke su uz tijelo, dlanovi okrenuti naprijed.\nOdržavajte uspravno držanje tijela i fokus na ravnoteži.','https://www.youtube.com/watch?v=2HTvZp5rPrg',3),(18,'Downward facing dog','Oslonite se od pod rukama i nogama.\nPodignite kukove prema gore i nazad tako da tijelo formira obrnutu \"V\" poziciju.\nIstegnite ruke i noge, osjećajte istezanje u zadnjici i nogama','https://www.youtube.com/watch?v=EC7RGJ975iM',3),(19,'Dečja pozicija (Balasana)','Sjedite na petama sa rukama ispruženim naprijed.\nSpustite se naprijed sa čelom na podu, ruke ispružene ispred.\nOvo je pozicija opuštanja.','https://www.youtube.com/watch?v=2MJGg-dUKh0',3),(20,'Pozicija drveta (Vrikshasana)','Stanite uspravno, prenesite težinu na jednu nogu i savijte drugu nogu tako da je stopalo postavljeno na unutrašnju stranu prve noge.\nPostavite ruke u molitveni položaj ispred grudi.\nOdržavajte ravnotežu i ponovite sa suprotnom nogom.','https://www.youtube.com/watch?v=Dic293YNJI8',3),(21,'Savasana','Lezite na leđa sa ispravljenim nogama i rukama pored tijela.\nOpustite tijelo, zatvorite oči i dišite duboko.\nOvo je pozicija za duboku relaksaciju.','https://www.youtube.com/watch?v=dXYtWuYxWmQ',3),(22,'Burpees','Stanite uspravno, a zatim brzo se spustite u čučanj i stavite ruke na pod.\nOdmah se pozicionirajte u položaj daske (plank).\nBrzo se vratite u čučanj i skočite visoko sa rukama iznad glave.','https://www.youtube.com/watch?v=dZgVxmf6jkA',5),(23,'Mountain Climbers','Postavite se u položaj daske (plank).\nPovucite koljena prema grudima, izmjenjujući noge u brzom tempu.','https://www.youtube.com/watch?v=cnyTQDSE884',5),(24,'Jumping Jacks','Stanite uspravno sa nogama zajedno i rukama uz tijelo.\nSkočite u vazduh, istovremeno raširujući noge sa rukama iznad glave.\nSkočite ponovo i vratite se u početni položaj.','https://www.youtube.com/watch?v=nGaXj3kkmrU',5),(25,'High Knees','Stanite uspravno.\nPodižite koljena visoko prema grudima, brzo izmjenjujući noge kao da trčite na mjestu.','https://www.youtube.com/watch?v=ZNDHivUg7vA',5),(26,'Box Jumps','Stojte ispred ravne površine (kutije ili stepenice).\nSkočite na kutiju, istovremeno savijajući koljena.\nOdmah se spustite sa kutije i ponovite skok.','https://www.youtube.com/watch?v=I0T5YWUSVKE',5),(27,'Depth Jumps','Stanite na povišenu površinu (npr. kutiju ili stepenicu).\nSkočite sa povišene površine na pod, a zatim odmah skočite uvis.\nOva vježba razvija eksplozivnost i snagu mišića nogu.','https://www.youtube.com/watch?v=AzPJZHOmGEg',5),(28,'Pliometrijski sklekovi','Izvedite standardne sklekove, ali dodajte eksplozivnu silu kako biste se podigli što više od poda.\nRukama napravite odskok sa poda tokom svakog skleka.','https://www.youtube.com/watch?v=Y-uF4F3mQIs',5),(29,'Bounding','Trčite brzo naprijed sa dugim koracima, koristeći eksplozivnu snagu da se što brže pomaknete.','https://www.youtube.com/watch?v=GAmivnexw58',5),(30,'Skakanje u iskoraku','Napravite iskorak unaprijed i brzo se spustite u iskoraku.\nOdmah skočite iz iskoraka i zamijenite noge u vazduhu.\nPonavljajte ovu sekvencu.','https://www.youtube.com/watch?v=0lxr_mvYQeQ',5),(31,'Sprint','Izvođenje vježbe na 100 m po mogučnosti. Ukoliko se izvodi kućni trening moguće je izvesti uz zid (video demonstracija)','https://www.youtube.com/watch?v=H8r90PQKEvg',5),(32,'Spartanski iskoraci','Napravite veliki iskorak unaprijed sa jednom nogom dok se druga noga nalazi u pozadini.\nSpustite se prema dolje dok obe noge formiraju pravi ugao.\nVratite se u početni položaj i ponovite sa drugom nogom.','https://www.youtube.com/watch?v=gBWN3uBX93s',5),(33,'Spartanski sklekovi','Izvedite standardni sklek, ali postavite ruke šire od širine ramena.\nSpuštajte se prema dolje i gurajte se nazad prema gore.\nOva varijacija angažuje više mišića ruku i grudnog koša.','https://www.youtube.com/watch?v=6a41RnKbYLQ',5),(34,'Preskakanje vijače','Počnite stojeći uspravno, držeći vijaču u rukama ili simulirajući skakanje rukama. Ruke trebaju biti blizu tijela, a laktovi savijeni pod uglom od otprilike 90 stepeni. Postavite se na prste nogu, držeći pete iznad poda. To će vam pomoći da bolje skočite između svakog okreta vijače.Okrenite vijaču tako da se lagano kreće iznad poda i počnite skakati dok rotirate vijaču oko tijela. Skočite dovoljno visoko da vam vijača prođe ispod nogu.','https://www.youtube.com/watch?v=u3zgHI8QnqE',5),(35,'Clean and Jerk','Podizanje šipke sa zemlje, postavljanje na ramena i guranje iznad glave..','https://www.youtube.com/watch?v=UBc5N_-xdqo',5),(36,'Trzaj','Vježba za jačanje gornjeg dijela tijela, u kojoj se vježbač izvlači prema šipci sa ispruženim rukama.','https://www.youtube.com/watch?v=KweCZJlwCw0',5),(37,'Bacanje medicinske lopte','Bacite medicinsku loptu prema zidu i uhvatite je nakon odbijanja.','https://www.youtube.com/watch?v=fpUD0mcFp_0',5),(38,'Šetnja farmera','Držite po težak teret u svakoj ruci (kao što su tegovi ili sanduci).\nHodajte što brže ili što duže možete.\nOva vježba razvija snagu ruku, leđa i nogu.','https://www.youtube.com/watch?v=VBobkldqqvk',5),(39,'Okretanje guma','Okrećite teške gume na jednoj ili više ponavljanja.\nOva vježba razvija snagu nogu i trupa.','https://www.youtube.com/watch?v=aIDjGG_xwHg',5),(40,'Guranje tereta','','https://www.youtube.com/watch?v=9XRRXaUpnLk',5),(41,'Vuča tereta','Vuča tereta na sletu na određenoj udaljenosti.','https://www.youtube.com/watch?v=CECvWZAHb_4',5),(42,'Čučnjevi','Moguće izvođenje sa i bez opterećenja.','https://www.youtube.com/watch?v=MuvB_F2ynD4',5),(43,'Mrtvo dizanje','Savijte se u struku i podignite tegove sa poda.\nPovucite kukove unazad i istegnite noge dok se uspravljate.','https://www.youtube.com/watch?v=XxWcirHIwVo',5),(44,'Plank','Lezite na područje lakta i prstiju nogu.\nDržite ravno tijelo u liniji od glave do pete. ','https://www.youtube.com/watch?v=BQu26ABuVS0&t=1s',5),(45,'Dumbbell Rows','Lezite na klupu sa tegovima u rukama.\nPodignite tegove prema gore, savijajući laktove. Ova vježba jača mišiće leđa.','https://www.youtube.com/watch?v=roCP6wCXPqo',5),(46,'Merengue','','https://www.youtube.com/watch?v=KO_hobER7SU',3),(47,'Cha-Cha-Cha','Latino ples','https://www.youtube.com/watch?v=PWiLi22Cq8w',3),(48,'Mambo','Mambo je energičan i brz ples sa mnogo prekida i ritmičkih varijacija.','https://www.youtube.com/watch?v=--jqOdifXrw',3);
/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,0,'Brzi Sprinter','2023-09-11 23:17:21',2,5,0),(2,0,'CrossFit Fury','2023-09-11 23:17:25',2,5,0),(3,0,'Power Plyo','2023-09-11 23:17:28',7,5,0),(4,0,'Cardio HIIT','2023-09-11 23:17:33',7,5,0),(5,0,'Spartanski ratnik','2023-09-11 23:17:36',7,5,0),(6,0,'Strongman Challenge','2023-09-11 23:17:38',8,5,0),(7,0,'Spartanski ratnik','2023-09-11 23:17:40',8,5,0),(8,0,'Cardio HIIT','2023-09-11 23:17:42',8,5,0),(9,0,'Spartanski ratnik','2023-09-11 23:17:45',10,5,0),(10,0,'CrossFit Fury','2023-09-11 23:17:47',10,5,0),(11,0,'Total Body','2023-09-11 23:17:49',9,5,0),(12,0,'Sculpt & Burn Challenge','2023-09-11 23:17:51',10,5,0),(13,0,'Yoga Bliss','2023-09-11 23:20:57',7,3,0),(14,0,'Pilates Harmony','2023-09-11 23:20:58',8,3,0),(15,0,'Booty Burner','2023-09-11 23:21:02',9,3,0),(16,0,'Pilates Harmony','2023-09-11 23:21:03',9,3,0),(17,0,'Yoga Bliss','2023-09-11 23:21:05',9,3,0),(18,0,'Core Crusher','2023-09-11 23:21:06',9,3,0),(19,0,'Booty Burner','2023-09-11 23:21:08',10,3,0),(20,0,'Sweat & Smile Workout','2023-09-11 23:21:10',9,3,0),(21,0,'Core Crusher','2023-09-11 23:21:12',2,3,0),(22,0,'Pilates Harmony','2023-09-11 23:24:12',3,8,2),(23,0,'Cardio HIIT','2023-09-11 23:25:09',5,8,2),(24,0,'Spartanski ratnik','2023-09-11 23:29:00',5,8,2),(25,0,'Strongman Challenge','2023-09-11 23:29:15',5,8,2),(26,0,'Core Crusher','2023-09-11 23:30:08',3,2,2),(27,0,'Brzi Sprinter','2023-09-11 23:31:31',5,2,2),(34,0,'CrossFit Fury','2023-09-11 23:33:36',5,2,2),(35,0,'Yoga Bliss','2023-09-11 23:34:51',3,7,2),(36,0,'Cardio HIIT','2023-09-11 23:35:15',5,7,2),(37,0,'Spartanski ratnik','2023-09-11 23:35:40',5,7,2),(38,0,'Core Crusher','2023-09-11 23:36:46',3,9,2),(39,0,'Pilates Harmony','2023-09-11 23:37:31',3,9,2),(40,0,'Yoga Bliss','2023-09-11 23:37:48',3,9,2),(41,0,'Spartanski ratnik','2023-09-11 23:39:41',5,10,2),(42,0,'Spartanski ratnik','2023-09-11 23:41:25',5,8,2),(43,0,'Yoga Bliss','2023-09-12 15:38:00',8,3,0),(44,0,'Core Crusher','2023-09-12 15:38:22',8,3,1),(45,0,'Yoga Bliss','2023-09-12 15:41:01',3,8,2);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `program_rating`
--

LOCK TABLES `program_rating` WRITE;
/*!40000 ALTER TABLE `program_rating` DISABLE KEYS */;
INSERT INTO `program_rating` VALUES (1,4,3,8),(2,5,5,8),(3,3,8,8),(4,2,10,8),(5,5,1,2),(7,3,7,2),(8,4,9,2),(9,2,4,7),(10,4,5,7),(11,4,6,7),(12,5,8,7),(13,5,1,9),(14,5,2,9),(15,4,3,9),(16,5,4,9),(17,3,11,9),(18,5,13,9),(19,4,2,10),(20,3,8,10),(21,5,9,10),(22,5,12,10);
/*!40000 ALTER TABLE `program_rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `qualification`
--

LOCK TABLES `qualification` WRITE;
/*!40000 ALTER TABLE `qualification` DISABLE KEYS */;
INSERT INTO `qualification` VALUES (3,'Personalni fitnes trener','2025-09-10','MTY5NDM0MzU0MDU1OF9HSA==.pdf','IFFB sertifikat'),(5,'Sertifikovati personalni trener (CPT)','2026-02-07','MTY5NDM0MzkzMzA0NF9HSA==.pdf','PD:Approval sertifikat');
/*!40000 ALTER TABLE `qualification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `registration_request`
--

LOCK TABLES `registration_request` WRITE;
/*!40000 ALTER TABLE `registration_request` DISABLE KEYS */;
INSERT INTO `registration_request` VALUES (6,'2023-09-10 13:08:50','Kardiolog','2060-10-27','MTY5NDM0NDEzMDQzMV9HSA==.pdf','ICCPR Cardiovascular Rehabilitation','Nikola','Mitrović','1997-04-01',0),(17,'2023-09-12 20:49:05','Diplomirani ljekar(MD)','2050-04-21','MTY5NDU0NDU0NTE1NV9HSA==.pdf','California Talum Dafa Month sertifikat za ljekare','Mirjana','Gavrić','2001-07-02',1);
/*!40000 ALTER TABLE `registration_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `trainee`
--

LOCK TABLES `trainee` WRITE;
/*!40000 ALTER TABLE `trainee` DISABLE KEYS */;
INSERT INTO `trainee` VALUES (2,NULL,NULL,NULL),(7,NULL,NULL,NULL),(8,NULL,NULL,NULL),(9,NULL,NULL,NULL),(10,NULL,NULL,NULL);
/*!40000 ALTER TABLE `trainee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `trainee_on_training_program`
--

LOCK TABLES `trainee_on_training_program` WRITE;
/*!40000 ALTER TABLE `trainee_on_training_program` DISABLE KEYS */;
INSERT INTO `trainee_on_training_program` VALUES (1,2,7,'2023-09-11 23:17:21'),(2,2,9,'2023-09-11 23:17:25'),(3,7,6,'2023-09-11 23:17:27'),(4,7,5,'2023-09-11 23:17:33'),(5,7,8,'2023-09-11 23:17:36'),(6,8,10,'2023-09-11 23:17:38'),(7,8,8,'2023-09-11 23:17:40'),(8,8,5,'2023-09-11 23:17:42'),(9,10,8,'2023-09-11 23:17:45'),(10,10,9,'2023-09-11 23:17:47'),(11,9,11,'2023-09-11 23:17:49'),(12,10,12,'2023-09-11 23:17:51'),(13,7,4,'2023-09-11 23:20:57'),(14,8,3,'2023-09-11 23:20:58'),(15,9,2,'2023-09-11 23:21:02'),(16,9,3,'2023-09-11 23:21:03'),(17,9,4,'2023-09-11 23:21:05'),(18,9,1,'2023-09-11 23:21:06'),(19,10,2,'2023-09-11 23:21:08'),(20,9,13,'2023-09-11 23:21:10'),(21,2,1,'2023-09-11 23:21:12'),(22,8,4,'2023-09-12 15:38:00');
/*!40000 ALTER TABLE `trainee_on_training_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `trainer`
--

LOCK TABLES `trainer` WRITE;
/*!40000 ALTER TABLE `trainer` DISABLE KEYS */;
INSERT INTO `trainer` VALUES (3,NULL,NULL,NULL),(5,NULL,NULL,NULL);
/*!40000 ALTER TABLE `trainer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `training_program`
--

LOCK TABLES `training_program` WRITE;
/*!40000 ALTER TABLE `training_program` DISABLE KEYS */;
INSERT INTO `training_program` VALUES (1,'Core Crusher','\"Core Crusher\" trening je intenzivan trening koji je usmjeren na jačanje i toniranje mišića core-a, što uključuje trbušne mišiće, donji dio leđa i mišiće karlice. Ovaj trening je odličan za poboljšanje stabilnosti, ravnoteže i ukupne snage core-a.','Trening može biti izazovan, pa je poželjno da vježbači imaju određenu osnovnu kondiciju i snagu kako bi se efikasno izvodile vježbe. Takođe, trebaće vam udobna sportska oprema, a poželjna je prostirka za vježbe koje se izvode na podu.','2023-09-10',3),(2,'Booty Burner',' \"Booty Burner\" je intenzivan trening usmjeren na jačanje mišića gluteusa. Ovaj trening obično uključuje vježbe koje se fokusiraju na donji dio tijela, posebno na zadnjicu. Cilj je stvaranje čvrstih, oblikovanih i snažnih gluteusa. Trening se može izvoditi kod kuće ili u teretani, a obično uključuje serije vježbi koje se izvode uz opterećenje ili težinu.','Vježbe u \"Booty Burner\" treningu često uključuju upotrebu opterećenja kao što su bučice, otpornici ili težina za noge kako bi se vježbe otežale i postigao veći efekat. Ukoliko radite trening kod kuće, možete se poslužiti flašicama napunjenim vodom.   ','2023-09-10',3),(3,'Pilates Harmony','\"Pilates Harmony\" je holistički program vježbanja koji se fokusira na razvoj snage, fleksibilnosti, stabilnosti i koordinacije tijela. Ovaj program takođe promoviše unutrašnji mir i mentalni fokus kroz tehnike disanja i svijesti o tijelu. Vježbe u \"Pilates Harmony\" se obično izvode polako i kontrolisano, sa naglaskom na pravilnoj tehnici izvođenja. Ovaj program može biti prilagođen različitim nivoima vježbača, od početnika do naprednih.','Preporučuje se nošenje udobne sportske odjeće koja omogućava slobodno kretanje. \nTrebaće Vam udobna podloga (npr. yoga mat) na kojoj ćete izvoditi vježbe.','2023-09-10',3),(4,'Yoga Bliss','\"Yoga Bliss\" je program vježbanja koji se temelji na principima joge i dizajniran je da poboljša fleksibilnost, ravnotežu, snagu i mentalni fokus. Ovaj program naglašava spajanje tijela i uma kroz različite položaje tijela (asane) i tehniku disanja.','Trebaće vam udobna podloga (npr. yoga mat) na kojoj ćete izvoditi vježbe.','2023-09-10',3),(5,'Cardio HIIT','\"Cardio HIIT\" se izvodi putem serija intervala visokog intenziteta, gdje se vježbe visokog tempa smjenjuju sa intervalima niskog intenziteta ili odmora. Cilj je podići puls i održavati ga na visokom nivou tokom kratkih intervala, a zatim se opustiti tokom intervala nižeg intenziteta. Ovakav trening je odličan za sagorijevanje kalorija, poboljšanje kardiovaskularne kondicije i povećanje snage i izdržljivosti.','Trening je intenzivan, pa je preporučljivo da vježbači imaju osnovnu fizičku kondiciju prije nego što započnu ovakav trening.\nOvaj trening zahtijeva mnogo energije, pa je važno da se pripremite sa dovoljno sna i adekvatnom ishranom.','2023-09-10',5),(6,'Power Plyo','\"Power Plyo\" je intenzivan trening koji koristi skakanje, skokove i druge pliometrijske vježbe kako bi se razvila mišićna snaga i povećala eksplozivnost. Pliometrijske vježbe podrazumijevaju brze kontrakcije mišića, što dovodi do brzog istezanja i skraćenja mišića i time povećava snagu. Ovaj trening takođe može poboljšati ravnotežu, koordinaciju i agilnost.','Poželjno je obavljati trening na kvalitetnim podlogama, kao što su podloge za pliometrijske vježbe, kako bi se smanjilo opterećenje na zglobovima tokom skakanja.','2023-09-10',5),(7,'Brzi Sprinter','\"Brzi Sprinter\" trening se bazira na kratkim, intenzivnim intervalima trčanja ili sprintanja, koji se smjenjuju sa periodima odmora ili laganih aktivnosti. Cilj je poboljšati brzinu, eksplozivnost, snagu nogu i tehniku trčanja. Ovaj trening je posebno koristan za sprintere, atletičare i sportiste koji zahtijevaju brzu eksplozivnost.','Poželjno je izvođenje treninga na vanjskim terenima.','2023-09-10',5),(8,'Spartanski ratnik','\"Spartanski ratnik\" trening je vođen idejom izdržljivosti i snage, baš kao što su to bili i Spartanci u svoje vrijeme. Ovaj trening kombinuje različite vježbe koje izazivaju sve aspekte fizičke kondicije, uključujući snagu, izdržljivost, brzinu i agilnost. Takođe, ovaj trening naglašava mentalnu čvrstoću i volju.','Poželjno je imati odgovarajuću opremu, poput tegova, vijača, traka za otpor.','2023-09-11',5),(9,'CrossFit Fury','\"CrossFit Fury\" kombinuje različite vrste vježbi, uključujući dizanje tegova, gimnastiku, kardiovaskularne aktivnosti i funkcionalne pokrete. Cilj je razviti sveobuhvatnu fizičku kondiciju, povećati snagu i izdržljivost, te poboljšati kardiovaskularno zdravlje.','Potrebna oprema za izvođenje treninga(tegovi, medicinska lopta,..). Intenzivan trening sa olimpijskim vježbama za pripremu sportista, te je potrebna fizička kondicija. ','2023-09-11',5),(10,'Strongman Challenge','\"Strongman Challenge\" trening je inspirisan takmičarskim sportom \"strongman\", koji uključuje različite fizičke izazove poput podizanja teških predmeta, vuče tereta, nošenja tereta, bacanja predmeta i drugih aktivnosti koje zahtijevaju ekstremnu snagu i izdržljivost.','Trening uključuje teške terete i predmete, pa je važno imati dovoljno snage i izdržljivosti. Potrebna oprema(tegovi, guma, bučice).','2023-09-11',5),(11,'Total Body','\"Total Body\" trening je sveobuhvatan trening koji cilja sve glavne mišićne grupe tijela, uključujući mišiće nogu, trupa, leđa, ramena i ruku. Ovaj trening kombinuje različite vježbe i tehnike kako bi se postigao holistički pristup tjelesnom jačanju. Cilj je poboljšati snagu, izdržljivost, ravnotežu i funkcionalnu kondiciju tijela.','Poželjna oprema(tegovi,..).Trening je moguće prilagoditi svojim specifičnim ciljevima, bilo da želite izgraditi mišićnu masu, povećati izdržljivost ili poboljšati funkcionalnost, tako da je moguće izvoditi ga bez opterećenja.','2023-09-11',5),(12,'Sculpt & Burn Challenge','\"Sculpt & Burn Challenge\" trening kombinuje elemente snage i kardiovaskularne kondicije kako bi se postigli rezultati oblikovanja tijela. Program se često sastoji od raznovrsnih vježbi koje ciljaju različite mišićne grupe.','Potrebna oprema (tegovi).','2023-09-11',5),(13,'Sweat & Smile Workout','\"Sweat & Smile Workout\" trening kombinuje dinamične vježbe sa elementima latino plesova. Ovaj trening uključuje muziku i druge zabavne aktivnosti koje motivišu vježbače da se angažuju i uživaju u treningu. Cilj je osigurati da svaki trening bude pozitivno iskustvo i da vježbači napuste salu sa osmijehom na licu.','','2023-09-11',3);
/*!40000 ALTER TABLE `training_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `training_program_application`
--

LOCK TABLES `training_program_application` WRITE;
/*!40000 ALTER TABLE `training_program_application` DISABLE KEYS */;
INSERT INTO `training_program_application` VALUES (3,2,10,1,'2023-09-11 16:35:44',NULL),(23,8,11,1,'2023-09-11 23:13:25',NULL);
/*!40000 ALTER TABLE `training_program_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `training_program_category`
--

LOCK TABLES `training_program_category` WRITE;
/*!40000 ALTER TABLE `training_program_category` DISABLE KEYS */;
INSERT INTO `training_program_category` VALUES (1,1),(2,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(1,2),(2,2),(5,2),(9,2),(10,2),(11,2),(13,2),(1,3),(5,3),(6,3),(8,3),(9,3),(10,3),(11,3),(12,3),(2,4),(3,5),(4,5),(3,6),(13,6),(3,7),(4,7),(4,8),(5,9),(9,9),(12,9),(13,9),(6,10),(7,10),(7,11);
/*!40000 ALTER TABLE `training_program_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `training_program_exercise`
--

LOCK TABLES `training_program_exercise` WRITE;
/*!40000 ALTER TABLE `training_program_exercise` DISABLE KEYS */;
INSERT INTO `training_program_exercise` VALUES (1,3,1,25,5,20),(3,6,1,25,3,10),(4,5,1,30,3,30),(5,4,1,35,3,20),(6,2,1,20,4,10),(7,7,2,30,5,20),(8,11,2,30,4,20),(9,8,2,20,3,10),(10,9,2,35,5,15),(11,10,2,25,3,15),(12,14,3,20,3,20),(13,15,3,25,3,10),(14,16,3,25,5,15),(15,12,3,10,4,10),(16,13,3,20,3,15),(17,17,4,10,3,10),(18,18,4,20,3,10),(19,19,4,25,3,10),(20,20,4,15,4,10),(21,22,5,30,5,10),(22,22,8,25,3,20),(23,24,5,35,4,20),(24,24,12,25,3,10),(25,25,12,25,3,10),(26,26,9,30,3,30),(27,27,7,15,4,20),(28,28,11,25,3,30),(29,26,6,20,3,20),(30,31,7,3,1,60),(31,33,8,20,3,30),(32,31,8,3,1,25),(33,34,8,50,4,15),(34,32,8,30,3,30),(35,36,9,30,3,60),(36,36,11,25,3,15),(37,35,9,5,3,60),(38,38,10,40,3,20),(39,39,10,10,3,60),(40,41,10,5,1,60),(41,40,10,5,1,60),(42,42,12,30,3,15),(43,42,11,30,3,10),(44,44,12,120,3,30),(45,45,12,30,3,10),(46,47,13,20,1,10),(47,46,13,20,1,10),(48,48,13,20,1,10);
/*!40000 ALTER TABLE `training_program_exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `training_program_on_schedule`
--

LOCK TABLES `training_program_on_schedule` WRITE;
/*!40000 ALTER TABLE `training_program_on_schedule` DISABLE KEYS */;
INSERT INTO `training_program_on_schedule` VALUES (1,'08:00:00','09:00:00',0,5,5),(2,'08:00:00','09:00:00',2,5,5),(3,'08:00:00','09:00:00',4,5,5),(4,'09:15:00','11:15:00',0,6,5),(5,'09:15:00','11:15:00',2,6,5),(6,'09:15:00','11:15:00',4,6,5),(7,'13:00:00','14:00:00',0,7,5),(8,'13:00:00','14:00:00',2,7,5),(9,'13:00:00','14:00:00',2,7,5),(10,'13:00:00','14:00:00',4,7,5),(11,'20:00:00','22:00:00',0,8,5),(12,'20:00:00','22:00:00',1,8,5),(13,'20:00:00','22:00:00',2,8,5),(14,'20:00:00','22:00:00',3,8,5),(15,'20:00:00','22:00:00',4,8,5),(16,'08:00:00','10:00:00',5,8,5),(18,'16:00:00','17:15:00',0,9,5),(20,'16:00:00','17:15:00',2,9,5),(21,'16:00:00','17:15:00',4,9,5),(22,'16:00:00','17:15:00',5,9,5),(23,'09:00:00','11:00:00',1,10,5),(24,'09:00:00','11:00:00',3,10,5),(26,'10:00:00','12:00:00',5,10,5),(27,'10:00:00','12:00:00',6,10,5),(28,'10:00:00','10:30:00',0,1,3),(29,'10:00:00','10:30:00',2,1,3),(30,'10:00:00','10:30:00',4,1,3),(31,'07:00:00','09:00:00',0,3,3),(32,'07:00:00','09:00:00',2,3,3),(33,'07:00:00','09:00:00',4,3,3),(34,'07:00:00','09:00:00',6,3,3),(35,'19:00:00','20:30:00',1,2,3),(36,'19:00:00','20:30:00',3,2,3),(37,'19:00:00','20:30:00',4,2,3),(38,'19:00:00','20:30:00',5,2,3),(39,'20:00:00','21:30:00',0,4,3),(40,'20:00:00','21:30:00',2,4,3),(41,'20:30:00','22:00:00',4,4,3),(42,'09:15:00','10:45:00',6,4,3),(43,'12:00:00','14:00:00',1,11,5),(44,'12:00:00','14:00:00',3,11,5),(45,'12:00:00','14:00:00',6,11,5),(46,'16:00:00','18:00:00',1,12,5),(47,'16:00:00','18:00:00',3,12,5),(48,'16:00:00','18:00:00',6,12,5),(49,'12:00:00','14:00:00',0,13,3),(50,'12:00:00','14:00:00',1,13,3),(51,'12:00:00','14:00:00',2,13,3),(52,'12:00:00','14:00:00',3,13,3),(53,'12:00:00','14:00:00',3,13,3),(54,'12:00:00','14:00:00',4,13,3),(55,'12:00:00','14:00:00',5,13,3),(56,'12:00:00','14:00:00',6,13,3);
/*!40000 ALTER TABLE `training_program_on_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'Slavko','Popović','1983-12-05',0),(3,'Anja','Mirković','1995-08-03',1),(5,'Danijel','Stojanović','1991-07-06',0),(7,'Stanko','Soldat','1999-03-02',0),(8,'Dejan','Babić','2005-05-06',0),(9,'Jelena','Vasković','2003-07-09',1),(10,'Zoran','Lazić','1994-01-02',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_account`
--

LOCK TABLES `user_account` WRITE;
/*!40000 ALTER TABLE `user_account` DISABLE KEYS */;
INSERT INTO `user_account` VALUES (1,'admin','$2a$10$DuRNelOjYmg8awgA3siiF.xOUqHDVifNVdX3.IbIlTnqcihewMesG','admin@ps.gethealthy.dev',1,0,'2023-09-10 12:55:37','2023-09-12 21:43:32'),(2,'slavkop','$2a$10$uoiH.79xLOtIXI8kceg0b.bPfg5XRfq4U5eNYZ3C1Bn3m5LqyMq6i','slavko.popovic@gmail.com',1,2,'2023-09-10 12:57:24','2023-09-12 19:37:25'),(3,'anjam','$2a$10$IUHWplripOBnL6Xb7T93x./6wCJM8sAe7szn4V6FsftX3/RKWg2ai','anja.mirkovic@hotmail.com',1,1,'2023-09-10 12:59:01','2023-09-12 21:27:01'),(5,'danijels','$2a$10$tYCYgVyfgMVMaKSTwGAecOlOhwLoAj9RQwpOxslE31TP46nKIcA.W','danijel.stojanovic@yahoo.com',1,1,'2023-09-10 13:05:33','2023-09-12 20:53:49'),(6,'nikolam','$2a$10$Zil7pr.UGndxeTc4jQFjR.fugrPXQ10CCPO/fcs7duhWeRYAB73eq','nikola.mitrovic@gmail.com',0,1,'2023-09-10 13:08:50',NULL),(7,'stankos','$2a$10$SRTuS/wbjmH0w8puhu1p3eOZnOqUJO6aH5Db2M1G7MTRW1SO2V9Te','stanko.soldat@gmail.com',1,2,'2023-09-10 13:09:54','2023-09-11 23:33:54'),(8,'dejanb','$2a$10$6wjc0WkcGQgFchYGuVqYC.59WOoo0qMq58Qa0YHwkH/pA7L8tozjK','dejan.babic@yahoo.com',1,2,'2023-09-10 13:10:44','2023-09-12 15:39:52'),(9,'jelenav','$2a$10$TkaiiDS.9T9mHm0GFICCvOhrdheRoK6UT6Fhl7e0bJQ3WKGcwnMuS','jelena.vaskovic@yahoo.com',1,2,'2023-09-10 13:11:37','2023-09-11 23:36:04'),(10,'zoranl','$2a$10$LJeOlBbmsFVrSSOCWEXkQuXenNwXWLjw8qwWnXhEDWGvOjYjZygHW','zoran.lazic@yahoo.com',1,2,'2023-09-10 13:12:31','2023-09-11 23:38:26'),(17,'mirjanag','$2a$10$soUI.8HtyK1c5yDu254ip..3owkMjaUYWjXkdQZXpjctURAsNdBJu','mirjana.gavric@gmail.com',0,1,'2023-09-12 20:49:05',NULL);
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

-- Dump completed on 2023-09-12 21:46:57
