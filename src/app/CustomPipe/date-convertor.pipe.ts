import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateConvertor",
  standalone: true,
})
export class DateConvertorPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }
}
