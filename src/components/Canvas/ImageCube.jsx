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

import { a, useSpring, config } from 'react-spring/three';

export default function ImageCube({ src, ...props }) {
  const el = useRef();
  const img = useRef();

  const { hasSmoothScrollbar } = useScrollbar();

  return (
    <>
      <div ref={el} {...props}></div>
    </>
  );
}
