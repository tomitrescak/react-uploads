"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var reactive_model_1 = require("./reactive_model");
var uploader_1 = require("./uploader");
var QueueItem = (function (_super) {
    __extends(QueueItem, _super);
    // constructor
    function QueueItem(uploader, name, size, data) {
        if (data === void 0) { data = null; }
        _super.call(this);
        this.name = name;
        this.size = size;
        this.data = data;
        this.status = uploader_1.default.status.Idle;
        this.uploader = uploader;
        this.completedSize = 0;
    }
    Object.defineProperty(QueueItem.prototype, "completedSize", {
        // properties
        get: function () {
            return this._completedSize;
        },
        set: function (size) {
            this._completedSize = size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueueItem.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (status) {
            this._status = status;
            this.triggerChanged();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueueItem.prototype, "info", {
        get: function () {
            return "" + this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueueItem.prototype, "bitrate", {
        get: function () {
            return QueueItem.bytesToSize(this._bitrate) + " / sec";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueueItem.prototype, "progress", {
        get: function () {
            if (this.size === 0) {
                return "0%";
            }
            var p = Math.round((this.completedSize / this.size) * 100) + "%";
            console.log(p);
            return p;
        },
        enumerable: true,
        configurable: true
    });
    QueueItem.bytesToSize = function (bytes) {
        if (bytes === 0)
            return "0 Byte";
        var k = 1000;
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + " " + QueueItem.sizes[i];
    };
    // public methods
    QueueItem.prototype.setProgress = function (loaded, bitrate) {
        this.completedSize = loaded;
        this._bitrate = bitrate;
        this.triggerChanged();
        this.uploader.triggerQueueProgressChanged();
    };
    /**
     * Starts upload
     * @param e
     * @param {string} name Name of the file in the queue that we want to upload
     */
    QueueItem.prototype.startUpload = function () {
        var self = this;
        this.data.jqXHR = this.data.submit()
            .done(function (data, textStatus, jqXHR) {
            self.status = uploader_1.default.status.Done;
            self.completedSize = self.size;
            self.uploader.triggerQueueProgressChanged();
            self.triggerChanged();
            uploader_1.default.log(uploader_1.default.logLevels.debug, "data.sumbit.done: textStatus= " + textStatus);
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.statusText === "abort") {
                self.status = uploader_1.default.status.Cancelled;
                self.completedSize = 0;
            }
            else {
                self.status = uploader_1.default.status.Error;
                self.name = "Failed: " + jqXHR.responseText + " " + jqXHR.status + " " + jqXHR.statusText;
                self.completedSize = 0;
                self.triggerChanged();
            }
            self.uploader.triggerQueueProgressChanged();
            uploader_1.default.log(uploader_1.default.logLevels.debug, "data.sumbit.fail: " + jqXHR.responseText + " " + jqXHR.status + " " + jqXHR.statusText);
        })
            .always(function (data, textStatus, jqXHR) {
            uploader_1.default.log(uploader_1.default.logLevels.debug, "data.sumbit.always:  textStatus= " + textStatus);
        });
        this.status = uploader_1.default.status.Running;
        this.triggerChanged();
    };
    QueueItem.prototype.cancelUpload = function () {
        // cancel upload of non completed files
        if (this.status === uploader_1.default.status.Done) {
            return;
        }
        this.data.jqXHR.abort();
    };
    QueueItem.prototype.finished = function () {
        this.status = uploader_1.default.status.Done;
        this.completedSize = this.size;
        this.triggerChanged();
    };
    QueueItem.prototype.reset = function () {
    };
    QueueItem.prototype.onChanged = function (callback) {
        this.on(QueueItem.CHANGED, callback);
    };
    QueueItem.prototype.triggerChanged = function () {
        this.trigger(QueueItem.CHANGED);
    };
    // static methods
    QueueItem.sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    // event
    QueueItem.CHANGED = "Changed";
    return QueueItem;
}(reactive_model_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QueueItem;
