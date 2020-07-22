-- -------------------------------------------------------------
-- TablePlus 3.6.2(322)
--
-- https://tableplus.com/
--
-- Database: ead
-- Generation Time: 2020-07-22 18:16:40.6090
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

CREATE TABLE `checkouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `value` decimal(10,2) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `checkouts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `createUserTokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `createusertokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE `credits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `value` decimal(10,2) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `credits_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `forumLessons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lessonId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `lessonId` (`lessonId`),
  CONSTRAINT `forumlessons_ibfk_1` FOREIGN KEY (`lessonId`) REFERENCES `lessons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `forumPosts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `forumId` int(11) DEFAULT NULL,
  `lessonId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `message` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `forumId` (`forumId`),
  KEY `lessonId` (`lessonId`),
  KEY `userId` (`userId`),
  CONSTRAINT `forumposts_ibfk_1` FOREIGN KEY (`forumId`) REFERENCES `forumLessons` (`id`) ON DELETE CASCADE,
  CONSTRAINT `forumposts_ibfk_2` FOREIGN KEY (`lessonId`) REFERENCES `lessons` (`id`) ON DELETE CASCADE,
  CONSTRAINT `forumposts_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `forumReplies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `lessonId` int(11) DEFAULT NULL,
  `forumPostId` int(11) DEFAULT NULL,
  `reply` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `lessonId` (`lessonId`),
  KEY `forumPostId` (`forumPostId`),
  CONSTRAINT `forumreplies_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `forumreplies_ibfk_2` FOREIGN KEY (`lessonId`) REFERENCES `lessons` (`id`) ON DELETE CASCADE,
  CONSTRAINT `forumreplies_ibfk_3` FOREIGN KEY (`forumPostId`) REFERENCES `forumPosts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `githubs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lessonId` int(11) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `lessonId` (`lessonId`),
  CONSTRAINT `githubs_ibfk_1` FOREIGN KEY (`lessonId`) REFERENCES `lessons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `lessonBuyeds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `lessonId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `duration` time DEFAULT NULL,
  `value` decimal(10,2) DEFAULT NULL,
  `embed` varchar(255) DEFAULT NULL,
  `description` text,
  `categoryId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `lessons_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=312 DEFAULT CHARSET=utf8;

CREATE TABLE `lessonsFavorites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lessonId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `lessonId` (`lessonId`),
  KEY `userId` (`userId`),
  CONSTRAINT `lessonsfavorites_ibfk_1` FOREIGN KEY (`lessonId`) REFERENCES `lessons` (`id`) ON DELETE CASCADE,
  CONSTRAINT `lessonsfavorites_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `resetPasswordTokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `resetpasswordtokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT '',
  `is_verified` int(11) DEFAULT '2',
  `is_admin` int(11) DEFAULT '2',
  `receive_email_reply_forum` int(11) DEFAULT '2',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

INSERT INTO `categories` (`id`, `name`, `slug`, `createdAt`, `updatedAt`) VALUES
('1', 'Jewelery', 'jewelery', '2020-05-26 12:55:41', '2020-05-26 12:55:41'),
('2', 'Clothing', 'clothing', '2020-05-26 12:55:43', '2020-05-26 12:55:43'),
('3', 'Home', 'home', '2020-05-26 12:55:45', '2020-05-26 12:55:45'),
('4', 'Electronics', 'electronics', '2020-05-26 12:55:47', '2020-05-26 12:55:47'),
('5', 'Computers', 'computers', '2020-05-26 12:55:49', '2020-05-26 12:55:49'),
('6', 'Beauty', 'beauty', '2020-05-26 12:55:51', '2020-05-26 12:55:51'),
('7', 'Kids', 'kids', '2020-05-26 12:55:53', '2020-05-26 12:55:53'),
('8', 'Shoes', 'shoes', '2020-05-26 12:55:58', '2020-05-26 12:55:58'),
('9', 'Health', 'health', '2020-05-26 12:56:00', '2020-05-26 12:56:00'),
('10', 'Toys', 'toys', '2020-05-26 12:56:02', '2020-05-26 12:56:02'),
('11', 'Category test', 'category-test', '2020-06-04 15:40:04', '2020-06-04 15:40:04'),
('12', 'Category Teste 83', 'category-teste-83', '2020-06-04 15:40:08', '2020-06-04 15:40:08');

INSERT INTO `checkouts` (`id`, `userId`, `token`, `value`, `createdAt`, `updatedAt`) VALUES
('1', '1', '4863874ghhie84', '100.98', '2020-06-04 15:40:12', '2020-06-04 15:40:12'),
('2', '1', '243222001143111131420331595452512554', '100.00', '2020-07-22 18:15:14', '2020-07-22 18:15:14');

INSERT INTO `createUserTokens` (`id`, `userId`, `token`, `createdAt`, `updatedAt`) VALUES
('1', '1', '00433123223043223022321221591296003740', '2020-06-04 15:40:03', '2020-06-04 15:40:03'),
('2', '11', '404314303134414404144011591296007118', '2020-06-04 15:40:07', '2020-06-04 15:40:07'),
('3', '1', '2001431223313232320403231591307455192', '2020-06-04 18:50:55', '2020-06-04 18:50:55');

INSERT INTO `credits` (`id`, `userId`, `value`, `createdAt`, `updatedAt`) VALUES
('1', '1', '0.00', '2020-07-22 18:15:14', '2020-07-22 18:15:14');

INSERT INTO `lessonBuyeds` (`id`, `userId`, `lessonId`, `createdAt`, `updatedAt`) VALUES
('1', '1', '250', '2020-06-04 15:40:09', '2020-06-04 15:40:09'),
('2', '1', '278', '2020-06-04 15:40:09', '2020-06-04 15:40:09'),
('3', '1', '254', '2020-06-04 15:40:09', '2020-06-04 15:40:09'),
('4', '1', '190', '2020-06-04 15:40:09', '2020-06-04 15:40:09');

INSERT INTO `lessons` (`id`, `userId`, `title`, `slug`, `duration`, `value`, `embed`, `description`, `categoryId`, `createdAt`, `updatedAt`) VALUES
('202', '3', 'International Applications Associate', 'international-applications-associate', '10:20:00', '251.00', 'd318fbyaB9I', 'Aliquam voluptate sit aut voluptas quo at quam atque quae. Omnis quisquam accusantium harum molestiae vitae dolorem qui. Nostrum ea temporibus temporibus et ab qui doloremque. Sequi dolore dicta repellat sunt eos eum placeat natus similique. Ipsum quo corporis ut.', '7', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('204', '1', 'Regional Tactics Planner', 'regional-tactics-planner', '10:20:00', '387.00', 'd318fbyaB9I', 'Eaque neque ducimus et vel. Omnis possimus vel quia vel autem ipsam consectetur ipsum. Consequuntur quidem consequatur est repudiandae fugiat. Provident impedit voluptatem.', '10', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('205', '1', 'Dynamic Accountability Strategist', 'dynamic-accountability-strategist', '10:20:00', '246.00', 'd318fbyaB9I', 'Ipsum exercitationem quam ipsum deserunt dolorem. Qui praesentium facere. Velit qui cum nihil temporibus. Quis atque quas tenetur voluptas cupiditate maiores exercitationem nemo quia. Aut soluta sunt porro reiciendis officiis. Qui explicabo officiis qui voluptatem ut quibusdam totam.', '2', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('206', '3', 'Human Markets Director', 'human-markets-director', '10:20:00', '637.00', 'd318fbyaB9I', 'Autem eos inventore et assumenda corrupti. Dolorum quo iure. Et illo et quia debitis quaerat. Voluptatibus officia et deleniti perferendis cupiditate consequuntur. Autem porro et exercitationem blanditiis nihil. Et fuga aut molestias beatae ut.', '2', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('207', '2', 'Senior Data Developer', 'senior-data-developer', '10:20:00', '560.00', 'd318fbyaB9I', 'Explicabo saepe consequatur porro quisquam quos sunt aut eum qui. Exercitationem cumque quod hic. Dolores quo praesentium ullam iure ut. Fuga labore dolorem dicta est omnis temporibus aut.', '2', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('208', '2', 'Forward Quality Facilitator', 'forward-quality-facilitator', '10:20:00', '213.00', 'd318fbyaB9I', 'Pariatur ut eligendi fugiat. Et et ut sunt animi nihil. Ipsam tenetur quis non sit rerum animi nemo voluptatem reprehenderit. Adipisci et mollitia. Debitis quo nemo beatae ut. Enim aut voluptatem vitae ea nemo similique consequatur et quibusdam.', '8', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('209', '5', 'Dynamic Implementation Producer', 'dynamic-implementation-producer', '10:20:00', '405.00', 'd318fbyaB9I', 'Esse illum magni saepe est ut perferendis tempora dolores. Suscipit fuga consectetur quasi dolor. Debitis ipsam et et amet sint neque quasi. Ut at est non pariatur neque.', '9', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('210', '2', 'Customer Marketing Designer', 'customer-marketing-designer', '10:20:00', '931.00', 'd318fbyaB9I', 'Facere esse incidunt perferendis sit aperiam. Placeat ad ut aut. Magnam itaque aut velit. Temporibus occaecati occaecati enim est dolor et voluptatem sed. Est ut voluptas consequatur ut rerum soluta omnis aut. Quia voluptas error.', '9', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('211', '3', 'Corporate Data Assistant', 'corporate-data-assistant', '10:20:00', '84.00', 'd318fbyaB9I', 'Id eos libero voluptate nam impedit voluptatibus. Voluptatem ipsa ad eos quo expedita voluptatem aut. Fugiat quos ut laboriosam fugiat quia vel iure in perspiciatis. Eaque porro quia expedita quis velit est sequi temporibus. Minima fugit neque.', '8', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('212', '2', 'Global Assurance Developer', 'global-assurance-developer', '10:20:00', '559.00', 'd318fbyaB9I', 'Possimus ipsum totam fuga tempora. Laboriosam a cumque eum esse architecto voluptatibus aliquam illum quis. Ipsa animi nemo non pariatur. Est voluptatem id. Aut molestias dolor et. Maiores harum sit rem autem voluptatem.', '1', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('213', '2', 'Central Mobility Strategist', 'central-mobility-strategist', '10:20:00', '849.00', 'd318fbyaB9I', 'Quaerat porro nostrum a. Pariatur quo fugiat qui. Voluptatem possimus nesciunt aspernatur repellendus. Aut dicta harum. Omnis sapiente voluptatem maxime ut at corrupti.', '10', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('214', '2', 'Corporate Response Specialist', 'corporate-response-specialist', '10:20:00', '902.00', 'd318fbyaB9I', 'Aliquid non tempore laudantium qui. Excepturi accusamus veritatis voluptatem iusto at. Autem deserunt reprehenderit fugit quas consectetur similique eveniet error illum. Voluptatum id suscipit eius fugit est eos est ad.', '7', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('215', '1', 'Product Configuration Technician', 'product-configuration-technician', '10:20:00', '452.00', 'd318fbyaB9I', 'Sunt enim ea nihil blanditiis impedit ullam sit ullam sit. Rerum ipsa ad voluptas velit enim vel. Voluptates assumenda consequuntur. Soluta ea alias. Consequatur earum ut et voluptates animi velit. Iure corporis eos voluptatem.', '8', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('217', '1', 'Dynamic Marketing Engineer', 'dynamic-marketing-engineer', '10:20:00', '292.00', 'd318fbyaB9I', 'Earum quaerat repellendus officia nobis nemo quam delectus. Corporis ex impedit nostrum amet modi rerum inventore consectetur sed. Ipsum eum qui alias repudiandae ipsa.', '5', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('218', '5', 'Chief Marketing Architect', 'chief-marketing-architect', '10:20:00', '120.00', 'd318fbyaB9I', 'Amet tempora expedita dolorem molestiae et. Omnis atque dolorem dolorem ex sunt at dignissimos porro animi. Dolor est ullam ut. Aliquam odio quae et et consequatur ut autem et. Nisi autem aut animi accusantium unde omnis. Veritatis aut deleniti totam et voluptas minima qui.', '9', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('219', '2', 'Principal Interactions Agent', 'principal-interactions-agent', '10:20:00', '195.00', 'd318fbyaB9I', 'Eos nesciunt sed eos dicta quo tempora vero omnis quia. Voluptatem voluptatibus nihil aut aut ipsum est dolores itaque. Molestias cupiditate soluta occaecati consequatur. Repellendus asperiores sit culpa quaerat doloremque vitae est laboriosam labore.', '9', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('220', '1', 'Dynamic Implementation Facilitator', 'dynamic-implementation-facilitator', '10:20:00', '642.00', 'd318fbyaB9I', 'Nihil modi omnis vel. Aut qui ut omnis voluptatibus ipsa sed. Ipsa ipsum nobis fugit dolore ea maxime. Aut facere ex nobis non numquam. Perferendis velit animi nobis et quia cumque. Repudiandae quo maxime libero velit qui explicabo et fugit.', '4', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('221', '2', 'Senior Mobility Engineer', 'senior-mobility-engineer', '10:20:00', '532.00', 'd318fbyaB9I', 'Sint vero consequuntur quisquam nihil saepe ea. Magni consequatur doloremque. Nihil magnam non ab non. Dicta quaerat et nam ullam laborum magnam laborum occaecati et. Et accusamus est asperiores eveniet recusandae dolores optio.', '7', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('222', '1', 'Lead Security Manager', 'lead-security-manager', '10:20:00', '144.00', 'd318fbyaB9I', 'Voluptatibus neque eligendi at provident. Neque quia necessitatibus. Vero est veniam et et non officiis dolor. Quia corrupti ea facilis inventore. Porro et qui.', '2', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('223', '1', 'Dynamic Group Engineer', 'dynamic-group-engineer', '10:20:00', '600.00', 'd318fbyaB9I', 'Praesentium tempore provident nihil dolorum fugiat iusto omnis eum incidunt. Non dolor labore fugit rerum. Molestiae ea ea aut sint esse. Beatae perspiciatis non voluptatibus modi. Consectetur facilis sit nihil id cumque fuga. Laudantium atque hic ut aut dignissimos.', '4', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('225', '4', 'Corporate Integration Producer', 'corporate-integration-producer', '10:20:00', '6.00', 'd318fbyaB9I', 'Error cum facilis praesentium. Perferendis quo qui voluptatum consequatur natus. Nostrum aliquid qui blanditiis sed aspernatur eum rem.', '8', '2020-05-26 12:56:48', '2020-05-29 17:44:08'),
('226', '1', 'Dynamic Marketing Executive', 'dynamic-marketing-executive', '10:20:00', '383.00', 'd318fbyaB9I', 'Nam aspernatur in et nam qui consequatur aut impedit nobis. Eius explicabo eos quaerat autem aliquid eius dolorem et et. Labore reprehenderit laboriosam sed ut. Culpa voluptas quam possimus qui molestiae ut veniam. Sit vel qui aut rerum doloremque.', '2', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('227', '5', 'Corporate Security Associate', 'corporate-security-associate', '10:20:00', '107.00', 'd318fbyaB9I', 'At cumque distinctio magni velit. Nisi at est et id natus non animi veritatis asperiores.', '7', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('228', '1', 'Corporate Research Planner', 'corporate-research-planner', '10:20:00', '281.00', 'd318fbyaB9I', 'Ut placeat et voluptatibus voluptatum quidem. Dolor dolor et perferendis sint repellat perspiciatis facilis laborum voluptatem. Debitis eligendi et sed eum ipsam et. Autem perferendis laudantium officiis consequatur sed deleniti.', '10', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('229', '4', 'Chief Applications Executive', 'chief-applications-executive', '10:20:00', '928.00', 'd318fbyaB9I', 'Optio voluptatem beatae aperiam exercitationem fugiat qui maxime et omnis. Fuga odio temporibus sed. Officiis doloribus nostrum esse expedita est vel iusto. Soluta nihil maxime dicta eos recusandae. Pariatur ea et id occaecati at. Eaque sunt aut eum sed.', '4', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('230', '2', 'Product Brand Director', 'product-brand-director', '10:20:00', '247.00', 'd318fbyaB9I', 'Eius et beatae iure perferendis corrupti. Suscipit enim quia aspernatur voluptas aliquid. Temporibus ea beatae est nesciunt culpa consequatur nulla.', '7', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('232', '1', 'Human Group Producer', 'human-group-producer', '10:20:00', '465.00', 'd318fbyaB9I', 'Libero eum voluptatem aut asperiores voluptas libero quis autem. Sunt ducimus dolores dolores beatae qui. Odio quibusdam molestias rerum porro assumenda aliquam dignissimos voluptates quibusdam. Et ratione qui quod odio laboriosam.', '2', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('233', '1', 'Global Paradigm Technician', 'global-paradigm-technician', '10:20:00', '451.00', 'd318fbyaB9I', 'Illo doloribus et qui sint. Nobis nisi omnis id suscipit sit id reprehenderit.', '5', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('234', '1', 'Global Directives Designer', 'global-directives-designer', '10:20:00', '506.00', 'd318fbyaB9I', 'Non aut unde quod incidunt est sint id. Commodi aut qui optio quis beatae sapiente autem nihil soluta. Libero reiciendis sed ducimus illum qui ea veniam iure. Quis velit est beatae et ut.', '2', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('235', '1', 'Future Usability Executive', 'future-usability-executive', '10:20:00', '489.00', 'd318fbyaB9I', 'Labore autem numquam fugiat voluptas sed harum voluptatum molestiae aperiam. Qui dolorem saepe voluptas placeat. Impedit sed corporis quia repellat dolorem esse soluta consequuntur.', '5', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('236', '4', 'Lead Directives Supervisor', 'lead-directives-supervisor', '10:20:00', '874.00', 'd318fbyaB9I', 'Velit atque saepe. Sit nihil accusamus enim et repudiandae illo. Minima ea voluptates aspernatur quam eos et.', '6', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('238', '2', 'Dynamic Division Producer', 'dynamic-division-producer', '10:20:00', '827.00', 'd318fbyaB9I', 'Eum velit voluptas ut aut quis eum similique iusto. Natus et nobis natus. Et porro nam omnis id. Cumque labore quos. Esse repudiandae et.', '6', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('240', '1', 'Human Paradigm Coordinator', 'human-paradigm-coordinator', '10:20:00', '446.00', 'd318fbyaB9I', 'Ullam molestiae ipsam corporis. Commodi omnis sed eaque veniam commodi. Perspiciatis voluptatem possimus officia.', '10', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('242', '1', 'Dynamic Web Supervisor', 'dynamic-web-supervisor', '10:20:00', '365.00', 'd318fbyaB9I', 'Atque laboriosam quas itaque dicta. Qui aut sed qui. Quo voluptas in eum. Magni dolor omnis corrupti dolorem officia. Sequi itaque velit est dolores et error ut quia fugiat. Quasi ex molestiae voluptatem quod eum ipsam qui eum.', '3', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('243', '4', 'Lead Group Specialist', 'lead-group-specialist', '10:20:00', '688.00', 'd318fbyaB9I', 'Alias nobis atque architecto at amet sed quo dolor sunt. Dolorum enim expedita beatae illo non ipsam molestias voluptates aut. Omnis quaerat libero quia voluptatibus.', '10', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('244', '1', 'Chief Integration Representative', 'chief-integration-representative', '10:20:00', '418.00', 'd318fbyaB9I', 'Deleniti aut nulla assumenda reprehenderit repellendus. Est alias tempore architecto eaque voluptatem blanditiis modi assumenda.', '5', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('245', '4', 'Customer Usability Liaison', 'customer-usability-liaison', '10:20:00', '24.00', 'd318fbyaB9I', 'Non placeat sunt. Optio dicta facere assumenda aliquam. Quibusdam sequi est eaque officia voluptate. Tempora modi quasi aut et distinctio. Veritatis porro rem impedit dolorum enim ut eum.', '8', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('246', '3', 'International Branding Manager', 'international-branding-manager', '10:20:00', '492.00', 'd318fbyaB9I', 'Corrupti velit dolore. Ea necessitatibus quia molestiae. Molestias officia ut illo modi nam odio recusandae. Maiores fuga vero repudiandae earum.', '5', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('247', '4', 'Chief Directives Designer', 'chief-directives-designer', '10:20:00', '740.00', 'd318fbyaB9I', 'Dicta eaque eveniet sit natus blanditiis atque voluptates. Dignissimos est fugiat qui nemo praesentium quis amet ad id. Praesentium fugit quidem earum quam totam vitae atque et veniam.', '5', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('249', '4', 'National Accountability Engineer', 'national-accountability-engineer', '10:20:00', '511.00', 'd318fbyaB9I', 'Tenetur facere atque itaque voluptatibus. Molestias et distinctio quae qui est facere architecto. Quia rerum et nemo consequatur sed reiciendis accusantium temporibus quasi.', '4', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('250', '2', 'Corporate Security Planner', 'corporate-security-planner', '10:20:00', '702.00', 'd318fbyaB9I', 'Sunt sed ut totam quasi culpa consequatur adipisci tenetur. Reprehenderit magni nesciunt commodi illo sint dignissimos reiciendis. Magni laudantium blanditiis aspernatur culpa vel consequatur aliquid quasi. Incidunt sint adipisci libero pariatur. Sed veniam et.', '5', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('251', '5', 'Central Implementation Liaison', 'central-implementation-liaison', '10:20:00', '333.00', 'd318fbyaB9I', 'Et dicta ipsa eum. Sed accusamus praesentium sed omnis est quas. Amet suscipit explicabo. Quaerat quasi numquam ut. Qui distinctio repellendus.', '2', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('255', '2', 'Dynamic Accounts Agent', 'dynamic-accounts-agent', '10:20:00', '27.00', 'd318fbyaB9I', 'Reprehenderit recusandae dolorem qui sit voluptas ipsum. Blanditiis modi qui. Sunt aliquam fugit ab illo impedit esse perspiciatis.', '10', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('256', '4', 'District Configuration Consultant', 'district-configuration-consultant', '10:20:00', '343.00', 'd318fbyaB9I', 'Dolores occaecati voluptates qui odio quo ab possimus odit. Enim ut et qui.', '2', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('257', '2', 'Global Security Officer', 'global-security-officer', '10:20:00', '902.00', 'd318fbyaB9I', 'Iure reprehenderit labore omnis doloribus aut numquam eum quos. Cumque sint ut quis quibusdam nostrum iste quod. Molestiae sed praesentium fugit et aperiam. Cupiditate repudiandae culpa sunt aut voluptatem laudantium eligendi non. Et inventore harum. Ratione perspiciatis tenetur fugiat.', '1', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('258', '1', 'Regional Interactions Consultant', 'regional-interactions-consultant', '10:20:00', '56.00', 'd318fbyaB9I', 'Recusandae accusantium voluptas voluptas alias tempore quis ullam exercitationem. Debitis quidem dolores voluptas fugit dolores harum.', '8', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('259', '1', 'Lead Intranet Strategist', 'lead-intranet-strategist', '10:20:00', '660.00', 'd318fbyaB9I', 'Dolorem sunt itaque ut magni et. Aut exercitationem quo quis nobis expedita eos. Eaque vel perferendis dolor dolore est illo nihil voluptate explicabo. Quo pariatur accusantium. Consequatur perferendis alias quisquam.', '9', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('260', '1', 'Senior Security Executive', 'senior-security-executive', '10:20:00', '291.00', 'd318fbyaB9I', 'Facere quo quo eveniet quia. Et est eaque quia ea. Rerum id cumque et officiis illo dolor aut minus quis. Iste sunt distinctio omnis dolor.', '1', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('261', '2', 'Chief Solutions Agent', 'chief-solutions-agent', '10:20:00', '709.00', 'd318fbyaB9I', 'Iusto voluptatibus facere ut enim magni iste a qui molestiae. Magni voluptas consequatur laudantium laborum. Ipsum quis sapiente tempora aperiam. Modi voluptatum deserunt.', '6', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('262', '4', 'Regional Security Technician', 'regional-security-technician', '10:20:00', '529.00', 'd318fbyaB9I', 'Aut sit ipsam necessitatibus aperiam error. Architecto qui dolorem voluptas tenetur at doloribus ab minus ut. Consequuntur voluptates repellendus. Esse tempora corporis. Architecto quaerat porro repellendus sunt ipsum aspernatur consequatur. Praesentium ipsam omnis aut quis facere natus.', '9', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('263', '4', 'Direct Metrics Administrator', 'direct-metrics-administrator', '10:20:00', '663.00', 'd318fbyaB9I', 'Delectus dolor qui est voluptatum. Suscipit omnis quae et excepturi harum ipsam voluptatem quia.', '7', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('264', '4', 'District Implementation Technician', 'district-implementation-technician', '10:20:00', '52.00', 'd318fbyaB9I', 'Esse eligendi et fugiat possimus nemo sed blanditiis optio. Doloremque aspernatur non sunt quam sit nam iste sed. Rerum labore porro nesciunt rerum nesciunt quas nisi. Quaerat sint aut sed aut. Magni quibusdam provident explicabo molestiae et ipsum deserunt incidunt. Dolore praesentium voluptatibus consequatur esse qui deserunt exercitationem.', '6', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('265', '3', 'Global Accountability Technician', 'global-accountability-technician', '10:20:00', '925.00', 'd318fbyaB9I', 'Eum corporis reiciendis. Totam dolore est veniam architecto temporibus. Dolores excepturi ad maiores molestias. Necessitatibus et illo est ducimus vel. Recusandae distinctio porro id eos cumque ab non. Eligendi officia qui.', '7', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('266', '3', 'Product Markets Executive', 'product-markets-executive', '10:20:00', '348.00', 'd318fbyaB9I', 'Iste aspernatur aut aut. Repellendus a ipsam sunt. Ad suscipit et excepturi asperiores doloribus temporibus. Aspernatur repellat dolorem quaerat. Repellat libero ut odit cupiditate et mollitia vero iusto architecto. Dolores fugiat voluptas quod ipsum cum mollitia amet.', '3', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('268', '1', 'Product Branding Developer', 'product-branding-developer', '10:20:00', '839.00', 'd318fbyaB9I', 'Voluptatem quae minus exercitationem. Dolor quae velit repellendus omnis veniam et vel qui dolor. Magnam sapiente qui quam sequi quia in maxime inventore cum. Qui ea qui est porro quisquam ipsum alias. Voluptas ut qui explicabo molestiae ut enim sint ut.', '2', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('269', '5', 'National Division Associate', 'national-division-associate', '10:20:00', '802.00', 'd318fbyaB9I', 'Perspiciatis facilis voluptate in officia hic velit. Ratione laborum qui sunt deserunt dolores voluptatem nam sequi aut. Delectus quis repellendus in ut velit nostrum ea.', '7', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('270', '1', 'Future Identity Administrator', 'future-identity-administrator', '10:20:00', '527.00', 'd318fbyaB9I', 'Laboriosam quisquam aut est inventore deleniti odio aut aliquid. Id velit quis molestiae. Dolores consequatur quis ipsum dolores temporibus sit.', '2', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('271', '4', 'Principal Group Strategist', 'principal-group-strategist', '10:20:00', '684.00', 'd318fbyaB9I', 'Cupiditate ut at qui doloribus et enim et minima. Voluptas cumque ea magni. Aliquam possimus optio assumenda a earum accusantium nisi in.', '1', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('272', '1', 'Corporate Infrastructure Supervisor', 'corporate-infrastructure-supervisor', '10:20:00', '494.00', 'd318fbyaB9I', 'Sunt amet nisi quia neque quis enim voluptas. Ducimus est molestiae cupiditate dolorem eos. Iste voluptatem perspiciatis pariatur nam mollitia voluptatem enim fugiat. Molestiae nam qui suscipit eum aperiam vitae et quas. In commodi dicta voluptatem non adipisci. Distinctio ut et consequatur quibusdam ad.', '8', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('273', '1', 'District Intranet Associate', 'district-intranet-associate', '10:20:00', '395.00', 'd318fbyaB9I', 'Voluptas distinctio et qui unde. Non fugit consequatur consectetur sapiente. Odit aut laboriosam. Sequi enim natus.', '4', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('274', '4', 'International Applications Architect', 'international-applications-architect', '10:20:00', '650.00', 'd318fbyaB9I', 'Ab error maiores quo blanditiis eligendi quibusdam. Libero et qui. Perferendis similique similique voluptatem ut in quia minus. Excepturi in suscipit quo reprehenderit consequatur. Reiciendis quae velit tempora dolorem repudiandae omnis fuga.', '2', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('275', '5', 'Product Accountability Designer', 'product-accountability-designer', '10:20:00', '253.00', 'd318fbyaB9I', 'Tempora et quidem est atque velit nihil. Eos sed incidunt quaerat nulla quia ut qui enim quam. Voluptas nihil fugit omnis magnam et aut. Minima pariatur architecto facere ut.', '1', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('276', '3', 'District Creative Agent', 'district-creative-agent', '10:20:00', '437.00', 'd318fbyaB9I', 'Iusto vitae sed dignissimos. Delectus odit accusantium in ut ut nisi ea cupiditate in. Repellat velit ab totam. Harum eos sed repellat incidunt quae modi debitis et totam. Voluptas impedit necessitatibus consequatur aperiam qui pariatur et suscipit.', '2', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('283', '1', 'Investor Integration Orchestrator', 'investor-integration-orchestrator', '10:20:00', '753.00', 'd318fbyaB9I', 'Ipsa autem aut recusandae repellat blanditiis adipisci et laudantium qui. Necessitatibus accusantium reprehenderit harum libero maiores officiis. Quod velit aut doloremque minima nam reiciendis sint.', '8', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('284', '1', 'Global Mobility Developer', 'global-mobility-developer', '10:20:00', '536.00', 'd318fbyaB9I', 'Aut sint deserunt qui at distinctio ratione sed. Reprehenderit quidem autem quaerat fugiat. Doloremque saepe minus minima placeat harum voluptas sed.', '7', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('285', '2', 'Human Intranet Facilitator', 'human-intranet-facilitator', '10:20:00', '295.00', 'd318fbyaB9I', 'Iure dolores sint omnis id mollitia ipsam vero. Saepe dolorem rerum dolor provident quisquam est non sunt quas. Consequatur aut praesentium eaque est sit rerum. Quisquam cumque cumque illo temporibus. Consequatur id laboriosam rerum voluptas est sit at sunt repellat.', '5', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('286', '2', 'Global Response Planner', 'global-response-planner', '10:20:00', '231.00', 'd318fbyaB9I', 'Iste quo ea molestias. Est velit est fuga repudiandae. Sequi omnis quas blanditiis dolores dolor omnis nihil sequi. Ullam harum architecto odit voluptatibus qui odit aspernatur enim.', '4', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('287', '1', 'Customer Communications Analyst', 'customer-communications-analyst', '10:20:00', '848.00', 'd318fbyaB9I', 'Excepturi ipsam quasi quia. Velit adipisci doloremque rem praesentium soluta consequatur et. Non sapiente ratione. Laborum quae sunt velit. Omnis voluptatem nulla numquam sit reprehenderit esse.', '5', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('288', '1', 'Corporate Identity Agent', 'corporate-identity-agent', '10:20:00', '735.00', 'd318fbyaB9I', 'Voluptas aut consequuntur aut ipsum fugit dolores sed. Accusantium sunt aspernatur sit et. Dolores rem non qui in corporis magni sed tenetur.', '7', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('289', '1', 'Internal Implementation Supervisor', 'internal-implementation-supervisor', '10:20:00', '55.00', 'd318fbyaB9I', 'Nihil neque voluptas omnis. Quibusdam sed consequatur fugit culpa facilis. Eligendi quo corporis eius tempora doloribus blanditiis. Sit velit veniam occaecati est dolorem vitae et nostrum distinctio. Dolorum rerum temporibus nulla non mollitia perspiciatis maiores.', '8', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('290', '2', 'Central Mobility Technician', 'central-mobility-technician', '10:20:00', '643.00', 'd318fbyaB9I', 'Sed ullam animi commodi optio excepturi in. Corporis iusto provident rem veritatis necessitatibus laudantium. Quidem vel velit harum iure quaerat tempora minima consequatur vitae.', '5', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('291', '5', 'District Factors Strategist', 'district-factors-strategist', '10:20:00', '977.00', 'd318fbyaB9I', 'Et veniam exercitationem. Quae magni laudantium quo. Aspernatur magni quaerat consequatur quia aut ea. Aliquid velit odio est minus voluptas. Qui quo sit.', '8', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('292', '1', 'Principal Functionality Manager', 'principal-functionality-manager', '10:20:00', '88.00', 'd318fbyaB9I', 'Deleniti neque qui asperiores. Placeat magni ex commodi vero unde corrupti. Doloremque odio laudantium laborum porro sit necessitatibus.', '5', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('294', '2', 'title updated 2', 'slug_updated', '09:34:00', '12.00', 'd318fbyaB9I', 'Nobis voluptas ut doloremque magni ab non explicabo. Provident debitis amet.', '5', '2020-05-26 12:56:48', '2020-06-04 15:39:59'),
('295', '2', 'National Identity Developer', 'national-identity-developer', '10:20:00', '398.00', 'd318fbyaB9I', 'Officia beatae iste. Tempore omnis debitis officia sed saepe tempora. Est suscipit voluptates eaque similique sed fugit quo optio et. Perspiciatis id recusandae ut nam enim iure. Excepturi ea quae ducimus qui. Quia est explicabo enim ut aspernatur voluptas mollitia.', '4', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('296', '4', 'Dynamic Accountability Technician', 'dynamic-accountability-technician', '10:20:00', '881.00', 'd318fbyaB9I', 'Ut quam quia error. Ad blanditiis explicabo debitis natus quam occaecati qui.', '5', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('297', '2', 'Dynamic Security Developer', 'dynamic-security-developer', '10:20:00', '925.00', 'd318fbyaB9I', 'Eius dolores laudantium doloremque. At culpa voluptate natus nihil. Ipsam quos aut. Unde ipsum corporis.', '8', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('298', '1', 'Future Configuration Assistant', 'future-configuration-assistant', '10:20:00', '397.00', 'd318fbyaB9I', 'Pariatur enim illo. Ea a voluptatem nihil dolorum quo officiis fuga et. Ea velit nesciunt ea maxime iure et harum. Dicta deserunt ut natus id. Omnis quo magni sed deserunt. Dignissimos autem ut quo autem.', '3', '2020-05-26 12:56:48', '2020-05-29 15:09:14'),
('299', '2', 'International Usability Executive', 'international-usability-executive', '10:20:00', '534.00', 'd318fbyaB9I', 'Earum deserunt quae. Ab ducimus fugiat dicta et quos quod. Voluptas rerum doloremque laborum consequuntur est. Ea nemo dolore iusto vero facilis ut. Iure in qui illum fuga facilis quis id error natus.', '9', '2020-05-26 12:56:48', '2020-05-26 12:56:48'),
('300', '1', 'Regional Identity Technician', 'regional-identity-technician', '03:20:00', '0.55', 'd318fbyaB9I', 'Aliquam ut necessitatibus voluptas nobis repellendus eum nam laborum. Nam unde est cupiditate ipsa itaque nostrum. Repellat velit quas.', '2', '2020-05-26 12:56:48', '2020-05-29 16:16:45'),
('310', '1', 'Teste 3', 'teste-3', '00:23:34', '0.55', 'iu4C5oxutz0', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas sapien turpis, eget ultricies velit placerat ut. Aliquam non placerat turpis. In ultricies nunc in turpis sollicitudin, non condimentum magna faucibus. Etiam sollicitudin lectus vel risus semper, non faucibus justo scelerisque. Nam cursus iaculis convallis. Nam tincidunt mi felis, non consequat velit egestas eleifend. Donec faucibus quam ac est laoreet, in ullamcorper elit eleifend. Cras sit amet tellus at enim gravida efficitur. Suspendisse lacus dolor, volutpat eu eleifend a, congue non felis.\n\nAenean nisl dolor, ultricies non enim sit amet, porta vehicula ante. Mauris id nisi convallis, molestie odio id, volutpat neque. Vivamus quis pellentesque mi. Phasellus enim nisi, vestibulum eu est quis, iaculis sollicitudin enim. Donec sollicitudin fermentum neque, et bibendum nisi tincidunt eu. Vestibulum vitae lorem feugiat risus dapibus venenatis quis in erat. Aliquam erat volutpat. Phasellus a ante vel ex euismod facilisis. Proin vitae eros leo. Donec vel porttitor ipsum, ac ultricies dui. In quis sollicitudin velit. Aliquam finibus in nunc id aliquet. Quisque dolor lectus, ullamcorper vitae pulvinar ut, iaculis ut libero.\n\n```\n    <option\n                                                            v-for=\"category in categories_data\"\n                                                            :key=\"category.id\"\n                                                            :value=\"category[\'id\']\"\n                                                            :selected=\"category[\'id\'] === lesson[\'category\'][\'id\']\"\n                                                        >{{ category[\'name\'] }}</option>\n                                                    </select>\n```', '9', '2020-05-31 15:12:42', '2020-06-02 14:18:23'),
('311', '1', 'teste 2', 'teste-2', '00:12:32', '0.80', 'ONLQeCWcxAY', 'lorem ipsum....', '1', '2020-06-04 15:40:00', '2020-06-04 15:40:00');

