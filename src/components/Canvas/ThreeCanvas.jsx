import { GlobalCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig';

import '@14islands/r3f-scroll-rig/css';
import WebGLBackground from './WebGLBackground';

export default function ThreeCanvas() {
  return (
    <>
      <SmoothScrollbar />
      <GlobalCanvas></GlobalCanvas>
    </>
  );
}
