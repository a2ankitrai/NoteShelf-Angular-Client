import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCaser'
})
export class TitleCaserPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    let titalizedCase: string;
    titalizedCase = this.titleCase(value);
    return titalizedCase;
  }

  titleCase(str: string) {
    return str.toLowerCase().split('_').map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }


}
