import { compose, IKomposer, IKomposerData } from "react-komposer";
import Ui from "../lib/uploader_ui";

import Component, { IProps as IComponentProps } from "./upload_s3_container";

interface IProps {
  fileTypes?: string;
  multiple?: boolean;
  submitData?: any;
  autoStart?: boolean;
  hideQueue?: boolean;
  callbacks?: any;
  directive: string;
}

export const composer: IKomposer = ({multiple, submitData, fileTypes, autoStart, hideQueue, callbacks, directive}: IProps, onData: IKomposerData<IComponentProps>) => {

  onData(null, {
    i18n: Ui.i18n,
    classes: Ui.semanticUI,
    multiple,
    fileTypes,
    callbacks,
    autoStart,
    hideQueue,
    directive
  });
  return null;
};

export default compose(composer, null, null, { pure: false })(Component);
