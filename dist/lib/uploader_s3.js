"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var uploader_1 = require("./uploader");
var queue_item_s3_1 = require("./queue_item_s3");
var UploadS3 = (function (_super) {
    __extends(UploadS3, _super);
    function UploadS3() {
        _super.apply(this, arguments);
    }
    UploadS3.prototype.add = function (e) {
        this.queue = [];
        var files = e.target["files"];
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            this.queue.push(new queue_item_s3_1.default(this, file));
        }
        this.mainItem.status = uploader_1.default.status.Idle;
        this.triggerQueueChanged();
        this.triggerQueueProgressChanged();
    };
    return UploadS3;
}(uploader_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UploadS3;
