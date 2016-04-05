import * as React from "react";

export const Buttons = ({i18n, classes, status, autoStart, startUpload, cancelUpload, reset}) => (
  <div>
    { status === "idle" && !autoStart ?
      <div type="submit" className={ classes.startButton } onClick={startUpload}>
        <i className={ classes.startButtonIcon }></i>
        <span>{ i18n.upload }</span>
      </div>
      : null
    }
    { status === "cancelled" ?
      <div className={ classes.cancelledButton } onClick={reset}>
        <i className={ classes.cancelledButtonIcon }></i>
        <span>{ i18n.cancelled }</span>
      </div>
      : null
    }
    { status === "done" ?
      <div className={ classes.doneButton } onClick={reset}>
        <i className={ classes.doneButtonIcon }></i>
        { i18n.done }
      </div>
      : null
    }
    { status === "running" ?
      <div className={ classes.cancelButton } onClick={cancelUpload}>
        <i className={ classes.cancelButtonIcon }></i>
        <span>{ i18n.cancel }</span>
      </div>
      : null
    }
    { status === "error" ?
      <div className={ classes.errorButton } onClick={reset}>
        <i className={ classes.errorButtonIcon }></i>
        <span>{ i18n.error }</span>
      </div>
      : null
    }
  </div>
);

export default Buttons;
