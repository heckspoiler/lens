import React, { useRef, useState, useEffect } from 'react';
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

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Convert to normalized coordinates (-1 to 1)
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div ref={el} {...props}>
        <img
          className={styles.hiddenWhenSmooth}
          ref={img}
          src={src}
          decode="async"
          alt="This will be loaded as a texture"
          style={{ display: 'none' }}
        />
      </div>

      {hasSmoothScrollbar && (
        <UseCanvas debug={true}>
          <ScrollScene track={el} debug={true}>
            {(props) => {
              console.log('ScrollScene props:', props); // Debug log
              return (
                <WebGLCube img={img} {...props} mousePosition={mousePosition} />
              );
            }}
          </ScrollScene>
        </UseCanvas>
      )}
    </>
  );
}
function WebGLCube({ img, scale, inViewport, mousePosition }) {
  const mesh = useRef();
  const texture = useImageAsTexture(img);
  const { scroll } = useScrollbar();

  useFrame((_, delta) => {
    if (mesh.current) {
      // Add safety check
      // Add rotation for both X and Y axes
      mesh.current.rotation.x = mousePosition.y * 0.5;
      mesh.current.rotation.y = mousePosition.x * 0.5;

      // Keep the wobble effect
      mesh.current.material.factor += scroll.velocity * 0.005;
      mesh.current.material.factor *= 0.95;
    }
  });

  // Log values to debug
  console.log('Mouse position:', mousePosition);
  console.log('Mesh rotation:', mesh.current?.rotation);

  const spring = useSpring({
    scale: inViewport ? scale.times(1) : scale.times(0),
    config: inViewport ? config.wobbly : config.stiff,
  });

  return (
    <a.mesh ref={mesh} {...spring}>
      <boxGeometry args={[1, 1, 1]} /> {/* Made bigger for visibility */}
      <MeshWobbleMaterial
        factor={0}
        speed={2}
        color="white"
        map={texture}
        roughness={0.2}
        metalness={0}
        transparent
        depthTest={false}
      />
    </a.mesh>
  );
}
