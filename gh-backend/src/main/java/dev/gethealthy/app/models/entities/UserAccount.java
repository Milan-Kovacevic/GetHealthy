package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "user_account")
public class UserAccount implements BaseEntity<Integer> {
    @Id
    @Column(name = "UserId", nullable = false)
    private Integer id;

    @Column(name = "Username", nullable = false, length = 64)
    private String username;

    @Column(name = "Password", nullable = false, length = 512)
    private String password;

    @Column(name = "Email", nullable = false, length = 128)
    private String email;

    @Column(name = "Enabled", nullable = false)
    private Boolean enabled = false;

    @Column(name = "Role", nullable = false)
    private Byte role;

    @Column(name = "CreatedAt", nullable = false)
    private Instant createdAt;

    @Column(name = "LastAccessed")
    private Instant lastAccessed;

}