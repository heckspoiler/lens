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

      <Loader
        containerStyles={{
          background: 'transparent',
          top: 'auto',
          bottom: 0,
          height: '5px',
        }}
        innerStyles={{ background: 'white', width: '100vw', height: '5px' }}
        barStyles={{ background: '#6e6bcd', height: '100%' }}
      />
    </div>
  );
}
