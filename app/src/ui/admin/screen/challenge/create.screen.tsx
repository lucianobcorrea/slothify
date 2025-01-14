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

export function CreateChallenge() {
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
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" placeholder="Name" />
          </div>

          <div>
            <Label htmlFor="xpReward">XP Reward</Label>
            <Input
              type="number"
              min={0}
              id="xpReward"
              placeholder="XP Reward"
            />
          </div>

          <div>
            <Label htmlFor="coinsReward">Coins Reward</Label>
            <Input
              type="number"
              min={0}
              id="coinsReward"
              placeholder="Coins Reward"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <Label htmlFor="challengeType">Challenge Type</Label>
            <Select onValueChange={changeChallengeType}>
              <SelectTrigger id="challengeType">
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
            <div>
              <Label htmlFor={challengeType}>{challengeTypeLabel}</Label>
              <Input
                type="number"
                min={0}
                id={challengeType}
                placeholder={challengeTypeLabel}
              />
            </div>
          ) : null}
        </div>
      </div>
    </AdminLayout>
  );
}
