import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchPipe",
})
export class SearchPipePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;
    
    args = args.toLowerCase();

    return value.filter(function (item) {
      return (
        item.username.toLowerCase().indexOf(args) > -1 ||
        item.firts_name.toLowerCase().indexOf(args) > -1
      );
    });
  }
}
