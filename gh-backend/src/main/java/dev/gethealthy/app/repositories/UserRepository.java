package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.User;
import dev.gethealthy.app.models.enums.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u " +
            "WHERE u.userAccount.role = :trainerRole OR u.userAccount.role = :traineeRole")
    Page<User> findAllUsers(@Param("trainerRole") Role trainerRole,
                            @Param("traineeRole") Role traineeRole,
                            Pageable pageable);
}
