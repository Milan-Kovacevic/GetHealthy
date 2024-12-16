import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./ProfileForm";

const ProfilePage = () => {
  return (
    <div className="flex-1 lg:max-w-2xl">
      <div className="space-y-6 ">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
          <Separator className="my-6" />
          <ProfileForm isTrainer={true} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
