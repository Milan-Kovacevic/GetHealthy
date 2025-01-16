package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.models.entities.ExerciseSetFeedback;
import dev.gethealthy.app.models.entities.ProgramRating;
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

        var programs = traineeOnTrainingProgramRepository.findAllByUserId(userId).stream().map(totp -> totp.getProgram()).toList();
        List<TraineeDashboardAnalyticsResponse.TotalJoinedProgramsData> totalJoined = new ArrayList<>();
        totalJoined.add(new TraineeDashboardAnalyticsResponse.TotalJoinedProgramsData(
                programs
                    .stream().
                    filter(p -> !traineeExercisingRepository.findAllByProgramIdAndUserId(p.getId(), userId).isEmpty())
                    .count(),
                programs
                    .stream().
                    filter(p -> traineeExercisingRepository.findAllByProgramIdAndUserId(p.getId(), userId).isEmpty())
                    .count())
        );

        List<TraineeDashboardAnalyticsResponse.TopProgramsDashboardData> topInteractedPrograms = programs
            .stream().sorted(Comparator.comparingLong(p-> traineeExercisingRepository.findAllByProgramIdAndUserId(p.getId(), userId).stream().count()))
                .limit(3).map(p-> new TraineeDashboardAnalyticsResponse.TopProgramsDashboardData(p.get))
                

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
