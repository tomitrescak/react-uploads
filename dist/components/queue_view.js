"use strict";
var React = require("react");
var queue_item_view_1 = require("./queue_item_view");
exports.Queue = function (_a) {
    var i18n = _a.i18n, classes = _a.classes, queue = _a.queue;
    return (React.createElement("span", null, queue.length > 1 ?
        React.createElement("div", {className: "panel panel-default", style: { marginTop: 1, background: "#efefef" }}, 
            React.createElement("div", {className: "panel-body"}, queue.map(function (item, index) {
                return React.createElement(queue_item_view_1.default, {key: index, i18n: i18n, classes: classes, item: item});
            }))
        )
        : null));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.Queue;
