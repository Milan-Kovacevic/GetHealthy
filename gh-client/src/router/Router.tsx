import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import { TrainingProgramsPage } from "@/pages/training-programs/TrainingProgramsPage";
import { ManageTrainingProgramsPage } from "@/pages/training-programs/ManageTrainingProgramsPage";
import ProgramDetailsLayout from "@/layouts/ProgramDetailsLayout";
import TrainingProgramDetails from "@/pages/program-details/components/TrainingProgramDetails";
import TrainingProgramTrainees from "@/pages/program-details/components/TrainingProgramTrainees";
import TrainingProgramReviews from "@/pages/program-details/components/TrainingProgramReviews";
import ProgramTrainerInfo from "@/pages/program-details/components/ProgramTrainerInfo";
import EditTrainingProgramPage from "@/pages/create-edit-training-program/EditTrainingProgramPage";
import RootLayout from "@/layouts/RootLayout";
import AboutUsPage from "@/pages/about/AboutUsPage";
import CreateTrainingProgramPage from "@/pages/create-edit-training-program/CreateTrainingProgramPage";
import GeneralInformationForm from "@/pages/create-edit-training-program/components/GeneralInformationForm";
import LandingPage from "@/pages/landing/LandingPage";
import LoginPage from "@/pages/login/LoginPage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import RegisterPage from "@/pages/register/RegisterPage";
import { createBrowserRouter, Navigate } from "react-router-dom";
import TrainingSchedulePage from "@/pages/training-schedule/TrainingSchedulePage";
import ProfilePageLayout from "@/pages/profile/ProfilePageLayout";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    element: <RootLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/about", element: <AboutUsPage /> },
      {
        element: <MainLayout />,
        children: [
          {
            path: "/schedule",
            element: <TrainingSchedulePage />,
          },
          // Routes for every role
          {
            path: "/programs",
            children: [
              {
                index: true,
                element: <TrainingProgramsPage />,
              },
              {
                path: "manage",
                element: <ManageTrainingProgramsPage />,
              },
            ],
          },

          {
            path: "/programs/:id",
            element: <ProgramDetailsLayout />,
            children: [
              { path: "", element: <Navigate replace={true} to="details" /> },

              {
                path: "details",

                element: <TrainingProgramDetails />,
              },
              {
                path: "trainer-info",
                element: <ProgramTrainerInfo />,
              },
              {
                path: "reviews",
                element: <TrainingProgramReviews />,
              },
              {
                path: "trainees",
                element: <TrainingProgramTrainees />,
              },
            ],
          },
          {
            path: "profile",
            element: <ProfilePageLayout />,
            children: [{}],
          },
          // Routes for trainers only
          {
            path: "generalInfo",
            element: <GeneralInformationForm />,
          },
          {
            path: "create-training-program",
            element: <CreateTrainingProgramPage />,
          },
          {
            path: "edit-training-program/:id",
            element: <EditTrainingProgramPage />,
          },
          // Routes for trainees only
          {},
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
