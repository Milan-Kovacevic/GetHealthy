interface IUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: string;
  role: string;
  enabled: boolean;
}

interface IUserDetailsResponse extends IUserResponse {
  email: string;
  lastAccessed?: string;
  dateOfBirth?: string;
  gender: string;
  profilePictureFilePath?: string;
}
