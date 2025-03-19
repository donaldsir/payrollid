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
  `nama_etr` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `keterangan` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_payrollid.etr: ~0 rows (approximately)
DELETE FROM `etr`;
INSERT INTO `etr` (`id`, `nama_etr`, `keterangan`) VALUES
	(2, 'TER A', ''),
	(3, 'TER B', ''),
	(4, 'TER C', '');

-- Dumping structure for table db_payrollid.etr_bruto
DROP TABLE IF EXISTS `etr_bruto`;
CREATE TABLE IF NOT EXISTS `etr_bruto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_etr` int NOT NULL,
  `minimum` decimal(15,2) NOT NULL,
  `maksimum` decimal(15,2) NOT NULL,
  `persentasi` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_payrollid.etr_bruto: ~0 rows (approximately)
DELETE FROM `etr_bruto`;
INSERT INTO `etr_bruto` (`id`, `id_etr`, `minimum`, `maksimum`, `persentasi`) VALUES
	(45, 2, 0.00, 5400000.00, 0.00),
	(46, 2, 5400001.00, 5650000.00, 0.25),
	(47, 2, 5650001.00, 5950000.00, 0.50),
	(48, 2, 5950001.00, 6300000.00, 0.75),
	(49, 2, 6300001.00, 6750000.00, 1.00),
	(50, 2, 6750001.00, 7500000.00, 1.25),
	(51, 2, 7500001.00, 8550000.00, 1.50),
	(52, 2, 8550001.00, 9650000.00, 1.75),
	(53, 2, 9650001.00, 10050000.00, 2.00),
	(54, 2, 10050001.00, 10350000.00, 2.25),
	(55, 2, 10350001.00, 10700000.00, 2.50),
	(56, 2, 10700001.00, 11050000.00, 3.00),
	(57, 2, 11050001.00, 11600000.00, 3.50),
	(58, 2, 11600001.00, 12500000.00, 4.00),
	(59, 2, 12500001.00, 13750000.00, 5.00),
	(60, 2, 13750001.00, 15100000.00, 6.00),
	(61, 2, 15100001.00, 16950000.00, 7.00),
	(62, 2, 16950001.00, 19750000.00, 8.00),
	(63, 2, 19750001.00, 24150000.00, 9.00),
	(64, 2, 24150001.00, 26450000.00, 10.00),
	(65, 2, 26450001.00, 28000000.00, 11.00),
	(66, 2, 28000001.00, 30050000.00, 12.00),
	(67, 2, 30050001.00, 32400000.00, 13.00),
	(68, 2, 32400001.00, 35400000.00, 14.00),
	(69, 2, 35400001.00, 39100000.00, 15.00),
	(70, 2, 39100001.00, 43850000.00, 16.00),
	(71, 2, 43850001.00, 47800000.00, 17.00),
	(72, 2, 47800001.00, 51400000.00, 18.00),
	(73, 2, 51400001.00, 56300000.00, 19.00),
	(74, 2, 56300001.00, 62200000.00, 20.00),
	(75, 2, 62200001.00, 68600000.00, 21.00),
	(76, 2, 68600001.00, 77500000.00, 22.00),
	(77, 2, 77500001.00, 89000000.00, 23.00),
	(78, 2, 89000001.00, 103000000.00, 24.00),
	(79, 2, 103000001.00, 125000000.00, 25.00),
	(80, 2, 125000001.00, 157000000.00, 26.00),
	(81, 2, 157000001.00, 206000000.00, 27.00),
	(82, 2, 206000001.00, 337000000.00, 28.00),
	(83, 2, 337000001.00, 454000000.00, 29.00),
	(84, 2, 454000001.00, 550000000.00, 30.00),
	(85, 2, 550000001.00, 695000000.00, 31.00),
	(86, 2, 695000001.00, 910000000.00, 32.00),
	(87, 2, 910000001.00, 1400000000.00, 33.00),
	(88, 2, 1400000001.00, 999999999999.00, 34.00),
	(89, 3, 0.00, 6200000.00, 0.00),
	(90, 3, 6200001.00, 6500000.00, 0.25),
	(91, 3, 6500001.00, 6850000.00, 0.50),
	(92, 3, 6850001.00, 7300000.00, 0.75),
	(93, 3, 7300001.00, 9200000.00, 1.00),
	(94, 3, 9200001.00, 10750000.00, 1.50),
	(95, 3, 10750001.00, 11250000.00, 2.00),
	(96, 3, 11250001.00, 11600000.00, 2.50),
	(97, 3, 11600001.00, 12600000.00, 3.00),
	(98, 3, 12600001.00, 13600000.00, 4.00),
	(99, 3, 13600001.00, 14950000.00, 5.00),
	(100, 3, 14950001.00, 16400000.00, 6.00),
	(101, 3, 16400001.00, 18450000.00, 7.00),
	(102, 3, 18450001.00, 21850000.00, 8.00),
	(103, 3, 21850001.00, 26000000.00, 9.00),
	(104, 3, 26000001.00, 27700000.00, 10.00),
	(105, 3, 27700001.00, 29350000.00, 11.00),
	(106, 3, 29350001.00, 31450000.00, 12.00),
	(107, 3, 31450001.00, 33950000.00, 13.00),
	(108, 3, 33950001.00, 37100000.00, 14.00),
	(109, 3, 37100001.00, 41100000.00, 15.00),
	(110, 3, 41100001.00, 45800000.00, 16.00),
	(111, 3, 45800001.00, 49500000.00, 17.00),
	(112, 3, 49500001.00, 53800000.00, 18.00),
	(113, 3, 53800001.00, 58500000.00, 19.00),
	(114, 3, 58500001.00, 64000000.00, 20.00),
	(115, 3, 64000001.00, 71000000.00, 21.00),
	(116, 3, 71000001.00, 80000000.00, 22.00),
	(117, 3, 80000001.00, 93000000.00, 23.00),
	(118, 3, 93000001.00, 109000000.00, 24.00),
	(119, 3, 109000001.00, 129000000.00, 25.00),
	(120, 3, 129000001.00, 163000000.00, 26.00),
	(121, 3, 163000001.00, 211000000.00, 27.00),
	(122, 3, 211000001.00, 374000000.00, 28.00),
	(123, 3, 374000001.00, 459000000.00, 29.00),
	(124, 3, 459000001.00, 555000000.00, 30.00),
	(125, 3, 555000001.00, 704000000.00, 31.00),
	(126, 3, 704000001.00, 957000000.00, 32.00),
	(127, 3, 957000001.00, 1405000000.00, 33.00),
	(128, 3, 1405000001.00, 999999999999.00, 34.00);

