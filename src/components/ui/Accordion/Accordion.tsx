"use client";

import { useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  hasSubtitle?: boolean;
  subtitle?: string;
};

export function Accordion({ title, children, hasSubtitle, subtitle }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="group">
      {/* Accordion header */}
      <button
        data-testid="accordion"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex flex-row justify-between px-4 py-3 w-full cursor-pointer"
      >
        <div className="flex flex-col gap-2 items-start">
          <span className="text-base font-semibold group-hover:underline">{title}</span>
          {hasSubtitle && <span className="text-sm text-zinc-700">{subtitle}</span>}
        </div>

        <ChevronDownIcon
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Accordion content */}
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
        className="px-4 overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="pb-3">{children}</div>
      </div>
    </div>
  );
}
