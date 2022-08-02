// const { getESLintConfig } = require('@iceworks/spec');

// // https://www.npmjs.com/package/@iceworks/spec
// module.exports = getESLintConfig('react-ts');

// .eslintrc.js
const { tslint } = require('@ice/spec');
module.exports = deepmerge(tslint);