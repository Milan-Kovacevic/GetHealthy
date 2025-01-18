import { Authenticated, ErrorComponent } from "@refinedev/core";
import { CatchAllNavigate, NavigateToResource } from "@refinedev/react-router";
import { Route, Routes } from "react-router";
import { Login } from "./login";
import { UserCreate, UserEdit, UserList, UserShow } from "./users";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./categories";
import { ExerciseList, ExerciseShow } from "./exercises";
import { AuthLayout, MainLayout } from "@/components/layout";
import { RequestList, RequestShow } from "./requests";
import { MetricList, MetricShow } from "./metrics";

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
          <Route path="create" element={<UserCreate />} />
          <Route path="edit/:id" element={<UserEdit />} />
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
          <Route path="show/:id" element={<CategoryShow />} />
        </Route>
        <Route path="/exercises">
          <Route index element={<ExerciseList />} />
          <Route path="show/:id" element={<ExerciseShow />} />
        </Route>
        <Route path="/exercises/metrics">
          <Route index element={<MetricList />} />
          <Route path="show/:id" element={<MetricShow />} />
        </Route>
      </Route>
    </Routes>
  );
}
