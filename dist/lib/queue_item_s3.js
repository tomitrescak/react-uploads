"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tracker_1 = require("meteor/tracker");
var queue_item_1 = require("./queue_item");
var uploader_1 = require("./uploader");
var QueueItemS3 = (function (_super) {
    __extends(QueueItemS3, _super);
    function QueueItemS3(uploader, file) {
        _super.call(this, uploader, file.name, file.size);
        this.file = file;
        this.completedSize = 0;
    }
    QueueItemS3.prototype.startUpload = function () {
        var _this = this;
        var self = this;
        var context = this.uploader.callbacks && this.uploader.callbacks.context ? this.uploader.callbacks.context() : null;
        this.slingshot = new Slingshot.Upload(this.uploader.directive, context);
        tracker_1.Tracker.autorun(function () {
            var progress = _this.slingshot.progress();
            var calc = progress * self.file.size;
            console.log(calc);
            self.setProgress(calc, 0);
            self.uploader.triggerQueueProgressChanged();
        });
        this.slingshot.send(this.file, function (error, url) {
            if (error) {
                self.status = uploader_1.default.status.Error;
                self.uploader.mainItem.status = uploader_1.default.status.Error;
                self.name = error;
                self.completedSize = 0;
                self.uploader.triggerQueueProgressChanged();
                self.triggerChanged();
            }
            else {
                self.status = uploader_1.default.status.Done;
                self.completedSize = self.size;
                self.uploader.triggerQueueProgressChanged();
                self.triggerChanged();
                // check if everything is finished
                if (self.uploader.mainItem.progress === "100%") {
                    self.uploader.mainItem.finished();
                }
            }
        });
    };
    QueueItemS3.prototype.cancelUpload = function () {
        console.warn("Not implemented");
    };
    return QueueItemS3;
}(queue_item_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QueueItemS3;
