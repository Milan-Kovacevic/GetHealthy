import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import ProgramDetailsLayout from "@/pages/program-details/ProgramDetailsLayout";
import RootLayout from "@/layouts/RootLayout";
import AboutUsPage from "@/pages/about/AboutUsPage";
import CreateTrainingProgramPage from "@/pages/create-edit-training-program/CreateTrainingProgramPage";
import EditTrainingProgramPage from "@/pages/create-edit-training-program/EditTrainingProgramPage";
import LandingPage from "@/pages/landing/LandingPage";
import LoginPage from "@/pages/login/LoginPage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import ProfilePageLayout from "@/pages/profile/ProfilePageLayout";
import ProgramTrainerInfo from "@/pages/program-details/components/trainer-info/ProgramTrainerInfo";
import TrainingProgramDetails from "@/pages/program-details/components/exercises/TrainingProgramDetails";
import TrainingProgramReviews from "@/pages/program-details/components/reviews/TrainingProgramReviews";
import TrainingProgramTrainees from "@/pages/program-details/components/participants/TrainingProgramTrainees";
import RegisterPage from "@/pages/register/RegisterPage";
import { PersonalTrainingProgramsPage } from "@/pages/training-programs/PersonalTrainingProgramsPage";
import { TrainingProgramsPage } from "@/pages/training-programs/TrainingProgramsPage";
import TrainingProgramSchedulePage from "@/pages/training-schedule/TrainingProgramSchedulePage";
import ProfilePage from "@/pages/profile/components/ProfilePage";
import AppearancePage from "@/pages/profile/components/AppearancePage";
import AccountPage from "@/pages/profile/components/AccountPage";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ExercisesPage from "@/pages/exercises/ExercisesPage";
import AnalyticsPage from "@/pages/analytics/AnalyticsPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    element: <RootLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/about", element: <AboutUsPage /> },
      { path: "/forbidden", element: <NotFoundPage /> },
      {
        element: <MainLayout />,
        children: [
          {
            path: "/schedule",
            element: <TrainingProgramSchedulePage />,
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
                element: <PersonalTrainingProgramsPage />,
              },
              {
                path: "create",
                element: <CreateTrainingProgramPage />,
              },
              {
                path: ":id/edit",
                element: <EditTrainingProgramPage />,
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
            path: "/exercises",
            element: <ExercisesPage />,
          },
          {
            path: "/statistics",
            element: <AnalyticsPage />,
          },
          {
            path: "profile",
            element: <ProfilePageLayout />,
            children: [
              {
                path: "",
                element: <ProfilePage />,
              },
              {
                path: "account",
                element: <AccountPage />,
              },
              {
                path: "appearance",
                element: <AppearancePage />,
              },
            ],
          },
          // Routes for trainers only

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
