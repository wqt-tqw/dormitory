/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50022
 Source Host           : localhost:3306
 Source Schema         : dormitory

 Target Server Type    : MySQL
 Target Server Version : 50022
 File Encoding         : 65001

 Date: 14/08/2023 16:54:32
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '帐号',
  `password` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', 'admin');

-- ----------------------------
-- Table structure for bed
-- ----------------------------
DROP TABLE IF EXISTS `bed`;
CREATE TABLE `bed`  (
  `bedId` int(11) NOT NULL AUTO_INCREMENT COMMENT '床位id',
  `bedNo` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '2' COMMENT '床位号',
  `whetherPeople` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '2' COMMENT '是否住人 1住人 2没有住人',
  `roomId` int(11) NULL DEFAULT NULL COMMENT '房间id',
  `dormitoryAdminId` int(11) NULL DEFAULT NULL COMMENT '宿舍管理id',
  PRIMARY KEY USING BTREE (`bedId`),
  INDEX `roomId` USING BTREE(`roomId`),
  INDEX `dormitoryAdminId` USING BTREE(`dormitoryAdminId`),
  CONSTRAINT `bed_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `room` (`roomId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `bed_ibfk_2` FOREIGN KEY (`dormitoryAdminId`) REFERENCES `dormitoryadmin` (`dormitoryAdminId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'InnoDB free: 3072 kB; (`roomId`) REFER `dormitory/room`(`roomId`); (`dormitoryAd' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of bed
-- ----------------------------
INSERT INTO `bed` VALUES (1, '1', '2', 1, 1);
INSERT INTO `bed` VALUES (2, '2', '2', 1, 1);
INSERT INTO `bed` VALUES (3, '4', '2', 1, 1);
INSERT INTO `bed` VALUES (4, '5', '1', 1, 1);
INSERT INTO `bed` VALUES (5, '6', '2', 1, 1);
INSERT INTO `bed` VALUES (6, '3', '1', 3, 1);

-- ----------------------------
-- Table structure for bedallocation
-- ----------------------------
DROP TABLE IF EXISTS `bedallocation`;
CREATE TABLE `bedallocation`  (
  `bedAllocationId` int(11) NOT NULL AUTO_INCREMENT COMMENT '分配id',
  `allocationTime` datetime NULL DEFAULT NULL COMMENT '分配时间',
  `bedId` int(11) NULL DEFAULT NULL COMMENT '床位id',
  `stuNo` int(11) NULL DEFAULT NULL COMMENT '学号',
  `dormitoryAdminId` int(11) NULL DEFAULT NULL COMMENT '宿舍管理员',
  PRIMARY KEY USING BTREE (`bedAllocationId`),
  INDEX `bedId` USING BTREE(`bedId`),
  INDEX `stuNo` USING BTREE(`stuNo`),
  INDEX `dormitoryAdminId` USING BTREE(`dormitoryAdminId`),
  CONSTRAINT `bedallocation_ibfk_1` FOREIGN KEY (`bedId`) REFERENCES `bed` (`bedId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `bedallocation_ibfk_2` FOREIGN KEY (`stuNo`) REFERENCES `student` (`stuNo`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `bedallocation_ibfk_3` FOREIGN KEY (`dormitoryAdminId`) REFERENCES `dormitoryadmin` (`dormitoryAdminId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'InnoDB free: 3072 kB; (`bedId`) REFER `dormitory/bed`(`bedId`); (`stuNo`) REFER ' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of bedallocation
-- ----------------------------
INSERT INTO `bedallocation` VALUES (3, '2021-12-05 15:35:27', 4, 18001, 1);
INSERT INTO `bedallocation` VALUES (5, '2021-12-11 18:21:08', 6, 18005, 1);

-- ----------------------------
-- Table structure for chatlog
-- ----------------------------
DROP TABLE IF EXISTS `chatlog`;
CREATE TABLE `chatlog`  (
  `chat_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `chat_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '聊天内容',
  `chat_datetime` datetime NULL DEFAULT NULL COMMENT '聊天时间',
  `role` int(11) NULL DEFAULT NULL COMMENT '角色',
  `role_user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY USING BTREE (`chat_log_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of chatlog
-- ----------------------------
INSERT INTO `chatlog` VALUES (1, '测试', '2023-07-25 16:51:45', 1, 'admin');
INSERT INTO `chatlog` VALUES (2, '我来了', '2023-07-25 16:53:37', 1, 'admin');
INSERT INTO `chatlog` VALUES (3, '我哈哈哈', '2023-07-25 16:55:08', 1, 'admin');
INSERT INTO `chatlog` VALUES (4, '我的开发商', '2023-07-25 16:57:24', 1, 'admin');
INSERT INTO `chatlog` VALUES (5, '秦时升明月', '2023-07-25 17:01:17', 4, '18002');
INSERT INTO `chatlog` VALUES (6, '接呀', '2023-07-25 17:51:00', 4, '18002');
INSERT INTO `chatlog` VALUES (7, '快', '2023-07-25 17:51:42', 4, '18002');
INSERT INTO `chatlog` VALUES (8, '？', '2023-07-25 17:52:41', 4, '18002');
INSERT INTO `chatlog` VALUES (9, '我来接', '2023-07-25 17:53:48', 4, '18001');
INSERT INTO `chatlog` VALUES (10, '天行颂九歌', '2023-07-25 17:54:03', 4, '18001');
INSERT INTO `chatlog` VALUES (11, '可以', '2023-07-25 17:54:53', 1, 'admin');
INSERT INTO `chatlog` VALUES (12, 'nice', '2023-07-25 17:55:22', 4, '18001');
INSERT INTO `chatlog` VALUES (13, '试试', '2023-07-25 18:00:11', 1, 'admin');
INSERT INTO `chatlog` VALUES (14, '测试', '2023-07-25 18:01:41', 1, 'admin');
INSERT INTO `chatlog` VALUES (15, '？', '2023-07-25 18:01:56', 1, 'admin');
INSERT INTO `chatlog` VALUES (16, '可以呀', '2023-07-25 18:13:54', 4, '18002');
INSERT INTO `chatlog` VALUES (17, 'nice', '2023-07-25 18:14:24', 4, '18002');
INSERT INTO `chatlog` VALUES (18, '1', '2023-07-25 18:22:04', 1, 'admin');
INSERT INTO `chatlog` VALUES (19, '?', '2023-07-25 18:23:13', 1, 'admin');
INSERT INTO `chatlog` VALUES (20, '在试试。', '2023-07-25 18:39:44', 4, '18001');
INSERT INTO `chatlog` VALUES (21, '？', '2023-07-25 18:39:50', 4, '18001');

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `classId` int(11) NOT NULL AUTO_INCREMENT,
  `className` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '班级名称',
  `collegeId` int(11) NULL DEFAULT NULL COMMENT '学院Id',
  PRIMARY KEY USING BTREE (`classId`),
  INDEX `collegeId` USING BTREE(`collegeId`),
  CONSTRAINT `class_ibfk_1` FOREIGN KEY (`collegeId`) REFERENCES `college` (`collegeId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'InnoDB free: 3072 kB; (`collegeId`) REFER `dormitory/college`(`collegeId`)' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES (1, '计信182', 1);
INSERT INTO `class` VALUES (2, '计信181', 1);
INSERT INTO `class` VALUES (3, '软件182', 1);
INSERT INTO `class` VALUES (4, '物网181', 1);
INSERT INTO `class` VALUES (5, '视光183', 2);
INSERT INTO `class` VALUES (6, '电子商务182', 3);
INSERT INTO `class` VALUES (7, '有机化学193', 4);
INSERT INTO `class` VALUES (9, '中医201', 7);
INSERT INTO `class` VALUES (10, '陶瓷202', 6);
INSERT INTO `class` VALUES (11, '服装设计195', 6);
INSERT INTO `class` VALUES (12, '国贸211', 3);

-- ----------------------------
-- Table structure for college
-- ----------------------------
DROP TABLE IF EXISTS `college`;
CREATE TABLE `college`  (
  `collegeId` int(11) NOT NULL AUTO_INCREMENT,
  `collegeName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '学院名称',
  PRIMARY KEY USING BTREE (`collegeId`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of college
-- ----------------------------
INSERT INTO `college` VALUES (1, '电子信息学院');
INSERT INTO `college` VALUES (2, '机电工程学院');
INSERT INTO `college` VALUES (3, '经管学院');
INSERT INTO `college` VALUES (4, '化学学院');
INSERT INTO `college` VALUES (5, '物理学院');
INSERT INTO `college` VALUES (6, '艺术学院');
INSERT INTO `college` VALUES (7, '医学院');

-- ----------------------------
-- Table structure for dormitory
-- ----------------------------
DROP TABLE IF EXISTS `dormitory`;
CREATE TABLE `dormitory`  (
  `dormitoryId` int(11) NOT NULL AUTO_INCREMENT COMMENT '宿舍楼id',
  `dormitoryName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '宿舍楼名称',
  `location` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所在位置',
  `areaName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所在区域名称',
  `image` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片',
  PRIMARY KEY USING BTREE (`dormitoryId`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of dormitory
-- ----------------------------
INSERT INTO `dormitory` VALUES (1, '毕业班宿舍楼A', '校园北校区', '校园北校区', '26');
INSERT INTO `dormitory` VALUES (2, '毕业班宿舍楼B', '校园南校区', '校园南校区', NULL);
INSERT INTO `dormitory` VALUES (3, '毕业班宿舍楼C', '校区', '北校区', NULL);
INSERT INTO `dormitory` VALUES (4, '毕业班宿舍楼D', '学校北', '学校北1', '27');

-- ----------------------------
-- Table structure for dormitoryadmin
-- ----------------------------
DROP TABLE IF EXISTS `dormitoryadmin`;
CREATE TABLE `dormitoryadmin`  (
  `dormitoryAdminId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '账号',
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `password` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '000000' COMMENT '密码',
  `introduce` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '介绍',
  `dormitoryId` int(11) NULL DEFAULT NULL COMMENT '宿舍楼ID',
  PRIMARY KEY USING BTREE (`dormitoryAdminId`),
  INDEX `dormitoryId` USING BTREE(`dormitoryId`),
  CONSTRAINT `dormitoryadmin_ibfk_1` FOREIGN KEY (`dormitoryId`) REFERENCES `dormitory` (`dormitoryId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'InnoDB free: 3072 kB; (`dormitoryId`) REFER `dormitory/dormitory`(`dormitoryId`)' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of dormitoryadmin
-- ----------------------------
INSERT INTO `dormitoryadmin` VALUES (1, '王阿姨', 'A0001', '111', '物业公司 学校专职', 1);
INSERT INTO `dormitoryadmin` VALUES (2, '李大爷', 'B0001', '222', '大爱是 而非', 2);
INSERT INTO `dormitoryadmin` VALUES (3, '刘大爷', 'C0001', '333', NULL, 3);
INSERT INTO `dormitoryadmin` VALUES (4, '赵大爷', 'D001', '000000', '介绍', 4);

-- ----------------------------
-- Table structure for dormitoryhygiene
-- ----------------------------
DROP TABLE IF EXISTS `dormitoryhygiene`;
CREATE TABLE `dormitoryhygiene`  (
  `hygieneId` int(11) NOT NULL AUTO_INCREMENT COMMENT '宿舍卫生id',
  `compareTime` datetime NULL DEFAULT NULL COMMENT '评比时间',
  `semester` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '学期',
  `weekTimes` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '周次',
  `roomId` int(11) NULL DEFAULT NULL COMMENT '房间id',
  `safetyPerformance` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '安全成绩',
  `healthPerformance` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '卫生成绩',
  `avgPerformance` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '平均成绩',
  `dormitoryadminId` int(11) NULL DEFAULT NULL COMMENT '宿舍管理员id',
  PRIMARY KEY USING BTREE (`hygieneId`),
  INDEX `roomId` USING BTREE(`roomId`),
  INDEX `dormitoryadminId` USING BTREE(`dormitoryadminId`),
  CONSTRAINT `dormitoryhygiene_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `room` (`roomId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `dormitoryhygiene_ibfk_2` FOREIGN KEY (`dormitoryadminId`) REFERENCES `dormitoryadmin` (`dormitoryAdminId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'InnoDB free: 3072 kB; (`roomId`) REFER `dormitory/room`(`roomId`); (`dormitoryad' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of dormitoryhygiene
-- ----------------------------
INSERT INTO `dormitoryhygiene` VALUES (1, '2021-12-05 20:35:09', '2019-2020-1', '15', 1, '60', '80', '70', 1);
INSERT INTO `dormitoryhygiene` VALUES (2, '2021-12-12 08:41:05', '2019-2020-2', '2', 3, '70', '90', '80', 1);
INSERT INTO `dormitoryhygiene` VALUES (3, '2021-12-12 08:46:17', '2020-2021-1', '3', 3, '60', '82', '71', 1);

-- ----------------------------
-- Table structure for dormitorypayment
-- ----------------------------
DROP TABLE IF EXISTS `dormitorypayment`;
CREATE TABLE `dormitorypayment`  (
  `dormitoryPaymentId` int(11) NOT NULL AUTO_INCREMENT COMMENT '交费id',
  `paymentTime` datetime NULL DEFAULT NULL COMMENT '交费时间',
  `paymentSemester` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '交费学期',
  `paymentMoney` int(4) NULL DEFAULT NULL COMMENT '交费金额',
  `stuNo` int(11) NULL DEFAULT NULL COMMENT '学号',
  `dormitoryadminId` int(11) NULL DEFAULT NULL COMMENT '宿舍管理员id',
  PRIMARY KEY USING BTREE (`dormitoryPaymentId`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of dormitorypayment
-- ----------------------------
INSERT INTO `dormitorypayment` VALUES (1, '2021-12-05 19:53:43', '2020-2021-2', 800, 18002, 1);
INSERT INTO `dormitorypayment` VALUES (3, '2021-12-12 09:14:18', '2020-2021-1', 600, 18001, 1);

-- ----------------------------
-- Table structure for enclosure
-- ----------------------------
DROP TABLE IF EXISTS `enclosure`;
CREATE TABLE `enclosure`  (
  `enclosureId` int(11) NOT NULL AUTO_INCREMENT COMMENT '附件id',
  `enclosureName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '附件名',
  `enclosureUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '附件地址',
  PRIMARY KEY USING BTREE (`enclosureId`)
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of enclosure
-- ----------------------------
INSERT INTO `enclosure` VALUES (1, '排骨教主.jpg', 'http://localhost:3000/uploads/stu1/排骨教主.jpg');
INSERT INTO `enclosure` VALUES (2, '微信图片_20210518081804.png', 'http://localhost:3000/uploads/stu1/微信图片_20210518081804.png');
INSERT INTO `enclosure` VALUES (3, '微信图片_20210518081804.png', 'http://localhost:3000/uploads/stu1/微信图片_20210518081804.png');
INSERT INTO `enclosure` VALUES (4, '排骨教主.jpg', 'http://localhost:3000/uploads/stu1/排骨教主.jpg');
INSERT INTO `enclosure` VALUES (5, '排骨教主.jpg', 'http://localhost:3000/uploads/stu1/排骨教主.jpg');
INSERT INTO `enclosure` VALUES (6, '排骨教主.jpg', 'http://localhost:3000/uploads/stu1/排骨教主.jpg');
INSERT INTO `enclosure` VALUES (7, '微信图片_20210518081804.png', 'http://localhost:3000/uploads/stu1/微信图片_20210518081804.png');
INSERT INTO `enclosure` VALUES (8, '排骨教主.jpg', 'http://localhost:3000/uploads/stu1/排骨教主.jpg');
INSERT INTO `enclosure` VALUES (9, '排骨教主.jpg', 'http://localhost:3000/uploads/stu1/排骨教主.jpg');
INSERT INTO `enclosure` VALUES (10, '微信图片_20210518081804.png', 'http://localhost:3000/uploads/stu1/微信图片_20210518081804.png');
INSERT INTO `enclosure` VALUES (11, '21.jpg', 'http://localhost:3000/uploads/stu1/21.jpg');
INSERT INTO `enclosure` VALUES (12, '21.jpg', 'http://localhost:3000/uploads/stu1/21.jpg');
INSERT INTO `enclosure` VALUES (13, '22.jpg', 'http://localhost:3000/uploads/stu1/22.jpg');
INSERT INTO `enclosure` VALUES (14, '1.jpg', 'http://localhost:3000/uploads/stu1/1.jpg');
INSERT INTO `enclosure` VALUES (15, '代码.txt', 'http://localhost:3000/uploads/stu1/代码.txt');
INSERT INTO `enclosure` VALUES (16, '微信图片_20210518081804.png', 'http://localhost:3000/uploads/stu1/微信图片_20210518081804.png');
INSERT INTO `enclosure` VALUES (17, '排骨教主.jpg', 'http://localhost:3000/uploads/stu1/排骨教主.jpg');
INSERT INTO `enclosure` VALUES (18, '微信图片_20210518081804.png', 'http://localhost:3000/uploads/stu1/微信图片_20210518081804.png');
INSERT INTO `enclosure` VALUES (19, '日报.txt', 'http://localhost:3000/uploads/stu1/日报.txt');
INSERT INTO `enclosure` VALUES (20, '日报.txt', 'http://localhost:3000/uploads/stu1/日报.txt');
INSERT INTO `enclosure` VALUES (21, '微信图片_20210518081804.png', 'http://localhost:3000/uploads/stu1/微信图片_20210518081804.png');
INSERT INTO `enclosure` VALUES (22, '日报.txt', 'http://localhost:3000/uploads/stu1/日报.txt');
INSERT INTO `enclosure` VALUES (23, '日报.txt', 'http://localhost:3000/uploads/stu1/日报.txt');
INSERT INTO `enclosure` VALUES (24, '微信图片_20210518081804.png', 'http://localhost:3000/uploads/stu1/微信图片_20210518081804.png');
INSERT INTO `enclosure` VALUES (25, '排骨教主.jpg', 'http://localhost:3000/uploads/stu1/排骨教主.jpg');
INSERT INTO `enclosure` VALUES (26, '排骨教主.jpg', 'http://localhost:3000/uploads/dormitory/排骨教主.jpg');
INSERT INTO `enclosure` VALUES (27, '微信图片_20210518081804.png', 'http://localhost:3000/uploads/dormitory/微信图片_20210518081804.png');
INSERT INTO `enclosure` VALUES (28, '排骨教主.jpg', 'http://localhost:3000/uploads/stu/排骨教主.jpg');

-- ----------------------------
-- Table structure for informationreply
-- ----------------------------
DROP TABLE IF EXISTS `informationreply`;
CREATE TABLE `informationreply`  (
  `replyId` int(11) NOT NULL AUTO_INCREMENT COMMENT '回复编号',
  `themeId` int(11) NULL DEFAULT NULL COMMENT '主题编号',
  `replyContent` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '回复内容',
  `stuNo` int(6) NULL DEFAULT NULL COMMENT '回复人',
  `replyTime` datetime NULL DEFAULT NULL COMMENT '回复时间',
  PRIMARY KEY USING BTREE (`replyId`),
  INDEX `themeId` USING BTREE(`themeId`),
  INDEX `stuNo` USING BTREE(`stuNo`),
  CONSTRAINT `informationreply_ibfk_1` FOREIGN KEY (`themeId`) REFERENCES `messageinformation` (`themeId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `informationreply_ibfk_2` FOREIGN KEY (`stuNo`) REFERENCES `student` (`stuNo`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'InnoDB free: 3072 kB; (`themeId`) REFER `dormitory/messageinformation`(`themeId`' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of informationreply
-- ----------------------------
INSERT INTO `informationreply` VALUES (1, 1, '还行', 18002, '2021-12-19 11:06:04');
INSERT INTO `informationreply` VALUES (2, 1, '萨乌尔会我觉得', 18001, '2021-12-19 18:06:24');
INSERT INTO `informationreply` VALUES (4, 1, '哈哈哈', 18002, '2021-12-19 18:21:43');

-- ----------------------------
-- Table structure for instructor
-- ----------------------------
DROP TABLE IF EXISTS `instructor`;
CREATE TABLE `instructor`  (
  `instructorId` int(11) NOT NULL AUTO_INCREMENT,
  `instructorName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '辅导员姓名',
  `introduce` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '介绍',
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '账号',
  `password` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'fudaoyuan' COMMENT '密码',
  `collegeId` int(11) NULL DEFAULT NULL COMMENT '学院id',
  PRIMARY KEY USING BTREE (`instructorId`),
  INDEX `collegeId` USING BTREE(`collegeId`),
  CONSTRAINT `instructor_ibfk_1` FOREIGN KEY (`collegeId`) REFERENCES `college` (`collegeId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'InnoDB free: 3072 kB; (`collegeId`) REFER `dormitory/college`(`collegeId`)' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of instructor
-- ----------------------------
INSERT INTO `instructor` VALUES (1, '刘主任', '管理学院主任', 'fdy001', '00000', 2);
INSERT INTO `instructor` VALUES (2, '孙博士', '自然科学博士  人文博士', 'fdy002', 'fudaoyuan', 3);
INSERT INTO `instructor` VALUES (4, '王辅导员', '辅导员介绍', 'fdy0045', 'fudaoyuan', 1);

-- ----------------------------
-- Table structure for messageinformation
-- ----------------------------
DROP TABLE IF EXISTS `messageinformation`;
CREATE TABLE `messageinformation`  (
  `themeId` int(11) NOT NULL AUTO_INCREMENT COMMENT '主题编号',
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '内容',
  `stuNo` int(6) NULL DEFAULT NULL COMMENT '留言人',
  `messageTime` datetime NULL DEFAULT NULL COMMENT '留言时间',
  PRIMARY KEY USING BTREE (`themeId`),
  INDEX `stuNo` USING BTREE(`stuNo`),
  CONSTRAINT `messageinformation_ibfk_1` FOREIGN KEY (`stuNo`) REFERENCES `student` (`stuNo`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'InnoDB free: 3072 kB; (`stuNo`) REFER `dormitory/student`(`stuNo`)' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of messageinformation
-- ----------------------------
INSERT INTO `messageinformation` VALUES (1, '食堂饭怎么样', '哈哈哈', 18001, '2021-12-19 09:12:22');

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `noticeId` int(11) NOT NULL AUTO_INCREMENT COMMENT '公告id',
  `noticeTheme` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '公告主题',
  `noticeContent` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '公告内容',
  `noticeTime` datetime NULL DEFAULT NULL COMMENT '公告时间',
  PRIMARY KEY USING BTREE (`noticeId`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (1, '动车组的座位分种', '现在开通的动车组都是软座,一等车是每排4座，一边各2座，座位间宽敞舒适，座椅向后放倒角度大，躺卧很舒服,二等车是每排5座，一边2座一边3座，座位间距离较一等车小，座椅向后放倒角度也小，大约45度，躺卧不如一等车舒服。 \r\n现在公布的票价，是铁道部按照原国家计委在1997年制定的相关票价政策。中长途区间二等车，一般按新空调旅客列车硬卧下铺票价执行，一等车可在此基础上加25％。已公布的各动车组票价，实际上是最高上限。执行中，各铁路局可根据不同季节、不同区段、不同时间，视市场情况执行打折票价。', '2021-11-28 14:47:50');
INSERT INTO `notice` VALUES (2, '胎记是怎么产生的?', '何为胎记？ \n胎记在医学上称为「母斑」或「痣」，是皮肤组织在发育时异常的增生，在皮肤表面出现形状和颜色的异常。胎记可以在出生时发现，也可能在初生几个月后才慢慢浮现。胎记一般可分为色素型及血管型，常见的色素型包括太田母斑、先天黑色素母斑、咖啡牛奶斑等，血管型则包括葡萄酒色斑、草莓样血管瘤等。 \n胎记颜色的简易自我诊断 \n·黑色胎记：黑色素细胞痣、先天毛发性黑色素母斑、兽皮样黑痣、斑痣 \n·青色胎记：蒙古斑、太田母斑、伊藤母斑、青色母斑 \n·褐色胎记：咖啡牛奶斑、贝克氏母斑 \n·红色胎记：葡萄酒色斑、焰色痣、草莓样血管瘤 \n·紫色胎记：皮肤静脉瘤、海绵样血管瘤 \n·肤色胎记：表皮母斑、 皮脂母斑、结缔组织痣 \n\n胎记的发生率 \n新生儿的胎记发生率约为10%，可以说是非常普遍，大部分的胎记只是影响美观，不需要特别处理。但是有些胎记会合并身体器官的异常，甚至有恶性变化的可能，必须积极治疗。例如有些海绵样的血管瘤增生过快，会造成肢体残缺，不只外观不好看，还造成功能障碍。甚至血管瘤扩张速度太快时，会形成组织坏死，过度消耗血小板而使凝血机能低下，出血不止。有些长了毛的兽皮样黑痣，可能日后发生恶性黑色素瘤的癌变，癌细胞转移后导致死亡。 \n\n脸部胎记需要积极处理 \n有人打趣说，身上有胎记的人，一旦成了失踪人囗，找到的机率较高，不过，胎记若长在脸上、手脚上等明显部位，就今人困扰不已，有人为此每天画浓妆掩饰，也有人因此自卑，在社交上却步不前。长在脸部的明显胎记，容易受到他人异样的眼光，会使患者心理上受到很大的打击；特别是小孩，更容易在成长的过程产生自卑或自闭的倾向。根据欧美各国的研究，脸部的胎记，会影响小朋友的心理发育，变成日后的人格问题。所以在英国、加拿大、日本，都已经立法以保险给付方式，免费协助学童去除颜面胎记，以免以后需要更大的工夫来心理矫正。去年暑假在文山区举办过义诊服务，治疗了17位小朋友；发现脸上的烙印，确实已经造成他们成长的负担。有一个畏缩的小女孩，因为脸颊上的毛发性黑色素母斑，从小就拒绝拍照，也失去小女生照镜子的乐趣。小酷哥常常与同学发生冲突打架，原因是脸上的葡萄酒色斑，一运动就充血变红，害他被叫红面鸭…。小男生右脸的浏海几乎要盖住眼睛，严重影响视线，只因为他要遮住在眼皮上、像是贱狗的黑色胎记。但是也有2个小朋友，以自己脸上的胎记为荣，认为是天生的好记号，只是因为家长要求才来去除。 \n激光除刺青会不会痛？这是每一位小朋友及家长治疗前都会不安的询问，其实激光很痛，照射的灼热感觉很像橡皮筋弹到或腊油烧灼，过程都需要家长的安慰和坚忍的毅力来克服。全身麻醉虽然能减轻疼痛，但是会增加治疗的风险，目前并不建议。贴上局部麻醉贴布、或是使用低温冷却系统，都可以减轻小朋友痛楚。虽然激光打在皮肤上有些疼痛，但是能洗去先天的烙印，还是值得的。', '2021-11-28 18:35:54');
INSERT INTO `notice` VALUES (3, '胎记是怎么产生的?胎记是怎么产生的?胎记是怎么产生的?', '胎记是怎么产生的?胎记是怎么产生的?', NULL);
INSERT INTO `notice` VALUES (4, '问候日我和胎记是怎么产生的?胎记是怎么产生的?', '胎记是怎么产生的?', NULL);

-- ----------------------------
-- Table structure for outsiders
-- ----------------------------
DROP TABLE IF EXISTS `outsiders`;
CREATE TABLE `outsiders`  (
  `guestId` int(11) NOT NULL AUTO_INCREMENT COMMENT '登记id',
  `guestName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '来宾名称',
  `guestTime` datetime NULL DEFAULT NULL COMMENT '到访时间',
  `guestContent` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '事情内容',
  `roomId` int(11) NULL DEFAULT NULL COMMENT '房间id',
  `dormitoryAdminId` int(11) NULL DEFAULT NULL COMMENT '宿舍管理员id',
  PRIMARY KEY USING BTREE (`guestId`),
  INDEX `roomId` USING BTREE(`roomId`),
  INDEX `dormitoryAdminId` USING BTREE(`dormitoryAdminId`),
  CONSTRAINT `outsiders_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `room` (`roomId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `outsiders_ibfk_2` FOREIGN KEY (`dormitoryAdminId`) REFERENCES `dormitoryadmin` (`dormitoryAdminId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'InnoDB free: 3072 kB; (`roomId`) REFER `dormitory/room`(`roomId`); (`dormitoryAd' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of outsiders
-- ----------------------------
INSERT INTO `outsiders` VALUES (1, '保险公司', '2021-12-05 17:21:11', '推销', 2, 1);
INSERT INTO `outsiders` VALUES (4, '保险公司1', '2021-12-05 18:17:02', '推销1', 2, 1);
INSERT INTO `outsiders` VALUES (6, '来宾名称', '2021-12-12 09:34:18', '公告内容', 3, 1);

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room`  (
  `roomId` int(11) NOT NULL AUTO_INCREMENT COMMENT '房间id',
  `roomNo` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '房间号',
  `roomPhone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '房间电话',
  `dormitoryadminId` int(11) NULL DEFAULT NULL COMMENT '宿舍管理员id',
  PRIMARY KEY USING BTREE (`roomId`),
  INDEX `dormitoryId` USING BTREE(`dormitoryadminId`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`dormitoryadminId`) REFERENCES `dormitoryadmin` (`dormitoryAdminId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'InnoDB free: 3072 kB; (`dormitoryadminId`) REFER `dormitory/dormitoryadmin`(`dor' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of room
-- ----------------------------
INSERT INTO `room` VALUES (1, '101', '1001', 1);
INSERT INTO `room` VALUES (2, '201', '2001', 2);
INSERT INTO `room` VALUES (3, '103', '1003', 1);
INSERT INTO `room` VALUES (4, '104', '1004', 1);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `stuNo` int(20) NOT NULL AUTO_INCREMENT COMMENT '学号',
  `stuName` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `sex` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '性别',
  `admissionTime` datetime NULL DEFAULT NULL COMMENT '入学时间',
  `classId` int(11) NULL DEFAULT NULL COMMENT '班级号',
  `password` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'student' COMMENT '密码',
  `photo` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '照片',
  PRIMARY KEY USING BTREE (`stuNo`),
  INDEX `classId` USING BTREE(`classId`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `class` (`classId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 18016 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'InnoDB free: 3072 kB; (`classId`) REFER `dormitory/class`(`classId`)' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (18001, '天明1', '男', '2021-09-12 09:35:17', 1, 'student', '28');
INSERT INTO `student` VALUES (18002, '韩非', '男', '2021-09-12 09:36:44', 2, 'student', '1,24');
INSERT INTO `student` VALUES (18003, '星魂', '男', '2021-09-12 09:36:45', 1, 'student', '');
INSERT INTO `student` VALUES (18005, '焱妃', '女', '2021-09-12 09:36:45', 5, 'student', '1');
INSERT INTO `student` VALUES (18006, '都无法', '男', '2021-11-14 16:06:23', 1, 'student', '1,2');
INSERT INTO `student` VALUES (18007, '二十', '男', '2021-11-16 00:00:00', 4, 'student', NULL);
INSERT INTO `student` VALUES (18008, '发哈', '男', '1970-01-01 08:00:00', 10, 'student', NULL);
INSERT INTO `student` VALUES (18009, '星魂12', '男', '2021-09-12 09:36:45', 1, 'student', NULL);
INSERT INTO `student` VALUES (18010, '二手房', '男', '2021-11-15 00:00:00', 1, 'student', NULL);
INSERT INTO `student` VALUES (18011, '凤凰台如何', '女', '2021-11-17 00:00:00', 2, 'student', NULL);
INSERT INTO `student` VALUES (18012, '复活卡号', '女', '2021-11-14 15:58:04', 2, 'student', NULL);
INSERT INTO `student` VALUES (18013, '个人股', '男', '2021-11-14 16:55:34', 2, 'student', NULL);
INSERT INTO `student` VALUES (18014, '符号位', '女', '2021-11-14 16:56:54', 4, 'student', NULL);
INSERT INTO `student` VALUES (18015, '天谕', '男', '2021-11-27 18:57:03', 5, 'student', NULL);

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `teacherId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '教师账号',
  `teacherName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '教师姓名',
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'jiaoshi' COMMENT '密码',
  `introduce` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '介绍',
  `classId` int(11) NULL DEFAULT NULL COMMENT '班级ID',
  `examine` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '审批结果1通过 2 未通过',
  `registerTime` datetime NULL DEFAULT NULL COMMENT '注册时间',
  PRIMARY KEY USING BTREE (`teacherId`),
  INDEX `classId` USING BTREE(`classId`),
  CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `class` (`classId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'InnoDB free: 3072 kB; (`classId`) REFER `dormitory/class`(`classId`)' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES (1, 'js001', '盖聂', '123', '计算机081', 1, '1', '2021-09-12 09:45:41');
INSERT INTO `teacher` VALUES (2, 'js002', '刘妍', 'jiaoshi', '辅导教师', 2, '1', '2021-12-12 17:09:49');
INSERT INTO `teacher` VALUES (3, 'js003', '罗默默', 'jiaoshi', '教授', 5, '1', NULL);

-- ----------------------------
-- Triggers structure for table bedallocation
-- ----------------------------
DROP TRIGGER IF EXISTS `whetherPeopleChange`;
delimiter ;;
CREATE TRIGGER `whetherPeopleChange` AFTER INSERT ON `bedallocation` FOR EACH ROW update bed set whetherPeople=1 where  bedId = new.bedId
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
