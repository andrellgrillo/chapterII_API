interface IDateProvider {
  compareInHours(start_date: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  now(): Date;
  addDays(days: number):Date;
  addHours(hours:number):Date;
}

export { IDateProvider };
