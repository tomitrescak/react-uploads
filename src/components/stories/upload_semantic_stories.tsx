// components/stories/button.js

import * as React from "react";
import { storiesOf, action } from "@kadira/storybook";
import Upload, { IComponentProps } from "../upload_view";
import { disable } from "react-komposer";
import Uploader from "../../lib/uploader";

import Ui from "../../lib/uploader_ui";


import "../../../styles/upload.css";

import "semantic-ui-css/components/site.css";

import "semantic-ui-css/components/button.css"
import "semantic-ui-css/components/icon.css";
import "semantic-ui-css/components/reset.css";


const dom = React.DOM;

function init(props?: IComponentProps): IComponentProps {
  const def: IComponentProps = {
    classes: Ui.semanticUI,
    i18n: Ui.i18n,
    autoStart: false,
    fileTypes: null,
    multiple: false,
    submitData: null
  }

  // copy params
  if (props) {
    for (let p in props) {
      def[p] = props[p];
    }
  }
  return def;
}

storiesOf("Upload", module)
  .add("no autostart", () => {
    const props = init();
    return <Upload {...props} />
  })
  .add("autostart", () => {
    const props = init({ autoStart: true});
    return <Upload {...props} />
  })
  // .add("progress", () => {
  //   const props = init({ progress: "20%"});
  //   return <Upload {...props} />;
  // })
  // .add("progress with info", () => {
  //
  //   const props = init({ progress: "40%", infoLabel: "My Info"});
  //   return <Upload {...props} />;
  // })
  // .add("running", () => {
  //   const props = init({ state: "running"});
  //   return <Upload {...props} />;
  // })
  // .add("error", () => {
  //   const props = init({ state: "error"});
  //   return <Upload {...props} />;
  // })
  // .add("done", () => {
  //   const props = init({ state: "done"});
  //   return <Upload {...props} />;
  // })
  // .add("cancelled", () => {
  //   const props = init({ state: "cancelled"});
  //   return <Upload {...props} />;
  // })
  // .add("queue", () => {
  //   const props = init({ state: "running", queueItems: [
  //     { status: "running", info: "Item1", progress: "20%" },
  //     { status: "cancelled", info: "Item2", progress: "90%" }
  //   ]});
  //   return <Upload {...props} />;
  //});
