-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 21 fév. 2024 à 08:30
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `facturation`
--

-- --------------------------------------------------------

--
-- Structure de la table `pdf_documents`
--

DROP TABLE IF EXISTS `pdf_documents`;
CREATE TABLE IF NOT EXISTS `pdf_documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `invoice_number` bigint DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=195 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `pdf_documents`
--

INSERT INTO `pdf_documents` (`id`, `firstname`, `lastname`, `email`, `phone`, `invoice_number`, `file_name`, `created_at`) VALUES
(188, 'daniel', 'joe', 'bebe@gmail.com', '123456789', 8523695, 'daniel_joe_21-02-2024.pdf', '2024-02-21 04:11:02'),
(190, 'yaya', 'titi', 'yaya@gmail.com', '6565656', 121212121, 'yaya_titi_21-02-2024.pdf', '2024-02-21 04:23:41'),
(191, 'lola', 'lulu', 'lola@gmail.com', '7895757575', 757575757575757, 'lola_lulu_21-02-2024.pdf', '2024-02-21 04:27:05');

-- --------------------------------------------------------

--
-- Structure de la table `pdf_document_articles`
--

DROP TABLE IF EXISTS `pdf_document_articles`;
CREATE TABLE IF NOT EXISTS `pdf_document_articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `document_id` int DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `prix_unitaire` decimal(10,2) DEFAULT NULL,
  `quantite` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_id` (`document_id`)
) ENGINE=MyISAM AUTO_INCREMENT=397 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `pdf_document_articles`
--

INSERT INTO `pdf_document_articles` (`id`, `document_id`, `designation`, `prix_unitaire`, `quantite`) VALUES
(388, 188, 'ananas', '12.00', 545),
(389, 188, 'tomates', '10.00', 12),
(390, 188, 'sardines', '45.00', 32),
(391, 188, 'cerises', '12.50', 65),
(393, 190, 'Telephone', '565.00', 10),
(394, 190, 'iphone', '56.00', 10),
(395, 191, 'ananas', '25.00', 10),
(396, 191, 'iphone', '120.00', 23);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
