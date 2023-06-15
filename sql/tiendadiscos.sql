-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-06-2023 a las 17:36:08
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tiendadiscos`
--
CREATE DATABASE IF NOT EXISTS `tiendadiscos` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tiendadiscos`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idcategoria` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idcategoria`, `nombre`, `descripcion`, `imagen`) VALUES
(22, 'Pop', 'El pop es un género musical que se originó en la década de 1950. Es conocido por su estilo melódico, accesible y pegadizo.', ''),
(23, 'Flamenco', 'El flamenco es un género artístico que tiene sus raíces en Andalucía. Es una expresión artística que combina música, cante, baile y a veces también el toque de la guitarra flamenca.', ''),
(24, 'Rock', 'El rock es un género musical que se originó en la década de 1950. Se caracteriza por su sonido enérgico, basado en la guitarra eléctrica, los ritmos fuertes y la presencia de una sección rítmica potente que incluye bajo y batería.', ''),
(25, 'Clásica', 'La música clásica, se refiere a un estilo musical que se desarrolló desde el período medieval hasta el siglo XX.  Se caracteriza por su complejidad, sofisticación y atención al detalle', ''),
(26, 'Latina', 'La música latina engloba una amplia variedad de géneros y estilos musicales provenientes de países de habla hispana y se caracteriza por sus ritmos bailables y pegajosos.', ''),
(27, 'Dance y electrónica', 'La música dance y electrónica es un género musical que se caracteriza por su ritmo enérgico, pulsante y bailable, creado principalmente a través de la utilización de instrumentos electrónicos y sintetizadores. ', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `linea`
--

CREATE TABLE `linea` (
  `idlinea` int(100) NOT NULL,
  `idproducto` int(100) NOT NULL,
  `idticket` int(100) NOT NULL,
  `unidades` int(255) NOT NULL,
  `preciounitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idproducto` int(100) NOT NULL,
  `idcategoria` int(100) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `artistas` varchar(255) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `precio` int(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idproducto`, `idcategoria`, `nombre`, `descripcion`, `artistas`, `imagen`, `precio`) VALUES
(24, 26, 'Un verano sin ti', 'Las canciones de Un verano sin ti exploran temas como el amor, el desamor, la soledad y las experiencias personales del artista.', 'Bad Bunny', '', 18),
(25, 26, 'Mañana será bonito', 'Con mezclas de reggaeton y otros ritmos, es un álbum sensual y melancólico. Las letras son generalmente de una lujuria embriagante y de anhelo frustrado.', 'Karol G', '', 16),
(26, 26, 'La sandunguera', 'Un EP de seis cortes que mezcla influencias soul o funk con una profunda raíz latina.', 'Nathy Peluso', '', 9),
(27, 22, 'Sanz', 'El artista madrileño nos brinda la oportunidad de encontrar 10 temas en los que vuelve a los orígenes de su música, íntima y sin artificios.', 'Alejandro Sanz', '', 17),
(28, 22, 'Vivo para contarlo', 'Con un sonido excepcional, el repertorio hace un repaso por las mejores canciones de sus tres primeros álbumes de estudio, en el que no podían faltar grandes éxitos', 'Fito y Fitipaldis', '', 33);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket`
--

CREATE TABLE `ticket` (
  `idticket` int(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fecha` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `iban` varchar(24) NOT NULL,
  `tipo` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`email`, `password`, `nombre`, `apellidos`, `direccion`, `telefono`, `iban`, `tipo`) VALUES
('jose@gmail.com', '$2y$10$vzaXFAe7VsfaLRmdeEQ.fuvzp2t5Fqblyw0frolgd031vNvGHP1ou', 'Jose', 'Garrido', 'Ramón y Cajal 50', '654698698', 'ES2012341234123412341234', 'U'),
('juliarl@gmail.com', '$2y$10$/61a5j19.52.HVdLSS9qVuuLpZb5hZS4YUB98qVX2/dmErJFBX1XO', 'Julia', 'Rodriguez', 'Avda. España 22', '65465465', 'ES3012341234123412341234', 'A');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idcategoria`);

--
-- Indices de la tabla `linea`
--
ALTER TABLE `linea`
  ADD PRIMARY KEY (`idlinea`),
  ADD KEY `fk_producto` (`idproducto`),
  ADD KEY `fk_ticket` (`idticket`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idproducto`),
  ADD KEY `fk_categoria` (`idcategoria`);

--
-- Indices de la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`idticket`),
  ADD KEY `fk_usuario` (`email`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idcategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `linea`
--
ALTER TABLE `linea`
  MODIFY `idlinea` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idproducto` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `ticket`
--
ALTER TABLE `ticket`
  MODIFY `idticket` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `linea`
--
ALTER TABLE `linea`
  ADD CONSTRAINT `fk_producto` FOREIGN KEY (`idproducto`) REFERENCES `producto` (`idproducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ticket` FOREIGN KEY (`idticket`) REFERENCES `ticket` (`idticket`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`idcategoria`) REFERENCES `categoria` (`idcategoria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
