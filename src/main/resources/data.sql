DROP TABLE USER_INFO;
CREATE TABLE USER_INFO
(
    ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    FIRSTNAME VARCHAR(100),
    LASTNAME VARCHAR(100),
    EMAIL VARCHAR(100)
);

-- INSERT INTO USER_INFO VALUES (1, 'GyuHo', 'Han', 'hkh7670@gmail.com');