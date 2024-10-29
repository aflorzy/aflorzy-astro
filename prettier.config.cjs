/** @type {import("prettier").Config} */

module.exports = {
  ...require('prettier-config-standard'),
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  bracketSpacing: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSameLine: true,
  arrowParens: "always",
  endOfLine: "lf",
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ],
}