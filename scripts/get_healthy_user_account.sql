create user 'gethealthy'@'localhost' identified by 'gethealthy';
grant all privileges on get_healthy.* to 'gethealthy'@'localhost' with grant option;
flush privileges;
# drop user 'gethealthy'@'localhost';