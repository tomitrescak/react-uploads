import { Tracker } from "meteor/tracker";
import QueueItem from "./queue_item";
import S3Uploader from "./uploader_s3";
import Uploader from "./uploader";

export default class QueueItemS3 extends QueueItem {
  slingshot: any;
  file: File;

  constructor(uploader: S3Uploader, file: File) {
    super(uploader, file.name, file.size);

    this.file = file;
    this.completedSize = 0;
  }

  public startUpload() {
    const self = this;
    const context = this.uploader.callbacks && this.uploader.callbacks.context ? this.uploader.callbacks.context() : null;
    this.slingshot = new Slingshot.Upload( (<S3Uploader>this.uploader).directive, context);

    Tracker.autorun(() => {
      const progress = this.slingshot.progress();
      const calc = progress * self.file.size;
      console.log(calc);
      self.setProgress(calc, 0);
      self.uploader.triggerQueueProgressChanged();
    });

    this.slingshot.send( this.file, ( error: string, url: string ) => {
      if ( error ) {
        self.status = Uploader.status.Error;
        self.uploader.mainItem.status = Uploader.status.Error;
        self.name = error;
        self.completedSize = 0;
        self.uploader.triggerQueueProgressChanged();
        self.triggerChanged();
      } else {
        self.status = Uploader.status.Done;
        self.completedSize = self.size;
        self.uploader.triggerQueueProgressChanged();
        self.triggerChanged();

        // check if everything is finished
        if (self.uploader.mainItem.progress === "100%") {
          self.uploader.mainItem.finished();
        }
      }
    });
  }

  public cancelUpload() {
    console.warn("Not implemented");
  }
}
