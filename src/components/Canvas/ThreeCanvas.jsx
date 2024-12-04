import React, { useRef, useState, Suspense, useEffect } from 'react';

import { ImageCube } from './ImageCube';

import { SmoothScrollbar } from '@14islands/r3f-scroll-rig';
import { GlobalCanvas } from '@14islands/r3f-scroll-rig';
import { Loader, Environment } from '@react-three/drei';

import WebGLBackground from './WebGLBackground';

export default function App() {
  const eventSource = useRef();
  const [enabled, setEnabled] = useState(true);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };
    console.log('mousePosition:', mousePosition);
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mousePosition]);

  return (
    <div ref={eventSource}>
      <GlobalCanvas
        // shader errors are hidden by default which speeds up compilation
        debug={false}
        // scaleMultiplier is a scroll-rig setting to scale the entire scene
        scaleMultiplier={0.01}
        // All other props on the R3F Canvas is supported:
        eventSource={eventSource}
        eventPrefix="client"
        flat // disable toneMapping since we have editorial images
        camera={{ fov: 14 }}
        style={{ pointerEvents: 'none', zIndex: -1 }}
      >
        {(globalChildren) => (
          <>
            <WebGLBackground />
            <Suspense fallback="">
              <Environment preset="city" />
              {globalChildren}
            </Suspense>
          </>
        )}
      </GlobalCanvas>
      <SmoothScrollbar enabled={enabled} config={{ syncTouch: true }} />
      <article>
        <section>
          <ImageCube
            src="images/front.jpg"
            className="JellyPlaceholder"
            mousePositionX={mousePosition.x}
            mousePositionY={mousePosition.y}
          />
        </section>
      </article>
    </div>
  );
}
