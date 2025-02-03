import { dataProvider } from "@/providers/data";
import { mockProvider } from "@/providers/data/mockProvider";
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
    show: "/users/requests/show/:id",
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
      dataProviderName: "filtered",
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
      parent: "exercises-root",
      dataProviderName: "filtered",
    },
  },
  {
    name: "metrics",
    list: "/exercises/metrics",
    create: "/exercises/metrics/create",
    edit: "/exercises/metrics/edit/:id",
    meta: {
      canDelete: false,
      icon: <LayersIcon />,
      label: "Metrics",
      parent: "exercises-root",
      dataProviderName: "filtered",
    },
  },
];

export const dataProviders: DataProviders = {
  default: dataProvider(),
  filtered: dataProvider("filter"),
  mock: mockProvider(),
};
