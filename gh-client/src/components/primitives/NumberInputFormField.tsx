import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NumberField } from "./NumberField";
import { cn } from "@/lib/utils";

type NumberInputFormFieldProps = {
  control: any;
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
};

const NumberInputFormField = (props: NumberInputFormFieldProps) => {
  return (
    <FormField
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value } }) => (
        <FormItem className={cn("", props.className)}>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <NumberField
              value={value}
              onChange={onChange}
              min={props.min ?? 0}
              max={props.max ?? 100}
              step={props.step ?? 1}
              className="mt-2"
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

export default NumberInputFormField;
