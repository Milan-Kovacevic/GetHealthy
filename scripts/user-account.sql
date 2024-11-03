create user 'get_healthy_user'@'localhost' identified by 'student';
grant all privileges on get_healthy.* to 'get_healthy_user'@'localhost' with grant option;
flush privileges;
#drop user 'get_healthy_user'@'localhost';