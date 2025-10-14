"use client";

import {
  Shield,
  CreditCard,
  Lock,
  Database,
  Zap,
  Paintbrush,
  Globe,
  Mail,
  Check,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FeaturesSection() {
  const t = useTranslations("features");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      id: "security",
      icon: Shield,
      label: t("tabs.security"),
      content: {
        title: t("titles.enterpriseSecurity"),
        features: t.raw("lists.security") as string[],
      },
    },
    {
      id: "payments",
      icon: CreditCard,
      label: t("tabs.payments"),
      content: {
        title: t("titles.paymentProcessing"),
        features: t.raw("lists.payments") as string[],
      },
    },
    {
      id: "auth",
      icon: Lock,
      label: t("tabs.authentication"),
      content: {
        title: t("titles.supabaseAuth"),
        features: t.raw("lists.authentication") as string[],
      },
    },
    {
      id: "database",
      icon: Database,
      label: t("tabs.database"),
      content: {
        title: t("titles.databaseOrm"),
        features: t.raw("lists.database") as string[],
      },
    },
    {
      id: "performance",
      icon: Zap,
      label: t("tabs.performance"),
      content: {
        title: t("titles.nextjsReact"),
        features: t.raw("lists.performance") as string[],
      },
    },
    {
      id: "ui",
      icon: Paintbrush,
      label: t("tabs.uiux"),
      content: {
        title: t("titles.modernDesign"),
        features: t.raw("lists.uiux") as string[],
      },
    },
    {
      id: "seo",
      icon: Globe,
      label: t("tabs.seo"),
      content: {
        title: t("titles.seoMarketing"),
        features: t.raw("lists.seo") as string[],
      },
    },
    {
      id: "email",
      icon: Mail,
      label: t("tabs.email"),
      content: {
        title: t("titles.emailIntegration"),
        features: t.raw("lists.email") as string[],
      },
    },
  ];

  return (
    <div
      ref={ref}
      id="features"
      className="bg-background min-h-screen text-foreground py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            {t("badge")}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
            {t("heading")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <Tabs defaultValue="security" className="w-full">
          <TabsList className="h-auto flex flex-wrap justify-center gap-3 bg-transparent mb-12">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="flex flex-col items-center gap-2 p-4 border border-border bg-card data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary rounded-xl transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </TabsTrigger>
              );
            })}
          </TabsList>

          {features.map((feature) => (
            <TabsContent
              key={feature.id}
              value={feature.id}
              className="space-y-8 mt-8"
            >
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    {(() => {
                      const Icon = feature.icon;
                      return <Icon className="w-6 h-6 text-primary" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {feature.content.title}
                    </h3>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {feature.content.features.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 text-green-500" />
                      </div>
                      <span className="text-base text-muted-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {[
              { text: t("bottom.typescript") },
              { text: t("bottom.eslint") },
              { text: t("bottom.productionReady") },
              { text: t("bottom.mitLicensed") },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
