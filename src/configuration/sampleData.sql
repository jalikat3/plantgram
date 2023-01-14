--sample values

INSERT INTO user VALUES ("jp@gmail.com","Jali","Purcell","This is my bio.", null, current_date(),  "$2a$10$KZjDt95/ALzSASk.5IJPYuPmVh6oHp4v1QeaCxwYE7p1T4k8v7I.i");
INSERT INTO user VALUES ("erags6@gmail.com","Ethan", "Ragsdale", "Hello there!", null, "2022-04-26", "$2a$10$7dcllTpmMqA/T.DsDxvsCOSjm11OOTkiyRaMccJJsp5Uj0eOc5a4e");

-- sample values for posts

insert into posts (user_email, caption, picture) values ("erags6@gmail.com", "this is a cool plant", 'images/49d0fd16-7152-40ca-af75-9bdc35d7a746-plant1.jpeg');
insert into posts (user_email, caption, picture) values ("jp@gmail.com", "what plant is this?", 'images/c500febb-a885-4625-a9ab-c63beeb65e0a-plant3.jpeg');