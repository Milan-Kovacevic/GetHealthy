import { defaultAxios } from "@/lib";
import { delay } from "@/lib/utils";
import {
  CreateResponse,
  DataProvider,
  DeleteOneResponse,
  GetListResponse,
  GetOneResponse,
  UpdateResponse,
} from "@refinedev/core";

export const mockProvider = (
  delayTime: number = 500
): Omit<
  Required<DataProvider>,
  "deleteMany" | "getMany" | "createMany" | "updateMany" | "custom"
> => {
  return {
    getOne: async ({ resource, id }) => {
      await delay(delayTime);

      if (resource == "users") {
        const data: IUserDetailsResponse = {
          id: 1,
          firstName: "Marko",
          lastName: "Markovic",
          createdAt: "01/10/2025",
          enabled: Number(id) % 2 == 1,
          role: "TRAINEE",
          email: "test@mail.com",
          gender: "MALE",
          dateOfBirth: "11/05/2000",
          username: "marko123",
          profilePictureFilePath: undefined,
          lastAccessed: undefined,
        };

        return Promise.resolve({
          data: data,
        } as GetOneResponse<any>);
      } else if (resource == "requests") {
        const data: IRegistrationRequestDetailsResponse = {
          id: 1,
          firstName: "Marko",
          lastName: "Markovic",
          email: "test@mail.com",
          issueDate: "01/10/2025",
          description: "This is a mock example of a description ...",
          certificationFilePath: "agenda.pdf",
        };

        return Promise.resolve({
          data: data,
        } as GetOneResponse<any>);
      }

      return Promise.resolve({
        data: {},
      } as GetOneResponse<any>);
    },

    getList: async ({ resource }) => {
      await delay(delayTime);

      if (resource == "users") {
        const data: IUserResponse[] = [
          {
            id: 1,
            firstName: "Marko",
            lastName: "Markovic",
            username: "marko123",
            createdAt: "01/10/2025",
            role: "TRAINEE",
            enabled: true,
          },
          {
            id: 2,
            firstName: "Marija",
            lastName: "Markovic",
            username: "marija_m123",
            createdAt: "01/11/2025",
            role: "TRAINER",
            enabled: false,
          },
        ];

        return {
          data: data,
          total: data.length,
        } as GetListResponse<any>;
      } else if (resource == "requests") {
        const data: IRegistrationRequestResponse[] = [
          {
            id: 1,
            firstName: "Marko",
            lastName: "Markovic",
            issueDate: "01/10/2025",
            description: "This is a mock example of a description",
          },
          {
            id: 2,
            firstName: "Marija",
            lastName: "Markovic",
            issueDate: "01/11/2025",
            description: "This is a mock example of another description",
          },
        ];

        return {
          data: data,
          total: data.length,
        } as GetListResponse<any>;
      }

      return {
        data: [],
        total: 0,
      };
    },

    create: async () => {
      return Promise.resolve({} as CreateResponse<any>);
    },

    update: async () => {
      return Promise.resolve({} as UpdateResponse<any>);
    },

    deleteOne: async () => {
      return Promise.resolve({} as DeleteOneResponse<any>);
    },

    getApiUrl: () => {
      return "";
    },
  };
};
