package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "registration_request")
public class RegistrationRequest implements BaseEntity<Integer> {
    @Id
    @Column(name = "UserId", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private UserAccount userAccount;

    @Column(name = "IssueDate", nullable = false)
    private Instant issueDate;

    @Column(name = "QualificationName", nullable = false, length = 128)
    private String qualificationName;

    @Column(name = "QualificationValidTo", nullable = false)
    private LocalDate qualificationValidTo;

    @Column(name = "CertificationFilePath", nullable = false, length = 192)
    private String certificationFilePath;

    @Column(name = "QualificationDescription", length = 512)
    private String qualificationDescription;

    @Column(name = "FirstName", nullable = false, length = 96)
    private String firstName;

    @Column(name = "LastName", nullable = false, length = 96)
    private String lastName;

    @Column(name = "DateOfBirth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "Gender", nullable = false)
    private Byte gender;

}