if (
  window.location.hostname == "localhost" ||
  window.location.hostname == "127.0.0.1" ||
  window.location.hostname == "0.0.0.0"
) {
  document.title = "devel: " + document.title;
}
