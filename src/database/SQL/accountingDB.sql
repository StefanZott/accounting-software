-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: rdbms.strato.de:3306
-- Erstellungszeit: 03. Nov 2020 um 14:10
-- Server-Version: 5.6.42-log
-- PHP-Version: 7.2.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `DB4338140`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `loginData`
--

CREATE TABLE `loginData` (
  `loginID` int(11) NOT NULL,
  `username` varchar(64) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `place`
--

CREATE TABLE `place` (
  `postcode` int(11) NOT NULL,
  `place` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `loginID` int(11) NOT NULL,
  `firstname` varchar(64) DEFAULT NULL,
  `lastname` varchar(64) DEFAULT NULL,
  `street` varchar(64) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `phonenumber` int(11) DEFAULT NULL,
  `postcode` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `loginData`
--
ALTER TABLE `loginData`
  ADD PRIMARY KEY (`loginID`),
  ADD UNIQUE KEY `loginID_UNIQUE` (`loginID`);

--
-- Indizes für die Tabelle `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`postcode`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `iduser_UNIQUE` (`userID`),
  ADD KEY `loginID_idx` (`loginID`),
  ADD KEY `postcode_idx` (`postcode`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `loginData`
--
ALTER TABLE `loginData`
  MODIFY `loginID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `loginID` FOREIGN KEY (`loginID`) REFERENCES `loginData` (`loginID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `postcode` FOREIGN KEY (`postcode`) REFERENCES `place` (`postcode`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
