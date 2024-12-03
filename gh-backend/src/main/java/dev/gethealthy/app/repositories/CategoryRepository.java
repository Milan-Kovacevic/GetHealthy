package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
