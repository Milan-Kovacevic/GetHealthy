
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
import { MultiSelect } from '@/components/primitives/MultiSelectFormFIeld'

export default function GeneralInformationForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [requirements, setRequirements] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ name, description, requirements, categories })
    setName('')
    setDescription('')
    setRequirements('')
    setCategories([])
  }
  const categoryOptions = [
    { label: "Technical", value: "technical" },
    { label: "Soft Skills", value: "soft-skills" },
    { label: "Leadership", value: "leadership" },
    { label: "Project Management", value: "project-management" },
    { label: "Design", value: "design" },
  ];
  
    return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>General Informations</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name of Training Program</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="categories">Categories (Select multiple)</Label>
            <MultiSelect options={categoryOptions} value={categories}
                onValueChange={setCategories}/>
                
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="h-32"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="h-32"
            />
          </div>
        </CardContent>
      </form>
    </Card>
    );
}