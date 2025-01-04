// import { getAllCategories } from "@/api/services/category-service";
// import { FileInputField } from "@/components/primitives/FileInputField";
// import InputFormField from "@/components/primitives/InputFormField";
// import { MultiSelect } from "@/components/primitives/MultiSelectFormFIeld";
// import TextareaFormField from "@/components/primitives/TextareaFormField";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { CheckIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import FormSectionTitle from "./FormSectionTitle";

// const formSchema = z.object({
//   name: z.string().min(1, { message: "Name is required." }),
//   info: z.string().min(1, { message: "Description is required." }),
//   categories: z
//     .array(
//       z.z.object({
//         id: z.number().min(1, { message: "Category ID is required." }),
//         categoryName: z
//           .string()
//           .min(1, { message: "Category name is required." }),
//       })
//     )
//     .min(1, { message: "At least one category is required." }),
//   requirements: z.string().optional(),
//   difficulty: z.string().min(1, { message: "Program difficulty is required." }),
// });

// type GeneralInformationFormProps = {
//   defaultValues?: z.infer<typeof formSchema>;
//   isEdit?: boolean;
//   setGeneralInfoData?: (data: any) => void;
// };

// const GeneralInformationForm = ({
//   defaultValues,
//   setGeneralInfoData,
//   isEdit = false,
// }: GeneralInformationFormProps) => {
//   const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: defaultValues || {
//       name: "",
//       info: "",
//       categories: [],
//       requirements: "",
//       difficulty: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     if (isEdit) {
//       // TODO => edit logic to implement
//     } else {
//       setGeneralInfoData?.(values);
//     }
//     console.log("Values in general information: " + values);
//   }

//   useEffect(() => {
//     async function fetchCategories() {
//       setCategoryOptions(await getAllCategories());
//     }
//     fetchCategories();
//   }, []);

//   const difficultyOptions = [
//     { label: "Beginner", value: "1" },
//     { label: "Intermediate", value: "2" },
//     { label: "Advanced", value: "3" },
//   ];

//   return (
//     <div className="mt-5 w-full">
//       <div className="my-6">
//         <FormSectionTitle title="General information" />
//       </div>
//       <div className="">
//         {/* <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2"> */}
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-10">
//           <div className="flex flex-col gap-4 col-span-3">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//               <InputFormField
//                 control={form.control}
//                 name="name"
//                 type="text"
//                 description="Enter a training program name."
//                 placeholder="ex. HIIT"
//                 display="Program name *"
//                 className="max-w-lg"
//               />
//               <FormField
//                 control={form.control}
//                 name="difficulty"
//                 render={({ field }) => (
//                   <FormItem className="space-y-0.5 max-w-lg">
//                     <FormLabel>Difficulty *</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select an option" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {difficultyOptions.map((item) => (
//                           <SelectItem key={item.value} value={item.value}>
//                             {item.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormDescription className="text-xs ml-0.5">
//                       Select program difficulty.
//                     </FormDescription>
//                     <FormMessage className="text-xs ml-0.5" />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <FormField
//               control={form.control}
//               name="categories"
//               render={({ field }) => (
//                 <FormItem className="space-y-0.5 max-w-xl">
//                   <FormLabel className="">Categories *</FormLabel>

//                   <FormControl>
//                     <MultiSelect
//                       className=""
//                       options={categoryOptions}
//                       // value={field.value || []}
//                       defaultValue={defaultValues?.categories}
//                       onValueChange={(categories) => field.onChange(categories)}
//                       maxCount={3}
//                       minCount={1}
//                       itemNameKey="categoryName"
//                       itemValueKey="id"
//                     />
//                   </FormControl>
//                   <FormDescription className="text-xs ml-0.5">
//                     Select one or more categories.
//                   </FormDescription>
//                   <FormMessage className="text-xs ml-0.5" />
//                 </FormItem>
//               )}
//             />
//             <TextareaFormField
//               control={form.control}
//               name="info"
//               display="Description *"
//               label="Description *"
//               description="Enter a description for training program."
//               placeholder="ex. HIIT is a functional training program"
//               className="col-span-full w-full"
//             />
//             <TextareaFormField
//               control={form.control}
//               name="requirements"
//               display="Requirements"
//               label="Requirements"
//               description="Enter requirements for training program."
//               placeholder="ex. Not for someone with heart problems"
//               className="col-span-full w-full"
//             />
//           </div>
//           <div className="md:col-span-2 w-full">
//             <FileInputField
//               title="Training Program Picture *"
//               name="files"
//               description="Upload a picture for the training program."
//               formats=""
//               className="lg:h-56 h-48"
//             />
//           </div>
//         </div>
//         <div className="flex md:flex-row flex-col flex-wrap justify-between md:items-end items-start pt-4 gap-x-2 gap-y-6">
//           <div className="flex flex-row items-start gap-1">
//             <span className="text-xs font-bold text-muted-foreground uppercase">
//               note:
//             </span>
//             <p className="text-muted-foreground text-xs font-medium">
//               * indicates the required fields to be filled in order to create
//               new training program
//             </p>
//           </div>
//           {isEdit ? (
//             <div className="flex self-end">
//               <Button type="submit" variant="secondary" className="min-w-32">
//                 <CheckIcon />
//                 {isEdit ? "Save Changes" : "Submit"}
//               </Button>
//             </div>
//           ) : (
//             <></>
//           )}
//         </div>
//         {/* </form>
//         </Form> */}
//       </div>
//     </div>
//   );
// };

