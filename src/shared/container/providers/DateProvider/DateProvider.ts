export interface DateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
}
