package dev.gethealthy.app.specifications;

import dev.gethealthy.app.models.entities.*;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Objects;

public class TrainingProgramSpecification {

    public static Specification<TrainingProgram> constructSpecification(String searchWord, List<String> categories,
                                                                        double ratingUpper,
                                                                        double ratingLower, long participantsUpper, long participantsLower, int difficulty) {
        return Specification
                .where(TrainingProgramSpecification.nameContains(searchWord))
                .and(TrainingProgramSpecification.hasRatingBetween(ratingLower, ratingUpper))
                .and(TrainingProgramSpecification.hasParticipantCountBetween(participantsLower, participantsUpper))
                .and(TrainingProgramSpecification.belongsToCategories(categories))
                .and(TrainingProgramSpecification.hasDifficulty(difficulty))
                .and(TrainingProgramSpecification.isNotDeleted());
    }

    public static Specification<TrainingProgram> constructSpecificationForTrainer(int userId, String searchWord, List<String> categories,
                                                                        double ratingUpper,
                                                                        double ratingLower, long participantsUpper, long participantsLower, int difficulty) {
        return Specification
                .where(TrainingProgramSpecification.nameContains(searchWord))
                .and(TrainingProgramSpecification.hasRatingBetween(ratingLower, ratingUpper))
                .and(TrainingProgramSpecification.hasParticipantCountBetween(participantsLower, participantsUpper))
                .and(TrainingProgramSpecification.belongsToCategories(categories))
                .and(TrainingProgramSpecification.hasDifficulty(difficulty))
                .and(TrainingProgramSpecification.belongsToUser(userId))
                .and(TrainingProgramSpecification.isNotDeleted());
    }

    public static Specification<TrainingProgram> constructSpecificationForTrainee(int userId, String searchWord, List<String> categories,
                                                                                  double ratingUpper,
                                                                                  double ratingLower, long participantsUpper, long participantsLower, int difficulty) {
        return Specification
                .where(TrainingProgramSpecification.nameContains(searchWord))
                .and(TrainingProgramSpecification.hasRatingBetween(ratingLower, ratingUpper))
                .and(TrainingProgramSpecification.hasParticipantCountBetween(participantsLower, participantsUpper))
                .and(TrainingProgramSpecification.belongsToCategories(categories))
                .and(TrainingProgramSpecification.hasDifficulty(difficulty))
                .and(TrainingProgramSpecification.isParticipant(userId))
                .and(TrainingProgramSpecification.isNotDeleted());
    }


    private static Specification<TrainingProgram> isNotDeleted() {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.isFalse(root.get("deleted")).isNotNull();
    }

    private static Specification<TrainingProgram> nameContains(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + keyword.toLowerCase() + "%");
        };
    }

    private static Specification<TrainingProgram> hasRatingBetween(double ratingLower, double ratingUpper) {
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

    private static Specification<TrainingProgram> hasParticipantCountBetween(long participantLower, long participantUpper) {
        return (Root<TrainingProgram> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Subquery<Long> subquery = query.subquery(Long.class);
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

    private static Specification<TrainingProgram> belongsToUser(int userId) {
        return (Root<TrainingProgram> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Join<TrainingProgram, Category> trainerJoin = root.join("trainer");
            return trainerJoin.get("id").in(userId);
        };
    }

    private static Specification<TrainingProgram> isParticipant(int userId) {
        return (Root<TrainingProgram> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Join<TrainingProgram, TraineeOnTrainingProgram> traineeJoin = root.join("traineeOnTrainingProgram");
            return cb.equal(traineeJoin.get("user").get("id"), userId);
        };
    }

    private static Specification<TrainingProgram> belongsToCategories(List<String> categories) {
        return (Root<TrainingProgram> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if (categories == null || categories.isEmpty()) {
                return cb.conjunction();
            }
            Join<TrainingProgram, Category> categoryJoin = root.join("categories");
            return categoryJoin.get("name").in(categories);
        };
    }

    private static Specification<TrainingProgram> hasDifficulty(int difficulty) {
        return (root, query, criteriaBuilder) ->
                difficulty == -1 ? criteriaBuilder.conjunction() :
                        criteriaBuilder.equal(root.get("difficulty"), difficulty);
    }
}
