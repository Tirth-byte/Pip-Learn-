"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Institution,
  getAllInstitutions,
  searchInstitutions,
  requestOrAddInstitution,
} from "@/lib/institutions";
import { InstitutionLogo } from "./institution-logo";
import {
  Search,
  Check,
  Building2,
  Globe2,
  PlusCircle,
  BadgeCheck,
  X,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

interface InstitutionSelectorProps {
  selectedInstitutionId?: string | null;
  onSelect: (institution: Institution | null) => void;
  onSkip?: () => void;
  embedded?: boolean;
  showIndependentOption?: boolean;
  showSkipOption?: boolean;
  className?: string;
}

export function InstitutionSelector({
  selectedInstitutionId,
  onSelect,
  onSkip,
  showIndependentOption = true,
  showSkipOption = true,
  className = "",
}: InstitutionSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customCountry, setCustomCountry] = useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const customNameInputRef = useRef<HTMLInputElement>(null);

  const allInstitutions = useMemo(() => {
    return getAllInstitutions();
  }, [isAddingCustom]);

  const filteredInstitutions = useMemo(() => {
    if (!searchQuery.trim()) {
      return allInstitutions.slice(0, 12);
    }
    return searchInstitutions(searchQuery).slice(0, 20);
  }, [allInstitutions, searchQuery]);

  // Focus custom input when toggled
  useEffect(() => {
    if (isAddingCustom) {
      setTimeout(() => customNameInputRef.current?.focus(), 50);
    }
  }, [isAddingCustom]);

  const handleSelectInstitution = (inst: Institution) => {
    onSelect(inst);
  };

  const handleSelectIndependent = () => {
    onSelect(null);
  };

  const handleAddCustomInstitution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) {
      toast.error("Please enter the name of your institution.");
      return;
    }

    const institution = requestOrAddInstitution({
      name: customName,
      country: customCountry || "Global",
      location: customLocation || customCountry || "Global",
    });

    toast.success(`Selected "${institution.name}"`);
    setIsAddingCustom(false);
    setCustomName("");
    setCustomCountry("");
    setCustomLocation("");
    setSearchQuery("");
    onSelect(institution);
  };

  // Keyboard navigation for search list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredInstitutions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredInstitutions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredInstitutions.length) % filteredInstitutions.length);
    } else if (e.key === "Enter" && !isAddingCustom) {
      e.preventDefault();
      if (filteredInstitutions[selectedIndex]) {
        handleSelectInstitution(filteredInstitutions[selectedIndex]);
      }
    }
  };

  return (
    <div className={`w-full text-[#37352F] dark:text-[rgba(255,255,255,0.85)] select-none ${className}`}>
      {/* 1. Apple-Grade Search Bar */}
      <div className="relative mb-3">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 size-4 text-[rgba(55,53,47,0.45)] dark:text-gray-400 pointer-events-none stroke-[2]" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search university, college, or school..."
            className="w-full h-11 pl-10 pr-9 rounded-xl border border-[rgba(55,53,47,0.14)] dark:border-[rgba(255,255,255,0.14)] bg-white dark:bg-[#1E1E1E] text-sm font-medium text-gray-900 dark:text-white placeholder:text-[rgba(55,53,47,0.4)] dark:placeholder:text-gray-500 outline-none focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 dark:focus:ring-[#0066FF]/20 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                searchInputRef.current?.focus();
              }}
              className="absolute right-3 p-1 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              aria-label="Clear search"
            >
              <X className="size-3.5 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Custom Add Inline Form (Triggered if user can't find institution) */}
      {isAddingCustom ? (
        <div className="p-4 rounded-xl bg-gray-50/90 dark:bg-[#252525] border border-gray-200 dark:border-gray-700 mb-3 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Building2 className="size-4 text-[#0066FF] stroke-[2]" />
              <span className="font-bold text-xs text-gray-900 dark:text-white">
                Add Your Institution
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsAddingCustom(false)}
              className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleAddCustomInstitution} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
                Institution Name *
              </label>
              <input
                ref={customNameInputRef}
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. University of California, San Diego"
                required
                className="w-full h-9 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E1E] text-xs font-medium text-gray-900 dark:text-white outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/15 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
                  Country / Region
                </label>
                <input
                  type="text"
                  value={customCountry}
                  onChange={(e) => setCustomCountry(e.target.value)}
                  placeholder="e.g. United States"
                  className="w-full h-9 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E1E] text-xs font-medium text-gray-900 dark:text-white outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
                  City / State (Optional)
                </label>
                <input
                  type="text"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  placeholder="e.g. San Diego, CA"
                  className="w-full h-9 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E1E] text-xs font-medium text-gray-900 dark:text-white outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/15 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!customName.trim()}
              className="w-full h-9 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs mt-1"
            >
              <span>Save &amp; Select Institution</span>
              <ArrowRight className="size-3.5 stroke-[2]" />
            </button>
          </form>
        </div>
      ) : null}

      {/* 3. Institution List */}
      <div
        role="listbox"
        aria-label="Institutions"
        className="max-h-[300px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700"
      >
        {filteredInstitutions.length === 0 ? (
          <div className="py-8 text-center px-4 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#202020]">
            <Building2 className="size-6 text-gray-400 mx-auto mb-2 stroke-[1.5]" />
            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
              No institution found for "{searchQuery}"
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 max-w-xs mx-auto">
              Can't find yours? You can add it directly to PipLearn.
            </p>
            <button
              type="button"
              onClick={() => {
                setCustomName(searchQuery);
                setIsAddingCustom(true);
              }}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors cursor-pointer shadow-2xs"
            >
              <PlusCircle className="size-3.5 stroke-[2]" />
              <span>Add "{searchQuery}"</span>
            </button>
          </div>
        ) : (
          filteredInstitutions.map((inst, index) => {
            const isSelected = selectedInstitutionId === inst.id;
            const isHighlighted = selectedIndex === index;

            return (
              <div
                key={inst.id}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                onClick={() => handleSelectInstitution(inst)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-blue-50/70 dark:bg-blue-950/40 border-[#0066FF] ring-2 ring-[#0066FF]/20 shadow-xs"
                    : isHighlighted
                    ? "bg-gray-50 dark:bg-[#252525] border-gray-300 dark:border-gray-600"
                    : "bg-white dark:bg-[#202020] border-gray-200/90 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50/60 dark:hover:bg-[#252525]"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <InstitutionLogo institution={inst} size="sm" />
                  <div className="min-w-0 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white truncate">
                        {inst.name}
                      </span>
                      {inst.verified && (
                        <BadgeCheck className="size-3.5 text-[#0066FF] shrink-0 fill-[#0066FF]/15" />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                      <span className="truncate">{inst.location}</span>
                      <span className="text-gray-300 dark:text-gray-600">·</span>
                      <span className="shrink-0">{inst.memberCount.toLocaleString()} learners</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`size-5 rounded-full flex items-center justify-center shrink-0 ml-3 transition-all ${
                    isSelected
                      ? "bg-[#0066FF] text-white"
                      : "border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent"
                  }`}
                >
                  {isSelected && <Check className="size-3 stroke-[3]" />}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 4. Bottom Auxiliary Options: Independent Learner & Custom Add */}
      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
        {showIndependentOption && (
          <div
            role="button"
            tabIndex={0}
            onClick={handleSelectIndependent}
            className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer ${
              selectedInstitutionId === null
                ? "bg-gray-100/90 dark:bg-[#2a2a2a] border-gray-900 dark:border-white ring-1 ring-black/10 shadow-xs"
                : "bg-white dark:bg-[#202020] border-gray-200/90 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#252525]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="size-6 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                <Globe2 className="size-3.5 text-gray-600 dark:text-gray-300 stroke-[2]" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white">
                  Independent Learner
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400">
                  I am learning independently or not currently at an institution
                </div>
              </div>
            </div>

            <div
              className={`size-5 rounded-full flex items-center justify-center shrink-0 ml-3 transition-all ${
                selectedInstitutionId === null
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent"
              }`}
            >
              {selectedInstitutionId === null && <Check className="size-3 stroke-[3]" />}
            </div>
          </div>
        )}

        {!isAddingCustom && (
          <div className="flex items-center justify-between text-xs px-1 pt-1">
            <button
              type="button"
              onClick={() => {
                setCustomName(searchQuery);
                setIsAddingCustom(true);
              }}
              className="text-[#0066FF] hover:underline font-medium flex items-center gap-1.5 cursor-pointer py-1"
            >
              <PlusCircle className="size-3.5 stroke-[2]" />
              <span>I can't find my institution</span>
            </button>

            {showSkipOption && onSkip && (
              <button
                type="button"
                onClick={onSkip}
                className="text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors cursor-pointer py-1"
              >
                Skip for now
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
