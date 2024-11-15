import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SelectFormFieldProps = {
  control: any;
  name: string;
  display?: string;
  description?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  className?: string;
  triggerName?: string;
};

function SelectFormField(props: SelectFormFieldProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={cn("w-full space-y-0.5", props.className)}>
          {props.display && <FormLabel>{props.display}</FormLabel>}
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <SelectTrigger className="w-full">
                {props.options.find((option) => option.value === field.value)
                  ?.label ||
                  props.triggerName ||
                  "Select an option"}
              </SelectTrigger>
              <SelectContent>
                {props.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
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
}

export default SelectFormField;
