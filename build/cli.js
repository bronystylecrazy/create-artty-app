"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cli = cli;
exports.createPrompts = exports.parseArgs = void 0;
var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));
var _arg = _interopRequireDefault(require("arg"));
var _inquirer = _interopRequireDefault(require("inquirer"));
var _generate = require("./generate");
var _main = require("./main");
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
var prompt = _inquirer.default.createPromptModule();
var parseArgs = function(rawArgs) {
    var args = (0, _arg).default({
        "--install": Boolean,
        "--typescript": Boolean,
        "-ts": "--typescript",
        "-i": "--install"
    }, {
        argv: rawArgs.slice(2)
    });
    return {
        runInstall: args["--install"] || false,
        isTypescript: args["--typescript"] || false
    };
};
exports.parseArgs = parseArgs;
var createPrompts = function() {
    var _ref = _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee(options) {
        var questions, languages, answers, projects;
        return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
            while(1)switch(_ctx.prev = _ctx.next){
                case 0:
                    questions = [];
                    languages = (0, _generate).getChoicesFolder().languages;
                    if (!options.isTypescript) {
                        questions.push({
                            type: "list",
                            name: "language",
                            message: "Please choose which language will be used in this project",
                            choices: languages,
                            default: languages[0]
                        });
                    }
                    _ctx.next = 5;
                    return prompt(questions);
                case 5:
                    answers = _ctx.sent;
                    questions.length = 0;
                    projects = (0, _generate).getChoicesFolder("/".concat(answers.language)).projects;
                    questions.push({
                        type: "list",
                        name: "project",
                        message: "Please choose which project you will use",
                        choices: projects,
                        default: projects[0]
                    });
                    _ctx.t0 = _objectSpread;
                    _ctx.t1 = {};
                    _ctx.t2 = answers;
                    _ctx.next = 14;
                    return prompt(questions);
                case 14:
                    _ctx.t3 = _ctx.sent;
                    answers = (0, _ctx.t0)(_ctx.t1, _ctx.t2, _ctx.t3);
                    return _ctx.abrupt("return", {
                        language: options.language || answers.language,
                        project: answers.project
                    });
                case 17:
                case "end":
                    return _ctx.stop();
            }
        }, _callee);
    }));
    return function createPrompts(options) {
        return _ref.apply(this, arguments);
    };
}();
exports.createPrompts = createPrompts;
function cli(args) {
    return _cli.apply(this, arguments);
}
function _cli() {
    _cli = _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee(args) {
        var options;
        return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
            while(1)switch(_ctx.prev = _ctx.next){
                case 0:
                    _ctx.next = 2;
                    return createPrompts(parseArgs(args));
                case 2:
                    options = _ctx.sent;
                    _ctx.next = 5;
                    return (0, _main).createProject(options);
                case 5:
                case "end":
                    return _ctx.stop();
            }
        }, _callee);
    }));
    return _cli.apply(this, arguments);
}