-- Dumping structure for table db_payrollid.etr_ptkp
DROP TABLE IF EXISTS `etr_ptkp`;
CREATE TABLE IF NOT EXISTS `etr_ptkp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_etr` int NOT NULL,
  `status` int NOT NULL,
  `tanggungan` int NOT NULL,
  `ptkp` decimal(15,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_payrollid.etr_ptkp: ~1 rows (approximately)
DELETE FROM `etr_ptkp`;
INSERT INTO `etr_ptkp` (`id`, `id_etr`, `status`, `tanggungan`, `ptkp`) VALUES
	(4, 2, 0, 0, 54000000.00),
	(5, 2, 0, 1, 58500000.00),
	(6, 2, 1, 0, 58500000.00),
	(7, 3, 0, 2, 63000000.00),
	(8, 3, 0, 3, 67500000.00),
	(9, 3, 1, 1, 63000000.00),
	(10, 3, 1, 2, 67500000.00),
	(11, 4, 1, 3, 72000000.00);

-- Dumping structure for table db_payrollid.pegawai
DROP TABLE IF EXISTS `pegawai`;
CREATE TABLE IF NOT EXISTS `pegawai` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_pegawai` varchar(128) DEFAULT NULL,
  `tgl_join` date DEFAULT NULL,
  `jabatan` varchar(64) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `tanggungan` tinyint DEFAULT NULL,
  `gaji_pokok` double DEFAULT NULL,
  `npwp` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_payrollid.pegawai: ~0 rows (approximately)
DELETE FROM `pegawai`;
INSERT INTO `pegawai` (`id`, `nama_pegawai`, `tgl_join`, `jabatan`, `status`, `tanggungan`, `gaji_pokok`, `npwp`) VALUES
	(1, 'Karyani', '2025-03-19', '', 0, 0, 21500000, ''),
	(2, 'Karyono', '2025-03-19', '', 1, 2, 10000000, '598764'),
	(3, 'Kartono', '2025-03-19', '', 1, 3, 15000000, '598764');

-- Dumping structure for table db_payrollid.tunjangan
DROP TABLE IF EXISTS `tunjangan`;
CREATE TABLE IF NOT EXISTS `tunjangan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_tunjangan` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `keterangan` text,
  `ptkp` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_payrollid.tunjangan: ~2 rows (approximately)
DELETE FROM `tunjangan`;
INSERT INTO `tunjangan` (`id`, `nama_tunjangan`, `keterangan`, `ptkp`) VALUES
	(1, 'BPJS Kesehatan', '', NULL),
	(2, 'BPJS Ketenagakerjaan', '', NULL),
	(3, 'Astra Life', 'Asuransi Jiwa', NULL),
	(4, 'Tunjangan PPh Ps 21', '', 0);

-- Dumping structure for table db_payrollid.tunjangan_pegawai
DROP TABLE IF EXISTS `tunjangan_pegawai`;
CREATE TABLE IF NOT EXISTS `tunjangan_pegawai` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_pegawai` int DEFAULT NULL,
  `id_tunjangan` int DEFAULT NULL,
  `nominal` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_payrollid.tunjangan_pegawai: ~0 rows (approximately)
DELETE FROM `tunjangan_pegawai`;
INSERT INTO `tunjangan_pegawai` (`id`, `id_pegawai`, `id_tunjangan`, `nominal`) VALUES
	(1, 1, 4, 2603139),
	(2, 2, 4, 152284),
	(3, 3, 4, 1163793);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
