package dev.gethealthy.app.repositories;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import dev.gethealthy.app.models.entities.UserAccount;

import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {
    public UserAccount findByUsernameOrEmail(@Size(max = 64) @NotNull String username, @Size(max = 128) @NotNull String email);
}
