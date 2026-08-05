"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

export type AccordionItemData = {
  id: string;
  question: string;
  answer: string;
};

/**
 * FAQ・会員エリアの現地Q&Aで共用するアコーディオン。
 * キーボード操作・aria属性に対応(WCAG 2.1 AA)。
 */
export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-navy/10 border-y border-navy/10">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `accordion-panel-${item.id}`;
        const buttonId = `accordion-button-${item.id}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-medium text-navy md:text-base"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className={cn(
                    "shrink-0 text-gold-dark transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 text-sm leading-relaxed text-navy/70"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
