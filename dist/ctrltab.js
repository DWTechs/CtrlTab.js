/*
MIT License

Copyright (c) 2015 DWTechs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

https://github.com/DWTechs/CtrlTab.js
*/

import { isInteger, isAscii } from '@dwtechs/checkhard';

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

var Input = /*#__PURE__*/function () {
  function Input() {
    this.pressed = false;
  }

  var _proto = Input.prototype;

  _proto.down = function down(a, preventDefault) {
    if (preventDefault) {
      a.preventDefault();
    }

    this.pressed = true;
  };

  _proto.up = function up() {
    this.pressed = false;
  };

  return Input;
}();

var Inputs = /*#__PURE__*/function () {
  function Inputs(ctrlKeys, asciiCodes, preventDefault) {
    this.length = 0;
    this.keys = {};
    this.setCtrlKeys(ctrlKeys);
    this.setKeys(asciiCodes);
    this.preventDefault = preventDefault;
  }

  var _proto = Inputs.prototype;

  _proto.start = function start(a) {
    if (this.keys.hasOwnProperty(a.which)) {
      this.keys[a.which].down(a, this.preventDefault);

      if (this.length > 1) {
        for (var property in this.keys) {
          if (this.keys.hasOwnProperty(property)) {
            if (!this.keys[property].pressed) {
              return false;
            }
          }
        }
      }

      if (this.ctrlKeys.ctrl === a.ctrlKey && this.ctrlKeys.alt === a.altKey && this.ctrlKeys.shift === a.shiftKey) {
        return true;
      }
    }

    return false;
  };

  _proto.stop = function stop(key) {
    if (this.keys.hasOwnProperty(key)) {
      this.keys[key].up();
      return true;
    }

    return false;
  };

  _proto.setCtrlKeys = function setCtrlKeys(ctrlKeys) {
    this.ctrlKeys = {
      ctrl: ctrlKeys.ctrl,
      alt: ctrlKeys.alt,
      shift: ctrlKeys.shift
    };
  };

  _proto.setKeys = function setKeys(asciiCodes) {
    for (var _iterator = _createForOfIteratorHelperLoose(asciiCodes), _step; !(_step = _iterator()).done;) {
      var asciiCode = _step.value;
      this.keys[asciiCode] = new Input();
    }

    this.length = asciiCodes.length;
  };

  return Inputs;
}();

var DefaultInputs = /*#__PURE__*/function () {
  function DefaultInputs(ctrlKeys, asciiCodes) {
    this.ctrlKeys = {
      ctrl: false,
      alt: false,
      shift: false
    };

    if (ctrlKeys) {
      this.setCtrlKeys(ctrlKeys);
    }

    this.asciiCodes = asciiCodes;
  }

  var _proto = DefaultInputs.prototype;

  _proto.setCtrlKeys = function setCtrlKeys(ctrlKeys) {
    for (var property in this.ctrlKeys) {
      if (this.ctrlKeys.hasOwnProperty(property)) {
        this.ctrlKeys[property] = ctrlKeys[property] ? true : false;
      }
    }
  };

  return DefaultInputs;
}();

var Command = /*#__PURE__*/function () {
  function Command(name, ctrlKeys, keys, callback, options) {
    this.name = name;
    this.pressed = false;
    var asciiCodes = Command.getAsciiCodes(keys);

    if (asciiCodes) {
      this.defaultInputs = new DefaultInputs(ctrlKeys, asciiCodes);
      this.inputs = new Inputs(this.defaultInputs.ctrlKeys, asciiCodes, (options === null || options === void 0 ? void 0 : options.preventDefault) ? true : false);
      this.repeat = (options === null || options === void 0 ? void 0 : options.repeat) ? true : false;
      this.callback = callback;

      if (options === null || options === void 0 ? void 0 : options.scope) {
        this.callback = this.callback.bind(options.scope);
      }
    }
  }

  var _proto = Command.prototype;

  _proto.start = function start(a) {
    if (!this.repeat && this.pressed) {
      return false;
    }

    if (this.inputs.start(a)) {
      this.pressed = true;
      this.callback(this.pressed);
      return this.pressed;
    }

    return false;
  };

  _proto.stop = function stop(key) {
    if (this.pressed && this.inputs.stop(key)) {
      this.pressed = false;
      this.callback(this.pressed);
      return true;
    }

    return false;
  };

  _proto.setInputs = function setInputs(ctrlKeys, keys) {
    var asciiCodes = Command.getAsciiCodes(keys);

    if (asciiCodes) {
      this.inputs.setCtrlKeys(ctrlKeys);
      this.inputs.setKeys(asciiCodes);
      return true;
    }

    return false;
  };

  _proto["default"] = function _default() {
    this.inputs.setCtrlKeys(this.defaultInputs.ctrlKeys);
    this.inputs.setKeys(this.defaultInputs.asciiCodes);
  };

  Command.getAsciiCodes = function getAsciiCodes(keys) {
    var asciiCodes = [];

    for (var _iterator = _createForOfIteratorHelperLoose(keys), _step; !(_step = _iterator()).done;) {
      var key = _step.value;
      var ascii = Command.inputValidation(key);

      if (!ascii) {
        return false;
      }

      asciiCodes.push(ascii);
    }

    return asciiCodes;
  };

  Command.inputValidation = function inputValidation(ascii) {
    if (!isInteger(ascii, false)) {
      ascii = Command.toASCII(ascii);
    }

    if (isAscii(ascii)) {
      return ascii;
    }

    return false;
  };

  Command.toASCII = function toASCII(code) {
    return code.charCodeAt(0);
  };

  return Command;
}();

