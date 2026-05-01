import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload, AdaptiveDpr } from '@react-three/drei';

function Particles(props: any) {
  const ref = useRef<any>();
  
  // Memoize particle positions to avoid re-generation
  const sphere = useMemo(() => {
    const count = 3000; // Reduced from 5000 for better performance
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.5 * Math.pow(Math.random(), 1 / 3);
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
      
      // Smoother parallax
      const targetX = (state.mouse.x * state.viewport.width) / 60;
      const targetY = (state.mouse.y * state.viewport.height) / 60;
      ref.current.position.x += (targetX - ref.current.position.x) * 0.05;
      ref.current.position.y += (targetY - ref.current.position.y) * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#4a6cf7"
          size={0.007}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

function GridBox() {
  const ref = useRef<any>();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
      ref.current.rotation.x = state.clock.elapsedTime * 0.04;
      
      const targetX = (state.mouse.x * state.viewport.width) / 40;
      const targetY = (state.mouse.y * state.viewport.height) / 40;
      ref.current.position.x += (targetX - ref.current.position.x) * 0.05;
      ref.current.position.y += (targetY - ref.current.position.y) * 0.05;
    }
  });

  return (
    <mesh ref={ref} scale={2.5}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#52b89a" wireframe={true} transparent opacity={0.15} />
    </mesh>
  );
}

export default function ARVRScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '100px' } // Load slightly before coming into view
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 2, 
        pointerEvents: 'none',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.6s ease'
      }}
    >
      {isVisible && (
        <Canvas 
          camera={{ position: [0, 0, 3] }}
          dpr={[1, 1.5]} // Limit DPR for performance
          gl={{ 
            antialias: false, // Save GPU
            powerPreference: "low-power",
            alpha: true
          }}
          style={{ background: 'transparent' }}
        >
          <AdaptiveDpr pixelated />
          <GridBox />
          <Particles />
          <Preload all />
        </Canvas>
      )}
    </div>
  );
}
