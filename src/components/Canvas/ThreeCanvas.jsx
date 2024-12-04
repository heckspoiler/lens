import React, { useRef, useState } from 'react';

import { ImageCube } from './ImageCube';

import { SmoothScrollbar } from '@14islands/r3f-scroll-rig';
import { Loader } from '@react-three/drei';

export default function App() {
  const eventSource = useRef();
  const [enabled, setEnabled] = useState(true);

  return (
    <div ref={eventSource}>
      <SmoothScrollbar enabled={enabled} config={{ syncTouch: true }} />
      <article>
        <section>
          <ImageCube src="images/front.jpg" className="JellyPlaceholder" />
        </section>
      </article>
    </div>
  );
}
