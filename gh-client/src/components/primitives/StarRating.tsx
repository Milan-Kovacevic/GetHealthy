"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
}

export default function StarRating({
  rating,
  maxRating = 5,
  onRatingChange,
  readonly = false,
}: StarRatingProps) {
  const [hover, setHover] = useState(0);

  const handleRatingChange = (newRating: number) => {
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div
      className="flex items-center"
      aria-label={`Rate ${rating} out of ${maxRating} stars`}
    >
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={index}
            disabled={readonly}
            className="p-px focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
            onClick={() => handleRatingChange(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            aria-label={`Rate ${starValue} star${starValue !== 1 ? "s" : ""}`}
          >
            <Star
              className={`w-5 h-5 ${
                starValue <= (hover || rating)
                  ? "text-primary fill-primary"
                  : "text-primary"
              } transition-colors duration-150`}
            />
          </button>
        );
      })}
      <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}
