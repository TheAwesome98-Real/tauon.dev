module.exports = (config) => {
  config.addPassthroughCopy({ "src/static": "/" });
  config.addFilter("unix2date", (date) => {
    return new Date(date).toLocaleDateString();
  });
  config.addFilter("unix2rfc822", (date) => {
    return new Date(date).toUTCString();
  });
  config.addFilter("unix2iso", (date) => {
    return new Date(date).toISOString();
  });
  config.addFilter("getLast", (array) => {
    return array[array.length - 1];
  })
  config.addFilter("unwrapOrDateNow", (date) => {
    return date || Date.now(); // probably won't work with like unix 0 and stuff
  })
  return {
    templateFormats: ["njk", "md", "html"],
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "www",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: false,
  };
};
