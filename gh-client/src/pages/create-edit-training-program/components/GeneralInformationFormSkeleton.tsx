import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function GeneralInformationFormSkeleton() {
  return (
    <div className="mt-5 w-full">
      <Skeleton className="h-10 mt-3 max-w-[300px] w-full" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-10">
        <div className="flex flex-col gap-4 lg:col-span-3"></div>

        <div className="lg:col-span-2">
          <div>
            <Skeleton className="h-10 mt-3" />
          </div>
        </div>
      </div>

      <div
        className={
          "flex md:flex-row flex-col flex-wrap justify-between md:items-end items-start gap-x-2 gap-y-6 pt-9"
        }
      ></div>

      <Separator className="my-4" />
    </div>
  );
}
