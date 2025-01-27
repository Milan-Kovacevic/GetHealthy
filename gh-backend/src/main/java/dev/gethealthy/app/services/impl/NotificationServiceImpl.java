package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.Notification;
import dev.gethealthy.app.models.entities.User;
import dev.gethealthy.app.models.enums.NotificationType;
import dev.gethealthy.app.models.responses.NotificationResponse;
import dev.gethealthy.app.models.responses.NotificationsSummaryResponse;
import dev.gethealthy.app.repositories.NotificationRepository;
import dev.gethealthy.app.services.NotificationService;
import dev.gethealthy.app.util.Utility;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final ModelMapper modelMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public Page<NotificationResponse> getNotificationsForUser(Integer userId, Pageable page) {
        return notificationRepository
                .findAllByUser_IdOrderByMarkReadAsc(userId, page)
                .map(e -> modelMapper.map(e, NotificationResponse.class));
    }

    @Override
    public NotificationResponse getUserNotification(Integer userId, Integer notificationId) {
        Notification entity = notificationRepository
                .findById(notificationId)
                .orElseThrow(NotFoundException::new);
        if (!entity.getUser().getId().equals(userId))
            throw new NotFoundException();
        return modelMapper.map(entity, NotificationResponse.class);
    }

    @Override
    public void deleteUserNotification(Integer userId, Integer notificationId) {
        if (!notificationRepository.existsByIdAndUser_Id(notificationId, userId))
            throw new NotFoundException();
        notificationRepository.deleteById(notificationId);
    }

    @Override
    public void deleteAllUserNotifications(Integer userId) {
        notificationRepository.deleteAllByUser_Id(userId);
    }

    @Override
    public NotificationResponse createNotification(User user, User sender, String metadata, NotificationType notificationType) {
        Notification notification = new Notification();

        notification.setId(null);
        notification.setUser(user);
        notification.setSender(sender);
        notification.setMetadata(metadata);
        notification.setNotificationType(notificationType);
        notification.setDate(Utility.getInstantCurrentDate());
        notification.setMarkRead(false);

        notificationRepository.saveAndFlush(notification);

        var payload =  modelMapper.map(notification, NotificationResponse.class);
        messagingTemplate.convertAndSend("/topic/notifications/"  + user.getId(), payload);

        return payload;
    }

    @Override
    public void markUserNotificationAsRead(Integer userId, Integer notificationId) {
        Notification entity = notificationRepository.findById(notificationId).orElseThrow(NotFoundException::new);
        if (!entity.getUser().getId().equals(userId))
            throw new NotFoundException();
        entity.setMarkRead(true);
        notificationRepository.saveAndFlush(entity);
    }

    @Override
    public void markAllUserNotificationsAsRead(Integer userId) {
        notificationRepository.markAllUserNotificationsAsRead(userId);
    }

    @Override
    public NotificationsSummaryResponse getUserNotificationSummary(Integer userId) {
        var totalUnread = notificationRepository.calculateNumberOfUnreadNotificationsForUser(userId);
        var response = new NotificationsSummaryResponse();
        response.setTotalUnread(totalUnread);
        return response;
    }
}
