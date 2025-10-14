"use client";

import { motion } from "framer-motion";
import {
  Shield,
  CreditCard,
  Lock,
  Database,
  Zap,
  Mail,
  TrendingUp,
  DollarSign,
  Users,
} from "lucide-react";

const floatingBadges = [
  { icon: Shield, label: "Security", color: "from-red-500 to-orange-500", delay: 0 },
  { icon: CreditCard, label: "Payments", color: "from-purple-500 to-pink-500", delay: 0.2 },
  { icon: Lock, label: "Auth", color: "from-green-500 to-emerald-500", delay: 0.4 },
  { icon: Database, label: "Database", color: "from-blue-500 to-cyan-500", delay: 0.6 },
  { icon: Mail, label: "Email", color: "from-yellow-500 to-orange-500", delay: 0.8 },
  { icon: Zap, label: "Fast", color: "from-indigo-500 to-purple-500", delay: 1 },
];

export function DashboardPreview() {
  return (
    <div className="relative w-full h-full">
      {/* Main Dashboard Preview with Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-2xl"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10" />

        {/* Mock Dashboard Content */}
        <div className="relative p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-6 w-32 bg-foreground/10 rounded animate-pulse" />
              <div className="h-4 w-48 bg-foreground/5 rounded animate-pulse" />
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/20 animate-pulse" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { icon: DollarSign, value: "$45,231", label: "Revenue" },
              { icon: Users, value: "2,350", label: "Users" },
              { icon: TrendingUp, value: "+20%", label: "Growth" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border/30"
              >
                <stat.icon className="w-5 h-5 text-primary mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Chart placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6 h-48 bg-background/30 backdrop-blur-sm rounded-lg border border-border/30 flex items-center justify-center overflow-hidden relative"
          >
            {/* Animated chart lines */}
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <motion.path
                d="M 0 150 Q 100 100 200 120 T 400 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />
              <motion.path
                d="M 0 180 Q 100 140 200 150 T 400 110"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-blue-400 opacity-50"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.2 }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20 blur-xl opacity-50 -z-10" />
      </motion.div>

      {/* Floating Badges */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingBadges.map((badge, index) => {
          const Icon = badge.icon;
          const positions = [
            { top: "5%", left: "-10%" },
            { top: "20%", right: "-15%" },
            { bottom: "40%", left: "-12%" },
            { bottom: "20%", right: "-10%" },
            { top: "50%", right: "-18%" },
            { bottom: "10%", left: "-8%" },
          ];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                delay: badge.delay,
                duration: 0.6,
                type: "spring",
                bounce: 0.4,
              }}
              style={positions[index]}
              className="absolute"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: badge.delay,
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${badge.color} text-white shadow-lg border border-white/20 backdrop-blur-sm`}
              >
                <Icon className="w-5 h-5 stroke-[2.5]" />
                <span className="text-sm font-semibold whitespace-nowrap">{badge.label}</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-white"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
