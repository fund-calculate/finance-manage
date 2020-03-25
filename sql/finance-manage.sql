-- ----------------------------
--  Table structure for `股票交易记录`
-- ----------------------------
DROP TABLE IF EXISTS `stock_record`;
CREATE TABLE `stock_record`
(
    `id`             int(11)                       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `type`           enum ('BUY', 'SELL')                   DEFAULT 'BUY' COMMENT '类型(买/卖)',
    `trading_prices` decimal COLLATE utf8_bin      NOT NULL COMMENT '交易价格',
    `gains_location` decimal COLLATE utf8_bin      NOT NULL COMMENT '买卖涨幅位置',
    `positions_cost` decimal COLLATE utf8_bin      NOT NULL COMMENT '仓位平均成本',
    `trading_time`   timestamp                     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '交易时间',
    `trading_reason` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '交易理由',
    `analyse_record` varchar(255) COLLATE utf8_bin          DEFAULT NULL COMMENT '复盘记录',

    `create_time`    timestamp                     NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time`    timestamp                     NULL     DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
    `create_by`      varchar(32)                            DEFAULT NULL COMMENT '创建人',
    `update_by`      varchar(32)                            DEFAULT NULL COMMENT '修改人',
    `deleted`        tinyint(1)                             default 0 COLLATE utf8_bin DEFAULT '0' COMMENT '0-正常，1-删除',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = utf8
  COLLATE = utf8_bin
  ROW_FORMAT = DYNAMIC COMMENT ='股票交易记录表';

-- ----------------------------
--  Table structure for `基金持仓`
-- ----------------------------
DROP TABLE IF EXISTS `fund_position`;
CREATE TABLE `fund_position`
(
    `id`              int(11)                       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `fund_code`       varchar(10) COLLATE utf8_bin  NOT NULL COMMENT '基金代码',
    `fund_name`       varchar(30) COLLATE utf8_bin  NOT NULL COMMENT '基金名称',
    `hold_prices`     decimal COLLATE utf8_bin      NOT NULL COMMENT '持有金额',
    `hold_worth`      decimal COLLATE utf8_bin      NOT NULL COMMENT '持有净值',
    `current_worth`   decimal COLLATE utf8_bin      NOT NULL COMMENT '当前净值',
    `earnings_ratio`  decimal COLLATE utf8_bin      NOT NULL COMMENT '收益比例',
    `earnings_prices` decimal COLLATE utf8_bin      NOT NULL COMMENT '收益金额',
    `type`            varchar(255) COLLATE utf8_bin NOT NULL COMMENT '基金类型',

    `create_time`     timestamp                     NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time`     timestamp                     NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
    `create_by`       varchar(32)                        DEFAULT NULL COMMENT '创建人',
    `update_by`       varchar(32)                        DEFAULT NULL COMMENT '修改人',
    `deleted`         tinyint(1)                         default 0 COLLATE utf8_bin DEFAULT '0' COMMENT '0-正常，1-删除',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = utf8
  COLLATE = utf8_bin
  ROW_FORMAT = DYNAMIC COMMENT ='基金持仓';

-- ----------------------------
--  Table structure for `收益统计`
-- ----------------------------
DROP TABLE IF EXISTS `earnings_statistical`;
CREATE TABLE `earnings_statistical`
(
    `id`              int(11)                  NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `type`            enum ('ANT_WEALTH','DAY_FUND')    DEFAULT 'ANT_WEALTH' COMMENT '收益类型',
    `earnings_time`   timestamp                NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '收益时间',
    `earnings_prices` decimal COLLATE utf8_bin NOT NULL COMMENT '收益金额',

    `create_time`     timestamp                NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time`     timestamp                NULL     DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
    `create_by`       varchar(32)                       DEFAULT NULL COMMENT '创建人',
    `update_by`       varchar(32)                       DEFAULT NULL COMMENT '修改人',
    `deleted`         tinyint(1)                        default 0 COLLATE utf8_bin DEFAULT '0' COMMENT '0-正常，1-删除',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = utf8
  COLLATE = utf8_bin
  ROW_FORMAT = DYNAMIC COMMENT ='收益统计';
