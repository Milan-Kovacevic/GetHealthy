package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.models.entities.ProgramRating;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.enums.TrainingProgramDifficulty;
import dev.gethealthy.app.models.requests.EngagementAnalyticsRequest;
import dev.gethealthy.app.models.requests.PopularityAnalyticsRequest;
import dev.gethealthy.app.models.responses.TrainerDashboardAnalyticsResponse;
import dev.gethealthy.app.models.responses.TrainerEngagementAnalyticsResponse;
import dev.gethealthy.app.models.responses.TrainerPopularityAnalyticsResponse;
import dev.gethealthy.app.repositories.*;
import dev.gethealthy.app.services.TrainerAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
        var traineeExercising = traineeExercisingRepository.findAllByProgramIdIn(programs.stream().map(p -> p.getId()).toList());

        Map<Integer, Long> programExercisedCount = traineeExercising.stream()
                .collect(Collectors.groupingBy(e -> e.getProgram().getId(), Collectors.counting()));

        List<TrainingProgram> top3Interacted = programs.stream()
                .filter(program -> programExercisedCount.containsKey(program.getId()))
                .sorted((p1, p2) -> Long.compare(
                        programExercisedCount.get(p2.getId()),
                        programExercisedCount.get(p1.getId())
                ))
                .limit(3)
                .toList();

        List<TrainerDashboardAnalyticsResponse.TopProgramDashboardData> topInteracted = new ArrayList<>();
        top3Interacted.forEach(p-> topInteracted.add(new TrainerDashboardAnalyticsResponse.TopProgramDashboardData(p.getName(), programExercisedCount.get(p.getId()))));

        List<TrainerDashboardAnalyticsResponse.TopProgramDashboardData>
                topJoined =
                programs.stream()
                .map(tp -> new TrainerDashboardAnalyticsResponse.TopProgramDashboardData(tp.getName(), tp.getTraineeOnTrainingProgram().size()))
                .sorted(Comparator.comparingDouble(TrainerDashboardAnalyticsResponse.TopProgramDashboardData::getValue).reversed())
                .limit(3)
                .toList();

        List<TrainerDashboardAnalyticsResponse.TopProgramDashboardData>
                topVoted =
                programs
                .stream()
                .map(tp -> new TrainerDashboardAnalyticsResponse.TopProgramDashboardData(tp.getName(), tp.getTrainingProgramRatings().stream().mapToDouble(ProgramRating::getRate).average().orElse(0)))
                .sorted(Comparator.comparingDouble(TrainerDashboardAnalyticsResponse.TopProgramDashboardData::getValue).reversed())
                .limit(3)
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
        response.setTotalPrograms(List.of(totalProgram));
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
                : traineeExercisingRepository.findAllByProgramIdAndTraineeId(request.getProgramId(), request.getTraineeId());

        for (Instant current = request.getFrom(); current.isBefore(request.getTo()) || current.equals(request.getTo()); current = current.plus(Duration.ofDays(1))) {
            Instant finalCurrent = current;

            var exerciseSets = traineeExercising.stream()
                    .filter(te -> te.getDateTaken().isBefore(finalCurrent) || te.getDateTaken().equals(finalCurrent))
                    .flatMap(te -> te.getExercisesFeedback().stream())
                    .filter(ef -> ef.getExercise().getId() == request.getExerciseId())
                    .flatMap(ef -> ef.getExerciseSetsFeedback().stream()).toList();

            long completed = exerciseSets
                    .stream()
                    .filter(esf -> esf.getCompleted())
                    .count();

            long skipped = exerciseSets
                    .stream()
                    .filter(esf -> esf.getSkipped() || esf.getExerciseFeedback().getSkipped())
                    .count();

            long total = exerciseSets.size();

            double percentSkipped = total == 0 ? 0 : (double) skipped / total;
            double percentCompleted =  total == 0 ? 0 : (double) completed / total;

            response.getData().add(new TrainerEngagementAnalyticsResponse.AnalyticsEngagementData(current, percentSkipped, percentCompleted));
        }

        return response;
    }
}
