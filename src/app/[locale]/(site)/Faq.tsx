"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = t.raw("items") as FAQItem[];

  return (
    <div
      id="faq"
      className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-center text-4xl font-bold text-foreground">
          {t("heading")}
        </h2>
        <p className="mb-12 text-center text-base text-muted-foreground">
          {t("subheading")}{" "}
          <Link
            href="https://twitter.com/emilianooferreyra"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {t("twitter")}
          </Link>{" "}
          {t("or")}{" "}
          <Link
            href="mailto:contact@example.com"
            className="text-primary hover:underline"
          >
            {t("email")}
          </Link>
          .
        </p>

        <div className="space-y-[2px]">
          {faqs.map((faq, index) => (
            <div key={index} className="overflow-hidden">
              <button
                onClick={() => toggleQuestion(index)}
                className="flex w-full items-center justify-between bg-card border border-border px-6 py-4 text-left transition-colors hover:bg-card/80 hover:border-primary/50"
              >
                <span className="text-[16px] font-medium text-foreground">
                  {faq.question}
                </span>
                <span className="ml-6 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-secondary">
                  <PlusIcon
                    className={`h-3 w-3 text-foreground transition-transform duration-200 ${openIndex === index ? "rotate-45" : ""}`}
                  />
                </span>
              </button>
              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="bg-card/50 border-x border-b border-border px-6 py-4 text-base text-muted-foreground">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlusIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}
