import { Type } from '@interface/index';
import { GenericClassDecorator } from '@type/type.generic-class-decorator';

export const Service = () : GenericClassDecorator<Type<object>> => {
  return (target:Type<object>) => {
    // do something with `target`, e.g. some kind of validation or passing it to the Injector and store them
  };
};