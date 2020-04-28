export const Middleware = (middleware: Function[]): MethodDecorator => {
  return (target, propertyKey: string): void => {
    if (!Reflect.hasMetadata('middleware', target.constructor)) {
      Reflect.defineMetadata('middleware', [], target.constructor, propertyKey);
    }
    Reflect.defineMetadata('middleware', middleware, target.constructor, propertyKey);
  };
};