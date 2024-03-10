module.exports = (config) => {
  config.addPassthroughCopy({ "src/static": "/" });
  config.addFilter("unix2date", (date) => {
    return new Date(date).toLocaleDateString();
  });
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
