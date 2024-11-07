import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import appIcon from "@/assets/applogo.png";
import { Link } from "react-router-dom";

type AuthCardHeaderProps = {
  title: string;
  description: string;
};

function AuthCardHeader(props: AuthCardHeaderProps) {
  const { title, description } = props;

  return (
    <CardHeader className="items-center">
      <Link to="/" className="self-center">
        <img src={appIcon} alt="logo" className="h-16 w-20 dark:filter-white" />
      </Link>
      <CardTitle className="sm:text-xl text-lg text-center leading-tight sm:leading-normal">
        {title}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
}

export default AuthCardHeader;
