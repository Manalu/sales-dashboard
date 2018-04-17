-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2018 at 02:35 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dashboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` varchar(30) NOT NULL,
  `submit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lid` int(11) DEFAULT NULL,
  `read_flag` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `subject`, `message`, `type`, `submit_time`, `lid`, `read_flag`) VALUES
(8, 'The standard Lorem Ipsum passage, used since the 1500s', '\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"', 'suggestion', '2018-04-03 02:15:47', 2, 1),
(12, 'Thank you for this', 'I\'m very glad to say that I\'m very thankful for this website. It is very useful.', 'suggestion', '2018-04-03 06:18:51', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `upload_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `filetype` varchar(20) NOT NULL,
  `fileformat` varchar(20) NOT NULL,
  `lid` int(11) NOT NULL,
  `default_flag` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `name`, `upload_time`, `filetype`, `fileformat`, `lid`, `default_flag`) VALUES
(139, '1523935851.xlsx', '2018-04-17 09:00:51', 'salesFile', 'xlsx', 2, 1),
(140, '1523939908.xlsx', '2018-04-17 10:08:28', 'salesFile', 'xlsx', 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `lid` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(32) NOT NULL,
  `joined_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`lid`, `username`, `password`, `joined_time`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', '2018-04-02 07:36:41'),
(2, 'john', '527bd5b5d689e2c32ae974c6229ff785', '2018-04-02 07:36:41');

-- --------------------------------------------------------

--
-- Table structure for table `productheads`
--

CREATE TABLE `productheads` (
  `file_id` int(11) NOT NULL,
  `pid` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `category` varchar(30) NOT NULL,
  `subCategory` varchar(30) NOT NULL,
  `salesPrice` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `productheads`
--

INSERT INTO `productheads` (`file_id`, `pid`, `name`, `category`, `subCategory`, `salesPrice`) VALUES
(139, 'Product ID', 'Product Name', 'Category', 'Sub-Category', 'Sales_Price'),
(140, 'Product ID', 'Product Name', 'Category', 'Sub-Category', 'Sales_Price');

-- --------------------------------------------------------

--
-- Table structure for table `salesheads`
--

CREATE TABLE `salesheads` (
  `file_id` int(11) NOT NULL,
  `dateformat` varchar(20) NOT NULL,
  `oid` varchar(30) NOT NULL,
  `pid` varchar(30) NOT NULL,
  `oDate` varchar(30) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `qty` varchar(30) DEFAULT NULL,
  `discount` varchar(30) DEFAULT NULL,
  `pinCode` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `salesheads`
--

INSERT INTO `salesheads` (`file_id`, `dateformat`, `oid`, `pid`, `oDate`, `city`, `state`, `qty`, `discount`, `pinCode`) VALUES
(139, 'Short', 'Order ID', 'Product ID', 'Order Date', 'City', 'State', 'Quantity', 'Discount', 'Postal Code'),
(140, 'Short', 'Order ID', 'Product ID', 'Order Date', 'City', 'State', 'Quantity', 'Discount', 'Postal Code');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `startpage` varchar(20) NOT NULL DEFAULT 'dashboard/upload',
  `currency` varchar(20) NOT NULL DEFAULT 'Rupee',
  `lid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`startpage`, `currency`, `lid`) VALUES
('dashboard', 'Dollar', 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `fname` varchar(30) NOT NULL,
  `lname` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `contact_no` bigint(20) DEFAULT NULL,
  `user_image` varchar(255) NOT NULL DEFAULT 'default.png',
  `lid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`fname`, `lname`, `email`, `contact_no`, `user_image`, `lid`) VALUES
('John', 'Doe', 'admin@dashboard.com', 8888888888, 'default.png', 1),
('John', 'Doe', 'john@dashboard.com', 8888888888, 'default.png', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`lid`);

--
-- Indexes for table `productheads`
--
ALTER TABLE `productheads`
  ADD PRIMARY KEY (`file_id`);

--
-- Indexes for table `salesheads`
--
ALTER TABLE `salesheads`
  ADD PRIMARY KEY (`file_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`lid`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`lid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `lid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
