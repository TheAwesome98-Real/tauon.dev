const http = require("http");
const https = require("https");
const filesystem = require("fs");
const eightyeightbythirtyones = JSON.parse(
  filesystem.readFileSync("src/_data/88x31s.json")
);

try {
  filesystem.renameSync("src/static/images/88x31/3rdparty", "3rdparty.bak");
} catch (err) {
  if (err.code != "ENOENT") {
    throw err;
  }
}

filesystem.mkdirSync("src/static/images/88x31/3rdparty/");

for (let set of eightyeightbythirtyones) {
  for (let button of set.entries) {
    let client = null;
    if (button.src.startsWith("https")) {
      client = https;
    } else if (button.src.startsWith("http")) {
      client = http;
    }
    if (client != null) {
      client.get(button.src, (res) => {
        let file = filesystem.createWriteStream(
          "src/static/images/88x31/3rdparty/" +
            button.src.replaceAll("/", "_").replaceAll(":", "_")
        );
        res.pipe(file);

        file.on("finish", () => {
          file.close();
        });

        res.on("error", (err) => {
          console.error("failed to download", button.src, ":", err);
        });
      });
    }
  }
}
