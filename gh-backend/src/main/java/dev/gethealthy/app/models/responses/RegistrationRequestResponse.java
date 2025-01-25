package dev.gethealthy.app.models.responses;

import lombok.*;

import java.time.Instant;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequestResponse {
    private Integer id;

    private Instant issueDate;

    private String certificationFilePath;

    private String description;

    private String firstName;

    private String lastName;

    private String email;

}
