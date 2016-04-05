"use strict";
var react_komposer_1 = require("react-komposer");
var uploader_ui_1 = require("../lib/uploader_ui");
var upload_container_1 = require("./upload_container");
exports.composer = function (_a, onData) {
    var multiple = _a.multiple, submitData = _a.submitData, fileTypes = _a.fileTypes, autoStart = _a.autoStart, hideQueue = _a.hideQueue, callbacks = _a.callbacks;
    onData(null, {
        i18n: uploader_ui_1.default.i18n,
        classes: uploader_ui_1.default.semanticUI,
        multiple: multiple,
        submitData: submitData,
        fileTypes: fileTypes,
        autoStart: autoStart,
        hideQueue: hideQueue
    });
    return null;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_komposer_1.compose(exports.composer, null, null, { pure: false })(upload_container_1.default);
