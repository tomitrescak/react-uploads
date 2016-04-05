import React = __React;

declare module "react-komposer" {
  interface IKomposer {
    (params: Object, onData: Function): Function;
  }

  interface IKomposerData<T> {
    (error?: Object, data?: T): void;
  }

  export function disable(): void;
  export function compose(komposer: IKomposer, loadingComponent?: any, bim?: any, opts?: { pure: Boolean}): any;
  export function composeWithTracker(komposer: IKomposer, loadingComponent?: any, bim?: any, opts?: { pure: Boolean}): any;
  export function composeWithPromise(): any;
  export function composeWithObservable(): any;
  export function composeAll<V>(...composeFunctions: Function[]):
    (component: any, loadingComponent?: any) => () => React.Component<V, {}>;
}
