onmessage = ({ data: i }) => {
  console.log("worker", i);
  const w1 = new Worker("/fork.js");
  const w2 = new Worker("/fork.js");
  w1.postMessage(2 * i);
  w2.postMessage(2 * i + 1);

  setTimeout(() => {
    for (let i = 0; i < 1_000; i++) {
      const mem = {};
      i *= i * i + 27;
      mem[i] = i;
    }
  }, 100);
};
