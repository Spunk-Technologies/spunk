console.log("inline head");
style = document.createElement("style");
style.innerText = "body {background-color: green;}";
document.getElementsByTagName("head")[0].appendChild(style);
