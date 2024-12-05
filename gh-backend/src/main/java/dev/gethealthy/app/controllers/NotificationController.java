package dev.gethealthy.app.controllers;

import dev.gethealthy.app.models.responses.NotificationResponse;
import dev.gethealthy.app.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}")
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping("/users/{userId}/notifications")
    public Page<NotificationResponse> getAllNotificationsForUser(@PathVariable(name = "userId") Integer userId, Pageable page) {
        //checkIfUserIsAuthorized(auth, userId);
        return notificationService.getNotificationsForUser(userId, page);
    }

    @GetMapping("/users/{userId}/notifications/{notificationId}")
    public NotificationResponse getNotificationForUser(@PathVariable(name = "userId") Integer userId,
                                               @PathVariable(name = "notificationId") Integer notificationId) {
        //checkIfUserIsAuthorized(auth, userId);
        return notificationService.getUserNotification(userId, notificationId);
    }

    @DeleteMapping("/users/{userId}/notifications/{notificationId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserNotification(@PathVariable(name = "userId") Integer userId,
                                       @PathVariable(name = "notificationId") Integer notificationId) {
        //checkIfUserIsAuthorized(auth, userId);
        notificationService.deleteUserNotification(userId, notificationId);
    }

    @DeleteMapping("/users/{userId}/notifications")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAllUserNotifications(@PathVariable(name = "userId") Integer userId) {
        //checkIfUserIsAuthorized(auth, userId);
        notificationService.deleteAllUserNotifications(userId);
    }

    @PostMapping("/users/{userId}/notifications/{notificationId}/mark-read")
    @ResponseStatus(HttpStatus.OK)
    public void markUserNotificationAsRead(@PathVariable(name = "userId") Integer userId,
                                           @PathVariable(name = "notificationId") Integer notificationId) {
       // checkIfUserIsAuthorized(auth, userId);
        notificationService.markUserNotificationAsRead(userId, notificationId);
    }

    @PostMapping("/users/{userId}/notifications/mark-read")
    @ResponseStatus(HttpStatus.OK)
    public void markAllUserNotificationsAsRead(@PathVariable(name = "userId") Integer userId) {
        //checkIfUserIsAuthorized(auth, userId);
        notificationService.markAllUserNotificationsAsRead(userId);
    }

    /*private void checkIfUserIsAuthorized(Authentication auth, Integer userId) {
        if (auth == null)
            throw new UnauthorizedException();
        JWTUser jwtUser = (JWTUser) auth.getPrincipal();
        if (!jwtUser.getUserId().equals(userId))
            throw new ForbiddenException();
    }*/
}
