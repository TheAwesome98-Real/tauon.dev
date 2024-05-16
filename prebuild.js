const http = require("http");
const https = require("https");
const filesystem = require("fs");

const eightyeightbythirtyones = JSON.parse(
  filesystem.readFileSync("src/_data/88x31s.json")
);

try {
  filesystem.mkdirSync("src/static/images/88x31/3rdparty/");
} catch (err) {
  if (err.code != "EEXIST") {
    throw err;
  }
}

for (let set of eightyeightbythirtyones) {
  for (let button of set.entries) {
    if (button.skip) {
      console.log("skipping", button.src, "because:", button.skip);
      continue;
    }
    let client = null;
    if (button.src.startsWith("https")) {
      client = https;
    } else if (button.src.startsWith("http")) {
      client = http;
    }
    if (client != null) {
      let url = new URL(button.src);
      client
        .get(
          {
            hostname: url.hostname,
            path: url.pathname + url.search,
            headers: {
              "User-Agent": `tauon.dev-prebuild-fetcher/${
                require("./package.json").version
              } node-http/${process.versions.node} <lily@tauon.dev>`,
            },
          },
          (res) => {
            // TODO: if content type doesn't contain "image" then skip and print reason (to remind me)
            let outfile =
              "src/static/images/88x31/3rdparty/" +
              button.src.replaceAll("/", "_").replaceAll(":", "_");
            try {
              filesystem.unlinkSync(outfile);
            } catch (err) {
              if (err.code != "ENOENT") {
                throw err;
              }
            }
            let file = filesystem.createWriteStream(outfile);
            res.pipe(file);

            file.on("finish", () => {
              file.close();
            });
          }
        )
        .on("error", (err) => {
          console.error("failed to download", button.src, ":", err);
        });
    }
  }
}

const GD = require("gd.js");
let gd = new GD();
(async () => {
  let userinfo = await gd.users.get("tauon07");
  userinfo._creator = null;
  userinfo.cosmetics._creator = null;
  try {
    filesystem.unlinkSync("src/_data/gd.json");
  } catch (err) {
    if (err.code != "ENOENT") {
      throw err;
    }
  }
  filesystem.writeFileSync("src/_data/gd.json", JSON.stringify(userinfo));
})();

const spawn = require("child_process").spawn;
const proc = spawn("git", ["log", "-n", "1", '--pretty=format:"%h%n%s%n%ad"']);

let output = "";
proc.stdout.on("data", (chunk) => {
  output += chunk.toString();
});
proc.on("exit", () => {
  let [hash, message, dateRaw] = output.slice(1, -1).split(/\r\n|\r|\n/g);
  let data = {
    hash,
    message,
    commitDate: new Date(dateRaw),
    buildDate: new Date(),
  };
  filesystem.writeFileSync("src/_data/buildinfo.json", JSON.stringify(data));
});
