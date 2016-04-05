import * as React from "react";
import Queue from "../containers/queue_container";
import Progress from "../containers/progress_container";
import Uploader from "../lib/uploader_node";

export interface IComponentProps {
  i18n?: any;
  classes?: any;
  multiple?: boolean;
  submitData?: any;
  fileTypes?: string;
  uploader?: Uploader;
  autoStart?: boolean;
  hideQueue?: boolean;
}

export default class Upload extends React.Component<IComponentProps, {}> {
  render() {
    const { i18n, classes, multiple, submitData, fileTypes, uploader, autoStart, hideQueue } = this.props;

    return (
      <form method="POST" encType="multipart/form-data">
        <div className="uploadPanel">
          {/* The fileinput-button span is used to style the file input field as button */}
          <div className={ classes.upload }>
            { i18n.browse }…
            <input type="file" className="jqUploadclass" multiple={ multiple } data-form-data={ submitData } accept={ fileTypes } ref="upload" />
          </div>
          <Progress i18n={i18n} classes={classes} item={uploader.mainItem} autoStart={autoStart} />
        </div>
        {/* Show queue */}
        {
          !hideQueue ? <Queue i18n={i18n} classes={classes} uploader={uploader} /> : null
        }
      </form>
    );
  }

  componentDidMount() {
    this.props.uploader.init($(this.refs["upload"]), null);
    // .prop("disabled", ($.support != null && $.support.fileInput != null) ? !$.support.fileInput : false)
    // .parent().addClass(($.support != null && $.support.fileInput != null && !$.support.fileInput) ? "disabled" : undefined)
  }
}