var Group = /*#__PURE__*/function () {
  function Group(name) {
    if (name === void 0) {
      name = 'default';
    }

    this.name = name;
    this.commands = [];
    this.watch = false;
  }

  var _proto = Group.prototype;

  _proto.down = function down(a) {
    if (this.watch) {
      for (var _iterator = _createForOfIteratorHelperLoose(this.commands), _step; !(_step = _iterator()).done;) {
        var command = _step.value;
        command.start(a);
      }
    }
  };

  _proto.up = function up(key) {
    if (this.watch) {
      for (var _iterator2 = _createForOfIteratorHelperLoose(this.commands), _step2; !(_step2 = _iterator2()).done;) {
        var command = _step2.value;
        command.stop(key);
      }
    }
  };

  _proto.addCmd = function addCmd(name, ctrlKeys, keys, callback, options) {
    var command = new Command(name, ctrlKeys, keys, callback, options);
    this.commands.push(command);
    this.commands = Group.sortCmds(this.commands);
    return command;
  };

  _proto.setInputs = function setInputs(name, ctrlKeys, keys) {
    var command = this.getCmd(name);

    if (command) {
      command.setInputs(ctrlKeys, keys);
      this.commands = Group.sortCmds(this.commands);
      return true;
    }

    return false;
  };

  _proto["default"] = function _default(name) {
    var command = this.getCmd(name);

    if (command) {
      command["default"]();
      this.commands = Group.sortCmds(this.commands);
      return true;
    }

    return false;
  };

  _proto.getCmd = function getCmd(name) {
    return this.commands.find(function (command) {
      return command.name == name;
    }) || null;
  };

  Group.sortCmds = function sortCmds(commands) {
    commands.sort(function (a, b) {
      return b.inputs.length - a.inputs.length;
    });
    return commands;
  };

  return Group;
}();

var Keyboard = /*#__PURE__*/function () {
  function Keyboard() {
    this.initListeners();
    this.groups = [];
  }

  var _proto = Keyboard.prototype;

  _proto.initListeners = function initListeners() {
    var _this = this;

    document.onkeydown = function (a) {
      _this.down(a);
    };

    document.onkeyup = function (a) {
      _this.up(a);
    };
  };

  _proto.down = function down(a) {
    for (var _iterator = _createForOfIteratorHelperLoose(this.groups), _step; !(_step = _iterator()).done;) {
      var group = _step.value;
      group.down(a);
    }
  };

  _proto.up = function up(a) {
    for (var _iterator2 = _createForOfIteratorHelperLoose(this.groups), _step2; !(_step2 = _iterator2()).done;) {
      var group = _step2.value;
      group.up(a.which);
    }
  };

  _proto.listen = function listen(groupName) {
    var group = this.getGroup(groupName);

    if (group) {
      return group.watch = true;
    }

    return false;
  };

  _proto.ignore = function ignore(groupName) {
    var group = this.getGroup(groupName);

    if (group) {
      return group.watch = false;
    }

    return true;
  };

  _proto.addCmd = function addCmd(commandName, ctrlKeys, keys, callback, options) {
    var group = (options === null || options === void 0 ? void 0 : options.groupName) && this.getGroup(options === null || options === void 0 ? void 0 : options.groupName);

    if (!group) {
      group = new Group(options === null || options === void 0 ? void 0 : options.groupName);
      this.groups.push(group);
    }

    options === null || options === void 0 ? true : delete options.groupName;
    return group.addCmd(commandName, ctrlKeys, keys, callback, options);
  };

  _proto.setInputs = function setInputs(groupName, commandName, ctrlKeys, keys) {
    var group = this.getGroup(groupName);
    return group ? group.setInputs(commandName, ctrlKeys, keys) : false;
  };

  _proto["default"] = function _default(groupName, commandName) {
    var group = this.getGroup(groupName);
    return group ? group["default"](commandName) : false;
  };

  _proto.getGroup = function getGroup(name) {
    return this.groups.find(function (group) {
      return group.name === name;
    }) || null;
  };

  _proto.getCmd = function getCmd(groupName, commandName) {
    var group = this.getGroup(groupName);
    return group ? group.getCmd(commandName) : null;
  };

  return Keyboard;
}();

export { Keyboard };
