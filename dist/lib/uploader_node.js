"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var uploader_1 = require("./uploader");
var queue_item_1 = require("./queue_item");
var NodeServerUploader = (function (_super) {
    __extends(NodeServerUploader, _super);
    function NodeServerUploader() {
        _super.apply(this, arguments);
    }
    // constructor
    NodeServerUploader.prototype.init = function (uploadControl, dropZone) {
        // set the upload related callbacks for HTML node that has jqUploadclass specified for it
        // Example html node: <input type="file" class="jqUploadclass" />
        var self = this;
        uploadControl.fileupload({
            url: uploader_1.default.uploadUrl,
            dataType: "json",
            dropZone: dropZone,
            add: function (e, data) {
                uploader_1.default.log(uploader_1.default.logLevels.debug, "render.add ");
                // form data
                if (self.callbacks.formData != null) {
                    data.formData = self.callbacks.formData();
                }
                // validate
                if (self.callbacks.validate != null &&
                    !self.callbacks.validate(data.files)) {
                    return;
                }
                // update the queue collection, so that the ui gets updated
                data.files.forEach(function (file, index) {
                    var item = file;
                    var queueItem = new queue_item_1.default(self, file.name, file.size, data);
                    self.queue.push(queueItem);
                });
                self.triggerQueueChanged();
                // we can automatically start the upload
                if (self.autoStart) {
                    self.mainItem.startUpload();
                }
            },
            done: function (e, data) {
                uploader_1.default.log(uploader_1.default.logLevels.debug, "render.done ");
                self.mainItem.finished();
                data.result.files.forEach(function (file, index) {
                    uploader_1.default.finished(index, file, self);
                    // notify user
                    if (self.callbacks.finished != null) {
                        self.callbacks.finished(index, file, self);
                    }
                });
            },
            fail: function (e, data) {
                uploader_1.default.log(uploader_1.default.logLevels.debug, "render.fail ");
            },
            progress: function (e, data) {
                // file progress is displayed only when single file is uploaded
                var name = data.files[0].name;
                for (var _i = 0, _a = self.queue; _i < _a.length; _i++) {
                    var file = _a[_i];
                    if (file.name === name) {
                        uploader_1.default.log(uploader_1.default.logLevels.debug, "Setting progress " + file.name + " " + data.loaded);
                        file.setProgress(data.loaded, data.bitrate);
                    }
                }
            },
            progressall: function (e, data) {
                // templateContext.globalInfo.set({
                //   running: true,
                //   progress: parseInt(data.loaded / data.total * 100, 10),
                //   bitrate: data.bitrate
                // });
            },
            drop: function (e, data) {
                data.files.forEach(function (file) {
                    uploader_1.default.log(uploader_1.default.logLevels.debug, "render.drop file: " + file.name);
                });
            },
            change: function (e, data) {
                // called when input selection changes (file selected)
                // clear the queue, this is used to visualise all the data
                self.reset();
                data.files.forEach(function (file) {
                    uploader_1.default.log(uploader_1.default.logLevels.debug, "render.change file: " + file.name);
                });
            }
        });
    };
    return NodeServerUploader;
}(uploader_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NodeServerUploader;
