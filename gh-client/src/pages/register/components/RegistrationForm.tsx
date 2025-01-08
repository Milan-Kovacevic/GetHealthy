import AccountSelectorForm from "./AccountSelectorForm";
import AccountInfoForm from "./AccountInfoForm";
import PersonalDetailsForm from "./PersonalDetailsForm";
import { AccountType, TRAINEE_ACCOUNT_TYPE } from "@/utils/constants";
import {
  AccountInfoFormSchema,
  TraineeDetailsFormSchema,
  TrainerDetailsFormSchema,
} from "@/schemas/register-form-schema";
import { useState } from "react";
import { UserRegistration } from "@/api/models/authentication";
import { UserRole } from "@/api/enums/user-role";

type RegistrationFormProps = {
  loading: boolean;
  currentStep: number;
  onPreviousStep: () => void;
  onNextStep: () => void;
  selectedAccountType?: AccountType;
  onSubmit: (data: UserRegistration) => void;
};

export default function RegistrationForm(props: RegistrationFormProps) {
  const { loading, currentStep, onNextStep, onPreviousStep, onSubmit } = props;
  const [selectedAccountType, setSelectedAccountType] = useState<AccountType>();
  const [accountInfo, setAccountInfo] = useState<AccountInfoFormSchema>();

  const onAccountTypeSelected = (type: AccountType) => {
    setSelectedAccountType(type);
    onNextStep();
  };

  const onAccountInfoSubmitted = (data: AccountInfoFormSchema) => {
    setAccountInfo(data);
    onNextStep();
  };

  const constructRegistrationFormData = (
    accountInfo: AccountInfoFormSchema,
    details: TraineeDetailsFormSchema
  ) => {
    const data: UserRegistration = {
      username: accountInfo.username,
      email: accountInfo.email,
      password: accountInfo.password,
      firstName: details.firstName,
      lastName: details.lastName,
      role:
        selectedAccountType == TRAINEE_ACCOUNT_TYPE
          ? UserRole.TRAINEE
          : UserRole.TRAINER,
    };

    return data;
  };

  const handleTrainerDetailsSubmitted = (details: TrainerDetailsFormSchema) => {
    if (!accountInfo || !selectedAccountType) return;
    var data = constructRegistrationFormData(accountInfo, details);
    data.qualification = details.qualification;
    onSubmit(data);
  };

  const handleTraineeDetailsSubmitted = (details: TraineeDetailsFormSchema) => {
    if (!accountInfo || !selectedAccountType) return;
    var data = constructRegistrationFormData(accountInfo, details);
    onSubmit(data);
  };

  return (
    <div className="">
      <AccountSelectorForm
        className={currentStep == 1 ? "block" : "hidden"}
        onAccountSelected={onAccountTypeSelected}
      />
      <AccountInfoForm
        className={currentStep == 2 ? "block" : "hidden"}
        onGoBack={onPreviousStep}
        onInfoSubmitted={onAccountInfoSubmitted}
      />
      <PersonalDetailsForm
        hidden={currentStep != 3}
        onGoBack={onPreviousStep}
        onTraineeDetailsSubmitted={handleTraineeDetailsSubmitted}
        onTrainerDetailsSubmitted={handleTrainerDetailsSubmitted}
        accountType={selectedAccountType}
        loading={loading}
      />
    </div>
  );
}
