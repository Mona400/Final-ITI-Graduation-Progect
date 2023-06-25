import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'satetaPie'
})
export class SatetaPiePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch(value){
      case 0:
        return 'Pending'
      case 1:
        return 'Active'
      case 2:
        return 'Expired'
    }
    return null;
  }

}
