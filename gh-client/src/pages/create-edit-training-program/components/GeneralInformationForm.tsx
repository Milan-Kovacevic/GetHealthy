import React from 'react';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import { MultiSelect } from '@/components/primitives/MultiSelectFormField'
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
    name: z
      .string()
      .min(1, {
        message: "Name is required.",
      }),
    info: z
      .string()
      .min(1, {
        message: "Description is required.",
      }),
      categories: z
      .array(z.string()).min(1, {
        message: "At least one category is required.",
      }),
      requirements: z
      .string()
  });

export default function GeneralInformationForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [requirements, setRequirements] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      info: "",
      categories: [],
      requirements: ""
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }
  
  const categoryOptions = [
    { label: "Technical", value: "1" },
    { label: "Soft Skills", value: "2" },
    { label: "Leadership", value: "3" },
    { label: "Project Management", value: "4" },
    { label: "Design", value: "5" },
  ];  
  const toggleCategory = (category: string) => {
    setCategories(current =>
      current.includes(category)
        ? current.filter(c => c !== category)
        : [...current, category]
    )
  }
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>General Information</CardTitle>
      </CardHeader>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name of Training Program</Label>
            <Input
              id="name"
              {...form.register("name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="categories">Categories (Select multiple)</Label>
            <MultiSelect className='' options={categoryOptions.map((elem, index)=>({
                label: elem.label,
                value: index.toString()
            }))} value={categories}
                onValueChange={(categories) => {
                    categories.forEach((category) => toggleCategory(category)) 
                  }}
                {...form.register("categories")}
                maxCount={3}
                minCount={1}/>
                
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...form.register("info")}
              value={description}
              name="info"
              onChange={(e) => setDescription(e.target.value)}
              required
              className="h-32"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              {...form.register("requirements")}
              value={requirements}
              name="requirements"
              onChange={(e) => setRequirements(e.target.value)}
              className="h-32"
            />
          </div>
        </CardContent>
        <CardFooter>
            <Button type="submit">Submit</Button>
        </CardFooter>
      </form>
      </Form>
    </Card>
    );
}