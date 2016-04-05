"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var queue_container_1 = require("../containers/queue_container");
var progress_container_1 = require("../containers/progress_container");
var Upload = (function (_super) {
    __extends(Upload, _super);
    function Upload() {
        _super.apply(this, arguments);
    }
    Upload.prototype.render = function () {
        var _a = this.props, i18n = _a.i18n, classes = _a.classes, multiple = _a.multiple, fileTypes = _a.fileTypes, uploader = _a.uploader, autoStart = _a.autoStart, hideQueue = _a.hideQueue;
        return (React.createElement("form", {method: "POST", encType: "multipart/form-data"}, 
            React.createElement("div", {className: "uploadPanel"}, 
                React.createElement("div", {className: classes.upload}, 
                    i18n.browse, 
                    "…", 
                    React.createElement("input", {type: "file", className: "jqUploadclass", multiple: multiple, accept: fileTypes, ref: "upload", onChange: uploader.add.bind(uploader)})), 
                React.createElement(progress_container_1.default, {i18n: i18n, classes: classes, item: uploader.mainItem, autoStart: autoStart})), 
            !hideQueue ? React.createElement(queue_container_1.default, {i18n: i18n, classes: classes, uploader: uploader}) : null));
    };
    return Upload;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Upload;
