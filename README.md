## Synopsis

CtrlTab.js is a shortcut key bindings library with multiple keystroke detection.

## Motivation

The purpose of this library is to provide a simple and easy to use key binding declaration.

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

keyboard.addCommand("group1", "action0", null, [32], action0, {
  preventDefault: true
});
keyboard.addCommand("group1", "action1", { ctrl: true }, ["G"], action1, null);
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

keyboard.addCommand("group1", "action0", null, [32], action0, {
  preventDefault: true
});
keyboard.addCommand("group1", "action1", { ctrl: true }, ["G"], action1, null);
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
  preventDefault?: boolean;
  scope?: this;
}

addCommand(
    name: string,
    ctrlKeys: CtrlKeys | null,
    keys: Array<string | number>,
    callback: Function,
    options: Options | null
  ): Command {}

setInputs(
    ctrlKeys: CtrlKeys,
    keys: Array<string | number>
  ): boolean {}

watch(groupName: string): boolean {} //start watching a group of commands

ignore(groupName: string): boolean {} //stop watching a group of commands

default(groupName: string, commandName: string): boolean {} //set command to default settings

getCommand(groupName: string, commandName: string): Command | null {}

```

## Stack

| Purpose         |                    Choice                    |                                                     Motivation |
| :-------------- | :------------------------------------------: | -------------------------------------------------------------: |
| repository      |        [Github](https://github.com/)         |     hosting for software development version control using Git |
| package manager |     [npm](https://www.npmjs.com/get-npm)     |                                default node.js package manager |
| language        | [TypeScript](https://www.typescriptlang.org) | static type checking along with the latest ECMAScript features |
| module bundler  |      [Rollup.js](https://rollupjs.org)       |                        advanced module bundler for ES6 modules |
| unit testing    |          [Jest](https://jestjs.io/)          |                  delightful testing with a focus on simplicity |