INSERT INTO `lessonsFavorites` (`id`, `lessonId`, `userId`, `createdAt`, `updatedAt`) VALUES
('1', '299', '2', '2020-06-04 15:40:00', '2020-06-04 15:40:00');

INSERT INTO `resetPasswordTokens` (`id`, `userId`, `token`, `createdAt`, `updatedAt`) VALUES
('1', '11', '02334112440301341204411421591307452698', '2020-06-04 18:50:52', '2020-06-04 18:50:52');

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20200322202459-create-user.js'),
('20200323023203-create-category.js'),
('20200323023318-create-lesson.js'),
('20200327200733-create-credit.js'),
('20200327223349-create-lesson-buyed.js'),
('20200411222153-create-forum-lesson.js'),
('20200411224440-create-forum-post.js'),
('20200413060220-create-forum-reply.js'),
('20200420194529-create-lessons-favorite.js'),
('20200424044715-create-create-user-token.js'),
('20200427225835-create-contact.js'),
('20200429005651-create-checkout.js'),
('20200511225608-create-reset-password-token.js'),
('20200513181629-create-github.js');

INSERT INTO `users` (`id`, `name`, `last_name`, `email`, `password`, `avatar`, `is_verified`, `is_admin`, `receive_email_reply_forum`, `createdAt`, `updatedAt`) VALUES
('1', 'Zack', 'Bartoletti', 'Oran51@yahoo.com', '$2b$10$3M1fe7F6F0DitVE5Het2huo4fBcuOvnD/MXXkgvgOG7Wi.XtFTECS', 'https://s3.amazonaws.com/uifaces/faces/twitter/Skyhartman/128.jpg', '1', '1', '2', '2020-05-26 12:55:07', '2020-06-04 15:40:13'),
('2', 'Edd', 'Deckow', 'Chaya_Ernser47@yahoo.com', '$2b$10$bqglq4tlMMgtTQdu6owTUOSN6wd4Aw9IShzkrWXEBgO8Py.lfhys2', 'https://s3.amazonaws.com/uifaces/faces/twitter/ralph_lam/128.jpg', '2', '2', '2', '2020-05-26 12:55:09', '2020-05-26 12:55:09'),
('3', 'Elmira', 'Douglas', 'Jeremie.Collins66@yahoo.com', '$2b$10$ciMIQSH1VpZxAURYM3xjf.1Om6k/242Z8YcIGXp71.oCVgSKU/7dK', 'https://s3.amazonaws.com/uifaces/faces/twitter/kudretkeskin/128.jpg', '2', '2', '2', '2020-05-26 12:55:12', '2020-05-26 12:55:12'),
('4', 'Lora', 'Kertzmann', 'Catharine_Lemke@hotmail.com', '$2b$10$gELKhBknlm23gm.nLsanNOm8rx/dqNlihm.fcvwBPprAkM4JTxgeS', 'https://s3.amazonaws.com/uifaces/faces/twitter/tobysaxon/128.jpg', '2', '2', '2', '2020-05-26 12:56:07', '2020-05-26 12:56:07'),
('5', 'Stephanie', 'Yundt', 'Rae_Huels63@gmail.com', '$2b$10$joQcH/BkvsNtYHzdIVi2CuiR7zXCH1.pK5XPQIMLemEyrpxmww98O', 'https://s3.amazonaws.com/uifaces/faces/twitter/victordeanda/128.jpg', '2', '2', '2', '2020-05-26 12:56:09', '2020-05-26 12:56:09'),
('6', 'Jairo', 'Heathcote', 'Lorenza_Christiansen@gmail.com', '$2b$10$IwjxSvg7K3irtHbmJZ.H5uliUMPQ0z6mn652XBLPYs1NYZYOpJ7RO', 'https://s3.amazonaws.com/uifaces/faces/twitter/diesellaws/128.jpg', '2', '2', '2', '2020-05-26 12:56:12', '2020-05-26 12:56:12'),
('7', 'Vincenza', 'Heidenreich', 'Gilda90@gmail.com', '$2b$10$Tb38v5ufrZW/A5dy6PsFEeT40Tskt49SIuuleTJzZBNjxqVOKOM1m', 'https://s3.amazonaws.com/uifaces/faces/twitter/chacky14/128.jpg', '2', '2', '2', '2020-05-26 12:56:15', '2020-05-26 12:56:15'),
('8', 'Elbert', 'Zulauf', 'Ashly.Kirlin39@gmail.com', '$2b$10$tXDSS4563MjLRRsmwVwTf.VOMJr/LCJuJ91PiqDcxeV5pORDM9Bqm', 'https://s3.amazonaws.com/uifaces/faces/twitter/thinkleft/128.jpg', '2', '2', '2', '2020-05-26 12:56:18', '2020-05-26 12:56:18'),
('9', 'Milo', 'Funk', 'Ludwig_Mayer91@yahoo.com', '$2b$10$4n0aPxsPGOpgno6nNv1dgeHuRJM1rq7b25ZZxo3/OJ84WDnrPmY16', 'https://s3.amazonaws.com/uifaces/faces/twitter/panchajanyag/128.jpg', '2', '2', '2', '2020-05-26 12:56:31', '2020-05-26 12:56:31'),
('10', 'Irma', 'Rippin', 'Deondre55@hotmail.com', '$2b$10$R0LNvN2qmEuek99brWL.huGV2KHGp3T36jEsc5Jh/g9oJzvNB6CHy', 'https://s3.amazonaws.com/uifaces/faces/twitter/lanceguyatt/128.jpg', '2', '2', '2', '2020-05-26 12:56:33', '2020-05-26 12:56:33'),
('11', 'Alexandre', 'Cardoso', 'alecar2007@gmail.com', '$2b$10$yVMbbB0dr54F32MN9URkuu4caofHT1oGqBaM098mlmglDHab4YVtm', '', '2', '2', '2', '2020-06-04 15:40:07', '2020-06-04 15:40:07');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;