package dev.gethealthy.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.gethealthy.app.models.entities.UserAccount;

public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {

}
