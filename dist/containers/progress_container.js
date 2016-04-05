"use strict";
var react_komposer_1 = require("react-komposer");
var progress_view_1 = require("../components/progress_view");
exports.composer = function (_a, onData) {
    var i18n = _a.i18n, classes = _a.classes, item = _a.item, autoStart = _a.autoStart;
    var render = function () {
        onData(null, {
            i18n: i18n,
            classes: classes,
            state: item.status,
            info: item.info,
            progress: item.progress,
            autoStart: autoStart,
            startUpload: item.startUpload.bind(item),
            cancelUpload: item.cancelUpload.bind(item),
            reset: item.reset.bind(item)
        });
        console.log("Rendering progress ...: " + item.status);
    };
    // add listener
    item.onChanged(render);
    render();
    return null;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_komposer_1.compose(exports.composer, null, null, { pure: false })(progress_view_1.default);
