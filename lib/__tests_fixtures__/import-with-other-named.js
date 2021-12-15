'use strict';

exports.actual = `
import { Platform, OtherThing } from 'react-native';

if (Platform.OS === 'web') {
  console.log('web');
} else {
  console.log(OtherThing);
}
`;

exports.expected = `
import { OtherThing } from 'react-native';

if ("web" === 'web') {
  console.log('web');
} else {
  console.log(OtherThing);
}
`;
