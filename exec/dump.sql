-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: i7d106.p.ssafy.io    Database: mafia
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

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
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend` (
  `friend_seq` int NOT NULL AUTO_INCREMENT,
  `apply_at` datetime(6) DEFAULT NULL,
  `is_accept` bit(1) NOT NULL,
  `friend_from_user_seq` int DEFAULT NULL,
  `friend_to_user_seq` int DEFAULT NULL,
  PRIMARY KEY (`friend_seq`),
  KEY `FKdnl1nqecemf5vuvkay1pd4eec` (`friend_from_user_seq`),
  KEY `FKd5mhhnoigjbl8kplckoyumjtv` (`friend_to_user_seq`),
  CONSTRAINT `FKd5mhhnoigjbl8kplckoyumjtv` FOREIGN KEY (`friend_to_user_seq`) REFERENCES `user` (`user_seq`),
  CONSTRAINT `FKdnl1nqecemf5vuvkay1pd4eec` FOREIGN KEY (`friend_from_user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
INSERT INTO `friend` VALUES (1,'2022-08-17 16:11:21.092612',_binary '',2,3),(2,'2022-08-17 21:48:17.333935',_binary '',12,9),(3,'2022-08-17 21:48:18.604764',_binary '\0',12,2),(4,'2022-08-17 21:48:19.687332',_binary '\0',12,11),(5,'2022-08-17 21:48:21.040893',_binary '',12,3),(6,'2022-08-17 21:48:23.128086',_binary '\0',12,8),(7,'2022-08-17 21:48:24.345763',_binary '\0',12,10),(8,'2022-08-17 21:48:25.518051',_binary '\0',12,7),(9,'2022-08-17 21:48:26.642953',_binary '\0',12,4),(10,'2022-08-17 21:48:27.789917',_binary '\0',12,1),(11,'2022-08-17 21:48:29.050336',_binary '\0',12,6),(12,'2022-08-17 21:48:30.476310',_binary '\0',12,5),(13,'2022-08-17 21:50:37.279770',_binary '',13,12),(14,'2022-08-17 21:50:45.389640',_binary '',12,13),(15,'2022-08-17 21:51:46.853300',_binary '',14,12),(16,'2022-08-17 21:53:40.143915',_binary '',15,12),(17,'2022-08-17 21:54:40.979055',_binary '',16,12),(18,'2022-08-17 21:54:44.899131',_binary '\0',16,13),(19,'2022-08-17 21:54:47.229971',_binary '\0',16,14),(20,'2022-08-17 21:54:48.332775',_binary '\0',16,9),(21,'2022-08-17 21:55:54.593461',_binary '\0',17,2),(22,'2022-08-17 21:55:56.066716',_binary '',17,12),(23,'2022-08-17 21:55:57.181626',_binary '\0',17,9),(24,'2022-08-17 21:56:06.769899',_binary '',12,14),(25,'2022-08-17 21:56:09.663546',_binary '',12,17),(26,'2022-08-17 21:56:12.982534',_binary '',12,16),(27,'2022-08-17 21:56:14.157319',_binary '',12,15),(28,'2022-08-17 21:57:36.632988',_binary '\0',18,12),(29,'2022-08-17 21:57:39.058641',_binary '\0',18,14),(30,'2022-08-17 21:58:35.214452',_binary '\0',19,12),(31,'2022-08-17 21:58:38.463544',_binary '\0',19,4),(32,'2022-08-18 10:11:31.071065',_binary '',3,2),(33,'2022-08-18 10:11:32.352088',_binary '',3,12),(34,'2022-08-18 21:57:27.052493',_binary '\0',12,23),(35,'2022-08-19 00:22:03.307527',_binary '',9,12);
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice_board`
--

DROP TABLE IF EXISTS `notice_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice_board` (
  `notice_seq` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `created_at` datetime(6) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `writer` int NOT NULL,
  PRIMARY KEY (`notice_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice_board`
--

LOCK TABLES `notice_board` WRITE;
/*!40000 ALTER TABLE `notice_board` DISABLE KEYS */;
INSERT INTO `notice_board` VALUES (1,'모두의 마피아는 SSAFY 6캔두잇 팀에서 만든 웹사이트입니다.\n\n팀은 팀장 : 이청, 조원 : 강보경, 이건희, 이동욱, 채민지, 최시령으로 구성되어있습니다.\n\n\n기능 :\n\n1. 오른쪽 상단 아이콘을 이용하여 BGM을 켜고 끌수 있고 오른쪽 하단의 도움 아이콘을 이용하여 자주 묻는 질문과 대답 및 유저 상담을 할 수 있습니다.\n\n2. 왼쪽 상단의 메뉴에서 공지사항, 랭킹, 마이페이지 기능을 이용할 수 있습니다.\n\n3. 마이페이지에서 유저닉네임 변경 및 유저 비밀번호 변경 또한 가능합니다.\n\n\n게임시작 :\n\n1. 대기실 목록 페이지로 들어가기 위해서는 이메일 인증과 닉네임 등록을 한 후에 들어갈 수 있습니다. 대기실 목록 페이지에서 현재 로그인 되어있는 유저와 채팅을 할 수 있고 친구신청을 할 수 있습니다.\n\n2. 대기실 입장은 방을 직접 찾아서 입장 및 랜덤 매칭을 통한 랭크 게임을 할 수 있습니다.\n\n\n대기방 : \n\n1. 대기방에 들어가면 키보드를 이용하여 자신의 캐릭터를 움직일 수 있고 호스트는 게임방을 수정 및 게임 시작을 할 수 있습니다.\n\n2. 유저들 끼리 채팅을 통해서 의사소통도 가능합니다\n\n\n게임방 :\n\n1. 게임을 실질적으로 플레이 하는 방이며 화면을 켜고 끌수있으며, 음성을 통해서 게임을 진행해도 됩니다.\n\n2. 악성유저가 있을 경우에는 유저 신고를 할 수 있습니다.\n\n\n\n','2022-08-18 15:09:47.445971','모두의 마피아입니다.',3),(2,'마 : 마피아는,   피 : 피도 눈물도 없는, 아 : 아아아아~ 아이스크림','2022-08-18 15:25:10.059042','재밌게 즐기세요. 마피아 이행시 해보겠습니다',7);
/*!40000 ALTER TABLE `notice_board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `rt_key` varchar(255) NOT NULL,
  `rt_value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rt_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
INSERT INTO `refresh_token` VALUES ('1','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjE0Nzg0MjV9.KXITqWPNEWVGQm4RFLxNyClGB93RxmnVJlubqPlozepjvPALvztpCgyjElNxj33z8oV9SpeSgwq14jKi_TiDjA'),('11','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjEzMzA3MjR9.0cuGEW27tRGkPZAolGHbepHvKSMfBTCMPxQn4K49uCVX6CvGyDAwVler_1G1JhpotjhuSjsuT3V08pCNRE3Sug'),('12','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjE0NzMyODd9.rQuJoKQQaX63LLVxX08kvHjtu1L-aF48GXom3jLNd3_MId9otItKOBaxyw0iqxTAQ7kBMUlxpZAItvWJU5N3Yg'),('15','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjE0MjY3MjZ9.ogJs2n2HceU_UacWPaEVk1ONnHLMqzh20u_4kVKDMXuv2IlN1Uf0rnGkm2QYb60mIC3qyiPtFOUPlM0VbTSe4A'),('16','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjE0MjY2MzZ9.fr9zwM6hiA4q9lxAChAMTGZM9C9pPWw1y8KiLupAZr9JDrj6nCEq6KJq7gLwt9b6j5SYl66kgt6MSPqrnjicRw'),('17','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjE0MjY2ODJ9.Y8pYYTwpKWQ91dS9cZFb7ekZLbFUYbSbt0c5Fk_qlNuVjC9DuFWSWZ1_bDwVJCmegrb9YOySNKfVuMXXAJgykQ'),('18','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjE0NDc1MjF9.VWBwtWdiQuRBi_qxG0Sv2kdONm6RK7YCwBrZmtqQFBCTBNKlHsyj5B6eMYEpWn7tmmUWRnIq8d2AIfgaeaIgqg'),('19','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjE0MjgxNjZ9.etOoAd0W583KN3uPpVfumwxLc-oGUDIpVgi87DE4DZe8vEGb5bruLb-T3gR8nDGRau7_dZ5HWBfQx1jS76FPBA'),('2','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjE0NzM2MzR9.AmqvCS1WVjUnhxSt3aF_u0x753qJSYiaQWOwgqLJx4Gts91349Fi-Qw7XZ2Mb7tWtjpCvh5zEASnQPu47ezZsA'),('20','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjE0MzcyOTZ9.XH0sgyn6ih5XKB1QXqTG8ljiFDfV5paz692COwQQ89kkc6CN4ALsyNVGMj0PM4ESfxfZLGVyXrQ9I2YbOw71bg'),('25','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjE0MzA2NTJ9.83RFQMc7YXWUQCpSQstE_zGLrZTpcCQGECwFwp6iocDrLhtjVso7PpMDz1uBWxT1k2dhtSJRbizW_HBHeaCgEQ'),('3','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjE0Nzg4NzF9.hfBPPYzaSOvl2vsS28UFUiPqhv-Y9WTuJ0oFh5vOQhgyK6akelr8WX4aSyY1z2qpXe22fdekK7kXmzdwhErb1Q'),('4','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjE0NzM2Mzd9.kV_PEoAH98OH_rNr2GTD22_3uo0VS_pdBnkyTaa-_tr2eyU855COb0vA7r5jsxPiH1HVB9__N1Q6YqKIUiAj3w'),('5','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjE0NTI5NzV9.Bsnisz6anfL910shn2D_w_8-tCNI-xqxE7f58V2EDixIWf_r2JhLsBeWB5JPRBz960dO4nneeUsCzVm5mXKYOg'),('6','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjE0NTUwOTN9.i174g4L_4w6WRO2I6_Tdn33Gxy4lxMNrdSe0KCl00ZhVfybQEYpxyDm8CL0GGEBHxfELdlTzUhgx6SPcWN9_-A'),('7','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjE0NzM2NDd9.Syc207urWYhrGBcRjO8yObbIaDY5Bc1_HKJssZgMucYqwMGNgy0jMgR5Th-WoCRln0adWYKfpTmKjKAkSj9m4A'),('8','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjEzMjkwNjV9.d5rxwrMbee_nQhKm-fQpRcnpmExscFFqtZEDldqdVO-n9iAB2facsH0E3SNA-FHw40BCGqzEshzPNBZGDxsbbg');
/*!40000 ALTER TABLE `refresh_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `report_seq` int NOT NULL AUTO_INCREMENT,
  `report_at` datetime(6) DEFAULT NULL,
  `report_type` varchar(255) DEFAULT NULL,
  `reported_user_seq` int DEFAULT NULL,
  `reporting_user_seq` int DEFAULT NULL,
  PRIMARY KEY (`report_seq`),
  KEY `FK3xx7nexl0y6uki644pywx46no` (`reported_user_seq`),
  KEY `FKou51by7fgx5pal2wmpeaye7e9` (`reporting_user_seq`),
  CONSTRAINT `FK3xx7nexl0y6uki644pywx46no` FOREIGN KEY (`reported_user_seq`) REFERENCES `user` (`user_seq`),
  CONSTRAINT `FKou51by7fgx5pal2wmpeaye7e9` FOREIGN KEY (`reporting_user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,'2022-08-17 22:21:37.046578','폭력',4,12),(2,'2022-08-17 22:21:51.374881','폭력',1,12),(3,'2022-08-17 22:21:57.119127','욕설',1,12),(4,'2022-08-17 22:22:08.051565','욕설',6,12),(5,'2022-08-17 22:22:19.775570','욕설',12,1),(6,'2022-08-17 22:22:23.649671','욕설',12,3),(7,'2022-08-17 22:22:23.867024','욕설',12,4),(8,'2022-08-17 22:22:25.978408','욕설',12,5);
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_info`
--

DROP TABLE IF EXISTS `room_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_info` (
  `room_seq` int NOT NULL AUTO_INCREMENT,
  `capacity` int NOT NULL,
  `host_user` int NOT NULL,
  `password` varchar(1000) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`room_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=240 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_info`
--

LOCK TABLES `room_info` WRITE;
/*!40000 ALTER TABLE `room_info` DISABLE KEYS */;
INSERT INTO `room_info` VALUES (227,6,6,'','aaa'),(228,6,7,'','aaaa'),(239,6,3,'12','123');
/*!40000 ALTER TABLE `room_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_seq` int NOT NULL AUTO_INCREMENT,
  `authority` varchar(255) DEFAULT NULL,
  `be_red_user_at` datetime(6) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_code` int NOT NULL,
  `is_auth` bit(1) NOT NULL,
  `is_login` bit(1) NOT NULL,
  `is_oauth` bit(1) NOT NULL,
  `is_red_user` bit(1) NOT NULL,
  `lose_count` int NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `now_room_seq` int NOT NULL,
  `password` varchar(1023) NOT NULL,
  `rank_point` int NOT NULL,
  `reported_count` int NOT NULL,
  `user_status` varchar(255) DEFAULT NULL,
  `win_count` int NOT NULL,
  PRIMARY KEY (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ROLE_ADMIN','2022-08-18 19:35:36.210025','2022-08-17','siryeongchoi@gmail.com',837389,_binary '',_binary '',_binary '\0',_binary '',4,'짝귀',0,'$2a$10$db6jBIvS7r89TmGP0FAqj.u9lz7QUaTJL/noaUvc/8qfVo1zMMZeC',1020,2,NULL,53),(2,'ROLE_ADMIN','2022-08-18 19:35:46.322179','2022-08-17','alqp118@naver.com',145624,_binary '',_binary '',_binary '\0',_binary '',0,'아귀',0,'$2a$10$Kr.u4fIU6xAz/jfXK2M4GuoqwbKIthwzu9ORAzP1GxKONnIS8rVUu',2100,0,NULL,105),(3,'ROLE_ADMIN','2022-08-18 19:35:39.665637','2022-08-17','socialable@naver.com',790121,_binary '',_binary '',_binary '\0',_binary '',2,'고니',0,'$2a$10$oo2MfEFJuUJI96tAji8izuNXXfAw.ea2dQmhceDqYkFeLJ1m.Jq0a',1800,0,NULL,91),(4,'ROLE_ADMIN','2022-08-18 19:35:43.576616','2022-08-17','notice1458@naver.com',382673,_binary '',_binary '',_binary '\0',_binary '',10,'평경장',0,'$2a$10$m57xDL6QvEI3kYycEH6.geSKvkamqcKxubvomGIwbkwOCh53ProDy',1200,1,NULL,65),(5,'ROLE_ADMIN','2022-08-18 19:35:49.626242','2022-08-17','s2econd.blue@gmail.com',774716,_binary '',_binary '',_binary '\0',_binary '',10,'호구',0,'$2a$10$7E3s92z1Qgu23hRTEaFTp.JuMxNljkop4A3qlpWXavMYkQPvzXZTS',500,0,NULL,30),(6,'ROLE_ADMIN','2022-08-18 19:35:57.288855','2022-08-17','tsi03137@gmail.com',843722,_binary '',_binary '',_binary '\0',_binary '',10,'이청2',0,'$2a$10$kHOw5s9BkXp32qhOmaB1ROe.g.EAzbguBdXUVqVTBQV4hZFZAakGO',560,1,NULL,33),(7,'ROLE_ADMIN','2022-08-18 19:35:54.309166','2022-08-17','admin@admin.com',786786,_binary '',_binary '',_binary '\0',_binary '',10,'오바쟁이이청',0,'$2a$10$qlBGwqGFD0euIMOkErS.uOynATUFtnZ57oT8Nv8.Q.bKgDGA/mJcm',1020,0,NULL,56),(8,'ROLE_ADMIN','2022-08-18 19:36:08.449811','2022-08-17','wls0828rud@naver.com',706168,_binary '',_binary '',_binary '\0',_binary '',0,'진경이',0,'$2a$10$ZBXwjUqko9V4iOcZf24xjOyJ8X7aVfLzE4H719wHLJApLRBZCHgGW',40,0,NULL,2),(9,'ROLE_ADMIN','2022-08-18 19:36:05.640517','2022-08-17','zmstjftk@nate.com',0,_binary '',_binary '\0',_binary '',_binary '',0,'개구리닮은오바쟁이이청',0,'$2a$10$17eixwrcdGm5i5/pDAXFNeSBt0.BAgTrIl7WLrGAzQdI/GxEcKMai',80,0,NULL,4),(10,'ROLE_ADMIN','2022-08-18 19:36:01.913926','2022-08-17','hansol620915@naver.com',0,_binary '',_binary '\0',_binary '',_binary '',0,'솔',0,'$2a$10$9976L9EOJV4jjZJwnNJguOYJlk3T.3TVtnuuKVgn4ioehc5tphA2q',0,0,NULL,0),(11,'ROLE_ADMIN',NULL,'2022-08-17','ssafy12345@ssafy.com',591728,_binary '\0',_binary '',_binary '\0',_binary '\0',0,'싸피맨1234',0,'$2a$10$steZNqX58jGGJNilu97youCPXSEsrJmNAYCYb9hd9jUYHMrIrHumC',0,0,NULL,0),(12,'ROLE_ADMIN','2022-08-18 19:36:16.778089','2022-08-17','minji@test.com',230905,_binary '',_binary '',_binary '',_binary '',10,'정마담',0,'$2a$10$7wV9ICy7lPfE5reC9.lI9OhGHlUPeT2WRucnywnIb2x/E1V9Wmx/O',680,4,NULL,39),(13,'ROLE_ADMIN',NULL,'2022-08-17','jin@test.com',293754,_binary '',_binary '\0',_binary '\0',_binary '\0',0,'진경',0,'$2a$10$Fq3O7vtbt3aMJiVHQX8Bs.r3bFWaaUWSdISm.Zn8PK079GIeDCYx.',0,0,NULL,0),(14,'ROLE_ADMIN',NULL,'2022-08-17','si@test.com',901286,_binary '',_binary '\0',_binary '\0',_binary '',40,'나는시령',0,'$2a$10$KfnJoxJFmKs9pqDiVl85Qe12kn1pn2JRWcLCG3OrP09NVkHPDVDAm',0,0,NULL,0),(15,'ROLE_ADMIN',NULL,'2022-08-17','an@test.com',982046,_binary '',_binary '',_binary '\0',_binary '',0,'광식코치님',0,'$2a$10$bFcYcOqaCq/621mqJKdRru6UVhMNMdKcYfVf165APfPbuQUxTlIg6',0,0,NULL,0),(16,'ROLE_ADMIN',NULL,'2022-08-17','you@test.com',630086,_binary '',_binary '',_binary '\0',_binary '',0,'유정코치님',0,'$2a$10$P5Vb1/BkgFCE2ylWlPlqmO0nrByYcjdWUo.XeYgSpYFp6OqHpeBP2',0,0,NULL,0),(17,'ROLE_ADMIN',NULL,'2022-08-17','subin@test.com',907156,_binary '',_binary '',_binary '\0',_binary '',0,'수빈프로님',0,'$2a$10$yDnybAWA.regpUvtFOrXF.nQYZWDZJ0UjgpckIF3P9NGqsGwiT/aK',0,0,NULL,0),(18,'ROLE_ADMIN',NULL,'2022-08-17','seo@test.com',881906,_binary '',_binary '',_binary '\0',_binary '',0,'성수컨설턴트님',0,'$2a$10$iLfQaNf5/Gy8TQ7sxpMu3.DwpxcYvEM62P9gDcZLLsF3gJGosoaRm',0,0,NULL,0),(19,'ROLE_ADMIN',NULL,'2022-08-17','bo@test.com',301663,_binary '',_binary '',_binary '\0',_binary '',0,'나는보경',0,'$2a$10$uONsHU1V778uEnoPDJLDMeBO1v4guLlVobzLg4Gr1XOfORAP4CIK2',0,0,NULL,0),(20,'ROLE_ADMIN',NULL,'2022-08-18','user@user.com',0,_binary '',_binary '',_binary '\0',_binary '\0',0,'유저',0,'$2a$10$fYuNepolE6YMFX9acUiq6uT/MUQ79c8GqM4VtwXBPGKknoOroVKO6',0,0,NULL,0),(21,'ROLE_ADMIN',NULL,'2022-08-18','chltlfud@naver.com',0,_binary '',_binary '\0',_binary '',_binary '\0',0,'최시령2',0,'$2a$10$maOZLJ3eTpXH8qKXgNTdFuiMXySUlfRmBFMOhxAXuecKLRYFJjVCC',0,0,NULL,0),(23,'ROLE_USER',NULL,'2022-08-18','notice1458@gmail.com',393988,_binary '',_binary '\0',_binary '\0',_binary '\0',0,'편견짱',0,'$2a$10$1REMF1jbJWhUKz0qFxamnOnGCCKsDqnGjCs3mXbCe228RJszvkWUC',0,0,NULL,0),(24,'ROLE_USER',NULL,'2022-08-18','pen2402@naver.com',615228,_binary '',_binary '\0',_binary '\0',_binary '\0',0,'편견장',0,'$2a$10$TU3DqYGo6xGzWykfN6qQnu/onIG2GbhAHklMvrmoKeGe5cq/r1K9G',0,0,NULL,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-19 11:05:53
