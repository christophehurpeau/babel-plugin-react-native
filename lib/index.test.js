'use strict';

require('nightingale-unit-testing');
const fs = require('node:fs');
const { transform } = require('@babel/core');

const pluginPath = require.resolve('.');

const tests = fs
  .readdirSync(`${__dirname}/__tests_fixtures__`)
  .filter((name) => name.endsWith('.js'));

tests.forEach((filename) => {
  // eslint-disable-next-line import/no-dynamic-require
  const testContent = require(`${__dirname}/__tests_fixtures__/${filename}`);

  test(testContent.name || filename, () => {
    try {
      const output = transform(testContent.actual, {
        babelrc: false,
        presets: [],
        plugins: [[pluginPath, { OS: 'web' }]],
      });

      const actual = output.code.trim();
      const expected = testContent.expected.trim();

      expect(actual).toBe(expected);
    } catch (error) {
      if (error._babel && error instanceof SyntaxError) {
        console.log(`Unexpected error in test: ${test.name || filename}`);
        console.log(`${error.name}: ${error.message}\n${error.codeFrame}`);
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit(1);
      } else {
        throw error;
      }
    }
  });
});
