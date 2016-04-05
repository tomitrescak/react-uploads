"use strict";
var React = require("react");
exports.Buttons = function (_a) {
    var i18n = _a.i18n, classes = _a.classes, status = _a.status, autoStart = _a.autoStart, startUpload = _a.startUpload, cancelUpload = _a.cancelUpload, reset = _a.reset;
    return (React.createElement("div", null, 
        status === "idle" && !autoStart ?
            React.createElement("div", {type: "submit", className: classes.startButton, onClick: startUpload}, 
                React.createElement("i", {className: classes.startButtonIcon}), 
                React.createElement("span", null, i18n.upload))
            : null, 
        status === "cancelled" ?
            React.createElement("div", {className: classes.cancelledButton, onClick: reset}, 
                React.createElement("i", {className: classes.cancelledButtonIcon}), 
                React.createElement("span", null, i18n.cancelled))
            : null, 
        status === "done" ?
            React.createElement("div", {className: classes.doneButton, onClick: reset}, 
                React.createElement("i", {className: classes.doneButtonIcon}), 
                i18n.done)
            : null, 
        status === "running" ?
            React.createElement("div", {className: classes.cancelButton, onClick: cancelUpload}, 
                React.createElement("i", {className: classes.cancelButtonIcon}), 
                React.createElement("span", null, i18n.cancel))
            : null, 
        status === "error" ?
            React.createElement("div", {className: classes.errorButton, onClick: reset}, 
                React.createElement("i", {className: classes.errorButtonIcon}), 
                React.createElement("span", null, i18n.error))
            : null));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.Buttons;
