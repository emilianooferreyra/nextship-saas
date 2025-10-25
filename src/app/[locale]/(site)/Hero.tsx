"use client";

import { motion } from "framer-motion";
import { Github, Sparkles } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { SimpleBento } from "@/components/simple-bento";

const HeroSection = () => {
  const t = useTranslations("hero");

  return (
    <div className="relative bg-background min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden">
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-0 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl w-full mx-auto py-16 flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-16">
        {/* Left side - Copy */}
        <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
          {/* Logo + Brand */}
          <div className="flex justify-center lg:justify-start items-center gap-3 mb-6 mt-10">
            <div className="relative">
              <svg
                width="40"
                height="40"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative"
              >
                <path
                  d="M16 3L30 29H2L16 3Z"
                  fill="currentColor"
                  className="text-primary"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold text-foreground">
              {t("brandName")}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            <span className="text-foreground">{t("title")}</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              {t("titleHighlight")}
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
            {t("description")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
            <Link
              href="https://github.com/emilianooferreyra/nextship-saas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-lg font-semibold text-base transition-colors shadow-lg shadow-primary/20"
            >
              <Github className="w-5 h-5" />
              {t("getStarted")}
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-8 py-3.5 rounded-lg font-semibold text-base transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              {t("exploreFeatures")}
            </Link>
          </div>
        </div>

        {/* Right side - Simple Bento Grid */}
        <div className="w-full lg:w-1/2 relative z-10">
          <div className="max-w-md mx-auto">
            <SimpleBento />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
