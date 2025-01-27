package dev.gethealthy.app.util;

import dev.gethealthy.app.security.models.JwtUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.util.Optional;

public final class Utility {

    public static Instant getInstantCurrentDate()
    {
        return Instant.now();
    }

    public static java.util.Date getUtilCurrentDate() {
        return new java.util.Date(System.currentTimeMillis());
    }

    public static java.time.LocalDate getLatestMondayLocalDate() {
        Instant now = Instant.now();
        ZoneId zone = ZoneId.systemDefault();
        LocalDate date = now.atZone(zone).toLocalDate();
        // Find the last Monday relative to the given date
        return date.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
    }

    public static Instant convertLocalDateAndTimeToInstant(LocalDate date, LocalTime time){
        // Combine LocalDate and LocalTime to create LocalDateTime
        LocalDateTime dateTime = LocalDateTime.of(date, time);

        // Specify a ZoneOffset or ZoneId to get Instant
        ZoneId zone = ZoneId.systemDefault(); // Use system's default timezone
        return dateTime.atZone(zone).toInstant();
    }

    public static Optional<JwtUser> getJwtUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null)
            return Optional.empty();
        return Optional.of((JwtUser) auth.getPrincipal());
    }
}
