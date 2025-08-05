create database if not exists `mkboard`
  default charset `utf8`
  default collate `utf8_general_ci`;

create user if not exists 'mkboard'@'localhost';

alter user 'mkboard'@'localhost' identified with mysql_native_password by '';

grant all privileges on `mkboard`.* to 'mkboard'@'localhost';

flush privileges;
