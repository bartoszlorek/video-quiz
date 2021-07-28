const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const {minify} = require('html-minifier');

exports.inline = function (options) {
  const stylesContent = options.styles.map(readFile).join('');
  const templateContent = readFile(options.template);
  const template = Handlebars.compile(templateContent, {
    noEscape: true,
  });

  return {
    name: 'inline-plugin',
    generateBundle(opts, bundle) {
      const scriptName = path.parse(opts.file).base;
      const scriptContent = bundle[scriptName].code;

      bundle[scriptName].code = minify(
        template({
          ...(options.props || {}),
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
};

function readFile(file) {
  return fs.readFileSync(file, 'utf-8');
}
