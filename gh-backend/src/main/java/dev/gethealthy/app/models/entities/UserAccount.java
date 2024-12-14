package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import dev.gethealthy.app.models.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "user_account")
public class UserAccount implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserId", nullable = false)
    private Integer id;

    @Size(max = 64)
    @NotNull
    @Column(name = "Username", nullable = false, length = 64)
    private String username;

    @Size(max = 512)
    @NotNull
    @Column(name = "Password", nullable = false, length = 512)
    private String password;

    @Size(max = 128)
    @NotNull
    @Column(name = "Email", nullable = false, length = 128)
    private String email;

    @NotNull
    @Column(name = "Enabled", nullable = false)
    private Boolean enabled = false;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "Role", nullable = false)
    private Role role;

    @NotNull
    @Column(name = "CreatedAt", nullable = false)
    private Instant createdAt;

    @Column(name = "LastAccessed")
    private Instant lastAccessed;

}