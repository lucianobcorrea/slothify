import AdminLayout from "@/ui/admin/layouts/admin.layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().trim().min(1, { message: "Name is required!" }),
  xpReward: z.number().gt(0, "Must be greater than 0"),
  coinsReward: z.number().gt(0, "Must be greater than 0"),
  requiredExercises: z.number().gt(0, "Must be greater than 0").optional(),
  requiredMultipleChoiceExercises: z
    .number()
    .gt(0, "Must be greater than 0")
    .optional(),
  requiredSortingExercises: z
    .number()
    .gt(0, "Must be greater than 0")
    .optional(),
  requiredDragAndDropExercises: z
    .number()
    .gt(0, "Must be greater than 0")
    .optional(),
  requiredXp: z.number().gt(0, "Must be greater than 0").optional(),
});

export type FormFields = z.infer<typeof schema>;

export function CreateChallenge() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      xpReward: 1,
      coinsReward: 1,
      requiredExercises: 1,
      requiredMultipleChoiceExercises: 1,
      requiredSortingExercises: 1,
      requiredDragAndDropExercises: 1,
      requiredXp: 1,
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    const filteredValues = {
      ["name"]: values["name"],
      ["coinsReward"]: values["coinsReward"],
      ["xpReward"]: values["xpReward"],
    };

    const dataToSend = {
      ...filteredValues,
      [challengeType]: values[challengeType as keyof FormFields],
    };
    console.log("Sending", dataToSend);
  }

  const [challengeType, setChallengeType] = useState("");
  const [challengeTypeLabel, setChallengeTypeLabel] = useState("");
  const [challengeTypeSelected, setChallengeTypeSelected] = useState(false);

  const challengeTypeOptions = [
    { value: "requiredExercises", label: "Required Exercises" },
    {
      value: "requiredMultipleChoiceExercises",
      label: "Required Multiple Choice Exercises",
    },
    { value: "requiredSortingExercises", label: "Required Sorting Exercises" },
    {
      value: "requiredDragAndDropExercises",
      label: "Required Drag and Drop Exercises",
    },
    { value: "requiredXp", label: "Required XP" },
  ];

  function changeChallengeType(value: string) {
    setChallengeType(value);
    setChallengeTypeSelected(true);

    const selectedOption = challengeTypeOptions.find(
      (option) => option.value === value
    );
    if (selectedOption) {
      setChallengeTypeLabel(selectedOption.label);
    }
  }

  return (
    <AdminLayout>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin/challenges">
                  Challenges
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Create Challenge</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="p-4 pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="xpReward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>XP Reward</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="XP Reward" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coinsReward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coins Reward</FormLabel>
                    <FormControl>
                      <Input placeholder="Coins Reward" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <Label htmlFor="challengeType">Challenge Type</Label>
                <Select onValueChange={changeChallengeType}>
                  <SelectTrigger className="mt-2" id="challengeType">
                    <SelectValue placeholder="Select The Challenge Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {challengeTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {challengeTypeSelected ? (
                <FormField
                  control={form.control}
                  name={challengeType as keyof FormFields}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{challengeTypeLabel}</FormLabel>
                      <FormControl>
                        <Input placeholder={challengeTypeLabel} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ) : null}
            </div>

            <Button type="submit">Save</Button>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
}
