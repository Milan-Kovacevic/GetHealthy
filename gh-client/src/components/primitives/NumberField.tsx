import React from "react";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import clsx from "clsx";

type NumberFieldProps = {
  className?: string;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export const NumberField: React.FC<NumberFieldProps> = ({
  className,
  value = 0,
  onChange,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
}) => {
  const [internalValue, setInternalValue] = useState<number>(value);

  const handleIncrement = () => {
    const newValue = Math.min(internalValue + step, max);
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(internalValue - step, min);
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value);
    if (!isNaN(inputValue) && inputValue >= min && inputValue <= max) {
      setInternalValue(inputValue);
      onChange?.(inputValue);
    }
  };

  return (
    <div
      className={clsx(
        "relative flex items-center mt-2 [&>[data-slot=input]]:has(+[data-slot=increment]):pr-5 [&>[data-slot=input]]:has(+[data-slot=decrement]):pl-5",
        className
      )}
    >
      <button
        type="button"
        data-slot="decrement"
        onClick={handleDecrement}
        className={clsx(
          "absolute left-0 p-3 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed disabled:opacity-20",
          internalValue <= min && "disabled"
        )}
      >
        <Minus className="h-4 w-4" />
      </button>

      <input
        type="number"
        data-slot="input"
        value={internalValue}
        onChange={handleInputChange}
        className="flex h-10 w-full rounded-md border border-input bg-background py-2 text-sm text-center ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield"
      />

      <button
        type="button"
        data-slot="increment"
        onClick={handleIncrement}
        className={clsx(
          "absolute right-0 p-3 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed disabled:opacity-20",
          internalValue >= max && "disabled"
        )}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};
