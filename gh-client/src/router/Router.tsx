import { createBrowserRouter } from "react-router-dom";
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
import { TestPage } from "@/pages/test/TestPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    element: <RootLayout />,
    children: [
      {
        path: "/test",
        element: <TestPage></TestPage>,
      },
      { path: "/", element: <LandingPage /> },
      { path: "/about", element: <AboutUsPage /> },
      {
        element: <MainLayout />,
        children: [
          // Routes for every role
          {
            path: "/programs",
            children: [
              {
                index: true,
                element: <TrainingProgramsPage></TrainingProgramsPage>,
              },
              {
                path: "manage",
                element: (
                  <ManageTrainingProgramsPage></ManageTrainingProgramsPage>
                ),
              },
            ],
          },
          // Routes for trainers only
          {},
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
