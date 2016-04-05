// import { composeWithTracker, composeAll, IKomposer, IKomposerData } from "react-komposer";
// import { useDeps } from "react-simple-di";
// import QueueItem from "../lib/queue_item";
//
// import Component, { IComponentProps } from "../components/queue_item_view";
//
// interface IProps {
//   i18n?: any;
//   classes?: any;
//   item: QueueItem;
// }
//
// export const composer: IKomposer = ({i18n, classes, item}: IProps, onData: IKomposerData<IComponentProps>) => {
//   const render = () => onData(null, {
//     i18n,
//     classes,
//     state: item.status,
//     info: item.info,
//     progress: item.progress
//   });
//
//   // add listener
//   item.onChanged(render);
//
//   // render component
//   render();
//
//   return null;
// };
//
// // export const depsMapper = (context: IContext, actions: { schedule: IComponentActions} ): IComponentActions => ({
// //   create: actions.schedule.create,
// //   clearSearch: actions.schedule.clearSearch,
// //   handleSearch: actions.schedule.handleSearch,
// //   context: () => context
// // });
//
// export default composeAll<IProps>(
//   composeWithTracker(composer),
//   useDeps()
// )(Component);
