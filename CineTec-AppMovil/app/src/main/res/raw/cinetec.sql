

CREATE TABLE EMPLOYEE
(
	branch_id 			VARCHAR(15) NOT NULL,
    id 					INT NOT NULL,
	first_name	 		VARCHAR(15) NOT NULL,
	middle_name	 		VARCHAR(15),
	first_surname	 	VARCHAR(15) NOT NULL,
	second_surname	 	VARCHAR(15) NOT NULL,
	birth_date		 	DATE NOT NULL,
    phone_number 		VARCHAR(15) NOT NULL,
	username			VARCHAR(15) NOT NULL,
	password			VARCHAR(15) NOT NULL,
	PRIMARY KEY(id)
);


CREATE TABLE CLIENT
(
	id 					INT NOT NULL,
	first_name 			VARCHAR(15) NOT NULL,
	middle_name 		VARCHAR(15),
	first_surname 		VARCHAR(15) NOT NULL,
	second_surname 		VARCHAR(15) NOT NULL,
	birth_date 			DATE NOT NULL,
	phone_number 		VARCHAR(15),
	username 			VARCHAR(15) NOT NULL,
	password 			VARCHAR(15) NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE BRANCH
(
    cinema_name VARCHAR(15) NOT NULL,
    province VARCHAR(15) NOT NULL,
    district VARCHAR(15) NOT NULL,
    room_quantity INT NOT NULL,
    PRIMARY KEY(cinema_name)
);


CREATE TABLE ROOM
(
	branch_name 		VARCHAR(15) NOT NULL,
    id 					INT NOT NULL,
	row_quantity 		INT NOT NULL,
	column_quantity 	INT NOT NULL,
    capacity 			INT NOT NULL,
	PRIMARY KEY(id)
);


CREATE TABLE SEAT
(
	room_id 			INT NOT NULL,
    number 				INT NOT NULL,
	status		 		VARCHAR(15) NOT NULL,
	PRIMARY KEY(room_id),
	UNIQUE(number)
);

CREATE TABLE BILL
(
	client_id 			INT NOT NULL,
    projection_id 		INT NOT NULL,
	id					INT NOT NULL,
	detail				VARCHAR(255),
	PRIMARY KEY(id)
);

CREATE TABLE PROJECTION
(
	room_id 			INT NOT NULL,
    movie_id	 		INT NOT NULL,
	id					INT NOT NULL,
	date				DATE NOT NULL,
	time				TIME NOT NULL,
	PRIMARY KEY(id)
);


CREATE TABLE MOVIE
(
	id 						INT NOT NULL,
	classification_id 		VARCHAR(15),
	director_id 				INT,
    image 					VARCHAR(15) NOT NULL,
    original_name 			VARCHAR(15) NOT NULL,
    name 					VARCHAR(15) NULL,
	length 					VARCHAR(15) NOT NULL,
    PRIMARY KEY(id)
);


CREATE TABLE DIRECTOR
(
	id				INT NOT NULL,
	name 			VARCHAR(15) NOT NULL,
    PRIMARY KEY(id)
);


CREATE TABLE CLASSIFICATION
(
	code 			VARCHAR(15) NOT NULL UNIQUE,
	details 		VARCHAR(15) NOT NULL,
	age_rating		INT NOT NULL,
    PRIMARY KEY(code)
);


CREATE TABLE ACTS
(
	movie_id		INT NOT NULL,
	actor_id		INT NOT NULL
);


CREATE TABLE ACTOR
(
	id				INT NOT NULL,
	name 			VARCHAR(15) NOT NULL,
    PRIMARY KEY(id)
);



-- Foreign Keys

ALTER TABLE EMPLOYEE
ADD CONSTRAINT EMPLOYEE_BRANCH_FK FOREIGN KEY(branch_id)
REFERENCES BRANCH(cinema_name);


ALTER TABLE ROOM
ADD CONSTRAINT ROOM_BRANCH_FK FOREIGN KEY(branch_name)
REFERENCES BRANCH(cinema_name);


ALTER TABLE SEAT
ADD CONSTRAINT SEAT_ROOM_FK FOREIGN KEY(room_id)
REFERENCES ROOM(id);


ALTER TABLE BILL
ADD CONSTRAINT BILL_CLIENT_FK FOREIGN KEY(client_id)
REFERENCES CLIENT(id);

ALTER TABLE BILL
ADD CONSTRAINT BILL_PROJECTION_FK FOREIGN KEY(projection_id)
REFERENCES PROJECTION(id);


ALTER TABLE PROJECTION
ADD CONSTRAINT PROJECTION_ROOM_FK FOREIGN KEY(room_id)
REFERENCES ROOM(id);

ALTER TABLE PROJECTION
ADD CONSTRAINT PROJECTION_MOVIE_FK FOREIGN KEY(movie_id)
REFERENCES MOVIE(id);


ALTER TABLE MOVIE
ADD CONSTRAINT MOVIE_CLASSIFICATION_FK FOREIGN KEY(director_id)
REFERENCES DIRECTOR(id);

ALTER TABLE MOVIE
ADD CONSTRAINT MOVIE_DIRECTOR_FK FOREIGN KEY(classification_id)
REFERENCES CLASSIFICATION(code);


ALTER TABLE ACTS
ADD CONSTRAINT ACTS_MOVIE_FK FOREIGN KEY(movie_id)
REFERENCES MOVIE(id);

ALTER TABLE ACTS
ADD CONSTRAINT ACTS_ACTOR_FK FOREIGN KEY(actor_id)
REFERENCES ACTOR(id);

