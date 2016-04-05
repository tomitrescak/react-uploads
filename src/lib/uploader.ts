import ReactiveModel from "./reactive_model";
import Ui from "./uploader_ui";


import QueueItem from "./queue_item";
import UploaderItem from "./uploader_item";

export default class Uploader extends ReactiveModel {
  static uploadUrl = "/upload";
  static logLevels = {
    "debug": 0,
    "error": 1
  };
  static status = {
    Idle: "idle",
    Running: "running",
    Error: "error",
    Done: "done",
    Cancelled: "cancelled"
  };
  static logLevel = 1;

  queue: QueueItem[];
  mainItem: UploaderItem;
  autoStart: boolean;
  callbacks: any;

  // constructor

  constructor(callbacks: any, autoStart: boolean) {
    super();

    this.mainItem = new UploaderItem(this);
    this.callbacks = callbacks;
    this.autoStart = autoStart;
    this.reset();
  }

  // events

  static QUEUE_CHANGED = "QueueChanged";
  static QUEUE_PROGRESS_CHANGED = "QueueProgressChanged";

  public onQueueChanged(callback: Function) {
    this.on(Uploader.QUEUE_CHANGED, callback);
  }

  protected triggerQueueChanged() {
    this.trigger(Uploader.QUEUE_CHANGED);
  }

  // public onQueueProgressChanged(callback: Function) {
  //   this.on(Uploader.QUEUE_PROGRESS_CHANGED, callback);
  // }

  public triggerQueueProgressChanged() {
    // this.trigger(Uploader.QUEUE_PROGRESS_CHANGED);
    this.mainItem.triggerChanged();
  }

  // functions

  static log(level: number, text: string) {
    if (level >= Uploader.logLevel) {
      console.log(text);
    }
  }

  // formatProgress: function(file, progress, bitrate) {
  //   return progress + "%&nbsp;of&nbsp;" + file + "&nbsp;<span style="font-size:smaller">@&nbsp;" + bytesToSize(bitrate) + "&nbsp;/&nbsp;sec</span>"
  // },
  removeFromQueue(e: any, item: QueueItem) {
    e.preventDefault();

    // remove from data queue
    const index = this.queue.indexOf(item);
    this.queue.splice(index, 1);
    this.triggerQueueChanged();
  }

  reset() {
    this.queue = [];
    this.mainItem.status = Uploader.status.Idle;
    this.triggerQueueChanged();
  }

  static finished(index: number, file: File, uploader: Uploader) {
  }
}
