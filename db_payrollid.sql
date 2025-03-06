-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.26 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table db_payrollid.etr
DROP TABLE IF EXISTS `etr`;
CREATE TABLE IF NOT EXISTS `etr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_etr` varchar(50) NOT NULL DEFAULT '0',
  `keterangan` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table db_payrollid.etr: ~3 rows (approximately)
DELETE FROM `etr`;
INSERT INTO `etr` (`id`, `nama_etr`, `keterangan`) VALUES
	(1, 'TER A', ''),
	(2, 'TER B', ''),
	(3, 'TER C', '');

-- Dumping structure for table db_payrollid.etr_bruto
DROP TABLE IF EXISTS `etr_bruto`;
CREATE TABLE IF NOT EXISTS `etr_bruto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_etr` int NOT NULL,
  `minimum` double DEFAULT '0',
  `maksimum` double DEFAULT '0',
  `persentasi` double DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table db_payrollid.etr_bruto: ~125 rows (approximately)
DELETE FROM `etr_bruto`;
INSERT INTO `etr_bruto` (`id`, `id_etr`, `minimum`, `maksimum`, `persentasi`) VALUES
	(1, 1, 0, 5400000, 0),
	(2, 1, 5400001, 5650000, 0.25),
	(3, 1, 5650001, 5950000, 0.5),
	(4, 1, 5950001, 6300000, 0.75),
	(5, 1, 6300001, 6750000, 1),
	(6, 1, 6750001, 7500000, 1.25),
	(7, 1, 7500001, 8550000, 1.5),
	(8, 1, 8550001, 9650000, 1.75),
	(9, 1, 9650001, 10050000, 2),
	(10, 1, 10050001, 10350000, 2.25),
	(11, 1, 10350001, 10700000, 2.5),
	(12, 1, 10700001, 11050000, 3),
	(13, 1, 11050001, 11600000, 3.5),
	(14, 1, 11600001, 12500000, 4),
	(15, 1, 12500001, 13750000, 5),
	(16, 1, 13750001, 15100000, 6),
	(17, 1, 15100001, 16950000, 7),
	(18, 1, 16950001, 19750000, 8),
	(19, 1, 19750001, 24150000, 9),
	(20, 1, 24150001, 26450000, 10),
	(21, 1, 26450001, 28000000, 11),
	(22, 1, 28000001, 30050000, 12),
	(23, 1, 30050001, 32400000, 13),
	(24, 1, 32400001, 35400000, 14),
	(25, 1, 35400001, 39100000, 15),
	(26, 1, 39100001, 43850000, 16),
	(27, 1, 43850001, 47800000, 17),
	(28, 1, 47800001, 51400000, 18),
	(29, 1, 51400001, 56300000, 19),
	(30, 1, 56300001, 62200000, 20),
	(31, 1, 62200001, 68600000, 21),
	(32, 1, 68600001, 77500000, 22),
	(33, 1, 77500001, 89000000, 23),
	(34, 1, 89000001, 103000000, 24),
	(35, 1, 103000001, 125000000, 25),
	(36, 1, 125000001, 157000000, 26),
	(37, 1, 157000001, 206000000, 27),
	(38, 1, 206000001, 337000000, 28),
	(39, 1, 337000001, 454000000, 29),
	(40, 1, 454000001, 550000000, 30),
	(41, 1, 550000001, 695000000, 31),
	(42, 1, 695000001, 910000000, 32),
	(43, 1, 910000001, 1400000000, 33),
	(44, 1, 1400000001, 999999999999, 34),
	(45, 2, 0, 6200000, 0),
	(46, 2, 6200001, 6500000, 0.25),
	(47, 2, 6500001, 6850000, 0.5),
	(48, 2, 6850001, 7300000, 0.75),
	(49, 2, 7300001, 9200000, 1),
	(50, 2, 9200001, 10750000, 1.5),
	(51, 2, 10750001, 11250000, 2),
	(52, 2, 11250001, 11600000, 2.5),
	(53, 2, 11600001, 12600000, 3),
	(54, 2, 12600001, 13600000, 4),
	(55, 2, 13600001, 14950000, 5),
	(56, 2, 14950001, 16400000, 6),
	(57, 2, 16400001, 18450000, 7),
	(58, 2, 18450001, 21850000, 8),
	(59, 2, 21850001, 26000000, 9),
	(60, 2, 26000001, 27700000, 10),
	(61, 2, 27700001, 29350000, 11),
	(62, 2, 29350001, 31450000, 12),
	(63, 2, 31450001, 33950000, 13),
	(64, 2, 33950001, 37100000, 14),
	(65, 2, 37100001, 41100000, 15),
	(66, 2, 41100001, 45800000, 16),
	(67, 2, 45800001, 49500000, 17),
	(68, 2, 49500001, 53800000, 18),
	(69, 2, 53800001, 58500000, 19),
	(70, 2, 58500001, 64000000, 20),
	(71, 2, 64000001, 71000000, 21),
	(72, 2, 71000001, 80000000, 22),
	(73, 2, 80000001, 93000000, 23),
	(74, 2, 93000001, 109000000, 24),
	(75, 2, 109000001, 129000000, 25),
	(76, 2, 129000001, 163000000, 26),
	(77, 2, 163000001, 211000000, 27),
	(78, 2, 211000001, 374000000, 28),
	(79, 2, 374000001, 459000000, 29),
	(80, 2, 459000001, 555000000, 30),
	(81, 2, 555000001, 704000000, 31),
	(82, 2, 704000001, 957000000, 32),
	(83, 2, 957000001, 1405000000, 33),
	(84, 2, 1405000001, 999999999999, 34),
	(85, 3, 0, 6600000, 0),
	(86, 3, 6600001, 6950000, 0.25),
	(87, 3, 6950001, 7350000, 0.5),
	(88, 3, 7350001, 7800000, 0.75),
	(89, 3, 7800001, 8850000, 1),
	(90, 3, 8850001, 9800000, 1.25),
	(91, 3, 9800001, 10950000, 1.5),
	(92, 3, 10950001, 11200000, 1.75),
	(93, 3, 11200001, 12050000, 2),
	(94, 3, 12050001, 12950000, 3),
	(95, 3, 12950001, 14150000, 4),
	(96, 3, 14150001, 15550000, 5),
	(97, 3, 15550001, 17050000, 6),
	(98, 3, 17050001, 19500000, 7),
	(99, 3, 19500001, 22700000, 8),
	(100, 3, 22700001, 26600000, 9),
	(101, 3, 26600001, 28100000, 10),
	(102, 3, 28100001, 30100000, 11),
	(103, 3, 30100001, 32600000, 12),
	(104, 3, 32600001, 35400000, 13),
	(105, 3, 35400001, 38900000, 14),
	(106, 3, 38900001, 43000000, 15),
	(107, 3, 43000001, 47400000, 16),
	(108, 3, 47400001, 51200000, 17),
	(109, 3, 51200001, 55800000, 18),
	(110, 3, 55800001, 60400000, 19),
	(111, 3, 60400001, 66700000, 20),
	(112, 3, 66700001, 74500000, 21),
	(113, 3, 74500001, 83200000, 22),
	(114, 3, 83200001, 95600000, 23),
	(115, 3, 95600001, 110000000, 24),
	(116, 3, 110000001, 134000000, 25),
	(117, 3, 134000001, 169000000, 26),
	(118, 3, 169000001, 221000000, 27),
	(119, 3, 221000001, 390000000, 28),
	(120, 3, 390000001, 463000000, 29),
	(121, 3, 463000001, 561000000, 30),
	(122, 3, 561000001, 709000000, 31),
	(123, 3, 709000001, 965000000, 32),
	(124, 3, 965000001, 1419000000, 33),
	(125, 3, 1419000001, 999999999999, 34);

