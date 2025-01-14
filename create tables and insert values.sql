use beis_din_db;

DROP TABLE IF EXISTS files;

DROP TABLE IF EXISTS discussions;

DROP TABLE IF EXISTS cases;

DROP TABLE IF EXISTS inquiries;

DROP TABLE IF EXISTS users;

create table users(
    id varchar(9) primary key,
    password varchar(225),
    first_name varchar(30),
    last_name varchar(30),
    email varchar(30),
    phone varchar(30),
    address varchar(30),
    userRole int
);

create table cases(
    last_enter date,
    is_defedant_agree boolean,
    is_decision boolean,
    case_id int auto_increment primary key,
    prosecutor_id varchar(30),
    defendant_id varchar(30),
    issue varchar(30),
    CONSTRAINT `fk_id_prosecutor` FOREIGN KEY (`prosecutor_id`) REFERENCES `users` (`id`),
    CONSTRAINT `fk_id_defendant_id` FOREIGN KEY (`defendant_id`) REFERENCES `users` (`id`)
);

create table discussions(
    discussion_id int auto_increment primary key,
    discussion_date date,
    discussion_hour varchar(5),
    disccussion_time int,
    case_id int,
    is_finish boolean,
    CONSTRAINT `fk_id` FOREIGN KEY (`case_id`) REFERENCES `cases` (`case_id`)
);

create table inquiries(
    id int auto_increment primary key,
    content_inquiries varchar(200),
    finish_date date,
    type_inquiries int check(
        type_inquiries > 0
        and type_inquiries < 4
    ),
    is_done boolean,
    discussion_id int,
    CONSTRAINT `dis_id` FOREIGN KEY (`discussion_id`) REFERENCES `discussions` (`discussion_id`)
);

create table files(
    id int auto_increment primary key,
    discussion_id int,
    file_path varchar(50)
) -- insert into users values('215635640','12345#Cc',"חדוה","דואר","ch0583271192@gmail.com","0583271192","פחד יצחק 37", false);
-- insert into users values('326381837','12345#Tt',"תהילה","דואר","t0527681877@gmail.com","0527681877","פחד יצחק 37", false);
-- insert into cases values("2024-07-22",false,false,1,'326381837','215635640',"בניה לא חוקית");
-- insert into cases values("2024-07-22",false,false,1,'326381837','215635640',"עסק פושט רגל");