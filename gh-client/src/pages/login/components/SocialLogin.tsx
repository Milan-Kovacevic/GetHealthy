import { Button } from "@/components/ui/button";
import { GlobeIcon } from "lucide-react";
import React from "react";

export default function SocialLogin() {
  return (
    <>
      <Button variant="outline" className="w-full">
        <GlobeIcon className="mr-2 size-4" />
        Continue with Google
      </Button>
      <div className="flex items-center gap-4">
        <span className="h-px w-full bg-input"></span>
        <span className="text-xs text-muted-foreground">OR</span>
        <span className="h-px w-full bg-input"></span>
      </div>
    </>
  );
}
