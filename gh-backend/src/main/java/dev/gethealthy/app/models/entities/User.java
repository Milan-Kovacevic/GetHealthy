package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import dev.gethealthy.app.models.enums.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "user")
@Inheritance(strategy = InheritanceType.JOINED)
public class User implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserId", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private UserAccount userAccount;

    @Size(max = 96)
    @NotNull
    @Column(name = "FirstName", nullable = false, length = 96)
    private String firstName;

    @Size(max = 96)
    @NotNull
    @Column(name = "LastName", nullable = false, length = 96)
    private String lastName;

    @NotNull
    @Column(name = "DateOfBirth")
    private LocalDate dateOfBirth;

    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "Gender")
    private Gender gender;

    @Size(max = 255)
    @Column(name = "ProfilePictureFilePath")
    private String profilePictureFilePath;

}