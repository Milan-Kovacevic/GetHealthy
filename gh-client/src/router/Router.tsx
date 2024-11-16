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
import ProgramTrainerInfo from "@/pages/program-details/components/ProgramTrainerInfo";
import TrainingProgramDetails from "@/pages/program-details/components/TrainingProgramDetails";
import TrainingProgramReviews from "@/pages/program-details/components/TrainingProgramReviews";
import TrainingProgramTrainees from "@/pages/program-details/components/TrainingProgramTrainees";
import RegisterPage from "@/pages/register/RegisterPage";
import TrainingProgramsPage from "@/pages/training-programs/TrainingProgramsPage";
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
          // Routes for every role
          {
            path: "/programs",
            element: <TrainingProgramsPage />,
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
            path: "generalInfo",
            element: <GeneralInformationForm />,
          },
          {
            path: "create-training-plan",
            element: <CreateTrainingProgramPage />,
          },
          {
            path: "edit-training-plan/:id",
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
