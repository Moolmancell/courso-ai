"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  hasSubtitle?: boolean;
  subtitle?: string;
};

export function Accordion({ title, children, hasSubtitle, subtitle }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group">
      {/* Accordion header */}
      <button
        data-testid="accordion"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex flex-row justify-between px-4 py-3 w-full"
      >
        <div className="flex flex-col gap-2 items-start">
          <span className="text-base font-semibold group-hover:underline">{title}</span>
          {hasSubtitle && <span className="text-sm text-zinc-700">{subtitle}</span>}
        </div>

        <ChevronDownIcon className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}/>
      </button>

      {/* Accordion content */}
      <div
        className={`px-4 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="pb-3">{children}</div>
      </div>
    </div>
  );
}
