"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var reactive_model_1 = require("./reactive_model");
var uploader_item_1 = require("./uploader_item");
var Uploader = (function (_super) {
    __extends(Uploader, _super);
    // constructor
    function Uploader(callbacks, autoStart) {
        _super.call(this);
        this.mainItem = new uploader_item_1.default(this);
        this.callbacks = callbacks;
        this.autoStart = autoStart;
        this.reset();
    }
    Uploader.prototype.onQueueChanged = function (callback) {
        this.on(Uploader.QUEUE_CHANGED, callback);
    };
    Uploader.prototype.triggerQueueChanged = function () {
        this.trigger(Uploader.QUEUE_CHANGED);
    };
    // public onQueueProgressChanged(callback: Function) {
    //   this.on(Uploader.QUEUE_PROGRESS_CHANGED, callback);
    // }
    Uploader.prototype.triggerQueueProgressChanged = function () {
        // this.trigger(Uploader.QUEUE_PROGRESS_CHANGED);
        this.mainItem.triggerChanged();
    };
    // functions
    Uploader.log = function (level, text) {
        if (level >= Uploader.logLevel) {
            console.log(text);
        }
    };
    // formatProgress: function(file, progress, bitrate) {
    //   return progress + "%&nbsp;of&nbsp;" + file + "&nbsp;<span style="font-size:smaller">@&nbsp;" + bytesToSize(bitrate) + "&nbsp;/&nbsp;sec</span>"
    // },
    Uploader.prototype.removeFromQueue = function (e, item) {
        e.preventDefault();
        // remove from data queue
        var index = this.queue.indexOf(item);
        this.queue.splice(index, 1);
        this.triggerQueueChanged();
    };
    Uploader.prototype.reset = function () {
        this.queue = [];
        this.mainItem.status = Uploader.status.Idle;
        this.triggerQueueChanged();
    };
    Uploader.finished = function (index, file, uploader) {
    };
    Uploader.uploadUrl = "/upload";
    Uploader.logLevels = {
        "debug": 0,
        "error": 1
    };
    Uploader.status = {
        Idle: "idle",
        Running: "running",
        Error: "error",
        Done: "done",
        Cancelled: "cancelled"
    };
    Uploader.logLevel = 1;
    // events
    Uploader.QUEUE_CHANGED = "QueueChanged";
    Uploader.QUEUE_PROGRESS_CHANGED = "QueueProgressChanged";
    return Uploader;
}(reactive_model_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Uploader;
