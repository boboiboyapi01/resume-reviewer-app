"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Uploader } from "@/components/Uploader";
import { ReviewResults } from "@/components/ReviewResults";
import { ReviewResultType } from "@/types/review";

export default function Home() {
  const [reviewData, setReviewData] = useState<ReviewResultType | null>(null);

  const handleReviewComplete = (data: ReviewResultType) => {
    setReviewData(data);
    // Add a slight delay before scrolling down
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });
    }, 100);
  };

  return (
    <main className="min-h-screen relative pb-20">
      <Hero />
      <div className="relative z-10">
         <Uploader onReviewComplete={handleReviewComplete} />
         {reviewData && <ReviewResults data={reviewData} />}
      </div>
    </main>
  );
}
