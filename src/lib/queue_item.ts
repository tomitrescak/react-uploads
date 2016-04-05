import ReactiveModel from "./reactive_model";
import Uploader from "./uploader";

export default class QueueItem extends ReactiveModel {
  name: string;
  size: number;
  data: any;
  _completedSize: number;
  uploader: Uploader;

  private _status: string;
  private _bitrate: number;

  // properties

  get completedSize() {
    return this._completedSize;
  }

  set completedSize(size: number) {
    this._completedSize = size;
  }

  get status(): string {
    return this._status;
  }

  set status(status: string) {
    this._status = status;
    this.triggerChanged();
  }

  get info(): string {
    return `${this.name}`;
  }

  get bitrate(): string {
    return `${QueueItem.bytesToSize(this._bitrate)} / sec`;
  }

  get progress(): string {
    if (this.size === 0) { return "0%"; }
    const p = Math.round((this.completedSize / this.size) * 100) + "%";
    console.log(p);
    return p;
  }

  // constructor

  constructor(uploader: Uploader, name: string, size: number, data: any = null) {
    super();

    this.name = name;
    this.size = size;
    this.data = data;
    this.status = Uploader.status.Idle;
    this.uploader = uploader;
    this.completedSize = 0;
  }

  // static methods

  static sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  static bytesToSize(bytes: number) {
    if (bytes === 0) return "0 Byte";
    const k = 1000;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + " " + QueueItem.sizes[i];
  }

  // public methods

  public setProgress(loaded: number, bitrate: number) {
    this.completedSize = loaded;
    this._bitrate = bitrate;

    this.triggerChanged();
    this.uploader.triggerQueueProgressChanged();
  }

  /**
   * Starts upload
   * @param e
   * @param {string} name Name of the file in the queue that we want to upload
   */
  public startUpload() {
    const self = this;

    this.data.jqXHR = this.data.submit()
      .done(function(data: any, textStatus: string, jqXHR: any) {

        self.status = Uploader.status.Done;
        self.completedSize = self.size;
        self.uploader.triggerQueueProgressChanged();
        self.triggerChanged();
        Uploader.log(Uploader.logLevels.debug, "data.sumbit.done: textStatus= " + textStatus);
      })
      .fail(function(jqXHR: any, textStatus: string, errorThrown: any) {
        if (jqXHR.statusText === "abort") {
          self.status = Uploader.status.Cancelled;
          self.completedSize = 0;

        } else {
          self.status = Uploader.status.Error;
          self.name = "Failed: " + jqXHR.responseText + " " + jqXHR.status + " " + jqXHR.statusText;
          self.completedSize = 0;
          self.triggerChanged();
        }
        self.uploader.triggerQueueProgressChanged();

        Uploader.log(Uploader.logLevels.debug, "data.sumbit.fail: " + jqXHR.responseText + " " + jqXHR.status + " " + jqXHR.statusText);
      })
      .always(function(data: any, textStatus: string, jqXHR: any) {
        Uploader.log(Uploader.logLevels.debug, "data.sumbit.always:  textStatus= " + textStatus);
      });

    this.status = Uploader.status.Running;
    this.triggerChanged();
  }

  cancelUpload() {
    // cancel upload of non completed files
    if (this.status === Uploader.status.Done) {
      return;
    }
    this.data.jqXHR.abort();
  }

  finished() {
    this.status = Uploader.status.Done;
    this.completedSize = this.size;
    this.triggerChanged();
  }

  reset() {
  }

  // event

  static CHANGED = "Changed";

  public onChanged(callback: Function) {
    this.on(QueueItem.CHANGED, callback);
  }

  public triggerChanged() {
    this.trigger(QueueItem.CHANGED);
  }
}
