import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import AuthLayout from "@/layouts/AuthLayout";
import LandingPage from "@/pages/landing/LandingPage";
import AboutUsPage from "@/pages/about/AboutUsPage";
import LoginPage from "@/pages/login/LoginPage";
import RegisterPage from "@/pages/register/RegisterPage";
import MainLayout from "@/layouts/MainLayout";
import { TrainingProgramsPage } from "@/pages/training-programs/TrainingProgramsPage";
import { ManageTrainingProgramsPage } from "@/pages/training-programs/ManageTrainingProgramsPage";
import ProgramDetailsLayout from "@/layouts/ProgramDetailsLayout";
import TrainingProgramDetails from "@/pages/program-details/components/TrainingProgramDetails";
import TrainingProgramTrainees from "@/pages/program-details/components/TrainingProgramTrainees";
import TrainingProgramReviews from "@/pages/program-details/components/TrainingProgramReviews";
import ProgramTrainerInfo from "@/pages/program-details/components/ProgramTrainerInfo";
import SchedulePage from "@/pages/schedule/SchedulePage";

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
            element: <SchedulePage />,
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
              { path: "", element: <Navigate to="details" /> },

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
          // Routes for trainers only
          {
            path: "create-trainer-program",
            element: <ExercisesForm />,
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
