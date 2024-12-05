package dev.gethealthy.app.models.responses;
import dev.gethealthy.app.models.enums.NotificationType;
import lombok.Data;

import java.util.Date;

@Data
public class NotificationResponse {
    private Integer id;
    private Boolean markRead;
    private String metadata;
    private Date date;
    private String senderFirstName;
    private String senderLastName;
    private NotificationType notificationType;
}
