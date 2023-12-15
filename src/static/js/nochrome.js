const isChromium =
  !!navigator.userAgentData &&
  navigator.userAgentData.brands.some((data) => data.brand == "Chromium");
if (isChromium) {
  document.querySelector(".browser_warning").style.display = "flex";
}
