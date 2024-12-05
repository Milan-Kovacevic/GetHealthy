package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    Page<Comment> findAllByProgram_Id_OrderByDatePostedDesc(Integer programId, Pageable page);
}
