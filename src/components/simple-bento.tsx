"use client";

import { motion } from "framer-motion";
import { CreditCard, Database, Lock, Mail, Shield, Zap } from "lucide-react";

const features = [
  { icon: Shield, label: "Security", color: "text-red-400" },
  { icon: CreditCard, label: "Payments", color: "text-purple-400" },
  { icon: Lock, label: "Auth", color: "text-green-400" },
  { icon: Database, label: "Database", color: "text-blue-400" },
  { icon: Mail, label: "Email", color: "text-yellow-400" },
  { icon: Zap, label: "Performance", color: "text-indigo-400" },
];

export function SimpleBento() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-primary/30 transition-colors"
          >
            <Icon className={`w-6 h-6 ${feature.color}`} />
            <span className="text-xs text-muted-foreground font-medium">
              {feature.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
