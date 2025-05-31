-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 31, 2025 at 04:17 PM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `image`, `created_at`, `updated_at`) VALUES
(13, 'Sunscreen', 'Harmful effects of ultraviolet (UV) radiation from the sun.', 'category/1746342693.jpg', '2025-05-04 00:11:34', '2025-05-04 00:11:34'),
(15, 'Cleanser', 'Remove dirt, oil, makeup, and other impurities from the skin.', 'category/1746343022.jpg', '2025-05-04 00:17:02', '2025-05-04 00:17:02'),
(16, 'Moisturizer', 'Protective barrier function, often used to treat and prevent dryness.', 'category/1746343233.jpg', '2025-05-04 00:20:33', '2025-05-04 00:20:33'),
(18, 'Exfoliators', 'Surface of the skin, revealing smoother, brighter, and more rejuvenated skin.', 'category/1748628992.jpg', '2025-05-30 11:16:32', '2025-05-30 11:16:32');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customers_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `phone`, `address`, `password`, `remember_token`, `email_verified_at`, `created_at`, `updated_at`) VALUES
(32, 'ASURA', 'asura@gmail.com', '0977626855', 'St. 217, Phnom Penh, Cambodia', '$2y$12$le2r733Dv8umBMfP3WuC2u1IpvCfPRK5X7tVfnwZDoEwEVCB99Y1a', NULL, NULL, '2025-05-31 09:00:06', '2025-05-31 09:00:06');

-- --------------------------------------------------------

--
-- Table structure for table `hero_sections`
--

