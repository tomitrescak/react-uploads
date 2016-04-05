import { compose, IKomposer, IKomposerData } from "react-komposer";
import { useDeps } from "react-simple-di";
import QueueItem from "../lib/queue_item";
import Uploader from "../lib/uploader_node";

import Component, { IComponentProps } from "../components/queue_view";

interface IProps {
  i18n?: any;
  classes?: any;
  uploader: Uploader;
}

export const composer: IKomposer = ({i18n, classes, uploader}: IProps, onData: IKomposerData<IComponentProps>) => {

  const data = () => {
    onData(null, {
      i18n,
      classes,
      queue: uploader.queue
    });
    // console.log("Rendering queue ...: " + uploader.queue)
  }

  // add callback
  uploader.onQueueChanged(data);

  // render data
  data();

  return null;
};

// export const depsMapper = (context: IContext, actions: { schedule: IComponentActions} ): IComponentActions => ({
//   create: actions.schedule.create,
//   clearSearch: actions.schedule.clearSearch,
//   handleSearch: actions.schedule.handleSearch,
//   context: () => context
// });

export default compose(composer, null, null, { pure: false })(Component);
