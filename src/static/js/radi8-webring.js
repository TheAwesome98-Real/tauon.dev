// shamelessly stolen from the https://lavender.software webring
// modified version of https://cdn.radi8.dev/ring.js to fit my webring idea

const currentScript = document.currentScript;
const ctx = currentScript.dataset;

// charlotte's ad-hoc terse javascript framework!
const CSS_PREFIX = "webring";
const e = (tag, props = {}, children = []) => {
  let element = Object.assign(document.createElement(tag), props);
  element.append(...children);
  return element;
};
const t = (text) => document.createTextNode(text);
const c = (className) => ({ className: `${CSS_PREFIX}-${className}` });
const h = (href) => ({ href });
// added by lily
const p = (...objs) => (objs.reduce(((r, c) => Object.assign(r, c)), {}));
const i = (id) => ({ id });

const createDescriptionContent = () =>
  ctx.description != null
    ? [t(ctx.description)]
    : [
        t("This site is part of "),
        e("a", h("https://radi8.dev"), [t("radi8")]),
        t("'s webring!"),
      ];

const renderWebring = (currSite, prevSite, nextSite) => {
  currentScript.replaceWith(
    e("aside", p(c("container"), i("radi8-webring")), [
      e("section", c("description"), createDescriptionContent()),
      e("ul", c("site-links"), [
        e("li", c("prev-site"), [e("a", h(prevSite.url), [t(prevSite.name)])]),
        e("li", c("curr-site"), [e("a", h(currSite.url), [t(currSite.name)])]),
        e("li", c("next-site"), [e("a", h(nextSite.url), [t(nextSite.name)])]),
      ]),
    ])
  );
};

(async () => {
  const data = await fetch("https://cdn.radi8.dev/ring.json").then(
    (r) => r.json()
  );

  let thisSiteIdx = data.findIndex((site) => site.id == ctx.siteId);
  if (thisSiteIdx === -1) {
    throw new Error(
      `Could not find site by id '${ctx.siteId}' in the webring!`
    );
  }

  let currSite = data[thisSiteIdx];
  let prevSite = data[(thisSiteIdx + data.length - 1) % data.length];
  let nextSite = data[(thisSiteIdx + 1) % data.length];

  renderWebring(currSite, prevSite, nextSite);
})();
