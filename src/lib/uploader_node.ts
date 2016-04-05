import Uploader from "./uploader";
import QueueItem from "./queue_item";

export default class NodeServerUploader extends Uploader {
  // constructor

  init(uploadControl: any, dropZone: any) {
    // set the upload related callbacks for HTML node that has jqUploadclass specified for it
    // Example html node: <input type="file" class="jqUploadclass" />
    let self = this;
    uploadControl.fileupload({
      url: Uploader.uploadUrl,
      dataType: "json",
      dropZone: dropZone,

      add: function(e: any, data: any) {
        Uploader.log(Uploader.logLevels.debug, "render.add ");

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
        data.files.forEach((file: File, index: number) => {
          let item = file;
          let queueItem = new QueueItem(self, file.name, file.size, data);

          self.queue.push(queueItem);
        });

        self.triggerQueueChanged();

        // we can automatically start the upload
        if (self.autoStart) {
          self.mainItem.startUpload();
        }

      }, // end of add callback handler
      done: function(e: any, data: any) {
        Uploader.log(Uploader.logLevels.debug, "render.done ");

        self.mainItem.finished();

        data.result.files.forEach((file: File, index: number) => {
          Uploader.finished(index, file, self);

          // notify user
          if (self.callbacks.finished != null) {
            self.callbacks.finished(index, file, self);
          }
        });
      },
      fail: function(e: any, data: any) {
        Uploader.log(Uploader.logLevels.debug, "render.fail ");
      },
      progress: function(e: any, data: any) {
        // file progress is displayed only when single file is uploaded
        const name = data.files[0].name;
        for (let file of self.queue) {
          if (file.name === name) {
            Uploader.log(Uploader.logLevels.debug, "Setting progress " + file.name + " " + data.loaded);
            file.setProgress(data.loaded, data.bitrate);
          }
        }
      },
      progressall: function(e: any, data: any) {
        // templateContext.globalInfo.set({
        //   running: true,
        //   progress: parseInt(data.loaded / data.total * 100, 10),
        //   bitrate: data.bitrate
        // });
      },
      drop: function(e: any, data: any) { // called when files are dropped onto ui
        data.files.forEach((file: File) => {
          Uploader.log(Uploader.logLevels.debug, "render.drop file: " + file.name);
        });
      },
      change: function(e: any, data: any) {
        // called when input selection changes (file selected)
        // clear the queue, this is used to visualise all the data
        self.reset();

        data.files.forEach((file: File) => {
          Uploader.log(Uploader.logLevels.debug, "render.change file: " + file.name);
        });
      }
    })
    ;
  }
}
