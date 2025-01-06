package dev.gethealthy.app.models.responses;
import dev.gethealthy.app.models.enums.NotificationType;
import lombok.Data;

import java.time.Instant;
import java.util.Date;

@Data
public class NotificationResponse {
    private Integer id;
    private Boolean markRead;
    private String metadata;
    private Instant date;
    private String senderFirstName;
    private String senderLastName;
    private NotificationType notificationType;
}
