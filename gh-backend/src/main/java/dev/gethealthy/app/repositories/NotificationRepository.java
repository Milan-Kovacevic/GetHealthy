package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    Page<Notification> findAllByUser_IdOrderByMarkReadAsc(Integer userId, Pageable page);

    boolean existsByIdAndUser_Id(Integer notificationId, Integer userId);

    void deleteAllByUser_Id(Integer userId);

    @Modifying
    @Query("UPDATE Notification e set e.markRead = true WHERE e.user.id=:userId and e.markRead = false")
    void markAllUserNotificationsAsRead(Integer userId);

    @Query("SELECT COUNT(e.id) from Notification e WHERE e.markRead = false and e.user.id = ?1")
    Long calculateNumberOfUnreadNotificationsForUser(Integer userId);
}
