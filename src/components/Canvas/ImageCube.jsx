import React, { useRef } from 'react';
import {
  ScrollScene,
  UseCanvas,
  useScrollbar,
  useScrollRig,
  styles,
  useImageAsTexture,
} from '@14islands/r3f-scroll-rig';
import { useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial } from '@react-three/drei';
import { a, useSpring, config } from '@react-spring/three';

export function ImageCube({ src, ...props }) {
  const el = useRef();
  const img = useRef();
  const { hasSmoothScrollbar } = useScrollRig();

  return (
    <>
      <div ref={el} {...props}>
        <img
          className={styles.hiddenWhenSmooth}
          ref={img}
          src={src}
          decode="async"
          alt="This will be loaded as a texture"
        />
      </div>

      {hasSmoothScrollbar && (
        <UseCanvas debug={true}>
          <ScrollScene track={el} debug={true}>
            {(props) => {
              console.log('ScrollScene props:', props); // Debug log
              return <WebGLCube img={img} {...props} />;
            }}
          </ScrollScene>
        </UseCanvas>
      )}
    </>
  );
}
function WebGLCube({ img, scale, inViewport }) {
  const mesh = useRef();
  const texture = useImageAsTexture(img);
  const { scroll } = useScrollbar();

  useFrame((_, delta) => {
    mesh.current.material.factor += scroll.velocity * 0.005;
    mesh.current.material.factor *= 0.95;
  });

  const spring = useSpring({
    scale: scale,
    config: config.wobbly,
    delay: 0,
  });

  return (
    <a.mesh ref={mesh} {...spring}>
      <boxGeometry args={[1, 1, 0.5, 64, 64]} />
      <MeshWobbleMaterial
        factor={0}
        speed={2}
        color="#red"
        map={texture}
        roughness={0.14}
        metalness={0}
        transparent
        depthTest={false}
      />
    </a.mesh>
  );
}