// export default GeneralInformationForm;

import { getAllCategories } from "@/api/services/category-service";
import { FileInputField } from "@/components/primitives/FileInputField";
import InputFormField from "@/components/primitives/InputFormField";
import { MultiSelect } from "@/components/primitives/MultiSelectFormFIeld";
import TextareaFormField from "@/components/primitives/TextareaFormField";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import FormSectionTitle from "./FormSectionTitle";

type GeneralInformationFormProps = {
  isEdit?: boolean;
  form: any;
  formPath?: string;
};

const GeneralInformationForm = ({
  isEdit = false,
  form,
  formPath = "",
}: GeneralInformationFormProps) => {
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      setCategoryOptions(await getAllCategories());
    }
    fetchCategories();
  }, []);

  const difficultyOptions = [
    { label: "Beginner", value: "1" },
    { label: "Intermediate", value: "2" },
    { label: "Advanced", value: "3" },
  ];

  return (
    <div className="mt-5 w-full">
      <div className="my-6">
        <FormSectionTitle title="General information" />
      </div>
      <div className="">
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2"> */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-10">
          <div className="flex flex-col gap-4 col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <InputFormField
                control={form.control}
                name={`${formPath}.name`}
                type="text"
                description="Enter a training program name."
                placeholder="ex. HIIT"
                display="Program name *"
                className="max-w-lg"
              />
              <FormField
                control={form.control}
                name={`${formPath}.difficulty`}
                render={({ field }) => (
                  <FormItem className="space-y-0.5 max-w-lg">
                    <FormLabel>Difficulty *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {difficultyOptions.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs ml-0.5">
                      Select program difficulty.
                    </FormDescription>
                    <FormMessage className="text-xs ml-0.5" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name={`${formPath}.categories`}
              render={({ field }) => (
                <FormItem className="space-y-0.5 max-w-xl">
                  <FormLabel className="">Categories *</FormLabel>

                  <FormControl>
                    <MultiSelect
                      className=""
                      options={categoryOptions}
                      // value={field.value || []}
                      // defaultValue={defaultValues?.categories}
                      onValueChange={(categories) => field.onChange(categories)}
                      maxCount={3}
                      minCount={1}
                      itemNameKey="categoryName"
                      itemValueKey="id"
                    />
                  </FormControl>
                  <FormDescription className="text-xs ml-0.5">
                    Select one or more categories.
                  </FormDescription>
                  <FormMessage className="text-xs ml-0.5" />
                </FormItem>
              )}
            />
            <TextareaFormField
              control={form.control}
              name={`${formPath}.info`}
              display="Description *"
              label="Description *"
              description="Enter a description for training program."
              placeholder="ex. HIIT is a functional training program"
              className="col-span-full w-full"
            />
            <TextareaFormField
              control={form.control}
              name={`${formPath}.requirements`}
              display="Requirements"
              label="Requirements"
              description="Enter requirements for training program."
              placeholder="ex. Not for someone with heart problems"
              className="col-span-full w-full"
            />
          </div>
          <div className="md:col-span-2 w-full">
            <FileInputField
              title="Training Program Picture *"
              name="files"
              description="Upload a picture for the training program."
              formats=""
              className="lg:h-56 h-48"
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col flex-wrap justify-between md:items-end items-start pt-4 gap-x-2 gap-y-6">
          <div className="flex flex-row items-start gap-1">
            <span className="text-xs font-bold text-muted-foreground uppercase">
              note:
            </span>
            <p className="text-muted-foreground text-xs font-medium">
              * indicates the required fields to be filled in order to create
              new training program
            </p>
          </div>
          {isEdit ? (
            <div className="flex self-end">
              <Button type="submit" variant="secondary" className="min-w-32">
                <CheckIcon />
                {isEdit ? "Save Changes" : "Submit"}
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* </form>
        </Form> */}
      </div>
    </div>
  );
};

export default GeneralInformationForm;
