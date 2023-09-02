// partially stolen from lavender.systems
// but made to work with eve's weird code
// edited by lily

(() => {
  const currentScript = document.currentScript;
  const ctx = currentScript.dataset;

  // charlotte's ad-hoc terse javascript framework!
  const CSS_PREFIX = "eve-s-webring";
  const e = (tag, props = {}, children = []) => {
    let element = Object.assign(document.createElement(tag), props);
    element.append(...children);
    return element;
  };
  const t = (text) => document.createTextNode(text);
  const c = (className) => ({ className: `${CSS_PREFIX}-${className}` });
  const h = (href) => ({ href });

  const createDescriptionContent = () =>
    ctx.description != null
      ? [t(ctx.description)]
      : [
          e("a", h("https://evescorner.glitch.me"), [t("eve")]),
          t("'s web ring"),
        ];

  const renderWebring = () => {
    currentScript.replaceWith(
      e("aside", c("container"), [
        e("section", c("description"), createDescriptionContent()),
        e("ul", c("site-links"), [
          e("li", c("prev-site"), [
            e("a", h("https://evescorner.glitch.me/webring.html?number=1"), [
              t("previous"),
            ]),
          ]),
          e("li", c("curr-site"), [
            e("a", h("https://evescorner.glitch.me/webring.html"), [t("all")]),
          ]),
          e("li", c("next-site"), [
            e("a", h("https://evescorner.glitch.me/webring.html?number=3"), [
              t("next"),
            ]),
          ]),
        ]),
      ])
    );
  };

  renderWebring();
})();
