"use strict";
var react_komposer_1 = require("react-komposer");
var queue_view_1 = require("../components/queue_view");
exports.composer = function (_a, onData) {
    var i18n = _a.i18n, classes = _a.classes, uploader = _a.uploader;
    var data = function () {
        onData(null, {
            i18n: i18n,
            classes: classes,
            queue: uploader.queue
        });
        // console.log("Rendering queue ...: " + uploader.queue)
    };
    // add callback
    uploader.onQueueChanged(data);
    // render data
    data();
    return null;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_komposer_1.compose(exports.composer, null, null, { pure: false })(queue_view_1.default);
