"use strict";

exports.actual = `
import * as reactNative from 'react-native';

if (reactNative.Platform.OS === 'web') {
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
