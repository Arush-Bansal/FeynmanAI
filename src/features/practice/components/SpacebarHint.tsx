"use client"
import { Badge } from "@/components/ui/badge";

interface SpacebarHintProps {
  isVisible: boolean;
}

export const SpacebarHint = ({ isVisible }: SpacebarHintProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <Badge variant="secondary" className="bg-gray-800/80 text-white border-gray-600 backdrop-blur-sm">
        Press and hold Spacebar to record
      </Badge>
    </div>
  );
}; 