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

INSERT IGNORE INTO `alembic_version` (`version_num`) VALUES
('d6cd5997f376');

CREATE TABLE IF NOT EXISTS `products` (
  `id` varchar(63) NOT NULL,
  `name` varchar(127) DEFAULT NULL,
  `img` varchar(511) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `url` varchar(511) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT IGNORE INTO `products` (`id`, `name`, `img`, `price`, `url`) VALUES
('AAAAA', 'Nintendo Switch', 'https://tshop.r10s.jp/book/cabinet/2912/4902370542912.jpg?fitin=200:300&composite-to=*,*|200:300', 32978, 'https://books.rakuten.co.jp/rb/16033028/?bkts=1');

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

INSERT IGNORE INTO `purchases` (`id`, `user_id`, `products_id`, `count`, `bought_at`, `comment`, `stars`, `title`) VALUES
(1, 1, 'AAAAA', 1, '2021-09-15 00:00:00', 'This is amazing. I like to play this.', 5, 'AMAZING GAME');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

INSERT IGNORE INTO `users` (`id`, `username`, `nickname`, `twitter_screenname`, `youtube_url`, `password`, `icon`, `description`, `roles`) VALUES
(1, 'Yasoob', 'Yasoob', 'Yasoob', 'Yasoob_youtube_link', '$pbkdf2-sha512$25000$mxMiZAzBmHMOAYCQMgZA6A$0QauvdKyrJvm.QKe8p.pBXn6MGrLzSnDMXxPJYM82dHWHqkhHVAoKZYl6MKP./Fw/K0kKr.xrnwO5Lyt6fMVUg', 'https://th.bing.com/th/id/OIP.7J4ZZXCg0CXWkowqduuvQgHaHa?pid=ImgDet&rs=1', 'This is test user', 'admin'),
(2, 'hikakin@hikakin.com', 'Hikakin', 'Hikakin', 'https://www.youtube.com/user/HikakinTV', '$pbkdf2-sha512$25000$21trjXHuPWeMEeJcy9nb.w$wes8YjrPtBPdcHECD2tjysoRZ0Ee8hvMHV9sS0wLx.oDbkgBfvLe0pehD8cH9/QyE2wqRTknZA7OrG.N7TPMug', 'https://th.bing.com/th/id/OIP.7J4ZZXCg0CXWkowqduuvQgHaHa?pid=ImgDet&rs=1', 'This is Hikakin.', 'viewer');


ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
