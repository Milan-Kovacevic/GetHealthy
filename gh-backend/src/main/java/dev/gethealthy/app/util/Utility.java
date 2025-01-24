package dev.gethealthy.app.util;

import dev.gethealthy.app.security.models.JwtUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.Instant;
import java.time.temporal.TemporalAdjusters;
import java.util.Optional;

public final class Utility {

    public static Instant getInstantCurrentDate()
    {
        return Instant.now();
    }
    // Returns new instance
    public static java.util.Date getUtilCurrentDate() {
        return new java.util.Date(System.currentTimeMillis());
    }

    // Returns new instance
    public static java.util.Date addToUtilDate(java.util.Date date, long millis) {
        return new java.util.Date(date.getTime() + millis);
    }

    public static int compareUtilDates(java.util.Date ld, java.util.Date rd) {
        return ld.compareTo(rd);
    }


    public static java.time.LocalDate getMondayUtilDateForCurrentDate() {
        java.time.LocalDate today = java.time.LocalDate.now();
        return today.with(TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY));
    }

    public static Optional<JwtUser> getJwtUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null)
            return Optional.empty();
        return Optional.of((JwtUser) auth.getPrincipal());
    }
}
