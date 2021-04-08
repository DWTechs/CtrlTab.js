[![License: MIT](https://img.shields.io/npm/l/@dwtechs/ctrltab.svg?color=brightgreen)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/%40dwtechs%2Fctrltab.svg)](https://www.npmjs.com/package/@dwtechs/ctrltab)
[![last version release date](https://img.shields.io/github/release-date/DWTechs/CtrlTab.js)](https://www.npmjs.com/package/@dwtechs/ctrltab)
![Jest:coverage](https://img.shields.io/badge/Jest:coverage-100%25-brightgreen.svg)
[![minified size](https://img.shields.io/bundlephobia/min/@dwtechs/ctrltab?color=brightgreen)](https://www.npmjs.com/package/@dwtechs/ctrltab)

- [Synopsis](#synopsis)
- [Installation](#installation)
  - [npm](#npm)
  - [Yarn](#yarn)
- [Usage](#usage)
  - [ES6](#es6)
  - [IIFE](#iife)
- [API Reference](#api-reference)
- [Contributors](#contributors)
- [License](#license)
- [Stack](#stack)

## Synopsis

CtrlTab.js is a shortcut key bindings library with multiple keystroke detection.

## Installation

### npm

```bash
$ npm install @dwtechs/ctrltab
```

### Yarn

```bash
$ yarn add @dwtechs/ctrltab
```

## Usage

### ES6

```javascript
import { Keyboard } from "@dwtechs/ctrltab";

let keyboard = new Keyboard();

keyboard.addCmd("action0", null, [32], action0, {
  preventDefault: true,
  groupName: "group1",
  repeat: true
});
keyboard.addCmd("action1", { ctrl: true }, ["G"], action1, {groupName: "group1"});
// set another key for action1
keyboard.setInputs(
  "group1",
  "action1",
  { ctrl: false, alt: false, shift: false },
  ["Z", "T"]
);
// Enable group1 commands
keyboard.watch("group1");

function action0(isKeyDown) {
  if (isKeyDown) {
    // do something;
  }
}

function action1(isKeyDown) {
  if (isKeyDown) {
    // do something;
  }
}
```

### IIFE

```javascript
var keyboard = new Krait.Keyboard();

keyboard.addCmd("action0", null, [32], action0, {
  preventDefault: true,
  groupName: "group1"
});
keyboard.addCmd("action1", { ctrl: true }, ["G"], action1, {groupName: "group1"});
// set another key for action1
keyboard.setInputs(
  "group1",
  "action1",
  { ctrl: false, alt: false, shift: false },
  ["Z", "T"]
);
// Enable group1 commands
keyboard.watch("group1");

function action0(isKeyDown) {
  if (isKeyDown) {
    // do something;
  }
}

function action1(isKeyDown) {
  if (isKeyDown) {
    // do something;
  }
}
```

## API Reference

```javascript
interface CtrlKeys {
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
}

interface Options {
  preventDefault?: boolean; // default to false
  groupName?: string; // default to "default"
  scope?: this;
  repeat?: boolean; // default to false
}

addCmd(
    name: string,
    ctrlKeys: CtrlKeys | null,
    keys: Array<string | number>,
    callback: Function,
    options: Options | null
  ): Command {}

setInputs(
    groupName: string,
    commandName: string,
    ctrlKeys: CtrlKeys,
    keys: Array<string | number>
  ): boolean {}

listen(groupName: string): boolean {} //start watching a group of commands

ignore(groupName: string): boolean {} //stop watching a group of commands

default(groupName: string, commandName: string): boolean {} //set command to default settings

getCmd(groupName: string, commandName: string): Command | null {}

```

## Contributors

CtrlTab.js is still in development and we would be glad to get all the help you can provide.
To contribute please read **[contributor.md](https://github.com/DWTechs/CtrlTab.js/blob/main/contributor.md)** for detailed installation guide.

## Stack

| Purpose         |                    Choice                    |                                                     Motivation |
| :-------------- | :------------------------------------------: | -------------------------------------------------------------: |
| repository      |        [Github](https://github.com/)         |     hosting for software development version control using Git |
| package manager |     [npm](https://www.npmjs.com/get-npm)     |                                default node.js package manager |
| language        | [TypeScript](https://www.typescriptlang.org) | static type checking along with the latest ECMAScript features |
| module bundler  |      [Rollup.js](https://rollupjs.org)       |                        advanced module bundler for ES6 modules |
| unit testing    |          [Jest](https://jestjs.io/)          |                  delightful testing with a focus on simplicity |
