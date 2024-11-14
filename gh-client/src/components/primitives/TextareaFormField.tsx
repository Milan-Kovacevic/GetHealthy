import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

type InputFormFieldProps = {
  control: any;
  name: string;
  display?: string;
  description?: string;
  placeholder?: string;
  className?: string;
};

function TextareaFormField(props: InputFormFieldProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={cn("w-full space-y-0.5", props.className)}>
          {props.display && <FormLabel className="">{props.display}</FormLabel>}

          <FormControl>
            <Textarea className="" placeholder={props.placeholder} {...field} />
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

export default TextareaFormField;
