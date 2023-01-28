    var canvas = document.querySelector("canvas");
    var context = canvas.getContext("2d");

    canvas.width = 512;
    canvas.height = 512;

    var bg = new Image();
    bg.src = "images/background.png";

    var fg = new Image();
    fg.src = "images/foreground.png";

    var i = 0;

    var render = () => {
      context.drawImage(bg, 0, 0);
      context.drawImage(fg, i - 512, 0);
      context.drawImage(fg, i, 0);

      i += 2;
      if (i > 512) i = 0;

      requestAnimationFrame(render);
    };

    document.body.addEventListener(
      "keyup",
      Konami.code(() => {
        render();
        setInterval(() => {
          document
            .querySelector(".icon")
            .setAttribute("href", canvas.toDataURL("image/x-icon"));
        }, 1000 / 60);
      })
    );
