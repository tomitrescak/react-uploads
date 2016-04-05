"use strict";
var React = require("react");
var progress_container_1 = require("../containers/progress_container");
exports.QueueItemView = function (_a) {
    var i18n = _a.i18n, classes = _a.classes, item = _a.item;
    return (React.createElement("div", {className: "uploadPanel", style: { marginTop: 6 }}, 
        React.createElement(progress_container_1.default, {i18n: i18n, classes: classes, item: item, autoStart: true})
    ));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.QueueItemView;
