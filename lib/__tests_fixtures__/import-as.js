'use strict';

exports.actual = `
import { Platform as P } from 'react-native';

if (P.OS === 'web') {
  console.log('web');
} else {
  console.log('not web');
}
`;

exports.expected = `
if ("web" === 'web') {
  console.log('web');
} else {
  console.log('not web');
}
`;
