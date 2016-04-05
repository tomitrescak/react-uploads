import * as React from "react";
import QueueItem from "../lib/queue_item";
import Buttons from "./buttons_view";
import QueueItemView from "./queue_item_view";

export interface IComponentProps {
  i18n?: any;
  classes?: any;
  queue?: QueueItem[];
}

export const Queue = ({i18n, classes, queue}: IComponentProps) => (
  <span>
  {
    queue.length > 1 ?
      <div className="panel panel-default" style={{ marginTop: 1, background: "#efefef" }}>
        <div className="panel-body">
          {
            queue.map((item: QueueItem, index: number) => {
              return <QueueItemView key={index} i18n={i18n} classes={classes} item={item} />;
            })
          }
        </div>
      </div>
    : null
  }
  </span>
);

export default Queue;
