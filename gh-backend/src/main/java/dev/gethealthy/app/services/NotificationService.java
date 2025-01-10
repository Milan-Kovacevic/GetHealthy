package dev.gethealthy.app.services;

import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.entities.User;
import dev.gethealthy.app.models.enums.NotificationType;
import dev.gethealthy.app.models.responses.NotificationResponse;
import dev.gethealthy.app.models.responses.NotificationsSummaryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NotificationService  {

    Page<NotificationResponse> getNotificationsForUser(Integer userId, Pageable page);

    NotificationResponse getUserNotification(Integer userId, Integer notificationId);

    void deleteUserNotification(Integer userId, Integer notificationId);

    void deleteAllUserNotifications(Integer userId);

    void createNotification(User user, User sender, String metadata, NotificationType notificationType, String description);

    void markUserNotificationAsRead(Integer userId, Integer notificationId);

    void markAllUserNotificationsAsRead(Integer userId);

    NotificationsSummaryResponse getUserNotificationSummary(Integer userId);
}
