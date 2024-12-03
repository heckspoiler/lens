import React, { useRef } from 'react';

import {
  ScrollScene,
  UseCanvas,
  styles,
  useScrollRig,
} from '@14islands/r3f-scroll-rig';

export function Image({ src }) {
  const el = useRef();

  const { hasSmoothScrollbar } = useScrollRig();

  return (
    <>
      <img
        ref={el}
        className={styles.hiddenWhenSmooth}
        src={src}
        alt="This will be loaded as a texture"
      />
      <UseCanvas>
        <ScrollScene track={el}>
          {({ scale }) => (
            <mesh scale={scale}>
              <planeGeometry />
              <meshBasicMaterial color="red" />
            </mesh>
          )}
        </ScrollScene>
      </UseCanvas>
    </>
  );
}
