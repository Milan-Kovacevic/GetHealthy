package dev.gethealthy.app.models.responses;

import java.util.Date;

import dev.gethealthy.app.models.enums.Role;
import lombok.Data;

@Data
public class UserAccountResponse {
    private Integer userId;
    private String username;
    private String email;
    private Boolean enabled;
    private Role role;
    private Date createdAt;
    private Date lastAccessed;
}
