"use strict";
var react_komposer_1 = require("react-komposer");
var upload_s3_view_1 = require("../components/upload_s3_view");
var uploader_s3_1 = require("../lib/uploader_s3");
exports.composer = function (_a, onData) {
    var i18n = _a.i18n, classes = _a.classes, multiple = _a.multiple, fileTypes = _a.fileTypes, autoStart = _a.autoStart, hideQueue = _a.hideQueue, callbacks = _a.callbacks, directive = _a.directive;
    if (!callbacks) {
        callbacks = {};
    }
    var uploader = new uploader_s3_1.default(callbacks, autoStart);
    uploader.directive = directive;
    onData(null, {
        i18n: i18n,
        classes: classes,
        multiple: multiple,
        fileTypes: fileTypes,
        uploader: uploader,
        autoStart: autoStart,
        hideQueue: hideQueue
    });
    return null;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_komposer_1.compose(exports.composer, null, null, { pure: false })(upload_s3_view_1.default);