DROP TABLE IF EXISTS `hero_sections`;
CREATE TABLE IF NOT EXISTS `hero_sections` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `page_name` varchar(191) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `button_text` varchar(255) DEFAULT NULL,
  `button_link` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `page_name` (`page_name`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hero_sections`
--

INSERT INTO `hero_sections` (`id`, `page_name`, `title`, `subtitle`, `image`, `button_text`, `button_link`, `is_active`, `created_at`, `updated_at`) VALUES
(5, 'shop', 'Reveal Your Beautiful Skin', 'Support healthy skin, enhance its appearance, and relieve skin conditions', 'hero_images/LHBbnwYil1UkhPLHmIWyZCGbnl1jaUuQg6GL4IQK.jpg', 'Shop Now', 'Shop Now', 1, '2025-04-27 23:18:36', '2025-04-27 23:18:36'),
(7, 'contact', 'Beauty Parfait is Back!', 'Your Glow-Up Essential Returns', 'hero_images/8vlK7ycBlmK5l09mpNEDefqd9ivfLddSDVwnjnwg.jpg', NULL, NULL, 1, '2025-04-29 20:05:22', '2025-04-29 20:05:22'),
(6, 'about', 'Better Ageing Combo', 'Better Ageing Serum+Ultra Moisturising Cream', 'hero_images/nyXE3t2fdfWXA0ttFco6ydoeRcDcLgJWDJBrX9ma.jpg', NULL, NULL, 1, '2025-04-29 19:58:42', '2025-04-29 19:58:42');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
CREATE TABLE IF NOT EXISTS `invoices` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` bigint UNSIGNED NOT NULL,
  `invoice_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_date` date NOT NULL,
  `due_date` date NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `tax_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `shipping_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `discount_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `status` enum('draft','sent','paid','overdue','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `billing_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoices_invoice_number_unique` (`invoice_number`),
  KEY `invoices_order_id_foreign` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `order_id`, `invoice_number`, `invoice_date`, `due_date`, `total_amount`, `tax_amount`, `shipping_amount`, `discount_amount`, `status`, `notes`, `billing_address`, `shipping_address`, `created_at`, `updated_at`) VALUES
(10, 34, '001', '2025-05-31', '2025-06-02', 63.99, 0.00, 0.00, 0.00, 'paid', NULL, 'Yin Asura, St. 217, Phnom Penh, Cambodia, Phnom Penh, 111 123, Cambodia', 'Yin Asura, St. 217, Phnom Penh, Cambodia, Phnom Penh, 111 123, Cambodia', '2025-05-31 09:02:43', '2025-05-31 09:02:43');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_settings`
--

DROP TABLE IF EXISTS `invoice_settings`;
CREATE TABLE IF NOT EXISTS `invoice_settings` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tax_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `prefix` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `terms` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_settings`
--

INSERT INTO `invoice_settings` (`id`, `company_name`, `tax_id`, `address`, `phone`, `email`, `prefix`, `logo`, `terms`, `notes`, `created_at`, `updated_at`) VALUES
(1, 'SKIN CARE', '0011245', 'Phnom Penh, Cambodia', '+855 977 626 855', 'skincare@gmail.com', 'INV-', NULL, 'Payment to be made within 14 days via the payment link below. All major credit cards accepted.', 'Thanks you!!', '2025-04-29 08:01:11', '2025-04-29 08:19:41');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` json DEFAULT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` bigint UNSIGNED NOT NULL,
  `order_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','processing','completed','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `payment_status` enum('pending','paid','failed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `shipping_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_order_number_unique` (`order_number`),
  KEY `orders_customer_id_foreign` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `order_number`, `total_amount`, `status`, `payment_status`, `shipping_address`, `billing_address`, `order_date`, `created_at`, `updated_at`) VALUES
(34, 32, 'ORD-683B27F550B23', 63.99, 'pending', 'pending', 'Yin Asura, St. 217, Phnom Penh, Cambodia, Phnom Penh, 111 123, Cambodia', 'Yin Asura, St. 217, Phnom Penh, Cambodia, Phnom Penh, 111 123, Cambodia', '2025-05-31', '2025-05-31 09:01:57', '2025-05-31 09:01:57');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_product_id_foreign` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `unit_price`, `total_price`, `created_at`, `updated_at`) VALUES
(43, 34, 30, 1, 20.99, 20.99, '2025-05-31 09:01:57', '2025-05-31 09:01:57'),
(44, 34, 32, 1, 29.00, 29.00, '2025-05-31 09:01:57', '2025-05-31 09:01:57');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=MyISAM AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'adminToken', 'b0aa73dd9c22292783d8b17934c6907405a886d7e5b70cff9a98e1c11a7654a5', '[\"*\"]', NULL, NULL, '2025-04-21 01:47:26', '2025-04-21 01:47:26'),
(2, 'App\\Models\\User', 2, 'adminToken', '30d3990578deea2be0e41243f1f4b3a7856221f21c95532eab6fe9a2215f9f61', '[\"*\"]', NULL, NULL, '2025-04-21 01:58:47', '2025-04-21 01:58:47'),
(3, 'App\\Models\\User', 3, 'adminToken', 'd98b3d8342186714992e851e704b055b9a65fe2d44871fcb2767b4ec3212e8c6', '[\"*\"]', NULL, NULL, '2025-04-21 09:50:13', '2025-04-21 09:50:13'),
(4, 'App\\Models\\User', 4, 'adminToken', '5fb16270a848477275722c136fd767f08e936efc031887a62ed7a799e95cdb88', '[\"*\"]', NULL, NULL, '2025-04-21 10:40:51', '2025-04-21 10:40:51'),
(5, 'App\\Models\\User', 5, 'adminToken', '9c55fce69fb90f0f4f38ff0b2b2d12cc893cad9189d71d4ab784171b3eb5bdcc', '[\"*\"]', NULL, NULL, '2025-04-21 11:00:28', '2025-04-21 11:00:28'),
(6, 'App\\Models\\User', 6, 'adminToken', '16336811f0246bbbf1017a3e5064f5f9ec4171a97be3f69eaad2ac4dd4d2ba3c', '[\"*\"]', NULL, NULL, '2025-04-22 22:28:59', '2025-04-22 22:28:59'),
(7, 'App\\Models\\User', 7, 'adminToken', '73be6387e8c7c8075e2df7c6e10383f6ca9d7d599048f43054033d2a87658ec2', '[\"*\"]', NULL, NULL, '2025-04-23 11:43:10', '2025-04-23 11:43:10'),
(8, 'App\\Models\\User', 7, 'adminToken', '3c3703caa582d22093dbeb8bccff88059365f89bd60087f126ef9506d18daead', '[\"*\"]', NULL, NULL, '2025-04-23 11:43:31', '2025-04-23 11:43:31'),
(9, 'App\\Models\\User', 7, 'adminToken', 'a78b9de6da5d48877fbdcd0cef3146c772f7d3e2848d9a1f25d56a0017587780', '[\"*\"]', NULL, NULL, '2025-04-23 17:52:43', '2025-04-23 17:52:43'),
(10, 'App\\Models\\User', 7, 'adminToken', '5a7bfb086e8cc680947e45d521fcf98aa2ac713e49ef442587cc6d839fa948d0', '[\"*\"]', '2025-04-23 18:22:49', NULL, '2025-04-23 18:20:16', '2025-04-23 18:22:49'),
(11, 'App\\Models\\User', 7, 'adminToken', '8c696c561b4c0aa7e362ec4fb9ea607a2762bb4eb422911b7014aec2208b306b', '[\"*\"]', '2025-04-23 18:31:43', NULL, '2025-04-23 18:22:55', '2025-04-23 18:31:43'),
(12, 'App\\Models\\User', 7, 'adminToken', '33c25af09a36f7bd9bc54cfe22757a2cef1fa5ec293e9234788e0806ed8825b0', '[\"*\"]', '2025-04-23 18:32:10', NULL, '2025-04-23 18:32:08', '2025-04-23 18:32:10'),
(13, 'App\\Models\\User', 7, 'adminToken', '2b25bc19673e96a0e470635ffdfd4cc0f2626b3910ce9da9022b9d7bd7974313', '[\"*\"]', '2025-04-23 18:36:28', NULL, '2025-04-23 18:32:40', '2025-04-23 18:36:28'),
(14, 'App\\Models\\User', 7, 'adminToken', '54a22fecdfc73e48667c4273b93e973274b7232492b87c987585c98b00dcf269', '[\"*\"]', '2025-04-23 18:43:04', NULL, '2025-04-23 18:37:03', '2025-04-23 18:43:04'),
(15, 'App\\Models\\User', 7, 'adminToken', '003c0156803fb7a98269647228f04c223339fbcc400535e74648d56ad1a14314', '[\"*\"]', '2025-04-23 18:43:52', NULL, '2025-04-23 18:43:31', '2025-04-23 18:43:52'),
(16, 'App\\Models\\User', 7, 'adminToken', '790a6c62e59ea284baf8de02bf633e959243e1ec43830b64923aefaa054f2db8', '[\"*\"]', '2025-04-27 21:36:58', NULL, '2025-04-23 18:44:08', '2025-04-27 21:36:58'),
(17, 'App\\Models\\User', 8, 'adminToken', '723756d9dfd66c0d0d16cb81fcea2070a4474a950b4e6b38c34904a1cb610c7e', '[\"*\"]', '2025-04-24 01:52:07', NULL, '2025-04-24 01:51:25', '2025-04-24 01:52:07'),
(18, 'App\\Models\\User', 8, 'adminToken', 'db2c293eb87f9d8b4be0ec3c5c54012899971e7a18c65279af38adeb1b8a717a', '[\"*\"]', '2025-05-04 00:26:34', NULL, '2025-04-24 01:53:10', '2025-05-04 00:26:34'),
(19, 'App\\Models\\User', 7, 'adminToken', 'e11f8c470f1b9afd30bddadeb82fce152b92e6f4ec9b68b18bfb6f9f46c1b11b', '[\"*\"]', '2025-05-04 23:22:18', NULL, '2025-04-27 21:37:09', '2025-05-04 23:22:18'),
(20, 'App\\Models\\User', 7, 'adminToken', 'fa368a0a99b446b1b1c6b9dd3dffcdf0c51d6d0c447d7e10e21a97e87188a12e', '[\"*\"]', '2025-04-29 08:29:38', NULL, '2025-04-29 08:29:33', '2025-04-29 08:29:38'),
(21, 'App\\Models\\User', 7, 'adminToken', '8cb0ec5cccb6fcc4613ea220f4fb10feb0fb2dd9e6e7f3409408e6bb719aa304', '[\"*\"]', '2025-04-29 09:02:05', NULL, '2025-04-29 09:02:02', '2025-04-29 09:02:05'),
(22, 'App\\Models\\Customer', 11, 'auth_token', '5697e1278ff67731d6213c0dda4d185ed75a030e391fe27822290ed8aa9e82b6', '[\"*\"]', NULL, NULL, '2025-04-29 10:16:57', '2025-04-29 10:16:57'),
(23, 'App\\Models\\Customer', 12, 'auth_token', '3a3d3a800bd44f457dcc9729a951bac4582aa18fa033f8e960aa3db77c88e869', '[\"*\"]', NULL, NULL, '2025-04-29 10:18:46', '2025-04-29 10:18:46'),
(24, 'App\\Models\\Customer', 13, 'auth_token', 'a62afbb12d857b214c9318cfce4df7cb171dcaf3727d2e121ebcc6f20d43051e', '[\"*\"]', NULL, NULL, '2025-04-29 10:20:58', '2025-04-29 10:20:58'),
(25, 'App\\Models\\Customer', 14, 'auth_token', '702635c99159f2f82098df8ac10c0ddbe1d097bc1b8e3b28f4e6b974e7c7f3f4', '[\"*\"]', NULL, NULL, '2025-04-29 10:24:42', '2025-04-29 10:24:42'),
(26, 'App\\Models\\Customer', 15, 'auth_token', 'c36b4bd40ee8f8c5c5e0518399ba4106b440190d0ac1fb6b845d114d69b75514', '[\"*\"]', NULL, NULL, '2025-04-29 10:30:58', '2025-04-29 10:30:58'),
(27, 'App\\Models\\Customer', 16, 'auth_token', '4b1130d7042d7f254cb43f773820be03ecf6a2e308100995722443e64d0fbe66', '[\"*\"]', NULL, NULL, '2025-04-29 10:33:27', '2025-04-29 10:33:27'),
(28, 'App\\Models\\Customer', 17, 'auth_token', 'a45bc9b65354afdcfbfd716f36d8e96ded253f0b90bd95bfbc28234416bb73f0', '[\"*\"]', NULL, NULL, '2025-04-29 11:00:48', '2025-04-29 11:00:48'),
(29, 'App\\Models\\Customer', 17, 'auth_token', 'a95bc832a831f1e9e0835b0fde5a8470cac4b75dd618d6a80915bed3bafdf713', '[\"*\"]', '2025-04-29 20:47:28', NULL, '2025-04-29 19:38:58', '2025-04-29 20:47:28'),
(30, 'App\\Models\\Customer', 18, 'auth_token', 'cce0c84aef9a89e767d516310277ab886d5c68169f41d6c8a31576851881d80b', '[\"*\"]', NULL, NULL, '2025-04-29 20:42:07', '2025-04-29 20:42:07'),
(31, 'App\\Models\\Customer', 18, 'auth_token', 'd05215c57832f5cf722d39adcc3de6da853998d9ad2a59c54ebd0fa66a88e787', '[\"*\"]', '2025-04-29 21:04:07', NULL, '2025-04-29 20:47:49', '2025-04-29 21:04:07'),
(32, 'App\\Models\\Customer', 18, 'auth_token', '70bc5ea6cd13cd018d873e87a1e93d9f5b77cd6de55e28706a381637603a8475', '[\"*\"]', '2025-04-29 21:01:14', NULL, '2025-04-29 20:56:02', '2025-04-29 21:01:14'),
(33, 'App\\Models\\Customer', 17, 'auth_token', 'fc29e68db5501785065995db1aec5eee479c68b07dc02112f1cc26756d5dd3a1', '[\"*\"]', '2025-04-29 21:02:01', NULL, '2025-04-29 21:01:42', '2025-04-29 21:02:01'),
(34, 'App\\Models\\Customer', 19, 'auth_token', '9fe52092eec54f609faf7251ddb35ea4f57daa30f0be05ae67e5068f4938e26d', '[\"*\"]', '2025-04-29 21:42:42', NULL, '2025-04-29 21:04:26', '2025-04-29 21:42:42'),
(35, 'App\\Models\\Customer', 22, 'auth_token', '484d6f4f665f5cbb0c0278c8b8dae39e4d59cfec00315d801df3006c191418fd', '[\"*\"]', NULL, NULL, '2025-04-29 21:20:55', '2025-04-29 21:20:55'),
(36, 'App\\Models\\User', 7, 'adminToken', 'dd5ab4613e1df78e97b961130be7417240d73733883a99489be17ac8949c8936', '[\"*\"]', '2025-04-29 21:59:03', NULL, '2025-04-29 21:59:02', '2025-04-29 21:59:03'),
(37, 'App\\Models\\Customer', 23, 'auth_token', 'ed9ae915e56006c50dde0962df84d7a50c3669d086d471033df6b444e4a14b57', '[\"*\"]', NULL, NULL, '2025-04-29 22:05:24', '2025-04-29 22:05:24'),
(38, 'App\\Models\\Customer', 18, 'auth_token', 'ded825cf4f84022c92fbf6729d6ddc57cc80f107d01e80d3d87ef48af786ddef', '[\"*\"]', '2025-04-30 00:34:16', NULL, '2025-04-29 22:06:04', '2025-04-30 00:34:16'),
(39, 'App\\Models\\Customer', 24, 'auth_token', '03b338bd1a06aac7b75743f8100a0f0b301065a0b88f6fe7477de9e2ecfa579e', '[\"*\"]', NULL, NULL, '2025-04-29 22:06:36', '2025-04-29 22:06:36'),
(40, 'App\\Models\\Customer', 25, 'auth_token', 'f78a4635554fe4d68876957f4b592c06a00c0811074ccdc3a9c059f42b2dcdd5', '[\"*\"]', NULL, NULL, '2025-05-04 17:47:17', '2025-05-04 17:47:17'),
(41, 'App\\Models\\Customer', 26, 'auth_token', 'f1199854687151c1b8d73ccd8b2a7078db9f06cafd74e502062284ecb932cf47', '[\"*\"]', NULL, NULL, '2025-05-04 17:49:02', '2025-05-04 17:49:02'),
(42, 'App\\Models\\Customer', 27, 'auth_token', '04f3043cd7deb52b82fd795593ac93a61846a3ac88ca777cd5500506fd2a8f9b', '[\"*\"]', NULL, NULL, '2025-05-04 17:55:54', '2025-05-04 17:55:54'),
(43, 'App\\Models\\Customer', 28, 'auth_token', '57ece91c67434a426d15fc7917412421bfca0ae9bf09c250cc606fd3d5838e7f', '[\"*\"]', NULL, NULL, '2025-05-04 18:07:25', '2025-05-04 18:07:25'),
(44, 'App\\Models\\Customer', 28, 'auth_token', '0f7d72d7265b14a4cfb2e5dff74a0960a49581d1028fa91dbd3189a726ccaaa6', '[\"*\"]', NULL, NULL, '2025-05-04 18:10:04', '2025-05-04 18:10:04'),
(45, 'App\\Models\\Customer', 29, 'auth_token', 'a72c0e5356ed59edf208e5df1f22ec7063c25597af86360e57d3a1f9af242c82', '[\"*\"]', NULL, NULL, '2025-05-04 22:16:01', '2025-05-04 22:16:01'),
(46, 'App\\Models\\User', 9, 'adminToken', 'deb6de4c85c5926f625fe4878eddb485551e709bc76fc5dff7972fca264659ae', '[\"*\"]', '2025-05-30 11:05:43', NULL, '2025-05-30 10:30:00', '2025-05-30 11:05:43'),
(47, 'App\\Models\\Customer', 30, 'auth_token', '2d395abfa45e19cdeccc2f7911f7a7eefa96e7262225b1be47d6ecdd92bb11a0', '[\"*\"]', NULL, NULL, '2025-05-30 10:54:07', '2025-05-30 10:54:07'),
(48, 'App\\Models\\Customer', 30, 'auth_token', 'de3af25c21370338ab483b415c4f89454ddc18209d5d579fcadac2a7edc4b489', '[\"*\"]', '2025-05-30 11:00:24', NULL, '2025-05-30 10:54:27', '2025-05-30 11:00:24'),
(49, 'App\\Models\\User', 9, 'adminToken', 'e580e8b35c169d6d10ee1c88e4bcddd7047ead3662ed9fdb3ae3a1fdf715d7ca', '[\"*\"]', '2025-05-30 11:14:50', NULL, '2025-05-30 11:06:23', '2025-05-30 11:14:50'),
(50, 'App\\Models\\User', 9, 'adminToken', 'e314c0c2694e6d6f9620ede2b81bc87945747e43e114f937ffd9e8190a3c3a31', '[\"*\"]', '2025-05-30 11:19:23', NULL, '2025-05-30 11:15:32', '2025-05-30 11:19:23'),
(51, 'App\\Models\\User', 9, 'adminToken', 'b888c2bd0323da6095a20989b4714697c54e70bcab0a470dda1edf1f4da21cbd', '[\"*\"]', '2025-05-30 11:37:46', NULL, '2025-05-30 11:20:14', '2025-05-30 11:37:46'),
(52, 'App\\Models\\Customer', 31, 'auth_token', '8fbf870089deea049b15f2bf69181fde6e9fedccac99dca4aaeb018d3fae16e0', '[\"*\"]', '2025-05-30 11:31:38', NULL, '2025-05-30 11:23:04', '2025-05-30 11:31:38'),
(53, 'App\\Models\\User', 9, 'adminToken', 'f687d340b456299e4d13980eab493df7bf4632b91b99dfd34fc4c423596922fb', '[\"*\"]', '2025-05-30 11:39:42', NULL, '2025-05-30 11:38:48', '2025-05-30 11:39:42'),
(54, 'App\\Models\\User', 9, 'adminToken', 'ec997a2262004211ab9e858412536ae04237663eebfadc0c1ba576cb7fb844c2', '[\"*\"]', '2025-05-30 11:51:53', NULL, '2025-05-30 11:40:31', '2025-05-30 11:51:53'),
(55, 'App\\Models\\Customer', 31, 'auth_token', 'a446664f17fe317203cef376dfdc424e034b93c80fd5aac193fccdfb8ee5d1e0', '[\"*\"]', '2025-05-30 11:45:33', NULL, '2025-05-30 11:43:13', '2025-05-30 11:45:33'),
(56, 'App\\Models\\User', 9, 'adminToken', '5de02811532f1dc758b3009ca69e366eb72762f4fbb6192bf9dda5ab4ca041ba', '[\"*\"]', '2025-05-30 11:56:10', NULL, '2025-05-30 11:53:50', '2025-05-30 11:56:10'),
(57, 'App\\Models\\User', 9, 'adminToken', '53a8bfb225f7cb0f568d0649b156c0c6129580926ee89a5a1bd85074916ff74f', '[\"*\"]', '2025-05-30 20:22:40', NULL, '2025-05-30 11:57:07', '2025-05-30 20:22:40'),
(58, 'App\\Models\\Customer', 31, 'auth_token', '99ed23b17d69854770898f9033a5f395d205c38c3b31eaf4d271c32e4c5349d0', '[\"*\"]', '2025-05-30 12:03:11', NULL, '2025-05-30 12:00:42', '2025-05-30 12:03:11'),
(59, 'App\\Models\\User', 9, 'adminToken', '94e8d2e283aa17ae2c4f913bb5954e93e244461e6115dec9ad0e83a1dd378fcc', '[\"*\"]', '2025-05-31 09:02:23', NULL, '2025-05-30 20:24:49', '2025-05-31 09:02:23'),
(60, 'App\\Models\\Customer', 31, 'auth_token', 'b75daec9b6539c24f0df6dbdc8053a967e1b730811be6e26e0266ecec2382600', '[\"*\"]', '2025-05-30 20:29:33', NULL, '2025-05-30 20:27:49', '2025-05-30 20:29:33'),
(61, 'App\\Models\\Customer', 32, 'auth_token', 'cfbe36ac117308e81b266b749d31e88a0da975972712c83da0a29f2d5d439987', '[\"*\"]', NULL, NULL, '2025-05-31 09:00:06', '2025-05-31 09:00:06'),
(62, 'App\\Models\\Customer', 32, 'auth_token', 'a2fa26838bc99669b99fd48fe84a58040679546344c2f9ce9d63843055a14074', '[\"*\"]', '2025-05-31 09:02:00', NULL, '2025-05-31 09:00:25', '2025-05-31 09:02:00');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('published','draft','archived') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `category_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `brand`, `status`, `is_active`, `image`, `created_at`, `updated_at`, `category_id`) VALUES
(26, 'Neutrogena Ultra', 'A lightweight, non-greasy sunscreen that offers broad-spectrum protection with a matte finish', 20.99, 100, 'Skincare', 'published', 1, 'products/1746425463.jpg', '2025-05-04 23:11:04', '2025-05-04 23:11:04', 13),
(27, 'La Roche-Posay', 'suitable for sensitive skin. Water-resistant and enriched with antioxidants,', 20.99, 80, 'Skincare', 'published', 1, 'products/1746425580.jpg', '2025-05-04 23:13:00', '2025-05-04 23:13:00', 13),
(28, 'CeraVe Hydrating', 'contains ceramides and hyaluronic acid to help maintain the skin’s natural barrier and retain moisture without stripping or irritating.', 30.99, 100, 'Skincare', 'published', 1, 'products/1746425753.jpg', '2025-05-04 23:15:53', '2025-05-04 23:15:53', 15),
(29, 'Toleriane Purifying', 'makeup without harsh ingredients. It’s formulated with thermal spring water and niacinamide to soothe and purify.', 19.00, 80, 'Skincare', 'published', 1, 'products/1746425884.jpg', '2025-05-04 23:18:04', '2025-05-04 23:18:04', 15),
(30, 'CeraVe Moisturizing', 'Suitable for dry to very dry skin on the face and body.', 20.99, 70, 'Skincare', 'published', 1, 'products/1746426006.jpg', '2025-05-04 23:20:06', '2025-05-04 23:20:06', 16),
(32, 'Ordinary Glycolic', 'Best used in the evening and suited for normal to oily skin (not recommended for sensitive skin).', 29.00, 100, 'Skin Care', 'published', 1, 'products/1748629139.jpg', '2025-05-30 11:18:59', '2025-05-30 11:18:59', 18);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(9, 'admin', 'admin@gmail.com', '$2y$12$3wsDQuE7pgL5TRH0pt/I0e0NSUcVa7cBlQrQ3BgFUbmdwMp5XNg5O', '2025-05-30 10:29:59', '2025-05-30 20:27:27');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
