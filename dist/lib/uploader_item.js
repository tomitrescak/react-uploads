"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queue_item_1 = require("./queue_item");
var uploader_1 = require("./uploader");
var uploader_ui_1 = require("./uploader_ui");
var GlobalQueueItem = (function (_super) {
    __extends(GlobalQueueItem, _super);
    function GlobalQueueItem(uploader) {
        var _this = this;
        _super.call(this, uploader, "0 " + uploader_ui_1.default.i18n.files, 0, null);
        this.uploader = uploader;
        this.uploader.onQueueChanged(function () {
            _this._queueSize = 0;
            _this.uploader.queue.map(function (item) { _this._queueSize += item.size; });
            _this.triggerChanged();
        });
    }
    Object.defineProperty(GlobalQueueItem.prototype, "info", {
        // overriden methods
        get: function () {
            if (this.uploader.queue.length === 1) {
                return this.uploader.queue[0].name + " (" + queue_item_1.default.bytesToSize(this._queueSize) + ")";
            }
            else {
                // calculate size
                if (this._queueSize === 0) {
                    return "0 " + uploader_ui_1.default.i18n.files;
                }
                return this.uploader.queue.length + " " + uploader_ui_1.default.i18n.files + " (" + queue_item_1.default.bytesToSize(this._queueSize) + ")";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalQueueItem.prototype, "progress", {
        get: function () {
            if (this._queueSize === 0) {
                return "0%";
            }
            var completedSize = 0;
            this.uploader.queue.map(function (item) { completedSize += item.completedSize; });
            return Math.round((completedSize / this._queueSize) * 100) + "%";
        },
        enumerable: true,
        configurable: true
    });
    // methods
    GlobalQueueItem.prototype.startUpload = function () {
        for (var _i = 0, _a = this.uploader.queue; _i < _a.length; _i++) {
            var q = _a[_i];
            q.startUpload();
        }
        this.status = uploader_1.default.status.Running;
    };
    GlobalQueueItem.prototype.cancelUpload = function () {
        for (var _i = 0, _a = this.uploader.queue; _i < _a.length; _i++) {
            var q = _a[_i];
            q.startUpload();
        }
        this.status = uploader_1.default.status.Cancelled;
    };
    GlobalQueueItem.prototype.reset = function () {
        this.uploader.reset();
    };
    return GlobalQueueItem;
}(queue_item_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GlobalQueueItem;
