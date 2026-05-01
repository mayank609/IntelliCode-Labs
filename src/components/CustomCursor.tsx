import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const cursorPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      cursorPos.current.x = e.clientX;
      cursorPos.current.y = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      
      setIsVisible((prev) => {
        if (!prev) return true;
        return prev;
      });
    };

    const updateRing = () => {
      // Lerp for smooth trailing effect
      ringPos.current.x += (cursorPos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (cursorPos.current.y - ringPos.current.y) * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      
      animationFrameId = requestAnimationFrame(updateRing);
    };

    updateRing();

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <>
      <div 
        ref={dotRef}
        className={`custom-cursor-dot ${isHovering ? 'hovering' : ''} ${isVisible ? 'visible' : ''}`}
        style={{ transform: `translate3d(-100px, -100px, 0)` }}
      />
      <div 
        ref={ringRef}
        className={`custom-cursor-ring ${isHovering ? 'hovering' : ''} ${isVisible ? 'visible' : ''}`}
        style={{ transform: `translate3d(-100px, -100px, 0)` }}
      />
    </>
  );
}