import React, { useState, ReactNode } from "react";

interface CarouselProps {
  children: ReactNode[];
  className?: string;
  onIndexChange?: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  className = "",
  onIndexChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    onIndexChange?.(index);
  };

  return (
    <div className={`flex flex-col gap-2 overflow-hidden ${className}`}>
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <div key={index} className="">
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
