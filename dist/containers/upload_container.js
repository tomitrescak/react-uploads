"use strict";
var react_komposer_1 = require("react-komposer");
var upload_view_1 = require("../components/upload_view");
var uploader_node_1 = require("../lib/uploader_node");
exports.composer = function (_a, onData) {
    var i18n = _a.i18n, classes = _a.classes, multiple = _a.multiple, submitData = _a.submitData, fileTypes = _a.fileTypes, autoStart = _a.autoStart, hideQueue = _a.hideQueue, callbacks = _a.callbacks;
    if (!callbacks) {
        callbacks = {};
    }
    var uploader = new uploader_node_1.default(callbacks, autoStart);
    onData(null, {
        i18n: i18n,
        classes: classes,
        multiple: multiple,
        submitData: submitData,
        fileTypes: fileTypes,
        uploader: uploader,
        autoStart: autoStart,
        hideQueue: hideQueue
    });
    return null;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_komposer_1.compose(exports.composer, null, null, { pure: false })(upload_view_1.default);
