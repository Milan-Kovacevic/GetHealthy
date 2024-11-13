import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Download } from "lucide-react";
import trainerImg from "@/assets/trainer-example.png";

interface TrainerInfoProps {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  avatarUrl: string;
  biography: string;
}

export default function ProgramTrainerInfo() {
  return (
    <Card className="w-full border-0">
      <CardHeader className="relative">
        <Button
          variant="secondary"
          className="absolute top-4 mt-8 right-4"
          aria-label="Download trainer qualification"
        >
          <div className="flex items-center gap-1.5">
            <Download className="h-4 w-4" />
            <p className="sm:block hidden">Download qualification</p>
          </div>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <Avatar className="w-24 h-24 md:w-32 md:h-32">
            <AvatarImage src={trainerImg} alt="avatar" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div>
              <h2 className="text-xl font-bold">Anja Mirković</h2>
              <p className="text-sm text-muted-foreground">Personal trainer</p>
            </div>
            <div className="flex items-center mt-2">
              <div>
                <p className="text-sm font-medium">3.8.1995.</p>
              </div>
              <span className="mx-4 w-0.5 h-4 bg-foreground/50" />
              <div>
                <p className="text-sm">Female</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-base font-medium">anjam@mail.com</p>
            </div>
          </div>
        </div>
        <div className="mt-6 max-w-screen-lg">
          <h3 className="text-base text-muted-foreground text-justify text-pretty">
            Magistar sporta i tjelesnog odgoja sa dugogodišnjim iskustvom
            personal trenera u fitness centrima. Nekoliko godina je radila kao
            trener plivanja u klubu „Adriatic“ na olimpijskom bazenu Otoka. Rad
            se bazirao na radu sa neplivačima i djecom predškolskog uzrasta i
            mlađe.
          </h3>
        </div>
      </CardContent>
    </Card>
  );
}
