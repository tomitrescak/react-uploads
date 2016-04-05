import { compose, IKomposer, IKomposerData } from "react-komposer";
import { useDeps } from "react-simple-di";

import Component, { IComponentProps } from "../components/upload_view";
import Uploader from "../lib/uploader_node";

export interface IProps {
  i18n?: any;
  classes?: any;
  multiple?: boolean;
  submitData?: any;
  fileTypes?: string;
  progress?: string;
  autoStart?: boolean;
  hideQueue?: boolean;
  callbacks?: any;
}

export const composer: IKomposer = ({i18n, classes, multiple, submitData, fileTypes, autoStart, hideQueue, callbacks}: IProps, onData: IKomposerData<IComponentProps>) => {

  if (!callbacks) {
    callbacks = {};
  }

  const uploader = new Uploader(callbacks, autoStart);

  onData(null, {
    i18n,
    classes,
    multiple,
    submitData,
    fileTypes,
    uploader,
    autoStart,
    hideQueue
  });
  return null;
};

export default compose(composer, null, null, { pure: false })(Component);
