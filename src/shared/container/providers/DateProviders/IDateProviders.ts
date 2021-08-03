interface IDateProvider {
  compareInHours(start_date: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  now(): Date;
}

export { IDateProvider };
