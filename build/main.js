"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createProject = createProject;
var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));
var _chalk = _interopRequireDefault(require("chalk"));
var _fs = _interopRequireDefault(require("fs"));
var _ncp = _interopRequireDefault(require("ncp"));
var _path = _interopRequireDefault(require("path"));
var _util = require("util");
var _yaml = _interopRequireDefault(require("yaml"));
var _ejs = _interopRequireDefault(require("ejs"));
var _stream = _interopRequireDefault(require("stream"));
var _inquirer = _interopRequireDefault(require("inquirer"));
var _execa = _interopRequireDefault(require("execa"));
var _listr = _interopRequireDefault(require("listr"));
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
var prompt = _inquirer.default.createPromptModule();
var Transform = _stream.default.Transform;
var access = (0, _util).promisify(_fs.default.access);
var copy = (0, _util).promisify(_ncp.default);
var unlinkSync = (0, _util).promisify(_fs.default.unlink);
var templateTransform = function() {
    var template = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return new Transform({
        transform: function transform(chunk, encoding, callback) {
            var changed = _ejs.default.render(chunk.toString(), template);
            this.push(changed);
            callback();
        }
    });
};
function copyTemplateFiles(options, template) {
    return _copyTemplateFiles.apply(this, arguments);
}
function _copyTemplateFiles() {
    _copyTemplateFiles = _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee(options, template) {
        return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
            while(1)switch(_ctx.prev = _ctx.next){
                case 0:
                    return _ctx.abrupt("return", copy(options.templateDirectory, options.targetDirectory, {
                        clobber: false,
                        transform: function(read, write, file) {
                            read.pipe(templateTransform(template)).pipe(write);
                        }
                    }));
                case 1:
                case "end":
                    return _ctx.stop();
            }
        }, _callee);
    }));
    return _copyTemplateFiles.apply(this, arguments);
}
function createProject(options) {
    return _createProject.apply(this, arguments);
}
function _createProject() {
    _createProject = _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee(options) {
        var currentFileUrl, templateDir, templateFile, template, questions, parsedQuestions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, question, answer, runInstall, tasks;
        return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
            while(1)switch(_ctx.prev = _ctx.next){
                case 0:
                    options = _objectSpreadProps(_objectSpread({}, options), {
                        targetDirectory: options.targetDirectory || process.cwd()
                    });
                    currentFileUrl = require("url").pathToFileURL(__filename).toString();
                    templateDir = _path.default.resolve(new URL(currentFileUrl).pathname, "../../templates", "".concat(options.language.trim(), "/").concat(options.project.trim())).replaceAll("C:\\C:\\", "C:\\");
                    options.templateDirectory = templateDir;
                    templateFile = _fs.default.readFileSync(_path.default.join(options.templateDirectory, "__template__.yaml"), "utf8");
                    template = _yaml.default.parse(templateFile);
                    questions = Object.entries(template).map(function(param) {
                        var _param = _slicedToArray(param, 2), key = _param[0], value = _param[1];
                        return value;
                    });
                    parsedQuestions = {};
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _ctx.prev = 9;
                    _iterator = questions[Symbol.iterator]();
                case 11:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _ctx.next = 20;
                        break;
                    }
                    question = _step.value;
                    _ctx.next = 15;
                    return prompt(question);
                case 15:
                    answer = _ctx.sent;
                    Object.assign(parsedQuestions, answer);
                case 17:
                    _iteratorNormalCompletion = true;
                    _ctx.next = 11;
                    break;
                case 20:
                    _ctx.next = 26;
                    break;
                case 22:
                    _ctx.prev = 22;
                    _ctx.t0 = _ctx["catch"](9);
                    _didIteratorError = true;
                    _iteratorError = _ctx.t0;
                case 26:
                    _ctx.prev = 26;
                    _ctx.prev = 27;
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                case 29:
                    _ctx.prev = 29;
                    if (!_didIteratorError) {
                        _ctx.next = 32;
                        break;
                    }
                    throw _iteratorError;
                case 32:
                    return _ctx.finish(29);
                case 33:
                    return _ctx.finish(26);
                case 34:
                    _ctx.next = 36;
                    return prompt({
                        type: "confirm",
                        name: "runInstall",
                        message: "Do you want to install dependencies?",
                        default: true
                    });
                case 36:
                    runInstall = _ctx.sent.runInstall;
                    _ctx.prev = 37;
                    _ctx.next = 40;
                    return access(templateDir, _fs.default.constants.R_OK);
                case 40:
                    _ctx.next = 46;
                    break;
                case 42:
                    _ctx.prev = 42;
                    _ctx.t1 = _ctx["catch"](37);
                    console.error("%s Invalid template name", _chalk.default.red.bold("ERROR"));
                    process.exit(1);
                case 46:
                    tasks = new _listr.default([
                        {
                            title: "Copying the project template..",
                            task: function() {
                                return copyTemplateFiles(options, parsedQuestions);
                            }
                        },
                        {
                            title: "Installing dependencies..",
                            task: function() {
                                return (0, _execa).default("npm", [
                                    "install"
                                ], {
                                    cwd: options.targetDirectory
                                });
                            },
                            skip: function() {
                                return !runInstall;
                            }
                        }
                    ]);
                    _ctx.next = 49;
                    return tasks.run();
                case 49:
                    unlinkSync(_path.default.join(options.targetDirectory, "__template__.yaml"));
                    console.log("%s Project created successfully!", _chalk.default.green.bold("SUCCESS"));
                case 51:
                case "end":
                    return _ctx.stop();
            }
        }, _callee, null, [
            [
                9,
                22,
                26,
                34
            ],
            [
                27,
                ,
                29,
                33
            ],
            [
                37,
                42
            ]
        ]);
    }));
    return _createProject.apply(this, arguments);
}
