package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.enums.Gender;
import dev.gethealthy.app.models.enums.Role;
import lombok.*;

import java.time.Instant;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsResponse {
    private Integer id;
    private String firstName;
    private String lastName;
    private Instant createdAt;
    private Boolean enabled;
    private Role role;
    private String email;
    private Gender gender;
    private Instant dateOfBirth;
    private String username;
    private String profilePictureFilePath;
    private Instant lastAccessed;
}
