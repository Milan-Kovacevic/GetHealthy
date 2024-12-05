package dev.gethealthy.app.specifications;

import dev.gethealthy.app.models.entities.*;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Objects;

public class TrainingProgramSpecification {

    public static Specification<TrainingProgram> hasRatingBetween(double ratingLower, double ratingUpper) {
        return (Root<TrainingProgram> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            // Subquery to calculate the average rating of posts for each user
            Subquery<Double> subquery = query.subquery(Double.class);
            Root<ProgramRating> programRatingRoot = subquery.from(ProgramRating.class);

            subquery.select(cb.avg(programRatingRoot.get("rate")))
                    .where(cb.equal(programRatingRoot.get("program"), root));

            Predicate predicate = cb.conjunction();

            predicate = cb.and(predicate,
                    cb.greaterThanOrEqualTo(subquery, ratingLower));

            predicate = cb.and(predicate,
                    cb.lessThanOrEqualTo(subquery, ratingUpper));

            return predicate;
        };


    }

    public static Specification<TrainingProgram> hasParticipantCountBetween(long participantLower, long participantUpper) {
        return (Root<TrainingProgram> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Subquery<Long> subquery = query.subquery(Long.class);
            Root<TraineeOnTrainingProgram> traineeOnTrainingProgramRoot = subquery.from(TraineeOnTrainingProgram.class);

            subquery.select(cb.count(traineeOnTrainingProgramRoot))
                    .where(cb.equal(traineeOnTrainingProgramRoot.get("program"), root));

            Predicate predicate = cb.conjunction();

            predicate = cb.and(predicate,
                    cb.greaterThanOrEqualTo(subquery, participantLower));


            predicate = cb.and(predicate,
                    cb.lessThanOrEqualTo(subquery, participantUpper));

            return predicate;
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
