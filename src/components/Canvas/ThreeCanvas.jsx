import { GlobalCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig';

import '@14islands/r3f-scroll-rig/css';

export default function ThreeCanvas() {
  return (
    <>
      <article>
        <h1>Hello World</h1>
        <h3>Bye World</h3>
      </article>

      <SmoothScrollbar />

      <GlobalCanvas />
    </>
  );
}
