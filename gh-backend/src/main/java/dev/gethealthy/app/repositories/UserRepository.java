package dev.gethealthy.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.gethealthy.app.models.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}
