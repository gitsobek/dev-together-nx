import { Pipe, PipeTransform } from '@angular/core';

export type Mapper<T, R> = (value: T, ...args: any[]) => R;

@Pipe({
  name: 'mapper',
})
export class MapperPipe<T, R> implements PipeTransform {
  transform(value: T, mapper: Mapper<T, R>, ...args: any[]): R {
    return mapper(value, ...args);
  }
}
