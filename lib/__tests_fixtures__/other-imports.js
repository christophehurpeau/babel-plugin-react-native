'use strict';

exports.babelPresets = ['@babel/preset-typescript'];

exports.actual = `
import 'something';
import something from 'something';
import { something as somethingElse } from 'something';
`;

exports.expected = `
import 'something';
import something from 'something';
import { something as somethingElse } from 'something';
`;
