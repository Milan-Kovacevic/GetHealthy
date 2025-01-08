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
    <CardHeader className="items-center space-y-0">
      <Link to="/" className="self-center">
        <img src={appIcon} alt="logo" className="h-16 w-20 dark:filter-white" />
      </Link>
      <CardTitle className="sm:text-xl text-lg text-center leading-tight sm:leading-normal pt-1">
        {title}
      </CardTitle>
      <CardDescription className="text-center pt-0.5">
        {description}
      </CardDescription>
    </CardHeader>
  );
}

type AuthFooterProps = {
  text: string;
  linkHref: string;
  linkLabel: string;
};

function AuthFooter({ text, linkHref, linkLabel }: AuthFooterProps) {
  return (
    <div className="mx-auto flex gap-1 text-sm">
      <p>{text}</p>
      <Link
        to={linkHref}
        className="underline text-foreground/80 hover:text-foreground"
      >
        {linkLabel}
      </Link>
    </div>
  );
}

export { AuthCardHeader, AuthFooter };
