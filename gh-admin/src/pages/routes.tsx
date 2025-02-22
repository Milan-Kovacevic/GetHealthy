import { Authenticated, ErrorComponent } from "@refinedev/core";
import { CatchAllNavigate, NavigateToResource } from "@refinedev/react-router";
import { Route, Routes } from "react-router";
import { Login } from "./login";
import { UserList, UserShow } from "./users";
import { CategoryCreate, CategoryEdit, CategoryList } from "./categories";
import {
  ExerciseList,
  ExerciseShow,
  ExerciseCreate,
  ExerciseEdit,
} from "./exercises";
import { AuthLayout, MainLayout } from "@/components/layout";
import { RequestList, RequestShow } from "./requests";
import { MetricList, MetricCreate, MetricEdit } from "./metrics";

export default function PageRoutes() {
  return (
    <Routes>
      <Route
        element={
          <Authenticated key="authenticated-outer" fallback={<AuthLayout />}>
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorComponent />} />
      </Route>
      <Route
        element={
          <Authenticated
            key="authenticated-inner"
            fallback={<CatchAllNavigate to="/login" />}
          >
            <MainLayout />
          </Authenticated>
        }
      >
        <Route index element={<NavigateToResource resource="users" />} />
        <Route path="/users">
          <Route index element={<UserList />} />
          <Route path="show/:id" element={<UserShow />} />
        </Route>
        <Route path="/users/requests">
          <Route index element={<RequestList />} />
          <Route path="show/:id" element={<RequestShow />} />
        </Route>
        <Route path="/categories">
          <Route index element={<CategoryList />} />
          <Route path="create" element={<CategoryCreate />} />
          <Route path="edit/:id" element={<CategoryEdit />} />
        </Route>
        <Route path="/exercises">
          <Route index element={<ExerciseList />} />
          <Route path="create" element={<ExerciseCreate />} />
          <Route path="edit/:id" element={<ExerciseEdit />} />
          <Route path="show/:id" element={<ExerciseShow />} />
        </Route>
        <Route path="/exercises/metrics">
          <Route index element={<MetricList />} />
          <Route path="create" element={<MetricCreate />} />
          <Route path="edit/:id" element={<MetricEdit />} />
        </Route>
      </Route>
    </Routes>
  );
}