-- Dumping structure for table db_payrollid.etr_ptkp
DROP TABLE IF EXISTS `etr_ptkp`;
CREATE TABLE IF NOT EXISTS `etr_ptkp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_etr` int NOT NULL,
  `status` tinyint DEFAULT NULL,
  `tanggungan` tinyint DEFAULT NULL,
  `ptkp` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table db_payrollid.etr_ptkp: ~8 rows (approximately)
DELETE FROM `etr_ptkp`;
INSERT INTO `etr_ptkp` (`id`, `id_etr`, `status`, `tanggungan`, `ptkp`) VALUES
	(1, 1, 0, 0, 54000000),
	(2, 1, 0, 1, 58500000),
	(3, 1, 1, 0, 58500000),
	(4, 2, 0, 2, 63000000),
	(5, 2, 0, 3, 67500000),
	(6, 2, 1, 1, 63000000),
	(7, 2, 1, 2, 67500000),
	(8, 3, 1, 3, 72000000);

-- Dumping structure for table db_payrollid.pegawai
DROP TABLE IF EXISTS `pegawai`;
CREATE TABLE IF NOT EXISTS `pegawai` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_pegawai` varchar(128) NOT NULL,
  `tgl_join` date DEFAULT NULL,
  `jabatan` varchar(128) DEFAULT '',
  `status` tinyint DEFAULT NULL,
  `tanggungan` tinyint DEFAULT NULL,
  `gaji_pokok` double DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table db_payrollid.pegawai: ~0 rows (approximately)
DELETE FROM `pegawai`;

-- Dumping structure for table db_payrollid.tunjangan
DROP TABLE IF EXISTS `tunjangan`;
CREATE TABLE IF NOT EXISTS `tunjangan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_tunjangan` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `keterangan` text,
  `aktif` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table db_payrollid.tunjangan: ~3 rows (approximately)
DELETE FROM `tunjangan`;
INSERT INTO `tunjangan` (`id`, `nama_tunjangan`, `keterangan`, `aktif`) VALUES
	(1, 'BPJS Kesehatan', '', 1),
	(2, 'BPJS Ketenagakerjaan', '', 1),
	(3, 'Astra Life', 'Asuransi Jiwa', 1);

-- Dumping structure for table db_payrollid.tunjangan_pegawai
DROP TABLE IF EXISTS `tunjangan_pegawai`;
CREATE TABLE IF NOT EXISTS `tunjangan_pegawai` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_pegawai` int NOT NULL,
  `id_tunjangan` int NOT NULL,
  `nominal` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table db_payrollid.tunjangan_pegawai: ~0 rows (approximately)
DELETE FROM `tunjangan_pegawai`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
