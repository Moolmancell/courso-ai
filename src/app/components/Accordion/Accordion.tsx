"use client";

import { useState } from "react";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  hasSubtitle?: boolean;
  subtitle?: string;
};

export function Accordion({ title, children, hasSubtitle, subtitle }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Accordion header */}
      <button
        data-testid="accordion"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div>
            {title}
            {hasSubtitle && <span>{subtitle}</span>}
        </div>
      </button>

      {/* Accordion content */}
      {isOpen && <div>{children}</div>}
    </div>
  );
}
