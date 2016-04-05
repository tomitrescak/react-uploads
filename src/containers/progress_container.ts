import { compose, IKomposer, IKomposerData } from "react-komposer";
import { useDeps } from "react-simple-di";
import QueueItem from "../lib/queue_item";
import Uploader from "../lib/uploader";

import Component, { IComponentProps } from "../components/progress_view";

interface IProps {
  i18n?: any;
  classes?: any;
  item: QueueItem;
  autoStart: boolean;
}

export const composer: IKomposer = ({i18n, classes, item, autoStart}: IProps, onData: IKomposerData<IComponentProps>) => {

  const render = () => {
    onData(null, {
      i18n,
      classes,
      state: item.status,
      info: item.info,
      progress: item.progress,
      autoStart,
      startUpload: item.startUpload.bind(item),
      cancelUpload: item.cancelUpload.bind(item),
      reset: item.reset.bind(item)
    });
    console.log("Rendering progress ...: " + item.status);
  }

  // add listener
  item.onChanged(render);

  render();

  return null;
};

// export const depsMapper = (context: IContext, actions: { schedule: IComponentActions} ): IComponentActions => ({
//   create: actions.schedule.create,
//   clearSearch: actions.schedule.clearSearch,
//   handleSearch: actions.schedule.handleSearch,
//   context: () => context
// });

export default compose(composer, null, null, { pure: false })(Component);
