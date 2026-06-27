"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Torus } from "@react-three/drei";
import * as THREE from "three";

function Orb() {
  const group = useRef<THREE.Group>(null);
  const wire = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const mx = state.pointer.x;
    const my = state.pointer.y;

    if (group.current) {
      group.current.rotation.y += delta * 0.18;
      // Ease the whole rig toward the cursor for a parallax feel.
      group.current.rotation.x += (my * 0.4 - group.current.rotation.x) * 0.05;
      group.current.position.x += (mx * 0.4 - group.current.position.x) * 0.05;
    }
    if (wire.current) {
      wire.current.rotation.x = t * 0.25;
      wire.current.rotation.z = t * 0.15;
      const s = 1 + Math.sin(t * 1.4) * 0.04;
      wire.current.scale.setScalar(s);
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.4;
    if (ringB.current) ringB.current.rotation.x = t * 0.3;
  });

  return (
    <group ref={group}>
      {/* Inner solid core */}
      <Icosahedron args={[1.05, 1]}>
        <meshStandardMaterial
          color="#031a12"
          emissive="#00ff88"
          emissiveIntensity={0.35}
          roughness={0.3}
          metalness={0.6}
          flatShading
        />
      </Icosahedron>

      {/* Glowing wireframe shell */}
      <Icosahedron ref={wire} args={[1.5, 1]}>
        <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.55} />
      </Icosahedron>

      {/* Orbiting cyan rings */}
      <Torus ref={ringA} args={[2.1, 0.012, 16, 120]}>
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.7} />
      </Torus>
      <Torus ref={ringB} args={[2.45, 0.008, 16, 120]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color="#00ff88" transparent opacity={0.45} />
      </Torus>

      <pointLight position={[3, 2, 4]} intensity={2.2} color="#00ff88" />
      <pointLight position={[-3, -2, 2]} intensity={1.4} color="#00e5ff" />
      <ambientLight intensity={0.25} />
    </group>
  );
}

function Fallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-48 w-48">
        <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10 blur-2xl" />
        <div className="absolute inset-6 rounded-full border border-primary/40 shadow-neon animate-float" />
        <div className="absolute inset-12 rounded-full border border-secondary/30" />
      </div>
    </div>
  );
}

export default function HeroOrb() {
  return (
    <div className="relative h-full w-full">
      {/* Soft glow behind the canvas */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[90px]" />
      <Suspense fallback={<Fallback />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Orb />
        </Canvas>
      </Suspense>
    </div>
  );
}
