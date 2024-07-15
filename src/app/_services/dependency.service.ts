import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DependencyService {

  constructor() { }

  getISODate(dateStr: Date): string {
    const date = new Date(dateStr);
    // const dateOnly =date.toISOString();
    const dateOnly = date.toLocaleDateString('en-CA');
    return dateOnly
  }

  getDateStr(isoDate: string): Date {
    const dateArray = isoDate.split('-')
    const date = Number(dateArray[2]);
    const month = Number(dateArray[1]) - 1;
    const year = Number(dateArray[0]);
    return new Date(year, month, date);
  }

  generateId(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
