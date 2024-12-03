import React, { Suspense, useRef } from 'react';

import { useThree, useFrame } from '@react-three/fiber';

import { Image } from '@react-three/drei';

export default function WebGLBackground() {
  const bg = useRef();
  const viewport = useThree((state) => state.viewport);

  useFrame((_, delta) => {
    if (bg.current) bg.current.rotation.z -= delta * 0.1;
  });

  return (
    <Suspense fallback={null}>
      <Image
        ref={bg}
        scale={Math.max(viewport.width, viewport.height) * 1.4}
        url="images/background.jpg"
        transparent
        renderOrder={-1}
      />
    </Suspense>
  );
}
