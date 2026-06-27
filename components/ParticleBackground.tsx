"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  // Pointer in normalized device-ish space, smoothed.
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const COUNT = 1400;

  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);

    const green = new THREE.Color("#00ff88");
    const cyan = new THREE.Color("#00e5ff");
    const dim = new THREE.Color("#1b3a30");

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;

      sizes[i] = Math.random() * 0.06 + 0.01;

      const r = Math.random();
      const c = r > 0.92 ? green : r > 0.82 ? cyan : dim;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, sizes, colors };
  }, []);

  useFrame((state, delta) => {
    if (!points.current) return;

    // Read global pointer (set on window) for parallax independent of canvas events.
    const px = state.pointer.x;
    const py = state.pointer.y;
    target.current.x = px * 0.6;
    target.current.y = py * 0.4;
    mouse.current.x += (target.current.x - mouse.current.x) * 0.04;
    mouse.current.y += (target.current.y - mouse.current.y) * 0.04;

    // Slow constant drift + gentle parallax tilt toward the cursor.
    points.current.rotation.y += delta * 0.012;
    points.current.rotation.x = mouse.current.y * 0.25;
    points.current.position.x = mouse.current.x * 1.2;
    points.current.position.y = -mouse.current.y * 0.8;

    void viewport;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={COUNT}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}
