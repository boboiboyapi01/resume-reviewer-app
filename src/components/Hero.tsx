"use client";

import { motion } from "framer-motion";
import { Sparkles, FileText, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">AI-Powered Resume Analysis</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-400"
        >
          Land Your Dream Job Faster
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 mb-10"
        >
          Get instant, actionable feedback on your resume. Our AI analyzes your CV against industry standards to give you a competitive edge.
        </motion.p>
        

      </div>
    </section>
  );
}
