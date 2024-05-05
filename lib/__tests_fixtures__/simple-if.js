"use strict";

exports.actual = `
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
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
