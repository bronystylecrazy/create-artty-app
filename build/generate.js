"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getChoicesFolder = void 0;
var _glob = _interopRequireDefault(require("glob"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var getChoicesFolder = function() {
    var folder = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var currentFileUrl = require("url").pathToFileURL(__filename).toString();
    var templateDir = _path.default.resolve(new URL(currentFileUrl).pathname, "../../templates").replace("C:\\C:\\", "C:\\");
    var targetDir = _path.default.join("".concat(templateDir).concat(folder), "./**/*.yaml").replaceAll("\\", "/");
    var choices = _glob.default.sync(targetDir);
    var projects = choices.map(function(choice) {
        return _path.default.basename(_path.default.dirname(choice));
    });
    var languages = Array.from(new Set(choices.map(function(choice) {
        return _path.default.basename(_path.default.dirname(_path.default.dirname(choice)));
    })));
    return {
        projects: projects,
        languages: languages
    };
};
exports.getChoicesFolder = getChoicesFolder;
