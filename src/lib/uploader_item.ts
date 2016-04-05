import QueueItem from "./queue_item";
import Uploader from "./uploader";
import Ui from "./uploader_ui";

export default class GlobalQueueItem extends QueueItem {
  private _queueSize: number;

  constructor(uploader: Uploader) {
    super(uploader, `0 ${Ui.i18n.files}`, 0, null);

    this.uploader = uploader;

    this.uploader.onQueueChanged(() => {
      this._queueSize = 0;
      this.uploader.queue.map((item: QueueItem) => { this._queueSize += item.size });
      this.triggerChanged();
    });
  }

  // overriden methods

  get info(): string {
    if (this.uploader.queue.length === 1) {
      return `${this.uploader.queue[0].name} (${QueueItem.bytesToSize(this._queueSize)})`;
    } else {
      // calculate size
      if (this._queueSize === 0) {
        return `0 ${Ui.i18n.files}`;
      }
      return `${this.uploader.queue.length} ${Ui.i18n.files} (${QueueItem.bytesToSize(this._queueSize)})`;
    }
  }

  get progress(): string {
    if (this._queueSize === 0) { return "0%"; }
    let completedSize = 0;
    this.uploader.queue.map((item: QueueItem) => { completedSize += item.completedSize });

    return Math.round((completedSize / this._queueSize) * 100) + "%";
  }

  // methods

  public startUpload() {
    for (let q of this.uploader.queue) {
      q.startUpload();
    }
    this.status = Uploader.status.Running;
  }

  public cancelUpload() {
    for (let q of this.uploader.queue) {
      q.startUpload();
    }
    this.status = Uploader.status.Cancelled;
  }

  public reset() {
    this.uploader.reset();
  }
}
