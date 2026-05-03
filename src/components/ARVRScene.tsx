import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Preload, AdaptiveDpr } from '@react-three/drei';

function SceneContent() {
  const { size } = useThree();
  const isMobile = size.width < 768;

  return (
    <>
      <GridBox isMobile={isMobile} />
      <Particles isMobile={isMobile} />
    </>
  );
}

function Particles({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<any>();
  
  const sphere = useMemo(() => {
    const count = isMobile ? 1200 : 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = (isMobile ? 1.2 : 1.5) * Math.pow(Math.random(), 1 / 3);
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [isMobile]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
      
      const targetX = (state.mouse.x * state.viewport.width) / 60;
      const targetY = (state.mouse.y * state.viewport.height) / 60;
      ref.current.position.x += (targetX - ref.current.position.x) * 0.05;
      ref.current.position.y += (targetY - ref.current.position.y) * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#4a6cf7"
          size={isMobile ? 0.012 : 0.007}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

function GridBox({ isMobile }: { isMobile: boolean }) {
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
    <mesh ref={ref} scale={isMobile ? 1.8 : 2.5}>
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
      { threshold: 0, rootMargin: '200px' }
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
        transition: 'opacity 0.8s ease'
      }}
    >
      {isVisible && (
        <Canvas 
          camera={{ position: [0, 0, 3], fov: 75 }}
          dpr={[1, 2]}
          gl={{ 
            antialias: false,
            powerPreference: "low-power",
            alpha: true
          }}
          style={{ background: 'transparent' }}
        >
          <AdaptiveDpr pixelated />
          <SceneContent />
          <Preload all />
        </Canvas>
      )}
    </div>
  );
}
