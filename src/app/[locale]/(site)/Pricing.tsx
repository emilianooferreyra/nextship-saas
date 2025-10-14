"use client";

import type React from "react";
import { useTranslations } from "next-intl";
import { Check, Heart, Coffee } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function PricingSection() {
  const t = useTranslations("pricing");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      id="pricing"
      className="min-h-screen bg-background text-foreground px-4 py-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <Heart className="w-4 h-4" />
            {t("badge")}
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t("heading")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl p-8 border border-border bg-card"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">{t("free.title")}</h3>
              <p className="text-muted-foreground text-sm">
                {t("free.subtitle")}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
                  className="text-5xl font-bold text-green-500"
                >
                  {t("free.price")}
                </motion.span>
              </div>
              <p className="text-green-500 text-sm mt-2">{t("free.period")}</p>
            </div>

            <div className="space-y-4 mb-8">
              {(t.raw("free.features") as string[]).map((feature, index) => (
                <Feature key={index} index={index} isInView={isInView}>
                  {feature}
                </Feature>
              ))}
            </div>

            <Link
              href="https://github.com/emilianooferreyra/nextship-saas"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            >
              {t("free.button")}
            </Link>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl p-8 border-2 border-[#F59E0B] bg-gradient-to-br from-[#F59E0B]/10 via-card to-card relative overflow-hidden"
          >
            {/* Decorative elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-0 left-0 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-3xl"
            />

            <div className="relative">
              <div className="flex items-center gap-2 mb-6">
                <Coffee className="w-6 h-6 text-[#F59E0B]" />
                <h3 className="text-2xl font-bold">{t("support.title")}</h3>
              </div>

              <p className="text-muted-foreground mb-6">
                {t("support.description")}
              </p>

              <div className="space-y-4 mb-8">
                {(t.raw("support.benefits") as string[]).map(
                  (benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Heart className="w-5 h-5 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {benefit}
                      </span>
                    </motion.div>
                  )
                )}
              </div>

              <Link
                href="https://cafecito.app/emilianoferreyra"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 font-semibold py-4 px-4 rounded-lg transition-colors duration-200 bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white"
              >
                <Coffee className="w-5 h-5" />
                {t("support.button")}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            {t("faqTitle")}
          </h3>
          <div className="space-y-6">
            {(
              t.raw("faqItems") as Array<{ question: string; answer: string }>
            ).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  {item.question}
                </h4>
                <p className="text-muted-foreground text-sm ml-7">
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            {t("bottomCta.question")}{" "}
            <Link
              href="https://twitter.com/emilianooferreyra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {t("bottomCta.twitter")}
            </Link>{" "}
            {t("bottomCta.or")}{" "}
            <Link
              href="mailto:contact@example.com"
              className="text-primary hover:underline"
            >
              {t("bottomCta.email")}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Feature({
  children,
  index,
  isInView,
}: {
  children: React.ReactNode;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.1 }}
      className="flex items-start gap-3"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{
          delay: 0.4 + index * 0.1,
          type: "spring",
          bounce: 0.5,
        }}
        className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5 flex-shrink-0"
      >
        <Check className="w-3 h-3 text-green-500" />
      </motion.div>
      <span className="text-sm text-muted-foreground">{children}</span>
    </motion.div>
  );
}
