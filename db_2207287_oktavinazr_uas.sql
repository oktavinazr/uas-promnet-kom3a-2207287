-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 08 Jan 2024 pada 13.50
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2207287_oktavinazr_uas`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `inventory_oktavinazr`
--

CREATE TABLE `inventory_oktavinazr` (
  `id` int(11) NOT NULL,
  `nama_barang` varchar(80) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga_satuan` int(11) NOT NULL,
  `lokasi` varchar(80) NOT NULL,
  `deskripsi` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `inventory_oktavinazr`
--

INSERT INTO `inventory_oktavinazr` (`id`, `nama_barang`, `jumlah`, `harga_satuan`, `lokasi`, `deskripsi`) VALUES
(1, 'Laptop', 5, 7500000, 'Bandung', 'Alat Komunikasi'),
(4, 'Lemari', 3, 1500000, 'Jakarta', 'Tempat Pakaian'),
(10, 'Mukena', 5, 110000, 'Manokwari', 'Alat Ibadah'),
(22, 'Botol', 2, 35000, 'Bandung', 'Tempat Minum'),
(23, 'Tripod', 3, 65000, 'Jakarta', 'Alat Fotografi'),
(24, 'Helm', 8, 200000, 'Denpasar', 'Pelindung Berkendara Motor');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `inventory_oktavinazr`
--
ALTER TABLE `inventory_oktavinazr`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `inventory_oktavinazr`
--
ALTER TABLE `inventory_oktavinazr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
