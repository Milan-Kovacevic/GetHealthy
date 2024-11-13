import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ExerciseCard from "./ExerciseCard";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFormField from "@/components/primitives/InputFormField";

interface Framework {
  value: string;
  label: string;
}

const frameworks: Framework[] = [
  { value: "next.js", label: "Cucanj" },
  { value: "sveltekit", label: "Sklek" },
  { value: "nuxt.js", label: "Trcanje" },
  { value: "remix", label: "Trbusnjaci" },
  { value: "astro", label: "Lats" },
];

const exerciseFormSchema = z.object({
  numebrOfRepetitons: z.number(),
});

export default function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<Framework[]>([]);
  const [selectedExercise, setSelectedExercise] =
    React.useState<Framework | null>(null);
  const [repetitions, setRepetitions] = React.useState("");

  const handleSelect = (currentValue: string) => {
    const selectedFramework = frameworks.find((f) => f.value === currentValue);

    if (
      selectedFramework &&
      !selectedItems.some((item) => item.value === currentValue)
    ) {
      setSelectedItems([...selectedItems, selectedFramework]);
    }
    setOpen(false);
  };

  const handleRemove = (value: string) => {
    setSelectedItems(selectedItems.filter((item) => item.value !== value));
    if (selectedExercise && selectedExercise.value === value) {
      setSelectedExercise(null);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("index", String(index));
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("index"));
    const newItems = [...selectedItems];
    const [draggedItem] = newItems.splice(draggedIndex, 1);

    // Reinsert the dragged item at the target position
    newItems.splice(targetIndex, 0, draggedItem);
    setSelectedItems(newItems);
  };

  const handleDragOver = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    // Optionally add a visual indicator for the drop position.
    // You could change the background color or add a placeholder here.
  };

  const form = useForm<z.infer<typeof exerciseFormSchema>>({
    resolver: zodResolver(exerciseFormSchema),
  });

  function onSubmit(values: z.infer<typeof exerciseFormSchema>) {
    console.log(values);
  }

  return (
    <div className="m-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            Select framework...
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={() => handleSelect(framework.value)}
                  >
                    {framework.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedItems.some(
                          (item) => item.value === framework.value
                        )
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div
        className="mt-4 flex flex-wrap gap-4"
        onDragOver={(e) => e.preventDefault()}
      >
        {selectedItems.map((item, index) => (
          <div
            key={item.value}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            className="cursor-move"
          >
            <ExerciseCard
              label={item.label}
              onRemove={() => handleRemove(item.value)}
              onClick={() => setSelectedExercise(item)}
            />
          </div>
        ))}
      </div>

      {selectedExercise && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-4">
            Enter repetitions for {selectedExercise.label}
          </h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <InputFormField
                control={form.control}
                name="username"
                type="text"
                description="Enter your username or email."
                display="Username *"
                placeholder="ex. user1"
              />

              <Button className="mt-10" type="submit" variant="default">
                Save Repetitions
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
