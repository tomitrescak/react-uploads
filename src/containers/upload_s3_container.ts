import { compose, IKomposer, IKomposerData } from "react-komposer";

import Component, { IComponentProps } from "../components/upload_s3_view";
import S3Uploader from "../lib/uploader_s3";

export interface IProps {
  i18n?: any;
  classes?: any;
  multiple?: boolean;
  fileTypes?: string;
  progress?: string;
  autoStart?: boolean;
  hideQueue?: boolean;
  callbacks?: any;
  directive: string;
}

export const composer: IKomposer = ({i18n, classes, multiple, fileTypes, autoStart, hideQueue, callbacks, directive}: IProps, onData: IKomposerData<IComponentProps>) => {

  if (!callbacks) {
    callbacks = {};
  }

  const uploader = new S3Uploader(callbacks, autoStart);
  uploader.directive = directive;

  onData(null, {
    i18n,
    classes,
    multiple,
    fileTypes,
    uploader,
    autoStart,
    hideQueue
  });
  return null;
};

export default compose(composer, null, null, { pure: false })(Component);
