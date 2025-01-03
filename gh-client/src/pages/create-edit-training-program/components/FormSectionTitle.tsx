import { CircleIcon } from "lucide-react";

export default function FormSectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center space-x-2">
      <CircleIcon
        strokeWidth={3}
        className="w-2 h-2 mt-0.5 text-black dark:text-white"
      />
      <span className="text-xl font-medium tracking-tight">{title}</span>
    </div>
  );
}
