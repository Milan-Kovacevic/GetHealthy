package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.models.entities.ExerciseSetFeedback;
import dev.gethealthy.app.models.entities.ProgramRating;
import dev.gethealthy.app.models.entities.TraineeExercising;
import dev.gethealthy.app.models.enums.TrainingProgramDifficulty;
import dev.gethealthy.app.models.requests.EngagementAnalyticsRequest;
import dev.gethealthy.app.models.requests.PopularityAnalyticsRequest;
import dev.gethealthy.app.models.responses.ProgramRatingResponse;
import dev.gethealthy.app.models.responses.TrainerDashboardAnalyticsResponse;
import dev.gethealthy.app.models.responses.TrainerEngagementAnalyticsResponse;
import dev.gethealthy.app.models.responses.TrainerPopularityAnalyticsResponse;
import dev.gethealthy.app.repositories.*;
import dev.gethealthy.app.services.TrainerAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.Temporal;
import java.time.temporal.TemporalAmount;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainerAnalyticsServiceImpl implements TrainerAnalyticsService {
    private final TrainingProgramRepository trainingProgramRepository;
    private final RatingRepository programRatingRepository;
    private final TraineeOnTrainingProgramRepository traineeOnTrainingProgramRepository;
    private final TraineeExercisingRepository traineeExercisingRepository;
    private final ExerciseFeedbackRepository exerciseFeedbackRepository;

    @Override
    public TrainerDashboardAnalyticsResponse getGeneralAnalytics(int userId) {
        TrainerDashboardAnalyticsResponse response = new TrainerDashboardAnalyticsResponse();

        var programs = trainingProgramRepository.findAllByTrainer_Id(userId);

        List<TrainerDashboardAnalyticsResponse.TopProgramDashboardData>
                topInteracted =
                programs
                .stream()
                .map(tp -> new TrainerDashboardAnalyticsResponse.TopProgramDashboardData(tp.getName(), tp.getComments().size() + tp.getTrainingProgramRatings().size()))
                .sorted(Comparator.comparingDouble(TrainerDashboardAnalyticsResponse.TopProgramDashboardData::getValue).reversed())
                .toList();

        List<TrainerDashboardAnalyticsResponse.TopProgramDashboardData>
                topJoined =
                programs.stream()
                .map(tp -> new TrainerDashboardAnalyticsResponse.TopProgramDashboardData(tp.getName(), tp.getTraineeOnTrainingProgram().size()))
                .sorted(Comparator.comparingDouble(TrainerDashboardAnalyticsResponse.TopProgramDashboardData::getValue).reversed())
                .toList();

        List<TrainerDashboardAnalyticsResponse.TopProgramDashboardData>
                topVoted =
                programs
                .stream()
                .map(tp -> new TrainerDashboardAnalyticsResponse.TopProgramDashboardData(tp.getName(), tp.getTrainingProgramRatings().stream().mapToDouble(ProgramRating::getRate).average().orElse(0)))
                .sorted(Comparator.comparingDouble(TrainerDashboardAnalyticsResponse.TopProgramDashboardData::getValue).reversed())
                .toList();

        long beginnerCount = programs.stream().filter(p->p.getDifficulty() == TrainingProgramDifficulty.BEGINNER).count();
        long intermediateCount = programs.stream().filter(p->p.getDifficulty() == TrainingProgramDifficulty.INTERMEDIATE).count();
        long advancedCount = programs.stream().filter(p->p.getDifficulty() == TrainingProgramDifficulty.ADVANCED).count();

        TrainerDashboardAnalyticsResponse.TotalProgramDashboardData totalProgram = new TrainerDashboardAnalyticsResponse.TotalProgramDashboardData(
                beginnerCount,
                intermediateCount,
                advancedCount);

        response.setTopInteracted(topInteracted);
        response.setTopJoined(topJoined);
        response.setTopVoted(topVoted);
        response.setTotalProgram(totalProgram);
        return response;
    }

    @Override
    public TrainerPopularityAnalyticsResponse getPopularityAnalytics(int userId, PopularityAnalyticsRequest request) {
        TrainerPopularityAnalyticsResponse response = new TrainerPopularityAnalyticsResponse();
        response.setTotalParticipants(new ArrayList<>());
        response.setRatings(new ArrayList<>());

        var ratings = programRatingRepository.getProgramRatingByProgramId(request.getProgramId());
        var members = traineeOnTrainingProgramRepository.findAllByProgram_Id(request.getProgramId());

        for (Instant current = request.getFrom(); current.isBefore(request.getTo()) || current.equals(request.getTo()); current = current.plus(Duration.ofDays(1))) {
            Instant finalCurrent = current;

            double rating = ratings.stream()
                    .filter(r -> r.getDateRated().isBefore(finalCurrent) || r.getDateRated().equals(finalCurrent)).
                    mapToDouble(ProgramRating::getRate)
                    .average()
                    .orElse(0);

            long memberCount = members.stream()
                    .filter(m -> m.getJoinDate().isBefore(finalCurrent) || m.getJoinDate().equals(finalCurrent))
                    .count();

            response.getTotalParticipants().add(new TrainerPopularityAnalyticsResponse.AnalyticsPopularityData(current, memberCount));
            response.getRatings().add(new TrainerPopularityAnalyticsResponse.AnalyticsPopularityData(current, rating));
        }
        return response;
    }

    @Override
    public TrainerEngagementAnalyticsResponse getEngagementAnalytics(int userId, EngagementAnalyticsRequest request) {
        TrainerEngagementAnalyticsResponse response = new TrainerEngagementAnalyticsResponse();
        response.setData(new ArrayList<>());

        var traineeExercising = request.getTraineeId() == null?
                traineeExercisingRepository.findAllByProgramId(request.getProgramId())
                : traineeExercisingRepository.findAllByProgramIdAndUserId(request.getProgramId(), request.getTraineeId());

        for (Instant current = request.getFrom(); current.isBefore(request.getTo()) || current.equals(request.getTo()); current = current.plus(Duration.ofDays(1))) {
            Instant finalCurrent = current;

            var exerciseSets = traineeExercising.stream()
                    .filter(te -> te.getDateTaken().isBefore(finalCurrent) || te.getDateTaken().equals(finalCurrent))
                    .flatMap(te -> te.getExercisesFeedback().stream())
                    .filter(ef -> ef.getExercise().getId() == request.getExerciseId())
                    .flatMap(ef -> ef.getExerciseSetsFeedback().stream()).toList();

            long skipped = exerciseSets
                    .stream()
                    .filter(esf -> esf.getSkipped() || esf.getExerciseFeedback().getSkipped())
                    .count();

            long total = exerciseSets.size();

            double percentSkipped = (double) skipped / total;
            double percentCompleted = 1 - percentSkipped;

            response.getData().add(new TrainerEngagementAnalyticsResponse.AnalyticsEngagementData(current, percentSkipped, percentCompleted));
        }

        return response;
    }
}
