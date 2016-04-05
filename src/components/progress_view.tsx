import * as React from "react";
import Buttons from "./buttons_view";

export interface IComponentProps {
  i18n?: any;
  classes?: any;
  progress?: string;
  info?: string;
  state?: string;
  autoStart?: boolean;
  startUpload?: Function;
  cancelUpload?: Function;
  reset?: Function;
}

export const Progress = ({i18n, classes, state, info, progress, autoStart, startUpload, cancelUpload, reset}: IComponentProps) => (
  <div className="progressHolder">
    <div className="progressFrame">
      <div className={ classes.progressOuter }>
        <div className={ classes.progressInner }>
          <div className={ classes.progressBar } role="progressbar" aria-valuemin={0} aria-valuemax={100} style={{width: progress}}>
          </div>
          <div className="progress-label">
            { info }
          </div>
        </div>
      </div>
      <Buttons i18n={i18n} classes={classes} status={state} autoStart={autoStart} startUpload={startUpload} cancelUpload={cancelUpload} reset={reset} />
    </div>
  </div>
);

export default Progress;
