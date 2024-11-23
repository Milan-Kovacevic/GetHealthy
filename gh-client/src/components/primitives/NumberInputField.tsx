"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

interface NumberInputFieldProps {
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  value: number;
  setValue: (num: number) => void;
}

export default function NumberInputField({
  min = 0,
  max = 20,

  onChange,
  value,
  setValue,
}: NumberInputFieldProps) {
  const handleIncrement = () => {
    const newValue = Math.min(value + 1, max);
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - 1, min);
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(
      Math.min(parseInt(e.target.value) || 0, max),
      min
    );
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Decrease value"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="text"
        readOnly={true}
        min={min}
        max={max}
        value={value}
        onChange={handleInputChange}
        className="w-20 text-center"
        aria-label="Number input"
      />
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Increase value"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
