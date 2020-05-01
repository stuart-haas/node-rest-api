export interface Type<T> {
  new(...args:any[]):T;
}

export type Injectable<T> = (target:T) => void;

export const Injector = new class {
  /**
   * Resolves instances by injecting required services
   * @param {Type<any>} target
   * @returns {T}
   */
  resolve<T>(target:Type<any>):T {
    // tokens are required dependencies, while injections are resolved tokens from the Injector
    let tokens = Reflect.getMetadata('design:paramtypes', target) || [],
      injections = tokens.map(token => Injector.resolve<any>(token));

    return new target(...injections);
  }
};