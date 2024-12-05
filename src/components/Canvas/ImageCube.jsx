import React, { useRef, useState, useEffect } from 'react';
import {
  ScrollScene,
  UseCanvas,
  useScrollRig,
  styles,
  useImageAsTexture,
} from '@14islands/r3f-scroll-rig';
import { useFrame } from '@react-three/fiber';
import { a, useSpring, config } from '@react-spring/three';

export function ImageCube({ src, ...props }) {
  const el = useRef();
  const img = useRef();
  const { hasSmoothScrollbar } = useScrollRig();

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
  const prevMouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (mesh.current) {
      console.log('Mouse Position:', mousePosition); // Debug mouse position
      console.log('Current Rotation:', mesh.current.rotation); // Debug rotation

      // Reduced multiplier for smoother rotation
      mesh.current.rotation.x = mousePosition.y * Math.PI * 0.5;
      mesh.current.rotation.y = mousePosition.x * Math.PI * 0.5;

      const velocityX = Math.abs(mousePosition.x - prevMouse.current.x);
      const velocityY = Math.abs(mousePosition.y - prevMouse.current.y);

      console.log('Velocity:', { velocityX, velocityY }); // Debug velocity

      prevMouse.current = { x: mousePosition.x, y: mousePosition.y };
    }
  });

  // Add initial position
  useEffect(() => {
    if (mesh.current) {
      mesh.current.position.z = 0;
      mesh.current.position.y = 0;
      mesh.current.position.x = 0;
    }
  }, []);

  return (
    <a.mesh ref={mesh}>
      <boxGeometry args={[5, 5, 5]} />
      <meshStandardMaterial
        bumpScale={5}
        color="#ffffff"
        map={texture}
        roughness={0.8}
        metalness={0.1}
      />
    </a.mesh>
  );
}
