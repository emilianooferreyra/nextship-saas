"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function Navbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-background border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 3L30 29H2L16 3Z"
                fill="currentColor"
                className="text-primary"
              />
            </svg>
            <span className="text-lg font-semibold text-foreground">
              {t("brandName")}
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#pricing"
            className="text-base text-muted-foreground transition hover:text-foreground"
          >
            {t("pricing")}
          </Link>
          <Link
            href="#faq"
            className="text-base text-muted-foreground transition hover:text-foreground"
          >
            {t("faq")}
          </Link>
          <Link
            href="#tech-stack"
            className="text-base text-muted-foreground transition hover:text-foreground"
          >
            {t("techStack")}
          </Link>
        </div>

        <div className="flex md:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground"
          >
            <span className="sr-only">{t("toggleMenu")}</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="#pricing"
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              onClick={toggleMenu}
            >
              {t("pricing")}
            </Link>
            <Link
              href="#faq"
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              onClick={toggleMenu}
            >
              {t("faq")}
            </Link>
            <Link
              href="#tech-stack"
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              onClick={toggleMenu}
            >
              {t("techStack")}
            </Link>
            <Link
              href={`/${locale}/docs`}
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              onClick={toggleMenu}
            >
              {t("docs")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
