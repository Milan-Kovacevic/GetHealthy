package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.models.entities.*;
import dev.gethealthy.app.models.requests.ProgressAnalyticsRequest;
import dev.gethealthy.app.models.responses.TraineeDashboardAnalyticsResponse;
import dev.gethealthy.app.models.responses.TraineeProgressAnalyticsResponse;
import dev.gethealthy.app.models.responses.TrainerPopularityAnalyticsResponse;
import dev.gethealthy.app.repositories.TraineeExercisingRepository;
import dev.gethealthy.app.repositories.TraineeOnTrainingProgramRepository;
import dev.gethealthy.app.repositories.TraineeRepository;
import dev.gethealthy.app.services.TraineeAnalyticsService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class TraineeAnalyticsServiceImpl implements TraineeAnalyticsService {
    private final TraineeOnTrainingProgramRepository traineeOnTrainingProgramRepository;
    private final TraineeExercisingRepository traineeExercisingRepository;
    private final TraineeRepository traineeRepository;

    @Override
    public TraineeDashboardAnalyticsResponse getGeneralAnalytics(int userId) {
        TraineeDashboardAnalyticsResponse response = new TraineeDashboardAnalyticsResponse();

        var allTraineePrograms = traineeOnTrainingProgramRepository.findAllByUserId(userId).stream().map(TraineeOnTrainingProgram::getProgram).toList();
        var traineeExercising = traineeExercisingRepository.findAllByUserId(userId).stream().toList();
        var interactedPrograms = traineeExercising.stream().map(TraineeExercising::getProgram).toList();
        List<TraineeDashboardAnalyticsResponse.TotalJoinedProgramsData> totalJoined = new ArrayList<>();
        long interacted = allTraineePrograms
                .stream().
                filter(interactedPrograms::contains)
                .count();
        long nonInteracted = allTraineePrograms.size() - interacted;

        totalJoined.add(new TraineeDashboardAnalyticsResponse.TotalJoinedProgramsData(
                interacted,
                nonInteracted
        ));

        List<Map.Entry<TrainingProgram, Long>> top3Interacted = interactedPrograms.stream()
                .collect(Collectors.groupingBy(e -> e, Collectors.counting()))
                .entrySet()
                .stream()
                .sorted((e1, e2) -> Long.compare(e2.getValue(), e1.getValue()))
                .limit(3)
                .toList();

        List<TraineeDashboardAnalyticsResponse.TopProgramsDashboardData> topInteractedPrograms = new ArrayList<>();
        top3Interacted.forEach(e-> topInteractedPrograms.add(new TraineeDashboardAnalyticsResponse.TopProgramsDashboardData(e.getKey().getName(), e.getValue())));

        var skippedExerciseFeedback = traineeExercising.stream().flatMap(te -> te.getExercisesFeedback().stream()).filter(e -> e.getSkipped() || e.getExerciseSetsFeedback().stream().anyMatch(ExerciseSetFeedback::getSkipped)).toList();
        List<Map.Entry<Exercise, Long>> top3Skipped = skippedExerciseFeedback.stream()
                .collect(Collectors.groupingBy(ExerciseFeedback::getExercise, Collectors.counting()))
                .entrySet()
                .stream()
                .sorted((e1, e2) -> Long.compare(e2.getValue(), e1.getValue()))
                .limit(3)
                .toList();

        List<TraineeDashboardAnalyticsResponse.TopExerciseDashboardData> topSkippedExercises = new ArrayList<>();
        top3Skipped.forEach(e -> topSkippedExercises.add(new TraineeDashboardAnalyticsResponse.TopExerciseDashboardData(e.getKey().getName(), e.getValue())));

        var completedExerciseSetFeedback = traineeExercising.stream().flatMap(te -> te.getExercisesFeedback().stream()).flatMap(ef -> ef.getExerciseSetsFeedback().stream()).filter(ExerciseSetFeedback::getCompleted).toList();
        List<Map.Entry<ExerciseSetFeedback, Long>> top3Favorite = completedExerciseSetFeedback.stream()
                .collect(Collectors.groupingBy(e -> e, Collectors.counting()))
                .entrySet()
                .stream()
                .sorted((e1, e2) -> Long.compare(e2.getValue(), e1.getValue()))
                .limit(3)
                .toList();

        List<TraineeDashboardAnalyticsResponse.TopExerciseDashboardData> topFavoriteExercises = new ArrayList<>();
        top3Favorite.forEach(e -> topFavoriteExercises.add(new TraineeDashboardAnalyticsResponse.TopExerciseDashboardData(e.getKey().getExerciseFeedback().getExercise().getName(), e.getValue())));

        response.setTotalJoined(totalJoined);
        response.setTopInteractedPrograms(topInteractedPrograms);
        response.setTopSkippedExercises(topSkippedExercises);
        response.setTopFavoriteExercises(topFavoriteExercises);

        return response;
    }

    @Override
    public TraineeProgressAnalyticsResponse getEngagementAnalytics(int userId, ProgressAnalyticsRequest request) {
        TraineeProgressAnalyticsResponse response = new TraineeProgressAnalyticsResponse();
        response.setData(new ArrayList<>());

        var traineeExercisings = traineeExercisingRepository.findAllByUserIdAndDateTakenBetweenOrderByDateTaken(userId, request.getFrom(), request.getTo());
        response.setData(
                traineeExercisings
                .stream()
                .flatMap(te -> te.getExercisesFeedback().stream())
                .filter(ef -> ef.getExercise().getId() == request.getExerciseId())
                .map(ef -> ef.getExerciseSetsFeedback()
                        .stream()
                        .max(Comparator.comparingDouble(esf -> Double.parseDouble(esf.getFirstMetricValueFeedback())))
                        .orElse(new ExerciseSetFeedback())
                )
                .map(esf -> new TraineeProgressAnalyticsResponse.TraineeProgressData(
                       esf.getExerciseFeedback().getTraineeExercising().getDateTaken(),
                        Double.parseDouble(esf.getFirstMetricValueFeedback()),
                        Double.parseDouble(esf.getSecondMetricValueFeedback())))
                .toList()
        );

        return response;
    }
}
