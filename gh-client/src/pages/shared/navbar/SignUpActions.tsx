import { AuthUser } from "@/api/models/authentication";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { capitalize, cn, pictureUrl } from "@/lib/utils";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type SignUpActionsProps = {
  isMobile: boolean;
  pendingLogout: boolean;
  authUser?: AuthUser;
  onLogout: () => void;
};

export default function SignUpActions(props: SignUpActionsProps) {
  const { pendingLogout, isMobile, onLogout, authUser } = props;
  const navigate = useNavigate();

  return !authUser ? (
    <div
      className={cn(isMobile ? "flex flex-col gap-2.5" : "flex flex-row gap-2")}
    >
      <Button
        onClick={() => {
          navigate("/login");
        }}
        size="sm"
        variant={"outline"}
      >
        Log in
      </Button>
      <Button
        onClick={() => {
          navigate("/register");
        }}
        size="sm"
      >
        Sign up
      </Button>
    </div>
  ) : !isMobile ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar
            className={cn(
              "h-9 w-9 border border-foreground/20 dark:border-foreground/60",
              pendingLogout && "animate-pulse"
            )}
          >
            <AvatarImage
              src={pictureUrl(authUser.profilePictureFilePath)}
              alt="@"
            />
            <AvatarFallback className="text-base">
              {authUser.firstName[0]}
              {authUser.lastName[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-foreground/80 leading-tight tracking-tight">
              {authUser.firstName} {authUser.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {capitalize(authUser.role)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer text-sm text-foreground/80 hover:text-foreground/80"
            onClick={() => navigate("/profile")}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-sm text-foreground/80 hover:text-foreground/80"
            onClick={() => navigate("/profile/appearance")}
          >
            Customize
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={pendingLogout}
          className="cursor-pointer"
          onClick={onLogout}
        >
          <LogOutIcon className="h-4 w-4 mr-0 mt-0.5" />
          <span className="">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button
      disabled={pendingLogout}
      onClick={onLogout}
      size="sm"
      variant={"secondary"}
      className={cn("min-w-20 w-full")}
    >
      {pendingLogout ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <span className="mb-0.5">Log out</span>
      )}
    </Button>
  );
}
