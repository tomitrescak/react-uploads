import Uploader from "./uploader";
import S3QueueItem from "./queue_item_s3";

export default class UploadS3 extends Uploader {
  directive: string;

  add(e: React.SyntheticEvent) {
    this.queue = [];

    const files = e.target["files"];

    for (let file of files) {
      this.queue.push(new S3QueueItem(this, file));
    }
    this.mainItem.status = Uploader.status.Idle;
    this.triggerQueueChanged();
    this.triggerQueueProgressChanged();
  }
}
