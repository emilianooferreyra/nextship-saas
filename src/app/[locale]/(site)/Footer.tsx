"use client";

import Link from "next/link";
import { Github, Mail } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import XIcon from "@/components/icons/XIcon";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="border-t border-border bg-background px-4 py-12 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <svg
                width="28"
                height="28"
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
              <span className="text-xl font-bold text-foreground">
                {t("brandName")}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">{t("tagline")}</p>
            <p className="text-sm text-muted-foreground">{t("copyright")}</p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("product.title")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#features"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("product.features")}
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("product.pricing")}
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("product.faq")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/docs`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("product.documentation")}
                </Link>
              </li>
              <li>
                <Link
                  href="#tech-stack"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("product.techStack")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("legal.title")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href={`/${locale}/tos`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("legal.terms")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/privacy-policy`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("legal.privacy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("connect.title")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="https://github.com/emilianooferreyra/nextship-saas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  {t("connect.github")}
                </Link>
              </li>
              <li>
                <Link
                  href="https://x.com/disaamood"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <XIcon className="w-4 h-4" size={16} />
                  {t("connect.twitter")}
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:hello@yourdomain.com"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {t("connect.email")}
                </Link>
              </li>
            </ul>

            {/* Newsletter Section */}
            <div className="mt-6">
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                {t("newsletter.title")}
              </h4>
              <p className="mb-4 text-sm text-muted-foreground">
                {t("newsletter.description")}
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  className="flex-1 rounded-lg bg-secondary border border-border px-3 py-2 text-sm text-foreground placeholder-muted-foreground outline-none ring-primary transition-shadow focus:ring-2"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {t("newsletter.subscribe")}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>{t("bottom.copyright")}</p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/yourusername/yourproject"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {t("bottom.builtWith")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
