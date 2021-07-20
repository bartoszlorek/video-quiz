const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const {minify} = require('html-minifier');

function inline({templatePath, stylesPath}) {
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  const stylesContent = fs.readFileSync(stylesPath, 'utf-8');

  const template = Handlebars.compile(templateContent, {
    noEscape: true,
  });

  return {
    name: 'inline',
    generateBundle(opts, bundle) {
      const scriptName = path.parse(opts.file).base;
      const scriptContent = bundle[scriptName].code;

      bundle[scriptName].code = minify(
        template({
          script: scriptContent,
          style: stylesContent,
        }),
        {
          collapseWhitespace: true,
          minifyCSS: true,
        }
      );
    },
  };
}

module.exports = {
  inline,
};
