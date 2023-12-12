var sleep = (ms) => new Promise((r) => setTimeout(r, ms));

console.log("body js");

sleep(1000).then(() => {
  console.log("body adds style");
  // <link rel="stylesheet" href="bodyStyle.css">
  style = document.createElement("link");
  style.href = "bodyStyle.css";
  style.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(style);
});
