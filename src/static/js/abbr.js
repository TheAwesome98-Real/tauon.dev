for (let abbr of document.querySelectorAll("abbr")) {
  abbr.addEventListener("click", (event) => {
    alert(`${event.target.getAttribute("title")}`);
  });
}
