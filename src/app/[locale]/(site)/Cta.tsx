"use client";

import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function CTA() {
  const t = useTranslations("cta");

  return (
    <section className="relative bg-background px-4 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-3xl border border-border bg-card p-12 md:p-16 overflow-hidden">
          {/* Background gradient effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>

          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Github className="w-4 h-4" />
              {t("badge")}
            </div>

            <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {t("heading")}
            </h2>

            <p className="mb-10 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              {t("description")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://github.com/emilianooferreyra/nextship-saas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                <Github className="w-5 h-5" />
                {t("getStarted")}
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-4 text-base font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                {t("viewPricing")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
