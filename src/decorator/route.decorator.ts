import { RouteDefinition } from '@model/route.model';
import { RequestMethod } from '@enum/request-method.enum';

export const RouteMap = (metadata: RouteDefinition): MethodDecorator => {
  return (target: object, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }
    const path = metadata.path ? metadata.path : '/';
    const method =  metadata.method ? metadata.method : requestMethodToString(RequestMethod.GET);
    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;
    routes.push({
      path: path,
      method: method,
      action: propertyKey,
      middlewares: Reflect.getMetadata('middleware', target.constructor, propertyKey) || []
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  }
}

const createRouteDecorator = (method: RequestMethod) => (path?: string): MethodDecorator => {
  return RouteMap({
    path: path,
    method: requestMethodToString(method)
  });
}

const requestMethodToString = (method: RequestMethod) => {
  return RequestMethod[method].toString().toLowerCase()
}

export const Post = createRouteDecorator(RequestMethod.POST);

export const Get = createRouteDecorator(RequestMethod.GET);

export const Put = createRouteDecorator(RequestMethod.PUT);

export const Delete = createRouteDecorator(RequestMethod.DELETE);