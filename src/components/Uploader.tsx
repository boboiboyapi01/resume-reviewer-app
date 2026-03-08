"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, File, AlertCircle, Loader2 } from "lucide-react";
import { ReviewResultType } from "@/types/review";

interface UploaderProps {
  onReviewComplete: (data: ReviewResultType) => void;
}

export function Uploader({ onReviewComplete }: UploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateAndProcessFile = async (file: File) => {
    setError(null);
    const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    
    if (!validTypes.includes(file.type)) {
      setError("Please upload a PDF or DOCX file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB.");
      return;
    }

    setIsUploading(true);
    
    try {
      // Simulate API call and parsing
      const formData = new FormData();
      formData.append("resume", file);
      
      const res = await fetch("/api/review", {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) throw new Error("Failed to review resume.");
      
      const data = await res.json();
      onReviewComplete(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  return (
    <section id="uploader" className="w-full max-w-3xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div 
          className={`relative p-8 md:p-12 rounded-3xl border-2 border-dashed transition-all duration-300 glass-panel overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 ${
            isDragging ? "border-indigo-400 bg-indigo-500/5 scale-[1.02]" : "border-slate-700 hover:border-indigo-400/50 bg-slate-800/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          {isUploading && (
             <div className="absolute inset-0 z-10 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl transition-opacity">
                <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mb-4" />
                <p className="text-white font-medium text-lg">Analyzing Resume...</p>
                <p className="text-slate-400 text-sm mt-2">Our AI is reading your experience</p>
             </div>
          )}

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".pdf,.docx" 
            className="hidden" 
          />
          
          <div className="flex flex-col items-center justify-center text-center">
            <div className={`p-4 rounded-full mb-6 transition-colors duration-300 ${isDragging ? "bg-indigo-500/20 text-indigo-300" : "bg-slate-700/50 text-slate-400"}`}>
              <UploadCloud className="w-10 h-10" />
            </div>
            
            <h3 className="text-2xl font-semibold text-white mb-2">
              Browse or Drop your Resume
            </h3>
            <p className="text-slate-400 max-w-md mx-auto mb-6">
              Upload your PDF or DOCX file. We will extract the text and analyze your professional background instantly.
            </p>
            
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <File className="w-4 h-4" />
              <span>Supports PDF, DOCX (Max 5MB)</span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
