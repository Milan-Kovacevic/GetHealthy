package dev.gethealthy.app.specifications;

import dev.gethealthy.app.models.entities.*;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class TrainingProgramSpecification {

    public static Specification<TrainingProgram> hasRatingBetween(double ratingLower, double ratingUpper) {
        return (Root<TrainingProgram> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            // Join the TrainingProgram entity with ProgramRating
            Join<TrainingProgram, ProgramRating> ratingsJoin = root.join("ratings", JoinType.LEFT);

            // Define the expression to calculate the average rating
            Expression<Double> avgRating = cb.avg(ratingsJoin.get("rate"));

            // Set the query to return the root (TrainingProgram) entity

            // Group by the program within the ratings join
            query.groupBy(ratingsJoin.get("program"));

            // Apply the having clause to filter based on the average rating
            query.having(cb.greaterThanOrEqualTo(avgRating, ratingLower));
            query.having(cb.lessThanOrEqualTo(avgRating, ratingUpper));

            // Return the CriteriaQuery itself
            return query.getGroupRestriction();
        };


    }

    public static Specification<TrainingProgram> hasParticipantCountBetween(long participantLower, long participantUpper) {
        return (Root<TrainingProgram> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Join<TrainingProgram, TraineeOnTrainingProgram> traineesOnTrainingProgram = root.join("trainees", JoinType.LEFT);
            //query.groupBy(traineesOnTrainingProgram.get("program"));
            query.having(cb.greaterThanOrEqualTo(cb.count(traineesOnTrainingProgram), participantLower));
            query.having(cb.lessThanOrEqualTo(cb.count(traineesOnTrainingProgram), participantUpper));
            return query.getRestriction();
        };
    }

    public static Specification<TrainingProgram> belongsToCategories(List<String> categories)
    {
        return (Root<TrainingProgram> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Join<TrainingProgram, Category> categoryJoin = root.join("categories", JoinType.INNER);
            return categoryJoin.get("name").in(categories);
        };
    }
    
    public static Specification<TrainingProgram> hasDifficulty(int difficulty)
    {
        return (root, query, criteriaBuilder) ->
                difficulty == 0 ? criteriaBuilder.conjunction() :
                        criteriaBuilder.equal(root.get("difficulty"), difficulty);
    }
}
