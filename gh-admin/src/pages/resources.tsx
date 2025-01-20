import { dataProvider } from "@/providers/data";
import { DataProviders, ResourceProps } from "@refinedev/core";
import {
  BookUserIcon,
  DumbbellIcon,
  LayersIcon,
  TagsIcon,
  UserIcon,
} from "lucide-react";

export const endpointResources: ResourceProps[] = [
  {
    name: "users-root",
    meta: {
      canDelete: false,
      label: "About users",
    },
  },
  {
    name: "users",
    list: "/users",
    create: "/users/create",
    edit: "/users/edit/:id",
    show: "/users/show/:id",
    meta: {
      canDelete: true,
      icon: <UserIcon />,
      label: "Users",
      parent: "users-root",
    },
  },
  {
    name: "requests",
    list: "/users/requests",
    show: "/users/requests/:id",
    meta: {
      canDelete: true,
      icon: <BookUserIcon />,
      label: "Registration requests",
      parent: "users-root",
    },
  },

  {
    name: "categories",
    list: "/categories",
    create: "/categories/create",
    edit: "/categories/edit/:id",
    meta: {
      canDelete: true,
      icon: <TagsIcon />,
      label: "Program categories",
      dataProviderName: "category",
    },
  },

  {
    name: "exercises-root",
    meta: {
      canDelete: false,
      label: "About exercises",
    },
  },
  {
    name: "exercises",
    list: "/exercises",
    create: "/exercises/create",
    show: "/exercises/show/:id",
    edit: "/exercises/edit/:id",
    meta: {
      canDelete: true,
      icon: <DumbbellIcon />,
      label: "Exercises",
      dataProviderName: "exercise",
      parent: "exercises-root",
    },
  },
  {
    name: "metrics",
    list: "/exercises/metrics",
    create: "/exercises/metrics/create",
    show: "/exercises/metrics/show/:id",
    edit: "/exercises/metrics/edit/:id",
    meta: {
      canDelete: false,
      icon: <LayersIcon />,
      label: "Metrics",
      parent: "exercises-root",
      dataProviderName: "metric",
    },
  },
];

export const dataProviders: DataProviders = {
  default: dataProvider(),
  exercise: dataProvider("filter"),
  category: dataProvider("filter"),
  metric: dataProvider("filter"),
};
