import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "../ui/phone-input";
import { cn } from "@/lib/utils";

type PhoneInputFormFieldProps = {
  control: any;
  label: string;
  name: string;
  description?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

const PhoneInputFormField = (props: PhoneInputFormFieldProps) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={cn("space-y-0.5", props.className)}>
          <FormLabel className="text-left">{props.label}</FormLabel>
          <FormControl className="w-full">
            <PhoneInput
              placeholder={props.placeholder}
              {...field}
              disabled={props.disabled}
            />
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
};

export default PhoneInputFormField;
