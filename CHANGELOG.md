# 3.0.1 (May 23th 2021)

- Fix scope option typing for TypeScript users.

# 3.0.0 (April 09th 2021)

- Shorter methods name (addCmd, setCmd )
- GroupName becomes an option property and default to "default"
- Repeat is a new option property and default to false. If true, trigger will repeat when you keep pressing a command.

# 2.3.0 (February 05th 2021)

- Krait.js becomes CtrlTab.js 
- Project transfered from LCluber to DWTechs

## Version 2.2.0 (June 13th 2020)

- New preventDefault option so you can decide if an input should trigger its default behavior when hit or not.

# [2.1.0](https://github.com/LCluber/Krait.js/compare/v2.0.2...v2.1.0) (2020-01-14)

### Features

- **logs:** delete Mouette.js dependency ([e4765d0](https://github.com/LCluber/Krait.js/commit/e4765d0))

## [2.0.2](https://github.com/LCluber/Krait.js/compare/v2.0.1...v2.0.2) (2020-01-04)

### Bug Fixes

- **dependency:** delete Weejs dependency ([a78dceb](https://github.com/LCluber/Krait.js/commit/a78dceb))

## [2.0.1](https://github.com/LCluber/Krait.js/compare/v2.0.0...v2.0.1) (2019-08-16)

### Bug Fixes

- **dependencies:** updated dependencies ([198e01c](https://github.com/LCluber/Krait.js/commit/198e01c))

# [2.0.0](https://github.com/LCluber/Krait.js/compare/v1.0.0...v2.0.0) (2019-08-10)

### Features

- **command:** added getInputsAscii() method to command class ([c8afdd8](https://github.com/LCluber/Krait.js/commit/c8afdd8))
- **command:** added setinputs() methods to command class ([a72794e](https://github.com/LCluber/Krait.js/commit/a72794e))
- **groups:** commands can be grouped ([fc57b71](https://github.com/LCluber/Krait.js/commit/fc57b71))
- **isascii:** extended parameter set to false by default ([34fc772](https://github.com/LCluber/Krait.js/commit/34fc772))
- **keyboard:** added start() et stop() methods ([d82ddd7](https://github.com/LCluber/Krait.js/commit/d82ddd7))

### BREAKING CHANGES

- **groups:** have to give a group name when adding commands
- **keyboard:** must call Keyboard.start() after Keyboard initilisation in order to start listening
  to key events

# [1.0.0](https://github.com/LCluber/Krait.js/compare/v0.3.0...v1.0.0) (2019-07-27)

### Bug Fixes

- **command:** better behavior of chained inputs ([93a772d](https://github.com/LCluber/Krait.js/commit/93a772d))

### Code Refactoring

- **addcommand:** control keys parameters now sent in an object ([dccbea9](https://github.com/LCluber/Krait.js/commit/dccbea9))

### Features

- **callback:** now returns false on key up ([ba5ac0d](https://github.com/LCluber/Krait.js/commit/ba5ac0d))
- **keyboard:** added getcommandinputsascii method ([5bb6504](https://github.com/LCluber/Krait.js/commit/5bb6504))

### BREAKING CHANGES

- **addcommand:** control keys sent as object

## Version 0.3.0 (October 21th 2018)

- Multiple keystroke detection
- Ctrl, Alt, Shift detection
- addInput method now called addCommand and accept an array of keys.
- Krait.js published on NPM at @lcluber/kraitjs.
- Updated README.md with NPM installation procedure.

## Version 0.2.5 (July 27th 2018)

- deleted useless method in Input class

## Version 0.2.4 (July 23th 2018)

- Library exported as ES6 and IIFE modules instead of UMD.
- KRAIT namespace becomes Krait

## Version 0.2.3 (July 4th 2018)

- Documentation automatically generated in /doc folder
- Typedoc and grunt-typedoc added in devDependencies
- New "typedoc" task in Gruntfile.js
- Typescript upgraded to version 2.9.2
- INSTALL.md becomes NOTICE.md and RELEASE_NOTES.md becomes CHANGELOG.md

## Version 0.2.2 (April 28th 2018)

- Added Wee.js utility library

## Version 0.2.1 (March 19th 2018)

- Added logs with Mouette.js
- Added TypeScript Declaration File

## Version 0.2.0 (January 1st 2018)

- Added setInput() method to the Keyboard class.
- Added getLastLog() method to the Keyboard class.
- Logged all kind of errors that can occur during the addInput or setInput processes.
- An input object does not have a name anymore.
- Library is written in TypeScript

## Version 0.1.1 (October 28th 2017)

- The 'addInput()' method of the 'Keyboard' class can now receive an ASCII code or a string as parameter. The string will then be converted as a valid ASCII code.

## Version 0.1.0 (August 25th 2017)

- initial version
