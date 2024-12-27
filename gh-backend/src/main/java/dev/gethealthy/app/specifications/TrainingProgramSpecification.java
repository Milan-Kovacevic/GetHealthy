package dev.gethealthy.app.specifications;

import dev.gethealthy.app.models.entities.*;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Objects;

public class TrainingProgramSpecification {

    public static Specification<TrainingProgram> isNotDeleted() {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.isFalse(root.get("deleted")).isNotNull();
    }

    public static Specification<TrainingProgram> nameContains(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + keyword.toLowerCase() + "%");
        };
    }

    public static Specification<TrainingProgram> hasRatingBetween(double ratingLower, double ratingUpper) {
        return (Root<TrainingProgram> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Subquery<Double> subquery = query.subquery(Double.class);
            Root<ProgramRating> programRatingRoot = subquery.from(ProgramRating.class);

            subquery.select(cb.coalesce(cb.avg(programRatingRoot.get("rate")), 0.0))
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
        return (Root<TrainingProgram> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {            Subquery<Long> subquery = query.subquery(Long.class);
            Root<TraineeOnTrainingProgram> traineeOnTrainingProgramRoot = subquery.from(TraineeOnTrainingProgram.class);

            subquery.select(cb.coalesce(cb.count(traineeOnTrainingProgramRoot), 0L))
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
            if (categories == null || categories.isEmpty()) {
                return cb.conjunction();
            }
            Join<TrainingProgram, Category> categoryJoin = root.join("categories");
//            Join<TrainingProgram, Category> categoryJoin = root.join("categories").join("category");
            return categoryJoin.get("name").in(categories);
        };
    }
    
    public static Specification<TrainingProgram> hasDifficulty(int difficulty)
    {
        return (root, query, criteriaBuilder) ->
                difficulty == -1 ? criteriaBuilder.conjunction() :
                        criteriaBuilder.equal(root.get("difficulty"), difficulty);
    }
}
