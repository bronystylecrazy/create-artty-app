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
var access = (0, _util).promisify(_fs.default.access);
var copy = (0, _util).promisify(_ncp.default);
function copyTemplateFiles(options) {
    return _copyTemplateFiles.apply(this, arguments);
}
function _copyTemplateFiles() {
    _copyTemplateFiles = _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee(options) {
        return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
            while(1)switch(_ctx.prev = _ctx.next){
                case 0:
                    return _ctx.abrupt("return", copy(options.templateDirectory, options.targetDirectory, {
                        clobber: false
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
        var currentFileUrl, templateDir;
        return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
            while(1)switch(_ctx.prev = _ctx.next){
                case 0:
                    options = _objectSpreadProps(_objectSpread({}, options), {
                        targetDirectory: options.targetDirectory || process.cwd()
                    });
                    currentFileUrl = require("url").pathToFileURL(__filename).toString();
                    templateDir = _path.default.resolve(new URL(currentFileUrl).pathname, "../../templates", options.language.toLowerCase());
                    options.templateDirectory = templateDir;
                    _ctx.prev = 4;
                    _ctx.next = 7;
                    return access(templateDir, _fs.default.constants.R_OK);
                case 7:
                    _ctx.next = 13;
                    break;
                case 9:
                    _ctx.prev = 9;
                    _ctx.t0 = _ctx["catch"](4);
                    console.error("%s Invalid template name", _chalk.default.red.bold("ERROR"));
                    process.exit(1);
                case 13:
                    console.log("Copying the project template..");
                    _ctx.next = 16;
                    return copyTemplateFiles(options);
                case 16:
                    console.log("%s Project is ready", _chalk.default.green.bold("DONE"));
                case 17:
                case "end":
                    return _ctx.stop();
            }
        }, _callee, null, [
            [
                4,
                9
            ]
        ]);
    }));
    return _createProject.apply(this, arguments);
}
