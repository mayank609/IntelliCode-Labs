import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const updateRing = () => {
      // Lerp for smooth trailing effect
      ringPos.current.x += (position.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (position.y - ringPos.current.y) * 0.15;
      
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
  }, [position.x, position.y, isVisible]);

  if (typeof window === 'undefined') return null;

  return (
    <>
      <div 
        className={`custom-cursor-dot ${isHovering ? 'hovering' : ''} ${isVisible ? 'visible' : ''}`}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      />
      <div 
        ref={ringRef}
        className={`custom-cursor-ring ${isHovering ? 'hovering' : ''} ${isVisible ? 'visible' : ''}`}
      />
    </>
  );
}
