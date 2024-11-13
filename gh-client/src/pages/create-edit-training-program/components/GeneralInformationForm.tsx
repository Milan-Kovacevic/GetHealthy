
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
            <MultiSelect className='' options={categoryOptions.map((elem, index)=>({
                label: elem.label,
                value: index.toString()
            }))} value={categories}
                onValueChange={(categories) => {
                    categories.forEach((category) => toggleCategory(category)) 
                  }}
                maxCount={3}/>
                
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