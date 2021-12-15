<h3 align="center">
  babel-plugin-react-native
</h3>

<p align="center">
  <a href="https://npmjs.org/package/babel-plugin-react-native"><img src="https://img.shields.io/npm/v/babel-plugin-react-native.svg?style=flat-square"></a>
</p>

## Features

This plugin was created to allow tree-shaking when building for multiple react-native platforms.

## Install

```bash
npm install --save-dev --save-exact babel-plugin-react-native
```

## Example

Source:

```js
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  console.log('web');
} else {
  console.log('not web');
}
```

Transformed to (with `OS: "web"`):

```js
if ('web' === 'web') {
  console.log('web');
} else {
  console.log('not web');
}
```

## Usage

### Via `babel.config.json`

```json
{
  "plugins": [["babel-plugin-react-native", { "OS": "web" }]]
}
```
