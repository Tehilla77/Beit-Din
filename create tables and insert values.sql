create database beis_din_db;
use beis_din_db;
drop table users;
create table users(
 id varchar(9) primary key,
 password varchar(30),
first_name varchar(30),
last_name varchar(30),
email varchar(30),
phone varchar(30),
address varchar(30),
is_manager boolean
 );
 drop table discussion;
drop table cases;

create table cases(
 is_defedant_agree boolean,
 is_decision boolean,
 case_id int auto_increment primary key,
 prosecutor_id varchar(30),
 defendant_id varchar(30),
 issue varchar(30)
);
create table discussion(
discussion_id int auto_increment primary key,
discussion_date date,
discussion_hour varchar(5),
disccussion_time int,
case_id int,
protocol varchar(200),
next_discussion date,
is_finish boolean,
CONSTRAINT `fk_id` FOREIGN KEY (`case_id`) REFERENCES `cases` (`case_id`)
 );
 
insert into cases values(false,false,1,'326381837','215635640',"building");
insert into users values('215635640','4321',"Chedva","Douer","ch0583271192@gmail.com","0583271192","pachad yitschak st", false);
insert into users values('326381837','1234',"Tehilla","Douer","t0527681877@gmail.com","0527681877","pachad yitschak st", false);
insert into discussion values(1,"2024-04-01","12:30",90,1,"protocol is","2024-05-01", false);
insert into discussion values(2,"2024-04-02","12:30",90,1,"protocol is","2024-05-02", false);
