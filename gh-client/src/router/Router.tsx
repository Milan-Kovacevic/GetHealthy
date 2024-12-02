import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import ProgramDetailsLayout from "@/layouts/ProgramDetailsLayout";
import RootLayout from "@/layouts/RootLayout";
import AboutUsPage from "@/pages/about/AboutUsPage";
import CreateTrainingProgramPage from "@/pages/create-edit-training-program/CreateTrainingProgramPage";
import EditTrainingProgramPage from "@/pages/create-edit-training-program/EditTrainingProgramPage";
import GeneralInformationForm from "@/pages/create-edit-training-program/components/GeneralInformationForm";
import LandingPage from "@/pages/landing/LandingPage";
import LoginPage from "@/pages/login/LoginPage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import ProfilePageLayout from "@/pages/profile/ProfilePageLayout";
import ProfilePage from "@/pages/profile/components/ProfilePage";
import ProgramTrainerInfo from "@/pages/program-details/components/ProgramTrainerInfo";
import TrainingProgramDetails from "@/pages/program-details/components/TrainingProgramDetails";
import TrainingProgramReviews from "@/pages/program-details/components/TrainingProgramReviews";
import TrainingProgramTrainees from "@/pages/program-details/components/TrainingProgramTrainees";
import RegisterPage from "@/pages/register/RegisterPage";
import { ManageTrainingProgramsPage } from "@/pages/training-programs/ManageTrainingProgramsPage";
import { TrainingProgramsPage } from "@/pages/training-programs/TrainingProgramsPage";
import TrainingSchedulePage from "@/pages/training-schedule/TrainingSchedulePage";
import { createBrowserRouter, Navigate } from "react-router-dom";

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
            children: [
              {
                path: "",
                element: <ProfilePage />,
              },
            ],
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
