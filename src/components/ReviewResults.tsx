"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, TrendingUp, Award } from "lucide-react";
import { ReviewResultType } from "@/types/review";

interface ReviewResultsProps {
  data: ReviewResultType | null;
}

export function ReviewResults({ data }: ReviewResultsProps) {
  if (!data) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreRing = (score: number) => {
    if (score >= 80) return "border-green-400 from-green-500/20 to-transparent";
    if (score >= 60) return "border-yellow-400 from-yellow-500/20 to-transparent";
    return "border-red-400 from-red-500/20 to-transparent";
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-4xl mx-auto px-4 py-12"
    >
      <div className="text-center mb-10">
        <motion.div variants={item} className="inline-block relative">
          <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center bg-gradient-to-b ${getScoreRing(data.score)} shadow-2xl`}>
            <div className={`text-4xl font-bold ${getScoreColor(data.score)} flex flex-col items-center`}>
              {data.score}
              <span className="text-xs text-slate-400 font-normal uppercase tracking-wider mt-1">/ 100</span>
            </div>
          </div>
          <div className="absolute -bottom-3 -right-3 bg-indigo-500 p-2 rounded-full shadow-lg">
            <Award className="w-5 h-5 text-white" />
          </div>
        </motion.div>
        
        <motion.h2 variants={item} className="text-3xl font-bold text-white mt-8 mb-4">
          Analysis Complete
        </motion.h2>
        <motion.p variants={item} className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          {data.summary}
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 relative">
        <motion.div variants={item} className="glass-panel p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full transition-transform group-hover:scale-110" />
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-2 bg-green-500/20 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Top Strengths</h3>
          </div>
          <ul className="space-y-4 relative z-10">
            {data.strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="min-w-[5px] h-5 flex items-center justify-center text-green-400 mt-0.5">•</span>
                <span className="text-slate-300 leading-relaxed">{str}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={item} className="glass-panel p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-bl-full transition-transform group-hover:scale-110" />
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-2 bg-red-500/20 rounded-xl">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Areas to Improve</h3>
          </div>
          <ul className="space-y-4 relative z-10">
            {data.weaknesses.map((weak, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="min-w-[5px] h-5 flex items-center justify-center text-red-400 mt-0.5">•</span>
                <span className="text-slate-300 leading-relaxed">{weak}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div variants={item} className="mt-6 glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-500/20 rounded-xl">
            <TrendingUp className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Actionable Recommendations</h3>
        </div>
        <div className="space-y-4">
          {data.recommendations.map((rec, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                {i + 1}
              </div>
              <p className="text-slate-300 pt-1 leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
