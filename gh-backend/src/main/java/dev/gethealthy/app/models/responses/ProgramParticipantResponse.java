package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.enums.Gender;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;

@Data
public class ProgramParticipantResponse {
    private Integer id;
    private String firstName;
    private String lastName;
    private Gender gender;
    private LocalDate dateOfBirth;
    private Instant joinDate;
}
