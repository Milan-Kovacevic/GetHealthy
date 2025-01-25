package dev.gethealthy.app.services;

import dev.gethealthy.app.models.responses.UserDetailsResponse;
import dev.gethealthy.app.models.responses.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import dev.gethealthy.app.models.requests.UserUpdateRequest;
import dev.gethealthy.app.models.responses.SingleUserResponse;
import dev.gethealthy.app.models.responses.UserInfoResponse;

import java.util.List;

public interface UserService {
    Page<UserDetailsResponse> getAllUsers(Pageable page);
    UserDetailsResponse getUser(Integer userId);
    UserInfoResponse getUserInfo(Integer userId);
    void updateUser(Integer userId, UserUpdateRequest request, MultipartFile file);
    String updateProfilePicture(Integer userId, MultipartFile file);
    void leaveTrainingProgram(Integer userId, Integer programId);
}
