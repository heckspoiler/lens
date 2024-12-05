import React, { useRef, useState, Suspense } from 'react';

import { ImageCube } from './ImageCube';

import { SmoothScrollbar } from '@14islands/r3f-scroll-rig';
import { GlobalCanvas } from '@14islands/r3f-scroll-rig';
import { Environment } from '@react-three/drei';

import WebGLBackground from './WebGLBackground';

export default function App() {
  const eventSource = useRef();
  const [enabled, setEnabled] = useState(true);

  return (
    <div ref={eventSource}>
      <GlobalCanvas
        debug={false}
        scaleMultiplier={0.008}
        eventSource={eventSource}
        eventPrefix="client"
        flat
        camera={{ fov: 12 }}
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
            src="images/background.jpg"
            className="JellyPlaceholder"
            style={{ width: '100%', height: '100vh' }}
          />
        </section>
      </article>
    </div>
  );
}
