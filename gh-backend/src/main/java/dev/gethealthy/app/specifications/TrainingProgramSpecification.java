package dev.gethealthy.app.specifications;

import dev.gethealthy.app.models.entities.Category;
import dev.gethealthy.app.models.entities.ProgramRating;
import dev.gethealthy.app.models.entities.TrainingProgram;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class TrainingProgramSpecification {

    public static Specification<TrainingProgram> hasRatingBetween(double ratingLower, double ratingUpper) {
        return (Root<TrainingProgram> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Join<TrainingProgram, ProgramRating> ratingsJoin = root.join("program_rating", JoinType.LEFT);
            query.groupBy(root.get("programId"));
            query.having(cb.greaterThanOrEqualTo(cb.avg(ratingsJoin.get("rate")), ratingLower));
            query.having(cb.lessThanOrEqualTo(cb.avg(ratingsJoin.get("rate")), ratingUpper));

            return query.getGroupRestriction();
        };
    }

    public static Specification<TrainingProgram> hasParticipantCountBetween(long participantLower, long participantUpper) {
        return (Root<TrainingProgram> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Join<TrainingProgram, ProgramRating> traineesOnTrainingProgram = root.join("trainee_on_training_program", JoinType.LEFT);
            query.groupBy(root.get("programId"));
            query.having(cb.greaterThanOrEqualTo(cb.count(traineesOnTrainingProgram), participantLower));
            query.having(cb.lessThanOrEqualTo(cb.count(traineesOnTrainingProgram), participantUpper));
            return query.getGroupRestriction();
        };
    }

    public static Specification<TrainingProgram> belongsToCategories(List<String> categories)
    {
        return (Root<TrainingProgram> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Join<TrainingProgram, Category> categoryJoin = root.join("training_program_category", JoinType.INNER).join("category", JoinType.LEFT);
            return categoryJoin.get("categoryName").in(categories);
        };
    }
    
    public static Specification<TrainingProgram> hasDifficulty(String difficulty)
    {
        return (root, query, criteriaBuilder) ->
                difficulty == null ? criteriaBuilder.conjunction() :
                        criteriaBuilder.equal(root.get("difficulty"), difficulty);
    }
}
