-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- ホスト: db
-- 生成日時: 2021 年 9 月 14 日 02:49
-- サーバのバージョン： 8.0.26
-- PHP のバージョン: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `test_db`
--
CREATE DATABASE IF NOT EXISTS `test_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `test_db`;
COMMIT;

CREATE TABLE IF NOT EXISTS `alembic_version` (
  `version_num` varchar(32) NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- テーブルのデータのダンプ `alembic_version`
--

INSERT IGNORE INTO `alembic_version` (`version_num`) VALUES
('d6cd5997f376');

-- --------------------------------------------------------

--
-- テーブルの構造 `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` varchar(63) NOT NULL,
  `name` varchar(127) DEFAULT NULL,
  `img` varchar(511) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `url` varchar(511) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- テーブルのデータのダンプ `products`
--

INSERT IGNORE INTO `products` (`id`, `name`, `img`, `price`, `url`) VALUES
('946kitchen:10004398', NULL, NULL, NULL, NULL),
('belluna-gourmet:10023396', NULL, NULL, NULL, NULL),
('chugokuoroshi:10002180', NULL, NULL, NULL, NULL),
('cliojapan:10000586', NULL, NULL, NULL, NULL),
('donmai:10000466', NULL, NULL, NULL, NULL),
('f182028-tsuruga:10000630', NULL, NULL, NULL, NULL),
('hidakara:10000014', NULL, NULL, NULL, NULL),
('ichijyo:10000021', NULL, NULL, NULL, NULL),
('kimsho:10000695', NULL, NULL, NULL, NULL),
('morrymama:10000281', NULL, NULL, NULL, NULL),
('one-p-slender:10015953', NULL, NULL, NULL, NULL),
('picoanna:10000267', NULL, NULL, NULL, NULL),
('renovatio:10017271', NULL, NULL, NULL, NULL),
('shitamachibaum:10000068', NULL, NULL, NULL, NULL),
('sunrisefarm:10007885', NULL, NULL, NULL, NULL),
('takasui:10002360', NULL, NULL, NULL, NULL),
('threenice:10006057', NULL, NULL, NULL, NULL),
('toucher-home:10000786', NULL, NULL, NULL, NULL),
('wakeary-shop:10114479', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- テーブルの構造 `purchases`
--

CREATE TABLE IF NOT EXISTS `purchases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `products_id` varchar(63) DEFAULT NULL,
  `count` int DEFAULT NULL,
  `bought_at` datetime DEFAULT NULL,
  `comment` varchar(511) DEFAULT NULL,
  `stars` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_id` (`products_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

--
-- テーブルのデータのダンプ `purchases`
--

INSERT IGNORE INTO `purchases` (`id`, `user_id`, `products_id`, `count`, `bought_at`, `comment`, `stars`, `title`) VALUES
(2, 1, 'f182028-tsuruga:10000630', 1, '2021-09-03 00:00:00', 'This is amazing item. I wanna buy again.', 5, 'Amazing Item'),
(3, 1, 'kimsho:10000695', 2, '2020-12-11 00:00:00', 'I made Onigiri of this. It was so delicious.', 4, 'Onigiri'),
(4, 2, 'toucher-home:10000786', 3, '2020-04-22 00:00:00', 'I like this towel. I wanna recommend to anyone.', 4, 'Great Towel'),
(5, 3, 'picoanna:10000267', 1, '2021-01-10 00:00:00', '', 3, ''),
(6, 2, 'one-p-slender:10015953', 1, '2021-05-30 00:00:00', '', 4, ''),
(7, 1, 'wakeary-shop:10114479', 2, '2020-12-11 00:00:00', '', 3, ''),
(8, 3, 'hidakara:10000014', 1, '2020-09-03 00:00:00', 'I am missing to travel...', 5, 'Hida food'),
(9, 2, '946kitchen:10004398', 2, '2021-06-18 00:00:00', 'This is so delicious cheeze.', 4, 'Go to Hakkaido'),
(10, 2, 'morrymama:10000281', 2, '2021-03-11 00:00:00', 'This is good for gifts.', 3, 'Great Gifts'),
(11, 3, 'renovatio:10017271', 1, '2021-02-04 00:00:00', 'I bought this for my birthday.', 4, 'Birthday Gift'),
(12, 3, 'threenice:10006057', 1, '2020-10-18 00:00:00', '', 3, ''),
(13, 1, 'chugokuoroshi:10002180', 1, '2020-11-20 00:00:00', '', 4, '');

-- --------------------------------------------------------

--
-- テーブルの構造 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(127) DEFAULT NULL,
  `nickname` varchar(127) DEFAULT NULL,
  `twitter_screenname` varchar(127) DEFAULT NULL,
  `youtube_url` varchar(1023) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `icon` varchar(1023) DEFAULT NULL,
  `description` varchar(1023) DEFAULT NULL,
  `roles` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

--
-- テーブルのデータのダンプ `users`
--

INSERT IGNORE INTO `users` (`id`, `username`, `nickname`, `twitter_screenname`, `youtube_url`, `password`, `icon`, `description`, `roles`) VALUES
(1, 'clutch@eagles.com', 'Clutch', 'rakuten__eagles', 'https://www.youtube.com/user/EAGLESTATION2012', '$pbkdf2-sha512$25000$du59TyklBGCMUUoJIcSYcw$fg7cR6/gVVLj1B0T0A6FMYHkqZWs1a76JmoQMN/TJeWaoxEPYfddiAZ8XDi/NdhtSz6Q70tFZlJ7Aq/aQbkrOQ', 'https://www.rakuteneagles.jp/cmn/images/expansion/character/clutch01_list.png', 'I am Clutch from Japan. I like eating and drawing. My favorite food is Onigiri.', 'viewer'),
(2, 'clutchena@eagles.com', 'Clutchena', 'rakuten__eagles', 'https://www.youtube.com/user/EAGLESTATION2012', '$pbkdf2-sha512$25000$Tsn5fw8BoDSmlJISAkAI4Q$uNrLLW91Sg8cOLbeK2gB/3y19QCI.qhji9H7wohdAc3MrSEJgod7eC7JM8Tir2TeyORq3tpdEUN4DmMaDNSBlA', 'https://www.rakuteneagles.jp/cmn/images/expansion/character/clutchena01_list.png', 'I am Clutchena born in Japan. My hobbies are drawing and making accessories. I like srawberry and cute stuff.', 'viewer'),
(3, 'switch@eagles.com', 'Switch', 'rakuten__eagles', 'https://www.youtube.com/user/EAGLESTATION2012', '$pbkdf2-sha512$25000$4pxzrvW.V6pVag0BoLSW8g$lJCtAKM7T2hP9xXUZjf41cu3pfFnreYBOBwMXwI2NStZd8Cx8.K1W6MIpKXScdsukz5bHTON95QB3LWxJ5ZYWw', 'https://www.rakuteneagles.jp/cmn/images/expansion/character/switch01_list.png', 'This is Switch from US. I love DJ and dancing.', 'viewer');

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
