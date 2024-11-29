import { GlobalCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig';

import '@14islands/r3f-scroll-rig/css';

export default function Canvas() {
  return (
    <>
      <article>
        <h1>Hello World</h1>
      </article>

      <SmoothScrollbar />

      <GlobalCanvas />
    </>
  );
}
