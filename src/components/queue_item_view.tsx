import * as React from "react";
import Progress from "../containers/progress_container";
import Buttons from "./buttons_view";
import QueueItem from "../lib/queue_item";

export interface IComponentProps {
  i18n?: any;
  classes?: any;
  item?: QueueItem;
}

export const QueueItemView = ({i18n, classes, item}: IComponentProps) => (
  <div className="uploadPanel" style={{ marginTop: 6 }}>
    <Progress i18n={i18n} classes={classes} item={item} autoStart={true} />
  </div>
);

export default QueueItemView;
