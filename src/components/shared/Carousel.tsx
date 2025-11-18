import React, { useState, useRef } from "react";
import type { ReactNode } from "react";

type TCarouselProps = {
  children: ReactNode[];
  onIndexChange?: (index: number) => void;
  className?: string;
};

const Carousel: React.FC<TCarouselProps> = ({
  children,
  onIndexChange,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  const goToSlide = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, children.length - 1));
    setCurrentIndex(clampedIndex);
    onIndexChange?.(clampedIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;

    const endX = e.changedTouches[0].clientX;
    const diffX = startXRef.current - endX;
    const threshold = 50;

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }

    isDraggingRef.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    isDraggingRef.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;

    const endX = e.clientX;
    const diffX = startXRef.current - endX;
    const threshold = 50;

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }

    isDraggingRef.current = false;
  };

  return (
    <div
      className={`flex flex-col gap-2 box-border overflow-hidden w-full flex-1 ${className}`}
    >
      <div
        className="flex transition-transform duration-300 ease-in-out select-none"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => (isDraggingRef.current = false)}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="min-w-full flex items-center justify-center box-border"
          >
            {child}
          </div>
        ))}
      </div>

      <div className="flex space-x-2 self-center">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 transition-all duration-300 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-green-500 w-8" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
