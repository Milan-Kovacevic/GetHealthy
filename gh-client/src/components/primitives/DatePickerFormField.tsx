import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

type DatePickerFormFieldProps = {
  control: any;
  name: string;
  display?: string;
  label: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  className?: string;
  onChange?: (e: any, field: any) => void;
};

const DatePickerFormField = (props: DatePickerFormFieldProps) => {
  function formatDateString(dateString: string | Date): string {
    const date = new Date(dateString);

    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    return year + "-" + month + "-" + day;
  }

  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "space-y-0.5 flex-1 min-w-[200px]",
            props.disabled && "cursor-not-allowed",
            props.className
          )}
        >
          <FormLabel>{props.label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={props.disabled}
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{props.placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) =>
                  field.onChange(date ? formatDateString(date) : null)
                }
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {props.description && (
            <FormDescription className="text-xs ml-0.5">
              {props.description}
            </FormDescription>
          )}
          <FormMessage className="text-xs ml-0.5" />
        </FormItem>
      )}
    />
  );
};

export default DatePickerFormField;
