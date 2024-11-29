import React, { useRef } from 'react';

import { ScrollScene, UseCanvas, styles } from '@14islands/r3f-scroll-rig';

function Image({ src }) {
  const el = useRef();
  return (
    <>
      <img ref={el} className={styles.hiddenWhenSmooth} src={src} />
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
