package dev.gethealthy.app.services;

import org.springframework.web.multipart.MultipartFile;

import dev.gethealthy.app.models.requests.UserUpdateRequest;
import dev.gethealthy.app.models.responses.SingleUserResponse;
import dev.gethealthy.app.models.responses.UserInfoResponse;

public interface UserService {
    SingleUserResponse getUser(Integer userId);
    UserInfoResponse getUserInfo(Integer userId);
    void updateUser(Integer userId, UserUpdateRequest request, MultipartFile file);
    String updateProfilePicture(Integer userId, MultipartFile file);
    void leaveTrainingProgram(Integer userId, Integer programId);
}
