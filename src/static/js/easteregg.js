const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
  "Enter",
];
const AWESOME = ["a", "w", "e", "s", "o", "m", "e"];
const CD = ["i", "d", "s", "u", "k", "a", "b", "l", "y", "a", "t"];

let codes = [KONAMI, AWESOME, CD];
let keys = [];
let codes_that_can_be_at_this_point = codes;

let eggs = { classic: false, awesome: false, cd: false };

var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");

const DIM = 720;

canvas.width = DIM;
canvas.height = DIM;

var icon = new Image();

var x_pos = 0;
var colour = 0;

var render = () => {
  context.clearRect(0, 0, DIM, DIM);
  context.drawImage(icon, x_pos - DIM, 0);
  context.drawImage(icon, x_pos, 0);

  // i can't think of an actual way to hue rotate the canvas
  if (eggs.awesome) {
    context.globalCompositeOperation = "hue";
    context.fillStyle = `hsl(${colour}deg, 100%, 50%)`;
    context.fillRect(0, 0, canvas.width, canvas.height);
    // looks better but doesn't show the second one
    //context.globalCompositeOperation = "destination-atop";
    //context.drawImage(icon, x_pos - DIM, 0);
    //context.drawImage(icon, x_pos, 0);
  }

  if (eggs.classic) x_pos += Math.ceil(DIM / 256);
  if (eggs.awesome) colour += 1;
  if (x_pos > DIM) x_pos = 0;
  if (colour > 360) colour = 0;

  requestAnimationFrame(render);
};

icon.src = "/images/icon.png";
icon.onload = () => {
  render();
  setInterval(() => {
    document
      .querySelector("link[rel=icon]")
      .setAttribute("href", canvas.toDataURL("image/x-icon"));
  }, 1000 / 60);
};

window.addEventListener("keydown", (event) => {
  keys.push(event.key);
  codes_that_can_be_at_this_point = [];
  for (let code of codes) {
    let is_real = true;
    for (let key in keys) {
      is_real = keys[key] == code[key]
    }
    if (is_real) codes_that_can_be_at_this_point.push(code);
    if (is_real && code.length == keys.length) {
      keys = [];
      if (code == KONAMI) {
        eggs.classic = true;
      } else if (code == AWESOME) {
        eggs.awesome = true;
      } else if (code == CD) {
        eggs.cd = true;
        document.querySelector(".edit_css").style.display = "block";
      }
    }
  }
  if (codes_that_can_be_at_this_point.length == 0) keys = [];
});
