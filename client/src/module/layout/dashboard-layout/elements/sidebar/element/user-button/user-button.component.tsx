"use client";

import { Avatar, Skeleton } from "@heroui/react";
import { useUserButtonService } from "./user-button.service";

export const UserButtonComponent = () => {
  const thisService = useUserButtonService();
  const { userName, userEmail, userFallback, isLoading } = thisService;

  return (
    <>
      {isLoading ? (
        <div className="flex items-center gap-4 mb-14">
          <Skeleton className="h-10 w-10 rounded-full" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-36 rounded-lg" />

            <Skeleton className="h-4 w-24 rounded-lg" />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 mb-14">
          <Avatar>
            <Avatar.Fallback className="bg-primary text-primary-foreground text-lg">
              {userFallback}
            </Avatar.Fallback>
          </Avatar>

          <div className="max-w-[180px]">
            <p className="text-sm font-medium truncate">{userName}</p>

            <p className="text-sm text-foreground-subtle truncate">
              {userEmail}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
