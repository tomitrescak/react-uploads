declare module "react-simple-di" {
  interface IInjectDeps {
    (...deps: any[]): IInjectDeps;
  }

  interface IDepsMapper {
    (...deps: any[]): void;
  }

  export var injectDeps: IInjectDeps;
  export function useDeps(depsMapper?: IDepsMapper): any;
}
