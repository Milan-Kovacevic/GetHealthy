package dev.gethealthy.app.util;

import dev.gethealthy.app.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder {
    private final DataSource dataSource;
    private final UserRepository userRepository;

    @PostConstruct
    public void init() {
        if (userRepository.count() > 0)
            return;

        Resource resource = new ClassPathResource("data.sql");
        ResourceDatabasePopulator seeder = new ResourceDatabasePopulator(resource);
        seeder.execute(dataSource);
    }
}
