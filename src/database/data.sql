use node_mysql_ts;

CREATE TABLE user(
    id INT(11) NOT NULL AUTO_INCREMENT,
    username varchar(80) NOT NULL,
    email varchar(80) NOT NULL, 
    password varchar(80) NOT NULL
    PRIMARY KEY (id) 
);

CREATE TABLE post(  
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11) NOT NULL,
    title varchar(80) NOT NULL,
    description varchar(80) NOT NULL, 
    image_url varchar(40) NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) references user(id)
);

CREATE TABLE comment(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    user_id INT(11) NOT NULL, 
    post_id INT(11) NOT NULL,
    text varchar(80) NOT NULL, 
    image_url varchar(80) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) references user(id), 
    FOREIGN KEY (post_id) references post(id)
);

