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
};

const PhoneInputFormField = (props: PhoneInputFormFieldProps) => {
  return (
    <FormField
      control={props.control}
      name="phone"
      render={({ field }) => (
        <FormItem className={cn("flex flex-col items-start", props.className)}>
          <FormLabel className="text-left">{props.label}</FormLabel>
          <FormControl className="w-full">
            <PhoneInput placeholder={props.placeholder} {...field} />
          </FormControl>
          {props.description && (
            <FormDescription className="text-xs ml-0.5">
              {props.description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhoneInputFormField;
