interface IRegistrationRequestResponse {
  id: number;
  issueDate: string;
  firstName: string;
  lastName: string;
  description: string;
}

interface IRegistrationRequestDetailsResponse
  extends IRegistrationRequestResponse {
  email: string;
  certificationFilePath: string;
}

interface IRegistrationRequestProcessRequest {
  id: number;
  approve: boolean;
}
