CREATE TABLE member (
   member_id       		    CHARACTER VARYING(200) UNIQUE NOT NULL
  ,member_password 		    CHARACTER VARYING(200) NOT NULL
  ,member_firstname 		  CHARACTER VARYING(200) NOT NULL
  ,member_lastname 		    CHARACTER VARYING(200) NOT NULL
  ,member_role 		        CHARACTER VARYING(200) NOT NULL
  ,member_zone            JSON NOT NULL
  ,member_timestamp         TIMESTAMP WITHOUT TIME ZONE default current_timestamp
  ,member_verification      BOOLEAN DEFAULT '0'
  ,CONSTRAINT members_pkey  PRIMARY KEY (member_id)
);
