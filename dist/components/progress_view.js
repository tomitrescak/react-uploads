"use strict";
var React = require("react");
var buttons_view_1 = require("./buttons_view");
exports.Progress = function (_a) {
    var i18n = _a.i18n, classes = _a.classes, state = _a.state, info = _a.info, progress = _a.progress, autoStart = _a.autoStart, startUpload = _a.startUpload, cancelUpload = _a.cancelUpload, reset = _a.reset;
    return (React.createElement("div", {className: "progressHolder"}, 
        React.createElement("div", {className: "progressFrame"}, 
            React.createElement("div", {className: classes.progressOuter}, 
                React.createElement("div", {className: classes.progressInner}, 
                    React.createElement("div", {className: classes.progressBar, role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, style: { width: progress }}), 
                    React.createElement("div", {className: "progress-label"}, info))
            ), 
            React.createElement(buttons_view_1.default, {i18n: i18n, classes: classes, status: state, autoStart: autoStart, startUpload: startUpload, cancelUpload: cancelUpload, reset: reset}))
    ));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.Progress;
