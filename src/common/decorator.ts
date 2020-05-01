import { Route } from '@common/interface';
import { RequestMethod } from '@common/enum';
import { Type, Injectable } from '@common/injector';

export const Service = () : Injectable<Type<object>> => {
  return (target:Type<object>) => {

  };
};

export const Controller = (prefix:string = '') : ClassDecorator => {
  return (target:object) => {
    Reflect.defineMetadata('target', target, target);
    Reflect.defineMetadata('prefix', '/' + prefix, target);
    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target);
    }
  };
};

export const Middleware = (middleware:Function[]) : MethodDecorator => {
  return (target:object, propertyKey:string):void => {
    if (!Reflect.hasMetadata('middleware', target.constructor)) {
      Reflect.defineMetadata('middleware', [], target.constructor, propertyKey);
    }
    Reflect.defineMetadata('middleware', middleware, target.constructor, propertyKey);
  };
};

const RouteMap = (metadata:Route) : MethodDecorator => {
  return (target:object, propertyKey:string):void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }
    const path = metadata.path ? '/' + metadata.path :'/';
    const method =  metadata.method ? metadata.method : requestMethodToString(RequestMethod.GET);
    const routes = Reflect.getMetadata('routes', target.constructor) as Array<Route>;
    routes.push({
      path:path,
      method:method,
      action:propertyKey,
      middlewares:Reflect.getMetadata('middleware', target.constructor, propertyKey) || []
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  }
}

const createRouteDecorator = (method:RequestMethod) => (path?:string) : MethodDecorator => {
  return RouteMap({
    path:path,
    method:requestMethodToString(method)
  });
}

function requestMethodToString (method:RequestMethod):string {
  return RequestMethod[method].toString().toLowerCase()
}

export const Post = createRouteDecorator(RequestMethod.POST);

export const Get = createRouteDecorator(RequestMethod.GET);

export const Put = createRouteDecorator(RequestMethod.PUT);

export const Delete = createRouteDecorator(RequestMethod.DELETE);