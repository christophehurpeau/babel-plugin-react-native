'use strict';

exports.actual = `
import { Platform } from 'react-native';
console.log(Platform.Version);
if (Platform.OS === 'web') {
  console.log('web');
} else {
  console.log('not web');
}
`;

exports.expected = `
import { Platform } from 'react-native';
console.log(Platform.Version);
if ("web" === 'web') {
  console.log('web');
} else {
  console.log('not web');
}
`;
