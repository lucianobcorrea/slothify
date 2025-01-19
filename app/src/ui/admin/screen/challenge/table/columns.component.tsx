"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Challenge = {
  id: number;
  name: string;
  xpReward: number;
  coinsReward: number;
  requiredExercises?: number | null;
  requiredMultipleChoiceExercises?: number | null;
  requiredSortingExercises?: number | null;
  requiredDragAndDropExercises?: number | null;
  requiredXp?: number | null;
};

export const columns: ColumnDef<Challenge>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "xpReward",
    header: "XP Reward",
  },
  {
    accessorKey: "coinsReward",
    header: "Coins Reward",
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];
