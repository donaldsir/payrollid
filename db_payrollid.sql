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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table db_payrollid.etr: ~1 rows (approximately)
DELETE FROM `etr`;
INSERT INTO `etr` (`id`, `nama_etr`, `keterangan`) VALUES
	(1, 'TER A', '');

-- Dumping structure for table db_payrollid.etr_bruto
DROP TABLE IF EXISTS `etr_bruto`;
CREATE TABLE IF NOT EXISTS `etr_bruto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_etr` int NOT NULL,
  `minimum` double DEFAULT '0',
  `maksimum` double DEFAULT '0',
  `persentasi` double DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table db_payrollid.etr_bruto: ~2 rows (approximately)
DELETE FROM `etr_bruto`;
INSERT INTO `etr_bruto` (`id`, `id_etr`, `minimum`, `maksimum`, `persentasi`) VALUES
	(1, 1, 0, 5400000, 0),
	(2, 1, 5400001, 5650000, 0.25);

-- Dumping structure for table db_payrollid.etr_ptkp
DROP TABLE IF EXISTS `etr_ptkp`;
CREATE TABLE IF NOT EXISTS `etr_ptkp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_etr` int NOT NULL,
  `status` tinyint DEFAULT NULL,
  `tanggungan` tinyint DEFAULT NULL,
  `ptkp` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table db_payrollid.etr_ptkp: ~3 rows (approximately)
DELETE FROM `etr_ptkp`;
INSERT INTO `etr_ptkp` (`id`, `id_etr`, `status`, `tanggungan`, `ptkp`) VALUES
	(1, 1, 0, 0, 54000000),
	(2, 1, 0, 1, 58500000),
	(3, 1, 0, 0, 58500000);

-- Dumping structure for table db_payrollid.tunjangan
DROP TABLE IF EXISTS `tunjangan`;
CREATE TABLE IF NOT EXISTS `tunjangan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_tunjangan` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `keterangan` text,
  `aktif` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table db_payrollid.tunjangan: ~0 rows (approximately)
DELETE FROM `tunjangan`;
INSERT INTO `tunjangan` (`id`, `nama_tunjangan`, `keterangan`, `aktif`) VALUES
	(1, 'BPJS Kesehatan', '', 1),
	(2, 'BPJS Ketenagakerjaan', '', 1),
	(3, 'Astra Life', 'Asuransi Jiwa', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
