"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { InstitutionSelector } from "./institution-selector";
import { Institution } from "@/lib/institutions";
import { useAppContext } from "@/context/app-context";
import { toast } from "sonner";

interface InstitutionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectCallback?: (institution: Institution | null) => void;
}

export function InstitutionDialog({
  open,
  onOpenChange,
  onSelectCallback,
}: InstitutionDialogProps) {
  const { user, setInstitution } = useAppContext();

  const handleSelect = (institution: Institution | null) => {
    const nextId = institution ? institution.id : null;
    setInstitution(nextId);
    if (institution) {
      toast.success(`Affiliation updated to ${institution.name}`);
    } else {
      toast.success("Affiliation set to Independent Learner");
    }
    if (onSelectCallback) {
      onSelectCallback(institution);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">
        <DialogHeader className="mb-4 text-left">
          <DialogTitle className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Select Your Institution
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
            Connect with classmates, unlock your campus leaderboard, and discover peers studying Python at your school.
          </DialogDescription>
        </DialogHeader>

        <InstitutionSelector
          selectedInstitutionId={user.institutionId}
          onSelect={handleSelect}
          onSkip={() => onOpenChange(false)}
          showIndependentOption={true}
          showSkipOption={false}
          embedded={false}
        />
      </DialogContent>
    </Dialog>
  );
}
