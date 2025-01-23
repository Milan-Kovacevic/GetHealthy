package dev.gethealthy.app.repositories;


import dev.gethealthy.app.models.entities.RegistrationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRequestRepository extends JpaRepository<RegistrationRequest, Integer> {
}
