
import { useEffect, useRef } from 'react';

interface GestureData {
  type: 'tap' | 'pinch' | 'drag';
  position?: { x: number; y: number };
  scale?: number;
  delta?: { x: number; y: number };
}

interface ARGestureControlsProps {
  onGesture: (gesture: GestureData) => void;
  isActive: boolean;
  children: React.ReactNode;
}

const ARGestureControls = ({ onGesture, isActive, children }: ARGestureControlsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastTouchDistance = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    // Touch start handler
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      
      if (e.touches.length === 1) {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      } else if (e.touches.length === 2) {
        const distance = Math.sqrt(
          Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
          Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2)
        );
        lastTouchDistance.current = distance;
      }
    };

    // Touch move handler
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      if (e.touches.length === 1 && touchStartRef.current) {
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        const deltaX = currentX - touchStartRef.current.x;
        const deltaY = currentY - touchStartRef.current.y;

        // Only trigger drag if movement is significant
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
          onGesture({
            type: 'drag',
            position: { x: currentX, y: currentY },
            delta: { x: deltaX, y: deltaY }
          });
          
          touchStartRef.current = { x: currentX, y: currentY };
        }
      } else if (e.touches.length === 2 && lastTouchDistance.current) {
        const distance = Math.sqrt(
          Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
          Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2)
        );
        
        const scale = distance / lastTouchDistance.current;
        
        onGesture({
          type: 'pinch',
          scale: scale
        });
        
        lastTouchDistance.current = distance;
      }
    };

    // Touch end handler
    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        if (touchStartRef.current) {
          // Check if it was a tap (minimal movement)
          const endX = e.changedTouches[0].clientX;
          const endY = e.changedTouches[0].clientY;
          const deltaX = Math.abs(endX - touchStartRef.current.x);
          const deltaY = Math.abs(endY - touchStartRef.current.y);
          
          if (deltaX < 10 && deltaY < 10) {
            onGesture({
              type: 'tap',
              position: { x: endX, y: endY }
            });
          }
        }
        
        touchStartRef.current = null;
        lastTouchDistance.current = null;
      }
    };

    // Mouse handlers for desktop
    const handleMouseDown = (e: MouseEvent) => {
      touchStartRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (touchStartRef.current && e.buttons === 1) {
        const deltaX = e.clientX - touchStartRef.current.x;
        const deltaY = e.clientY - touchStartRef.current.y;

        onGesture({
          type: 'drag',
          position: { x: e.clientX, y: e.clientY },
          delta: { x: deltaX, y: deltaY }
        });
        
        touchStartRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (touchStartRef.current) {
        const deltaX = Math.abs(e.clientX - touchStartRef.current.x);
        const deltaY = Math.abs(e.clientY - touchStartRef.current.y);
        
        if (deltaX < 5 && deltaY < 5) {
          onGesture({
            type: 'tap',
            position: { x: e.clientX, y: e.clientY }
          });
        }
      }
      touchStartRef.current = null;
    };

    // Add event listeners
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isActive, onGesture]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {children}
    </div>
  );
};

export default ARGestureControls;
